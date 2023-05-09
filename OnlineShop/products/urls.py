from django.urls import path

from OnlineShop.products.views import AddProductView, ListProductsView


urlpatterns = (
    path('products/', ListProductsView.as_view()),
    path('products/add/', AddProductView.as_view())
)