from core import exceptions


class InventoryService:
    """Inventory validation and orchestration.
    
    Delegates actual stock mutations to Product model.
    Validates preconditions before calling model methods.
    """

    @staticmethod
    def check_stock(product, qty):
        """Validate product has sufficient stock."""
        if product.stock < qty:
            raise exceptions.InsufficientStock(product.name, product.stock)

    @staticmethod
    def decrease_stock(product, qty):
        """Decrease product stock. Validates before delegating to model."""
        # Validation happens here; Product.reduce_stock() is the single source of truth
        InventoryService.check_stock(product, qty)
        product.reduce_stock(qty)

    @staticmethod
    def increase_stock(product, qty):
        """Increase product stock via model method."""
        product.increase_stock(qty)

        