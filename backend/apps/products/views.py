from rest_framework.viewsets import ModelViewSet
from apps.products.models import Product
from .serializers import ProductSerializer
from core.services.product_service import ProductService

class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        ProductService.create_product(serializer.validated_data)
        serializer.save()