from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from rest_framework.authentication import TokenAuthentication

class ProductViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @action(detail=True, methods=['get'])
    def stock(self, request, pk=None):
        product = self.get_object()

        return Response(product.stock, status=status.HTTP_200_OK)
            
class CategoryViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAdminUser()]
    