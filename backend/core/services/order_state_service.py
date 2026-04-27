class OrderStateService:

    @staticmethod
    def pay(order):
        order.transition_to('paid')

    @staticmethod
    def ship(order):
        order.transition_to('shipped')

    @staticmethod
    def cancel(order):
        order.transition_to('cancelled')