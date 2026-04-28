from core import exceptions


class InventoryService:

    @staticmethod
    def check_stock(product, qty):
        # Check there is enough stock 
        if product.stock < qty:
            raise exceptions.InsufficientStock(product.name, product.stock)

    @staticmethod
    def decrease_stock(product, qty):
        # If there is enough stock, decreases in given amount
        InventoryService.check_stock(product, qty)
        product.reduce_stock(qty)

    @staticmethod
    def increase_stock(product, qty):
        # Increases stock by calling model method
        product.increase_stock(qty)

        