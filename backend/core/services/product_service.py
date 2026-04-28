from apps.products.models import Product

class ProductService:
    @staticmethod
    def create_product(data):
        return Product.objects.create(**data)