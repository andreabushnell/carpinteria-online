from rest_framework.routers import DefaultRouter
from apps.cart.views import CartViewSet, CartItemViewSet
from apps.orders.views import OrderViewSet, OrderDetailViewSet
from apps.products.views import ProductViewSet, CateogoryViewSet
from apps.users.views import UserViewSet

from django.urls import path
from apps.users.views import LoginView, LogoutView, MeView, RegisterView


router = DefaultRouter()
router.register(r'cart', CartViewSet)
router.register(r'cart-items', CartItemViewSet)
router.register(r'order', OrderViewSet)
router.register(r'order-detail', OrderDetailViewSet)
router.register(r'products', ProductViewSet)
router.register(r'categories', CateogoryViewSet)
router.register(r'users', UserViewSet)

urlpatterns = router.urls + [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('me/', MeView.as_view(), name='me'),
]