from django.test import TestCase
from django.core.exceptions import ValidationError
from apps.orders.models import Order, OrderDetail
from apps.products.models import Product, Category
from apps.users.models import User
from core import exceptions
from decimal import Decimal


class OrderModelTest(TestCase):
    """Test Order model"""
    
    def setUp(self):
        """Set up test user, category, product, and order"""
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
    
    def test_order_creation(self):
        """Test order can be created"""
        order = Order.objects.create(
            user=self.user,
            total=Decimal('100.00')
        )
        self.assertEqual(order.user, self.user)
        self.assertEqual(order.total, Decimal('100.00'))
    
    def test_order_default_state(self):
        """Test order defaults to pending state"""
        order = Order.objects.create(
            user=self.user,
            total=Decimal('100.00')
        )
        self.assertEqual(order.state, 'pending')
    
    def test_order_date_is_set(self):
        """Test order date is set on creation"""
        order = Order.objects.create(
            user=self.user,
            total=Decimal('100.00')
        )
        self.assertIsNotNone(order.date)
    
    def test_order_str(self):
        """Test order string representation"""
        order = Order.objects.create(
            user=self.user,
            total=Decimal('100.00')
        )
        self.assertEqual(str(order), f"Order {order.id}")
    
    def test_order_calculate_total(self):
        """Test order total calculation"""
        order = Order.objects.create(
            user=self.user,
            total=Decimal('0.00')
        )
        
        OrderDetail.objects.create(
            order=order,
            product=self.product,
            quantity=2,
            unitary_price=Decimal('50.00')
        )
        
        order.calculate_total()
        self.assertEqual(order.total, Decimal('100.00'))
    
    def test_order_calculate_total_multiple_items(self):
        """Test total calculation with multiple items"""
        order = Order.objects.create(
            user=self.user,
            total=Decimal('0.00')
        )
        
        product2 = Product.objects.create(
            category=self.category,
            name='Table',
            description='Wooden table',
            stock=10,
            price=Decimal('100.00')
        )
        
        OrderDetail.objects.create(
            order=order,
            product=self.product,
            quantity=2,
            unitary_price=Decimal('50.00')
        )
        
        OrderDetail.objects.create(
            order=order,
            product=product2,
            quantity=1,
            unitary_price=Decimal('100.00')
        )
        
        order.calculate_total()
        self.assertEqual(order.total, Decimal('200.00'))
    
    def test_order_transition_pending_to_paid(self):
        """Test valid transition from pending to paid"""
        order = Order.objects.create(
            user=self.user,
            total=Decimal('100.00'),
            state='pending'
        )
        
        order.transition_to('paid')
        self.assertEqual(order.state, 'paid')
    
    def test_order_transition_pending_to_cancelled(self):
        """Test valid transition from pending to cancelled"""
        order = Order.objects.create(
            user=self.user,
            total=Decimal('100.00'),
            state='pending'
        )
        
        order.transition_to('cancelled')
        self.assertEqual(order.state, 'cancelled')
    
    def test_order_transition_paid_to_shipped(self):
        """Test valid transition from paid to shipped"""
        order = Order.objects.create(
            user=self.user,
            total=Decimal('100.00'),
            state='paid'
        )
        
        order.transition_to('shipped')
        self.assertEqual(order.state, 'shipped')
    
    def test_order_transition_paid_to_cancelled(self):
        """Test valid transition from paid to cancelled"""
        order = Order.objects.create(
            user=self.user,
            total=Decimal('100.00'),
            state='paid'
        )
        
        order.transition_to('cancelled')
        self.assertEqual(order.state, 'cancelled')
    
    def test_order_transition_invalid_pending_to_shipped(self):
        """Test invalid transition from pending to shipped"""
        order = Order.objects.create(
            user=self.user,
            total=Decimal('100.00'),
            state='pending'
        )
        
        with self.assertRaises(exceptions.InvalidTransition):
            order.transition_to('shipped')
    
    def test_order_transition_invalid_shipped_state(self):
        """Test shipped orders cannot transition"""
        order = Order.objects.create(
            user=self.user,
            total=Decimal('100.00'),
            state='shipped'
        )
        
        with self.assertRaises(exceptions.InvalidTransition):
            order.transition_to('cancelled')
    
    def test_order_transition_invalid_cancelled_state(self):
        """Test cancelled orders cannot transition"""
        order = Order.objects.create(
            user=self.user,
            total=Decimal('100.00'),
            state='cancelled'
        )
        
        with self.assertRaises(exceptions.InvalidTransition):
            order.transition_to('paid')
    
    def test_order_status_choices(self):
        """Test order status choices"""
        order = Order(user=self.user, total=Decimal('100.00'))
        state_field = order._meta.get_field('state')
        choices = dict(state_field.choices)
        
        self.assertIn('pending', choices)
        self.assertIn('paid', choices)
        self.assertIn('shipped', choices)
        self.assertIn('cancelled', choices)


class OrderDetailModelTest(TestCase):
    """Test OrderDetail model"""
    
    def setUp(self):
        """Set up test order and product"""
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
            total=Decimal('100.00')
        )
    
    def test_order_detail_creation(self):
        """Test order detail can be created"""
        detail = OrderDetail.objects.create(
            order=self.order,
            product=self.product,
            quantity=2,
            unitary_price=Decimal('50.00')
        )
        
        self.assertEqual(detail.quantity, 2)
        self.assertEqual(detail.unitary_price, Decimal('50.00'))
    
    def test_order_detail_unique_together(self):
        """Test cannot add duplicate product to order"""
        OrderDetail.objects.create(
            order=self.order,
            product=self.product,
            quantity=2,
            unitary_price=Decimal('50.00')
        )
        
        with self.assertRaises(Exception):  # IntegrityError
            OrderDetail.objects.create(
                order=self.order,
                product=self.product,
                quantity=1,
                unitary_price=Decimal('50.00')
            )
    
    def test_order_detail_clean_invalid_quantity(self):
        """Test clean validation rejects zero quantity"""
        detail = OrderDetail(
            order=self.order,
            product=self.product,
            quantity=0,
            unitary_price=Decimal('50.00')
        )
        
        with self.assertRaises(ValidationError):
            detail.clean()
    
    def test_order_detail_clean_negative_quantity(self):
        """Test clean validation rejects negative quantity"""
        detail = OrderDetail(
            order=self.order,
            product=self.product,
            quantity=-1,
            unitary_price=Decimal('50.00')
        )
        
        with self.assertRaises(ValidationError):
            detail.clean()
    
    def test_order_detail_clean_valid_quantity(self):
        """Test clean validation accepts positive quantity"""
        detail = OrderDetail(
            order=self.order,
            product=self.product,
            quantity=5,
            unitary_price=Decimal('50.00')
        )
        
        # Should not raise
        try:
            detail.clean()
        except ValidationError:
            self.fail("clean() raised ValidationError for valid quantity")
    
    def test_order_detail_cascade_delete(self):
        """Test order details are deleted when order is deleted"""
        OrderDetail.objects.create(
            order=self.order,
            product=self.product,
            quantity=2,
            unitary_price=Decimal('50.00')
        )
        
        order_id = self.order.id
        self.order.delete()
        
        # Verify detail was deleted
        with self.assertRaises(Order.DoesNotExist):
            Order.objects.get(id=order_id)
        
        self.assertEqual(OrderDetail.objects.filter(order_id=order_id).count(), 0)
