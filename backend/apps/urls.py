from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.cart.views import CartViewSet, CartItemViewSet
from apps.orders.views import OrderViewSet
from apps.products.views import ProductViewSet, CategoryViewSet, DynamicHomepageView
from apps.users.views import UserViewSet, LoginView, RegisterView, LogoutView

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'cart-items', CartItemViewSet, basename='cart-item')
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [
    path('', include(router.urls)),

    path('auth/login/', LoginView.as_view(), name='auth-login'),
    path('auth/register/', RegisterView.as_view(), name='auth-register'),
    path('auth/logout/', LogoutView.as_view(), name='auth-logout'),
    path('homepage/', DynamicHomepageView.as_view(), name='homepage'),
<<<<<<< Updated upstream
]
=======
    path('orders/<int:pk>/update-status/', OrderViewSet.as_view({'post': 'update_status'}), name='order-update-status'),
]
>>>>>>> Stashed changes
