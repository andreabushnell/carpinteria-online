from rest_framework import serializers
from .models import Cart, CartItem
from apps.products.serializers import ProductSerializer

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id', 'cart', 'product', 'quantity']
        read_only_fields = ['cart']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        prod_data = ProductSerializer(instance.product).data if instance.product else {}
        
        representation['product'] = {
            'id': prod_data.get('id'),
            'name': prod_data.get('name') or prod_data.get('nombre') or "Pieza sin nombre",
            'image': prod_data.get('image') or prod_data.get('imagen') or None,
            'price': float(prod_data.get('price') or prod_data.get('precio') or 0.0)
        }
        representation['quantity'] = int(representation.get('quantity', 1))
        return representation

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items']