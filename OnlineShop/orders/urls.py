from django.urls import path

from OnlineShop.orders.views import CreateOrderView, ProceedPayment, RetrieveShortOrdersView

urlpatterns = (
    path('create/', CreateOrderView.as_view()),
    path('pay/', ProceedPayment.as_view()),
    path('short_list/', RetrieveShortOrdersView.as_view())
)
