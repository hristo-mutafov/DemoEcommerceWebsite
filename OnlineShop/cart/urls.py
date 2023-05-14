from django.urls import path

from OnlineShop.cart.views import AddToCartView, RemoveFromCartView

urlpatterns = (
    path('add/<int:product_pk>/', AddToCartView.as_view()),
    path('remove/<int:product_pk>/', RemoveFromCartView.as_view()),
)
