from django.urls import path

from OnlineShop.orders.views import CreateOrderView

urlpatterns = (
    path('create/', CreateOrderView.as_view()),
)