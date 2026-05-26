from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    
class Product(models.Model):
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        related_name='products',
        db_index=True
    )
    name = models.CharField(max_length=50)
    description = models.TextField()
    stock = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True) # Stores timestamp on creation 
    image = models.ImageField(upload_to='products/', null=True, blank=True)

    class Meta:
        constraints = [
            models.CheckConstraint(condition=models.Q(stock__gte=0), name='stock_gte_0'), # Stock must be greater than or equal to 0
            models.CheckConstraint(condition=models.Q(price__gte=0), name='price_gte_0'), # Price must be greater than or equal to 0
        ]

    def __str__(self):
        return self.name
    
    def reduce_stock(self, qty):
        """Reduce stock. Validation must be done before calling (e.g., via InventoryService)."""
        self.stock -= qty
        self.save(update_fields=['stock'])
    
    def increase_stock(self, qty):
        self.stock += qty
        self.save(update_fields=['stock'])