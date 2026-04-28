from django.test import TestCase
from django.core.exceptions import ValidationError
from apps.cart.models import Cart, CartItem
from apps.products.models import Product, Category
from apps.users.models import User
from core import exceptions
from decimal import Decimal


class CartModelTest(TestCase):
    """Test Cart model"""
    
    def setUp(self):
        """Set up test user, category, product, and cart"""
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
    
    def test_cart_created_for_user(self):
        """Test cart is created automatically for user"""
        self.assertIsNotNone(self.cart)
        self.assertEqual(self.cart.user, self.user)
    
    def test_cart_add_item_new(self):
        """Test adding a new item to cart"""
        self.cart.add_item(self.product, qty=2)
        
        self.assertEqual(self.cart.items.count(), 1)
        item = self.cart.items.first()
        self.assertEqual(item.product, self.product)
        self.assertEqual(item.quantity, 2)
    
    def test_cart_add_item_default_qty(self):
        """Test adding item with default quantity"""
        self.cart.add_item(self.product)
        
        item = self.cart.items.first()
        self.assertEqual(item.quantity, 1)
    
    def test_cart_add_existing_item_increases_qty(self):
        """Test adding existing item increases quantity"""
        self.cart.add_item(self.product, qty=2)
        self.cart.add_item(self.product, qty=3)
        
        self.assertEqual(self.cart.items.count(), 1)
        item = self.cart.items.first()
        self.assertEqual(item.quantity, 5)
    
    def test_cart_remove_item(self):
        """Test removing item from cart"""
        self.cart.add_item(self.product, qty=2)
        self.assertEqual(self.cart.items.count(), 1)
        
        self.cart.remove_item(self.product)
        self.assertEqual(self.cart.items.count(), 0)
    
    def test_cart_remove_nonexistent_item(self):
        """Test removing non-existent item"""
        product2 = Product.objects.create(
            category=self.category,
            name='Table',
            description='Wooden table',
            stock=10,
            price=Decimal('100.00')
        )
        
        # Should not raise error, just delete nothing
        self.cart.remove_item(product2)
        self.assertEqual(self.cart.items.count(), 0)
    
    def test_cart_decrease_unit(self):
        """Test decreasing unit quantity"""
        self.cart.add_item(self.product, qty=5)
        self.cart.decrease_unit(self.product, amount=2)
        
        item = self.cart.items.first()
        self.assertEqual(item.quantity, 3)
    
    def test_cart_decrease_unit_removes_item_when_zero(self):
        """Test item is removed when quantity reaches zero"""
        self.cart.add_item(self.product, qty=2)
        self.cart.decrease_unit(self.product, amount=2)
        
        self.assertEqual(self.cart.items.count(), 0)
    
    def test_cart_decrease_unit_product_not_in_cart(self):
        """Test error when decreasing unit for product not in cart"""
        product2 = Product.objects.create(
            category=self.category,
            name='Table',
            description='Wooden table',
            stock=10,
            price=Decimal('100.00')
        )
        
        with self.assertRaises(exceptions.ProductNotInCart):
            self.cart.decrease_unit(product2, amount=1)
    
    def test_cart_decrease_unit_amount_too_high(self):
        """Test error when decreasing amount higher than quantity"""
        self.cart.add_item(self.product, qty=2)
        
        with self.assertRaises(exceptions.CartInvalidQuantity):
            self.cart.decrease_unit(self.product, amount=5)
    
    def test_cart_is_empty_raises_when_empty(self):
        """Test is_empty raises exception when cart is empty"""
        with self.assertRaises(exceptions.EmptyCart):
            self.cart.is_empty()
    
    def test_cart_is_empty_does_not_raise_when_has_items(self):
        """Test is_empty does not raise when cart has items"""
        self.cart.add_item(self.product, qty=1)
        
        # Should not raise
        try:
            self.cart.is_empty()
        except exceptions.EmptyCart:
            self.fail("is_empty() raised EmptyCart when cart had items")
    
    def test_cart_multiple_products(self):
        """Test cart can contain multiple products"""
        product2 = Product.objects.create(
            category=self.category,
            name='Table',
            description='Wooden table',
            stock=10,
            price=Decimal('100.00')
        )
        
        self.cart.add_item(self.product, qty=2)
        self.cart.add_item(product2, qty=1)
        
        self.assertEqual(self.cart.items.count(), 2)


class CartItemModelTest(TestCase):
    """Test CartItem model"""
    
    def setUp(self):
        """Set up test cart and product"""
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
    
    def test_cart_item_creation(self):
        """Test cart item can be created"""
        item = CartItem.objects.create(
            cart=self.cart,
            product=self.product,
            quantity=3
        )
        self.assertEqual(item.quantity, 3)
        self.assertEqual(item.cart, self.cart)
        self.assertEqual(item.product, self.product)
    
    def test_cart_item_unique_together(self):
        """Test cart item cannot have duplicate product"""
        CartItem.objects.create(
            cart=self.cart,
            product=self.product,
            quantity=2
        )
        
        with self.assertRaises(Exception):  # IntegrityError
            CartItem.objects.create(
                cart=self.cart,
                product=self.product,
                quantity=3
            )
    
    def test_cart_item_clean_invalid_quantity(self):
        """Test clean validation rejects zero or negative quantity"""
        item = CartItem(
            cart=self.cart,
            product=self.product,
            quantity=0
        )
        
        with self.assertRaises(ValidationError):
            item.clean()
    
    def test_cart_item_clean_negative_quantity(self):
        """Test clean validation rejects negative quantity"""
        item = CartItem(
            cart=self.cart,
            product=self.product,
            quantity=-1
        )
        
        with self.assertRaises(ValidationError):
            item.clean()
    
    def test_cart_item_clean_valid_quantity(self):
        """Test clean validation accepts positive quantity"""
        item = CartItem(
            cart=self.cart,
            product=self.product,
            quantity=5
        )
        
        # Should not raise
        try:
            item.clean()
        except ValidationError:
            self.fail("clean() raised ValidationError for valid quantity")
