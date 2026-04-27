from django.db import models
from django.conf import settings
from backend.apps.products.models import Product
from core import exceptions

User = settings.AUTH_USER_MODEL


class Order(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('shipped', 'Shipped'),
        ('cancelled', 'Cancelled'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    date = models.DateTimeField(auto_now_add=True)
    state = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Order {self.id}"
    
    def calculate_total(self): # Automatically calculates order total
        from decimal import Decimal
        self.total = Decimal('0.00')
        for item in self.details.all():
            self.total += item.quantity * item.unitary_price
        self.save(update_fields=['total'])
    
    def mark_as_paid(self):
        self.state = 'paid'
        self.save(update_fields=['state'])

    def mark_as_shipped(self):
        if self.state != 'paid':
            raise exceptions.PaymentPending()
        else:
            self.state = 'shipped'
            self.save(update_fields=['state'])

    def cancel(self):
        """Cancel order. Inventory restoration is handled by OrderService.cancel_order()."""
        if self.state == 'shipped':
            raise exceptions.InvalidCancellation()
        
        self.state = 'cancelled'
        self.save(update_fields=['state'])


class OrderDetail(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='details')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    unitary_price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        unique_together = ('order', 'product')
    
    def clean(self):
        from django.core.exceptions import ValidationError
        if self.quantity <= 0:
            raise ValidationError('Quantity must be at least 1')
