from django.urls import path

from OnlineShop.products.views import RetrieveProductView, UpdateDeleteProductsView, ListCreateProductsView, \
    CreateCategoryView, UpdateDeleteCategoryView

urlpatterns = (
    path('products/', ListCreateProductsView.as_view()),
    path('get/product/<int:pk>/', RetrieveProductView.as_view()),
    path('product/<int:pk>/', UpdateDeleteProductsView.as_view()),
    path('add/category/', CreateCategoryView.as_view()),
    path('category/<int:pk>/', UpdateDeleteCategoryView.as_view())
)
