import os
import shutil
import random
from django.conf import settings
import requests
from decimal import Decimal
from faker import Faker
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction
from django.core.files.base import ContentFile

from apps.products.models import Category, Product
from apps.orders.models import Order, OrderDetail
from apps.cart.models import Cart

User = get_user_model()
SEED = 42

fake = Faker('es_ES')
Faker.seed(SEED)

CARPENTRY_CATALOG = {
    "Muebles de Salón": [
        "Mesa de Centro Rústica de Roble", 
        "Aparador Madera de Cerezo", 
        "Estantería Minimalista de Pino Macizo", 
        "Mueble de TV Modular Nogal",
        "Vitrina de Madera Envejecida Artesanal",
        "Sofá con Estructura de Fresno Tallado",
        "Sillón Orejero de Haya Vaporizada",
        "Consola de Recibidor Madera Olmo",
        "Mesa Auxiliar Redonda de Castaño",
        "Librería de Pared Nogal Premium"
    ],
    "Cocina y Comedor": [
        "Tabla de Cortar Reversible de Haya", 
        "Mesa de Comedor Extensible Cedro", 
        "Taburete de Barra de Nogal Premium", 
        "Especiero de Pared Rústico Artesanal",
        "Carrito Auxiliar de Cocina Roble",
        "Juego de Ensaladeras Madera Olivo",
        "Platero de Pared Estilo Rústico",
        "Encimera Maciza de Roble Tratado",
        "Banco de Comedor Madera de Pino",
        "Frutero Esculpido de Madera Olivo"
    ],
    "Dormitorio": [
        "Cabecero de Cama Estilo Rústico", 
        "Mesita de Noche Cajonera Cerezo", 
        "Cómoda Amplia de Pino Radiata", 
        "Baúl de Almacenamiento Abedul",
        "Armario Ropero Tallado a Mano",
        "Estructura de Cama Queen Pino Natural",
        "Tocador con Espejo Madera Cerezo",
        "Chifonier Alto de Fresno Macizo",
        "Perchero Galán de Noche Roble",
        "Banqueta de Pie de Cama Nogal"
    ],
    "Decoración y Exterior": [
        "Espejo Enmarcado con Tronco Olivo", 
        "Perchero de Pared Industrial Pino", 
        "Lámpara de Pie de Madera Flotante", 
        "Portavelas Geométrico de Haya",
        "Banco de Jardín Teca Tratada",
        "Macetero Elevado de Cedro Sostenible",
        "Tumbona Reclinable de Teca Premium",
        "Mesa de Picnic Madera de Alerce",
        "Reloj de Pared Rodaja de Pino",
        "Pared Decorativa de Listones Nogal"
    ],
    "Puertas y Ventanas": [
        "Puerta de Entrada Rústica de Roble",
        "Ventana Oscilobatiente Madera de Castaño",
        "Puerta de Granero Corredera Pino",
        "Contraventana Mallorquina Iroko",
        "Puerta de Paso Presidencial Cedro",
        "Portón de Garaje Madera de Teca",
        "Ventana de Perfil Europeo Abeto",
        "Puerta Cristalera de Haya Vaporizada",
        "Frente de Armario Corredero Fresno",
        "Puerta Acústica de Madera Maciza"
    ],
    "Estructuras y Revestimientos": [
        "Viga Laminada de Abeto Texturizada",
        "Friso Machihembrado de Pino Soria",
        "Pilar Estructural de Roble Viejo",
        "Tarima Flotante de Madera Fresno",
        "Cercha de Tejado Pino Silvestre",
        "Suelo de Deck Exterior Ipe",
        "Marquesina de Entrada Madera Castaño",
        "Panel Arquitectónico 3D de Nogal",
        "Zócalo Moldurado de Haya Maciza",
        "Pasamanos Ergonómico Madera de Cerezo"
    ],
    "Oficina y Estudio": [
        "Escritorio de Despacho Roble Macizo",
        "Silla de Oficina Ergonómica Nogal",
        "Organizador de Sobremesa Madera Olivo",
        "Archivador de Cajones Pino Radiata",
        "Soporte de Monitor Fresno Premium",
        "Mesa de Juntas Madera de Cedro",
        "Librería Modular de Haya Vaporizada",
        "Pizarra con Marco de Madera Rústica",
        "Caja de Almacenamiento Documentos Haya",
        "Portalápices Torneado Madera de Cerezo"
    ],
    "Elementos Auxiliares y Construcción": [
        "Escalera de Caracol Madera Haya",
        "Cava de Vinos Pared de Cedro",
        "Pérgola Autoportante Pino Tratado",
        "Celosía de Lamas Cruzadas Iroko",
        "Plato de Ducha de Teca Náutica",
        "Valla Perimetral Madera de Alerce",
        "Caballete de Trabajo Pino Macizo",
        "Rodapié Biselado Madera de Roble",
        "Tapajuntas Acanalado de Haya",
        "Moldura de Techo Tallada Pino"
    ]
}

def download_carpentry_image(index, category_name):
    keyword_mapping = {
        "Muebles de Salón": "furniture,oak",
        "Cocina y Comedor": "dining,wood",
        "Dormitorio": "bedroom,wood",
        "Decoración y Exterior": "garden,teak",
        "Puertas y Ventanas": "door,window,wood",
        "Estructuras y Revestimientos": "timber,beams",
        "Oficina y Estudio": "desk,office,wood",
        "Elementos Auxiliares y Construcción": "carpentry,lumber"
    }

    search_term = keyword_mapping.get(category_name, "carpentry,wood")

    try:
        img_url = f"https://loremflickr.com/600/400/{search_term}?lock={index}"
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        response = requests.get(img_url, headers=headers, timeout=10)
            
        if response.status_code == 200:
            return ContentFile(response.content, name=f"carpinteria_prod_{index}.jpg")
        else:
            print(f"   ⚠️ API blocked the request. Status Code: {response.status_code}")
            
    except Exception as e:
        print(f"   ⚠️ Network Error for index {index}: {e}")
        
    return None


class Command(BaseCommand):
    help = "Deterministic contextual seed for high-fidelity Carpintería development"

    @transaction.atomic
    def handle(self, *args, **kwargs):

        if User.objects.exists():
            self.stdout.write(self.style.WARNING("Data already exists. Skipping user creation, but applying updates."))
            return

        self.stdout.write("Initializing custom premium seed generation...")

        products_media_path = os.path.join(settings.MEDIA_ROOT, 'products')
        if os.path.exists(products_media_path):
            self.stdout.write("🧹 Sweeping old image files from media directory...")
            shutil.rmtree(products_media_path)

        admin = User.objects.create_user(
            username="admin",
            email="admin@carpinteria.com",
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
                    email=f"cliente{i}@correo.es",
                    password="test1234",
                    role="client",
                )
            )
        self.stdout.write(f"Created {len(users)} localized test users profiles.")

        products = []
        product_counter = 0

        for cat_name, product_names in CARPENTRY_CATALOG.items():
            category = Category.objects.create(name=cat_name)
            
            for item_name in product_names:
                stock_calc = 15 + (product_counter % 12)
                price_calc = Decimal(f"{45 + (product_counter * 22)}.99")
                
                product = Product.objects.create(
                    category=category,
                    name=item_name,
                    description=f"Elegante {item_name.lower()} elaborado de forma 100% artesanal en España. Tratado con aceites naturales ecológicos.",
                    stock=stock_calc,
                    price=price_calc,
                )
                
                image_file = download_carpentry_image(product_counter, cat_name)
                if image_file:
                    product.image.save(image_file.name, image_file, save=True)
                
                products.append(product)
                product_counter += 1

        self.stdout.write(f"Generated {len(products)} premium woodcraft products mapped with images.")

        for user in users:
            Cart.objects.get_or_create(user=user)

        states = ["pending", "paid", "shipped"]

        for i, user in enumerate(users[1:], start=1):
            num_orders = 2  

            for j in range(num_orders):
                order_index = i * 10 + j

                fake_spanish_address = fake.address().replace('\n', ', ')

                order = Order.objects.create(
                    user=user,
                    state=states[order_index % len(states)],
                    total=Decimal("0.00"),
                    shipping_address=fake_spanish_address 
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

                if hasattr(order, 'calculate_total'):
                    order.calculate_total()
                else:
                    order.total = sum(item.unitary_price * item.quantity for item in order.orderdetail_set.all())
                    order.save()

        self.stdout.write(self.style.SUCCESS("Seed completed successfully!"))