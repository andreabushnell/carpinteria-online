from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.contrib.auth import get_user_model

from apps.orders.models import Order, OrderDetail
from apps.cart.models import Cart
from apps.products.models import Product, Category

User = get_user_model()


class Command(BaseCommand):
    help = "Resets database and re-runs seed"

    def handle(self, *args, **kwargs):
        self.stdout.write("Resetting database...")

        # DELETE IN CORRECT ORDER
        OrderDetail.objects.all().delete()
        Order.objects.all().delete()
        Cart.objects.all().delete()
        Product.objects.all().delete()
        Category.objects.all().delete()
        User.objects.all().delete()

        self.stdout.write("Database cleared.")

        # RESEED

        call_command("seed")

        self.stdout.write(self.style.SUCCESS("Reseed completed"))