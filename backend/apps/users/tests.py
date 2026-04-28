from django.test import TestCase
from apps.users.models import User


class UserModelTest(TestCase):
    """Test User model"""
    
    def setUp(self):
        """Set up test user"""
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
    
    def test_user_creation(self):
        """Test user can be created"""
        self.assertEqual(self.user.username, 'testuser')
        self.assertEqual(self.user.email, 'test@example.com')
        self.assertTrue(self.user.check_password('testpass123'))
    
    def test_user_default_role(self):
        """Test user defaults to client role"""
        self.assertEqual(self.user.role, 'client')
    
    def test_user_can_be_admin(self):
        """Test user can be set as admin"""
        admin_user = User.objects.create_user(
            username='admin',
            email='admin@example.com',
            password='adminpass123',
            role='admin'
        )
        self.assertEqual(admin_user.role, 'admin')
    
    def test_is_admin_method_true(self):
        """Test is_admin returns True for admin users"""
        admin_user = User.objects.create_user(
            username='admin2',
            email='admin2@example.com',
            password='pass123',
            role='admin'
        )
        self.assertTrue(admin_user.is_admin())
    
    def test_is_admin_method_false(self):
        """Test is_admin returns False for client users"""
        self.assertFalse(self.user.is_admin())
    
    def test_user_created_at_is_set(self):
        """Test created_at timestamp is set"""
        self.assertIsNotNone(self.user.created_at)
    
    def test_user_email_index(self):
        """Test that email field has index"""
        # This is implicitly tested through the model Meta
        self.assertEqual(
            self.user._meta.get_field('email').db_index,
            True
        )
    
    def test_role_choices(self):
        """Test role field has correct choices"""
        role_field = User._meta.get_field('role')
        choices = dict(role_field.choices)
        self.assertIn('admin', choices)
        self.assertIn('client', choices)
