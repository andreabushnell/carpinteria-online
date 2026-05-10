from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction
from decimal import Decimal
from faker import Faker

from apps.products.models import Category, Product
from apps.orders.models import Order, OrderDetail
from apps.cart.models import Cart

# This creates the same seed every time, apt for testing/debugging

User = get_user_model()

SEED = 42

fake = Faker()
Faker.seed(SEED)


class Command(BaseCommand):
    help = "Deterministic seed for database"

    @transaction.atomic
    def handle(self, *args, **kwargs):

        # CLEAN SAFE STATE CHECK - Useful if the seed is not reset on application abort
        if User.objects.exists():
            self.stdout.write("Data already exists. Aborting seed.")
            return

        # USERS 
        admin = User.objects.create_user(
            username="admin",
            email="admin@test.com",
            password="admin123",
            role="admin",
            is_staff=True,
            is_superuser=True,
        )

        users = [admin]

        for i in range(8):
            users.append(
                User.objects.create_user(
                    username=f"user{i}",
                    email=f"user{i}@test.com",
                    password="test1234",
                    role="client",
                )
            )

        # CATEGORIES 
        category_names = ["Electronics", "Books", "Clothing", "Home", "Sports"]

        categories = [
            Category.objects.create(name=name)
            for name in category_names
        ]

        # PRODUCTS 
        products = []

        for i in range(30):
            category = categories[i % len(categories)]

            product = Product.objects.create(
                category=category,
                name=f"Product {i}",
                description=fake.text(max_nb_chars=80),
                stock=20 + (i % 10),
                price=Decimal(f"{10 + (i % 50)}.99"),
            )
            products.append(product)

        # CARTS 
        for user in users:
            Cart.objects.get_or_create(user=user)

        # ORDERS + ORDER DETAIL
        states = ["pending", "paid", "shipped"]

        for i, user in enumerate(users[1:], start=1):

            num_orders = 2  

            for j in range(num_orders):
                order_index = i * 10 + j

                order = Order.objects.create(
                    user=user,
                    state=states[order_index % len(states)],
                    total=Decimal("0.00"),
                )

                start = (order_index * 3) % len(products)
                order_products = [
                    products[(start + k) % len(products)]
                    for k in range(3)
                ]

                for k, product in enumerate(order_products):
                    qty = (k + 1)

                    OrderDetail.objects.create(
                        order=order,
                        product=product,
                        quantity=qty,
                        unitary_price=product.price,
                    )

                order.calculate_total()

        self.stdout.write(self.style.SUCCESS("Seed completed (deterministic)"))