from django.db import transaction
from backend.core.services.order_service import OrderService
from backend.core.services.inventory_service import InventoryService
from core import exceptions


class CheckoutService:
    """Orchestrates the checkout workflow.
    
    Hybrid architecture: Delegates mutations to services/models, orchestrates the flow.
    """

    @staticmethod
    @transaction.atomic
    def checkout(user):
        """Execute complete checkout: validate cart, create order, reduce inventory, calculate total."""
        cart = user.cart

        if not cart.items.exists():
            raise exceptions.EmptyCart()

        order = OrderService.create_order(user)

        # Add items to order and reduce inventory
        for item in cart.items.select_related('product'):
            # OrderService.add_item() validates stock
            OrderService.add_item(
                order=order,
                product=item.product,
                qty=item.quantity
            )

            # Decrease stock after order item is created
            InventoryService.decrease_stock(
                item.product,
                item.quantity
            )

        # Use Order model's calculate_total() - single source of truth
        order.calculate_total()

        # Clear cart after successful checkout
        cart.items.all().delete()

        return order