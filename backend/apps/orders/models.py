from django.db import models
from django.conf import settings
from apps.products.models import Product
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
    
    def calculate_total(self): 
        # Calculates order total and updates 
        from decimal import Decimal
        self.total = Decimal('0.00')
        for item in self.details.all():
            self.total += item.quantity * item.unitary_price
        self.save(update_fields=['total'])
    
    def transition_to(self, new_state):
        allowed_transitions = {
            'pending': ['paid', 'cancelled'],
            'paid': ['shipped', 'cancelled'],
            'shipped': [],
            'cancelled': [],
        }

        if new_state not in allowed_transitions[self.state]:

            reason = self._get_transition_error(new_state)

            raise exceptions.InvalidTransition(
                from_state=self.state,
                to_state=new_state,
                reason=reason
            )
        
        self.state = new_state
        self.save(update_fields=['state'])

    def _get_transition_error(self, new_state):
        # Returns the reason for a transition error
        if self.state == 'pending' and new_state == 'shipped':
            return "Order must be paid before shipping"

        if self.state == 'shipped' and new_state == 'cancelled':
            return "Shipped orders cannot be cancelled"

        if self.state == 'cancelled':
            return "Cancelled orders cannot transition to any other state"

        return "Transition not allowed"


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
