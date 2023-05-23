from django.urls import path

from OnlineShop.favorites.views import AddToFavoritesView, RemoveFromFavoritesView, ListFavoriteProductsView

urlpatterns = (
    path('add/<int:product_id>/', AddToFavoritesView.as_view()),
    path('remove/<int:product_id>/', RemoveFromFavoritesView.as_view()),
    path('', ListFavoriteProductsView.as_view())
)
