from rest_framework.routers import DefaultRouter
from apps.cart.views import CartViewSet, CartItemViewSet
from apps.orders.views import OrderViewSet, OrderDetailViewSet
from apps.products.views import ProductViewSet, CateogoryViewSet
from apps.users.views import UserViewSet

router = DefaultRouter()
router.register(r'cart', CartViewSet)
router.register(r'cart-items', CartItemViewSet)
router.register(r'order', OrderViewSet)
router.register(r'order-detail', OrderDetailViewSet)
router.register(r'products', ProductViewSet)
router.register(r'categories', CateogoryViewSet)
router.register(r'users', UserViewSet)

urlpatterns = router.urls