from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Order
from .serializers import OrderSerializer

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return Order.objects.all()
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, state='pending', total=0.00)

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