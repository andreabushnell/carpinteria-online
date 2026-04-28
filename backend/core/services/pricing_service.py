from decimal import Decimal


class PricingService:

    @staticmethod
    def calculate_order_total(order):
        # Explicitly calculates order total but does not update
        total = Decimal("0.00")
        for item in order.details.all():
            total += item.quantity * item.unitary_price
        return total

    @staticmethod
    def calculate_item_total(item):
        # Calculates the price of a specific item according to units
        return item.quantity * item.unitary_price