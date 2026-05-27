from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from rest_framework.authentication import TokenAuthentication

class CartViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Cart.objects.all()
        return Cart.objects.filter(user=self.request.user)

class CartItemViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return CartItem.objects.all()
        return CartItem.objects.filter(cart__user=self.request.user)
    
    def perform_create(self, serializer):
        user_cart, _ = Cart.objects.get_or_create(user=self.request.user)
        serializer.save(cart=user_cart)