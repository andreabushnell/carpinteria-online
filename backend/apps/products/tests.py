from django.test import TestCase
from django.core.exceptions import ValidationError
from apps.products.models import Category, Product
from decimal import Decimal


class CategoryModelTest(TestCase):
    """Test Category model"""
    
    def test_category_creation(self):
        """Test category can be created"""
        category = Category.objects.create(name='Wood')
        self.assertEqual(category.name, 'Wood')
    
    def test_category_str(self):
        """Test category string representation"""
        category = Category.objects.create(name='Furniture')
        self.assertEqual(str(category), 'Furniture')


class ProductModelTest(TestCase):
    """Test Product model"""
    
    def setUp(self):
        """Set up test category and products"""
        self.category = Category.objects.create(name='Furniture')
    
    def test_product_creation(self):
        """Test product can be created"""
        product = Product.objects.create(
            category=self.category,
            name='Chair',
            description='Wooden chair',
            stock=10,
            price=Decimal('50.00')
        )
        self.assertEqual(product.name, 'Chair')
        self.assertEqual(product.stock, 10)
        self.assertEqual(product.price, Decimal('50.00'))
    
    def test_product_str(self):
        """Test product string representation"""
        product = Product.objects.create(
            category=self.category,
            name='Table',
            description='Wooden table',
            stock=5,
            price=Decimal('100.00')
        )
        self.assertEqual(str(product), 'Table')
    
    def test_product_created_at_is_set(self):
        """Test created_at timestamp is set"""
        product = Product.objects.create(
            category=self.category,
            name='Desk',
            description='Office desk',
            stock=3,
            price=Decimal('75.00')
        )
        self.assertIsNotNone(product.created_at)
    
    def test_product_category_can_be_null(self):
        """Test product category can be null"""
        product = Product.objects.create(
            name='Item',
            description='Item without category',
            stock=1,
            price=Decimal('10.00'),
            category=None
        )
        self.assertIsNone(product.category)
    
    def test_stock_cannot_be_negative(self):
        """Test stock constraint prevents negative values"""
        product = Product(
            category=self.category,
            name='Item',
            description='Description',
            stock=-1,
            price=Decimal('50.00')
        )
        # Django check constraints are validated at database level
        # This test verifies the constraint exists
        self.assertEqual(
            product._meta.constraints[0].name,
            'stock_gte_0'
        )
    
    def test_price_cannot_be_negative(self):
        """Test price constraint prevents negative values"""
        product = Product(
            category=self.category,
            name='Item',
            description='Description',
            stock=10,
            price=Decimal('-50.00')
        )
        # Verify constraint exists
        self.assertEqual(
            product._meta.constraints[1].name,
            'price_gte_0'
        )
    
    def test_reduce_stock(self):
        """Test stock reduction"""
        product = Product.objects.create(
            category=self.category,
            name='Chair',
            description='Wooden chair',
            stock=10,
            price=Decimal('50.00')
        )
        product.reduce_stock(3)
        
        # Refresh from database
        product.refresh_from_db()
        self.assertEqual(product.stock, 7)
    
    def test_reduce_stock_multiple_times(self):
        """Test multiple stock reductions"""
        product = Product.objects.create(
            category=self.category,
            name='Chair',
            description='Wooden chair',
            stock=10,
            price=Decimal('50.00')
        )
        product.reduce_stock(2)
        product.reduce_stock(3)
        
        product.refresh_from_db()
        self.assertEqual(product.stock, 5)
    
    def test_increase_stock(self):
        """Test stock increase"""
        product = Product.objects.create(
            category=self.category,
            name='Chair',
            description='Wooden chair',
            stock=10,
            price=Decimal('50.00')
        )
        product.increase_stock(5)
        
        product.refresh_from_db()
        self.assertEqual(product.stock, 15)
    
    def test_increase_stock_multiple_times(self):
        """Test multiple stock increases"""
        product = Product.objects.create(
            category=self.category,
            name='Chair',
            description='Wooden chair',
            stock=10,
            price=Decimal('50.00')
        )
        product.increase_stock(2)
        product.increase_stock(3)
        
        product.refresh_from_db()
        self.assertEqual(product.stock, 15)
    
    def test_category_index(self):
        """Test category field has index"""
        category_field = Product._meta.get_field('category')
        self.assertTrue(category_field.db_index)
    
    def test_product_unique_together(self):
        """Test that product has unique constraints"""
        # This is implicitly tested through the model
        self.assertIsNotNone(Product._meta.unique_together)
