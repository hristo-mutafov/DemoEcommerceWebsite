from rest_framework import generics as generics_views
from rest_framework.permissions import IsAuthenticated

from OnlineShop.core.view_mixins import GetTheUserFromTokenMixin
from OnlineShop.favorites.models import Favorites
from OnlineShop.favorites.serializers import AddToFavoritesSerializer, RemoveFromFavoritesSerializer, \
    ListFavoriteProductsSerializer


class AddToFavoritesView(GetTheUserFromTokenMixin, generics_views.UpdateAPIView):
    queryset = Favorites.objects.prefetch_related('products').all()
    serializer_class = AddToFavoritesSerializer
    permission_classes = (IsAuthenticated, )
    filter_param = 'user'


class RemoveFromFavoritesView(GetTheUserFromTokenMixin, generics_views.UpdateAPIView):
    queryset = Favorites.objects.prefetch_related('products').all()
    serializer_class = RemoveFromFavoritesSerializer
    permission_classes = (IsAuthenticated, )
    filter_param = 'user'


class ListFavoriteProductsView(GetTheUserFromTokenMixin, generics_views.ListCreateAPIView):
    queryset = Favorites.objects.prefetch_related('products').all()
    serializer_class = ListFavoriteProductsSerializer
    permission_classes = (IsAuthenticated, )
    filter_param = 'user'
