from django.urls import path

from OnlineShop.orders.views import CreateOrderView, ProceedPayment, ListShortOrdersView, RetrieveOrderView, \
    RetrieveOrderProducts

urlpatterns = (
    path('create/', CreateOrderView.as_view()),
    path('pay/', ProceedPayment.as_view()),
    path('short_list/', ListShortOrdersView.as_view()),
    path('<str:pk>/', RetrieveOrderView.as_view()),
    path('products/<str:pk>/', RetrieveOrderProducts.as_view())
)
