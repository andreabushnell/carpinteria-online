from decimal import Decimal


class PricingService:
    """Pricing calculations. Utility service (no side effects)."""

    @staticmethod
    def calculate_order_total(order):
        """Calculate order total from order details.
        
        Note: Use Order.calculate_total() for authoritative total with persistence.
        This method is for calculation-only purposes.
        """
        total = Decimal("0.00")
        for item in order.details.all():
            total += item.quantity * item.unitary_price
        return total

    @staticmethod
    def calculate_item_total(item):
        """Calculate single order detail total."""
        return item.quantity * item.unitary_price