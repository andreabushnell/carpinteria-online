from django.db import models
from django.conf import settings
from apps.products.models import Product
from core import exceptions

User = settings.AUTH_USER_MODEL


class Cart(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='cart'
    )

    class Meta:
        indexes = [
            models.Index(fields=['user']),
        ]

    def is_empty(self):
        if not self.items.exists():
            raise exceptions.EmptyCart()

    def add_item(self, product, qty=1):
        item, created = self.items.get_or_create( # get_or_create will create items if they do not exist
            product=product,
            defaults={'quantity': qty} # Sets the default quantity for newly created items
        )

        if not created: # Not created means that the item is already in the cart
            item.quantity += qty
            item.save(update_fields=['quantity'])

    def remove_item(self, product): # Removes item from cart completely
        self.items.filter(product=product).delete()

    def decrease_unit(self, product, amount=1): # Reduce quantity for a cart item 
        try:
            item = self.items.get(product=product)
        except CartItem.DoesNotExist:
            raise exceptions.ProductNotInCart(product.id)

        if amount > item.quantity:
            raise exceptions.CartInvalidQuantity(amount)
    
        item.quantity -= amount
        
        if item.quantity <= 0:
            item.delete()
        else:
            item.save(update_fields=['quantity'])


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    class Meta:
        unique_together = ('cart', 'product')
    
    def clean(self):
        from django.core.exceptions import ValidationError
        if self.quantity <= 0:
            raise ValidationError('Quantity must be at least 1')