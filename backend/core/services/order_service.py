from django.db import transaction
from apps.orders.models import Order, OrderDetail
from core.services.inventory_service import InventoryService
from core import exceptions


class OrderService:

    @staticmethod
    @transaction.atomic
    def create_order(user): 
        # Creates order 
        return Order.objects.create(
            user=user,
            total=0
        )

    @staticmethod
    @transaction.atomic
    def add_item(order, product, qty):
        # Adds item if stock allows
        InventoryService.check_stock(product, qty)

        OrderDetail.objects.create(
            order=order,
            product=product,
            quantity=qty,
            unitary_price=product.price
        )

    @staticmethod 
    def cancel_order(order):
        # Cancels order if it has not been shipped and adjusts stock
        if order.state == 'shipped':
            raise exceptions.InvalidTransition(
                from_state=order.state,
                to_state='cancelled',
                reason="Shipped orders cannot be cancelled"
            )
        
        if order.state in ['pending', 'paid']:
            for detail in order.details.select_related('product'):
                InventoryService.increase_stock(detail.product, detail.quantity)
        
        order.transition_to('cancelled')