from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('OnlineShop.accounts.urls')),
    path('', include('OnlineShop.products.urls')),
    path('cart/', include('OnlineShop.cart.urls')),
    path('favorites/', include('OnlineShop.favorites.urls')),
    path('orders/', include('OnlineShop.orders.urls'))
]
