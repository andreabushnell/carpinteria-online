from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    # Translates models to JSON for compatibility with frontend
    class Meta:
        model = Product
        fields = '__all__'