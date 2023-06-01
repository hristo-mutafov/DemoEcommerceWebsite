from django.urls import path

from OnlineShop.orders.views import CreateOrderView, ProceedPayment

urlpatterns = (
    path('create/', CreateOrderView.as_view()),
    path('pay/', ProceedPayment.as_view())
)