from django.test import TestCase
from apps.users.models import User
from apps.products.models import Product, Category
from apps.orders.models import Order, OrderDetail
from core.services.inventory_service import InventoryService
from core.services.order_service import OrderService
from core.services.checkout_service import CheckoutService
from core.services.pricing_service import PricingService
from core import exceptions
from decimal import Decimal


class InventoryServiceTest(TestCase):
    """Test InventoryService"""
    
    def setUp(self):
        """Set up test product"""
        self.category = Category.objects.create(name='Furniture')
        self.product = Product.objects.create(
            category=self.category,
            name='Chair',
            description='Wooden chair',
            stock=10,
            price=Decimal('50.00')
        )
    
    def test_check_stock_sufficient(self):
        """Test check_stock does not raise when stock is sufficient"""
        # Should not raise
        try:
            InventoryService.check_stock(self.product, 5)
        except exceptions.InsufficientStock:
            self.fail("check_stock raised InsufficientStock when stock was sufficient")
    
    def test_check_stock_exact_amount(self):
        """Test check_stock passes when stock equals requested amount"""
        # Should not raise
        try:
            InventoryService.check_stock(self.product, 10)
        except exceptions.InsufficientStock:
            self.fail("check_stock raised InsufficientStock when stock was exact")
    
    def test_check_stock_insufficient(self):
        """Test check_stock raises when stock is insufficient"""
        with self.assertRaises(exceptions.InsufficientStock):
            InventoryService.check_stock(self.product, 15)
    
    def test_check_stock_zero_stock(self):
        """Test check_stock raises when requesting from zero stock"""
        self.product.stock = 0
        self.product.save()
        
        with self.assertRaises(exceptions.InsufficientStock):
            InventoryService.check_stock(self.product, 1)
    
    def test_decrease_stock_success(self):
        """Test stock is decreased when sufficient"""
        InventoryService.decrease_stock(self.product, 3)
        
        self.product.refresh_from_db()
        self.assertEqual(self.product.stock, 7)
    
    def test_decrease_stock_insufficient(self):
        """Test error raised when stock insufficient"""
        with self.assertRaises(exceptions.InsufficientStock):
            InventoryService.decrease_stock(self.product, 15)
    
    def test_decrease_stock_to_zero(self):
        """Test stock can be decreased to zero"""
        InventoryService.decrease_stock(self.product, 10)
        
        self.product.refresh_from_db()
        self.assertEqual(self.product.stock, 0)
    
    def test_increase_stock(self):
        """Test stock is increased"""
        InventoryService.increase_stock(self.product, 5)
        
        self.product.refresh_from_db()
        self.assertEqual(self.product.stock, 15)
    
    def test_increase_stock_multiple_times(self):
        """Test multiple stock increases"""
        InventoryService.increase_stock(self.product, 3)
        InventoryService.increase_stock(self.product, 2)
        
        self.product.refresh_from_db()
        self.assertEqual(self.product.stock, 15)


class OrderServiceTest(TestCase):
    """Test OrderService"""
    
    def setUp(self):
        """Set up test user and product"""
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        self.category = Category.objects.create(name='Furniture')
        self.product = Product.objects.create(
            category=self.category,
            name='Chair',
            description='Wooden chair',
            stock=20,
            price=Decimal('50.00')
        )
    
    def test_create_order(self):
        """Test order creation"""
        order = OrderService.create_order(self.user)
        
        self.assertEqual(order.user, self.user)
        self.assertEqual(order.state, 'pending')
        self.assertEqual(order.total, 0)
    
    def test_create_order_saved(self):
        """Test created order is saved"""
        order = OrderService.create_order(self.user)
        
        # Should be able to retrieve from database
        retrieved_order = Order.objects.get(id=order.id)
        self.assertEqual(retrieved_order.user, self.user)
    
    def test_add_item_sufficient_stock(self):
        """Test adding item with sufficient stock"""
        order = OrderService.create_order(self.user)
        
        OrderService.add_item(order, self.product, 5)
        
        self.assertEqual(order.details.count(), 1)
        detail = order.details.first()
        self.assertEqual(detail.quantity, 5)
        self.assertEqual(detail.product, self.product)
        self.assertEqual(detail.unitary_price, Decimal('50.00'))
    
    def test_add_item_insufficient_stock(self):
        """Test error when adding item without sufficient stock"""
        order = OrderService.create_order(self.user)
        
        with self.assertRaises(exceptions.InsufficientStock):
            OrderService.add_item(order, self.product, 25)
    
    def test_add_multiple_items(self):
        """Test adding multiple items to order"""
        order = OrderService.create_order(self.user)
        
        product2 = Product.objects.create(
            category=self.category,
            name='Table',
            description='Wooden table',
            stock=10,
            price=Decimal('100.00')
        )
        
        OrderService.add_item(order, self.product, 2)
        OrderService.add_item(order, product2, 1)
        
        self.assertEqual(order.details.count(), 2)
    
    def test_cancel_order_pending(self):
        """Test cancelling pending order restores stock"""
        self.product.stock = 10
        self.product.save()
        
        order = OrderService.create_order(self.user)
        OrderService.add_item(order, self.product, 3)
        InventoryService.decrease_stock(self.product, 3)  # Simulate checkout reducing stock
        
        OrderService.cancel_order(order)
        
        order.refresh_from_db()
        self.product.refresh_from_db()
        
        self.assertEqual(order.state, 'cancelled')
        self.assertEqual(self.product.stock, 10)  # Stock restored
    
    def test_cancel_order_paid(self):
        """Test cancelling paid order restores stock"""
        self.product.stock = 10
        self.product.save()
        
        order = Order.objects.create(
            user=self.user,
            total=Decimal('150.00'),
            state='paid'
        )
        OrderService.add_item(order, self.product, 3)
        InventoryService.decrease_stock(self.product, 3)  # Simulate checkout reducing stock
        
        OrderService.cancel_order(order)
        
        order.refresh_from_db()
        self.product.refresh_from_db()
        
        self.assertEqual(order.state, 'cancelled')
        self.assertEqual(self.product.stock, 10)
    
    def test_cancel_order_shipped_raises_error(self):
        """Test cancelling shipped order raises error"""
        order = Order.objects.create(
            user=self.user,
            total=Decimal('100.00'),
            state='shipped'
        )
        
        with self.assertRaises(exceptions.InvalidTransition):
            OrderService.cancel_order(order)
    
    def test_cancel_order_updates_multiple_items(self):
        """Test cancelling order with multiple items restores all stock"""
        self.product.stock = 10
        self.product.save()
        
        product2 = Product.objects.create(
            category=self.category,
            name='Table',
            description='Wooden table',
            stock=5,
            price=Decimal('100.00')
        )
        
        order = OrderService.create_order(self.user)
        OrderService.add_item(order, self.product, 3)
        OrderService.add_item(order, product2, 2)
        InventoryService.decrease_stock(self.product, 3)  # Simulate checkout reducing stock
        InventoryService.decrease_stock(product2, 2)  # Simulate checkout reducing stock
        
        OrderService.cancel_order(order)
        
        self.product.refresh_from_db()
        product2.refresh_from_db()
        
        self.assertEqual(self.product.stock, 10)
        self.assertEqual(product2.stock, 5)


class CheckoutServiceTest(TestCase):
    """Test CheckoutService"""
    
    def setUp(self):
        """Set up test user with cart and products"""
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        self.cart = self.user.cart
        self.category = Category.objects.create(name='Furniture')
        self.product = Product.objects.create(
            category=self.category,
            name='Chair',
            description='Wooden chair',
            stock=20,
            price=Decimal('50.00')
        )
    
    def test_checkout_empty_cart_raises_error(self):
        """Test checkout with empty cart raises error"""
        with self.assertRaises(exceptions.EmptyCart):
            CheckoutService.checkout(self.user)
    
    def test_checkout_creates_order(self):
        """Test checkout creates order"""
        self.cart.add_item(self.product, qty=2)
        
        order = CheckoutService.checkout(self.user)
        
        self.assertIsNotNone(order)
        self.assertEqual(order.user, self.user)
        self.assertEqual(order.state, 'pending')
    
    def test_checkout_order_has_items(self):
        """Test checkout order contains items from cart"""
        self.cart.add_item(self.product, qty=2)
        
        order = CheckoutService.checkout(self.user)
        
        self.assertEqual(order.details.count(), 1)
        detail = order.details.first()
        self.assertEqual(detail.product, self.product)
        self.assertEqual(detail.quantity, 2)
    
    def test_checkout_calculates_total(self):
        """Test checkout calculates order total"""
        self.cart.add_item(self.product, qty=3)
        
        order = CheckoutService.checkout(self.user)
        
        self.assertEqual(order.total, Decimal('150.00'))
    
    def test_checkout_clears_cart(self):
        """Test checkout clears cart items"""
        self.cart.add_item(self.product, qty=2)
        
        order = CheckoutService.checkout(self.user)
        
        self.assertEqual(self.cart.items.count(), 0)
    
    def test_checkout_decreases_stock(self):
        """Test checkout decreases product stock"""
        initial_stock = self.product.stock
        self.cart.add_item(self.product, qty=5)
        
        CheckoutService.checkout(self.user)
        
        self.product.refresh_from_db()
        self.assertEqual(self.product.stock, initial_stock - 5)
    
    def test_checkout_multiple_products(self):
        """Test checkout with multiple products"""
        product2 = Product.objects.create(
            category=self.category,
            name='Table',
            description='Wooden table',
            stock=10,
            price=Decimal('100.00')
        )
        
        self.cart.add_item(self.product, qty=2)
        self.cart.add_item(product2, qty=1)
        
        order = CheckoutService.checkout(self.user)
        
        self.assertEqual(order.details.count(), 2)
        self.assertEqual(order.total, Decimal('200.00'))
    
    def test_checkout_insufficient_stock_raises_error(self):
        """Test checkout raises error when stock insufficient"""
        self.product.stock = 1
        self.product.save()
        
        self.cart.add_item(self.product, qty=5)
        
        with self.assertRaises(exceptions.InsufficientStock):
            CheckoutService.checkout(self.user)
    
    def test_checkout_is_atomic(self):
        """Test checkout is atomic transaction"""
        self.product.stock = 1
        self.product.save()
        
        self.cart.add_item(self.product, qty=1)
        product2 = Product.objects.create(
            category=self.category,
            name='Table',
            description='Wooden table',
            stock=0,
            price=Decimal('100.00')
        )
        self.cart.add_item(product2, qty=1)
        
        # Should fail due to insufficient stock for product2
        with self.assertRaises(exceptions.InsufficientStock):
            CheckoutService.checkout(self.user)


class PricingServiceTest(TestCase):
    """Test PricingService"""
    
    def setUp(self):
        """Set up test order and products"""
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        self.category = Category.objects.create(name='Furniture')
        self.product = Product.objects.create(
            category=self.category,
            name='Chair',
            description='Wooden chair',
            stock=20,
            price=Decimal('50.00')
        )
        self.order = Order.objects.create(
            user=self.user,
            total=Decimal('0.00')
        )
    
    def test_calculate_order_total_single_item(self):
        """Test order total calculation with single item"""
        OrderDetail.objects.create(
            order=self.order,
            product=self.product,
            quantity=2,
            unitary_price=Decimal('50.00')
        )
        
        total = PricingService.calculate_order_total(self.order)
        
        self.assertEqual(total, Decimal('100.00'))
    
    def test_calculate_order_total_multiple_items(self):
        """Test order total calculation with multiple items"""
        product2 = Product.objects.create(
            category=self.category,
            name='Table',
            description='Wooden table',
            stock=10,
            price=Decimal('100.00')
        )
        
        OrderDetail.objects.create(
            order=self.order,
            product=self.product,
            quantity=2,
            unitary_price=Decimal('50.00')
        )
        
        OrderDetail.objects.create(
            order=self.order,
            product=product2,
            quantity=1,
            unitary_price=Decimal('100.00')
        )
        
        total = PricingService.calculate_order_total(self.order)
        
        self.assertEqual(total, Decimal('200.00'))
    
    def test_calculate_order_total_empty_order(self):
        """Test total calculation for empty order"""
        total = PricingService.calculate_order_total(self.order)
        
        self.assertEqual(total, Decimal('0.00'))
    
    def test_calculate_order_total_does_not_update(self):
        """Test calculate_order_total does not modify order"""
        OrderDetail.objects.create(
            order=self.order,
            product=self.product,
            quantity=2,
            unitary_price=Decimal('50.00')
        )
        
        original_total = self.order.total
        PricingService.calculate_order_total(self.order)
        
        self.order.refresh_from_db()
        self.assertEqual(self.order.total, original_total)
    
    def test_calculate_item_total(self):
        """Test item total calculation"""
        item = OrderDetail.objects.create(
            order=self.order,
            product=self.product,
            quantity=3,
            unitary_price=Decimal('50.00')
        )
        
        total = PricingService.calculate_item_total(item)
        
        self.assertEqual(total, Decimal('150.00'))
    
    def test_calculate_item_total_single_unit(self):
        """Test item total with single unit"""
        item = OrderDetail.objects.create(
            order=self.order,
            product=self.product,
            quantity=1,
            unitary_price=Decimal('50.00')
        )
        
        total = PricingService.calculate_item_total(item)
        
        self.assertEqual(total, Decimal('50.00'))
    
    def test_calculate_item_total_decimal_price(self):
        """Test item total with decimal price"""
        item = OrderDetail.objects.create(
            order=self.order,
            product=self.product,
            quantity=2,
            unitary_price=Decimal('49.99')
        )
        
        total = PricingService.calculate_item_total(item)
        
        self.assertEqual(total, Decimal('99.98'))
