''' Base class for custom exceptions (helps to track exception origin) '''
class DomainError(Exception):
    pass

''' Cart-related exceptions '''
class CartError(DomainError):
    pass

class ProductNotInCart(CartError):
    code = 'product_not_in_cart'

    def __init__(self, product_id):
        super().__init__(f"Product with id {product_id} not in cart.")

class CartInvalidQuantity(CartError):
    code = 'invalid_quantity'

    def __init__(self, quantity):
        super().__init__(f"Invalid quantity: {quantity}.")

''' Product-related exceptions '''
class ProductError(DomainError):
    pass

class InsufficientStock(ProductError):
    code = 'insufficient_stock'

    def __init__(self, product_name, stock):
        super().__init__(f"Insufficient stock for {product_name}. Available: {stock}.")

''' Order-related exceptions '''
class OrderError(DomainError):
    pass

class EmptyCart(OrderError):
    code = 'empty_cart'

    def __init__(self):
        super().__init__(f"Cannot place order from empty cart.")

class InvalidOrderState(OrderError):
    code = 'invalid_order_state'

    def __init__(self, state):
        super().__init__(f"Invalid order state: {state}.")

class InvalidCancellation(OrderError):
    code = 'invalid_cancellation'

    def __init__(self):
        super().__init__(f"Invalid cancellation. Order already shipped.")

class PaymentPending(OrderError):
    code = 'payment_pending'

    def __init__(self):
        super().__init__(f"Payment pending. Order cannot be shipped.")

class OrderInvalidQuantity(CartError):
    code = 'invalid_quantity'

    def __init__(self, quantity):
        super().__init__(f"Invalid quantity: {quantity}.")