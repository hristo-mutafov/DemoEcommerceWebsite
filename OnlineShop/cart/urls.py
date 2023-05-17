from django.urls import path

from OnlineShop.cart.views import AddToCartView, RemoveFromCartView, ListCartProductsView, DeleteProductFromCartView

urlpatterns = (
    path('add/<int:product_pk>/', AddToCartView.as_view()),
    path('substract/<int:product_pk>/', RemoveFromCartView.as_view()),
    path('products/', ListCartProductsView.as_view()),
    path('remove/<int:product_pk>/', DeleteProductFromCartView.as_view())
)
