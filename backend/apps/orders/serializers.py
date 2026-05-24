from rest_framework import serializers
from .models import Order, OrderDetail

class OrderDetailSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()
    product_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = OrderDetail
        fields = ['id', 'product', 'product_id', 'quantity', 'unitary_price']

    def get_product(self, obj):
        from apps.products.serializers import ProductSerializer
        return ProductSerializer(obj.product, context=self.context).data

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError('Quantity must be at least 1')
        return value
    

class OrderSerializer(serializers.ModelSerializer):
    items = OrderDetailSerializer(many=True, source='details', read_only=True)
    
    class Meta:
        model = Order
        fields = ['id', 'user', 'date', 'state', 'total', 'items']
        read_only_fields = ['user', 'date', 'state', 'total']