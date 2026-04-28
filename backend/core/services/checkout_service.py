from django.db import transaction
from core.services.order_service import OrderService
from core.services.inventory_service import InventoryService


class CheckoutService:

    @staticmethod
    @transaction.atomic
    def checkout(user):
        cart = user.cart

        # Checks cart items, throws exception if empty
        cart.is_empty()

        order = OrderService.create_order(user)

        # Adds items to order if there's enough stock and reduces inventory
        for item in cart.items.select_related('product'):
            OrderService.add_item(
                order=order,
                product=item.product,
                qty=item.quantity
            )

            # Decreases stock after order item is created
            InventoryService.decrease_stock(
                item.product,
                item.quantity
            )

        # Calculates and updates order total
        order.calculate_total()

        # Clears cart after checkout
        cart.items.all().delete()

        return order