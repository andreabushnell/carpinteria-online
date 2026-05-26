from rest_framework import serializers
from .models import Product, Category

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        
class CarouselProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'stock', 'image'] 

class DynamicCategoryCarouselSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'products']

    def get_products(self, obj):
        limit = 10 
        products = obj.products.all()[:limit] 
        return CarouselProductSerializer(products, many=True).data