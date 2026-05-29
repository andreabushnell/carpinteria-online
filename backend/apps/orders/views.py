from rest_framework import viewsets, status, serializers
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction
from decimal import Decimal
from apps.cart.models import Cart
from .models import Order, OrderDetail
from .serializers import OrderSerializer
from core import exceptions
from rest_framework.authentication import TokenAuthentication

class OrderViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return Order.objects.all()
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        with transaction.atomic():
            try:
                cart = Cart.objects.get(user=self.request.user)
                cart_items = list(cart.items.all()) 
            except Cart.DoesNotExist:
                raise serializers.ValidationError({"error": "No se encontró el carrito."})
            if not cart_items:
                raise serializers.ValidationError({"error": "El carrito está vacío."})
            running_total = Decimal('0.00')
            for item in cart_items:
                raw_price = getattr(item.product, 'price', None) or getattr(item.product, 'precio', 0)
                running_total += Decimal(str(raw_price)) * item.quantity
            iva_multiplier = Decimal('0.21')
            total_iva = running_total * iva_multiplier
            final_total = running_total + total_iva
            order = serializer.save(
                user=self.request.user, 
                state='pending', 
                total=final_total
            )
            for item in cart_items:
                raw_price = getattr(item.product, 'price', None) or getattr(item.product, 'precio', 0)
                OrderDetail.objects.create(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                    unitary_price=Decimal(str(raw_price))
                )
            cart.items.all().delete()

    @action(detail=True, methods=['post'], url_path='update-status')
    def update_status(self, request, pk=None):
        order = self.get_object()
        new_state = request.data.get('state')

        if not new_state:
            return Response(
                {"error": "The 'state' field is required."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            order.transition_to(new_state)
            
            serializer = self.get_serializer(order)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except exceptions.InvalidTransition as e:
            return Response(
                {
                    "error": "Invalid state transition",
                    "from_state": e.from_state,
                    "to_state": e.to_state,
                    "reason": getattr(e, 'reason', str(e))
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )