from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer, DynamicCategoryCarouselSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination

class ProductViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    serializer_class = ProductSerializer

    # CORREGIDO: Reemplazamos 'queryset = Product.objects.all()' por este método dinámico
    def get_queryset(self):
        queryset = Product.objects.all()
        
        # 1. Capturamos el parámetro '?category=ID' que envía tu CategoryPage.jsx
        category_id = self.request.query_params.get('category')
        
        # 2. Capturamos el parámetro '?search=texto' que envía tu barra de búsqueda
        search_query = self.request.query_params.get('search')

        # Si viene un ID de categoría en la URL, filtramos los productos de esa categoría
        if category_id:
            queryset = queryset.filter(category_id=category_id)
            
        # Si viene un texto de búsqueda, filtramos por nombre (sin importar mayúsculas/minúsculas)
        if search_query:
            queryset = queryset.filter(name__icontains=search_query)

        return queryset

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
    
    
class HomepagePagination(PageNumberPagination):
    page_size = 4 
    page_size_query_param = 'page_size'


class DynamicHomepageView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        categories = Category.objects.prefetch_related('products').all().order_by('id')
        
        paginator = HomepagePagination()
        paginated_categories = paginator.paginate_queryset(categories, request, view=self)
        
        serializer = DynamicCategoryCarouselSerializer(paginated_categories, many=True)
        return paginator.get_paginated_response(serializer.data)