from rest_framework import generics as generics_views
from rest_framework.permissions import IsAuthenticated
from rest_framework import views

from OnlineShop.cart.models import Cart, CartProducts
from OnlineShop.cart.serializers import AddToCartSerializer, RemoveFromCartSerializer, ListCartProductsSerializer, \
    DeleteProductFromCartSerializer
from OnlineShop.core.view_mixins import GetTheUserFromTokenMixin


class AddToCartView(GetTheUserFromTokenMixin, generics_views.UpdateAPIView):
    queryset = Cart.objects.prefetch_related('products').all()
    serializer_class = AddToCartSerializer
    permission_classes = (IsAuthenticated, )
    filter_param = 'user'


class RemoveFromCartView(GetTheUserFromTokenMixin, generics_views.UpdateAPIView):
    queryset = Cart.objects.prefetch_related('products').all()
    serializer_class = RemoveFromCartSerializer
    permission_classes = (IsAuthenticated,)
    filter_param = 'user'


class DeleteProductFromCartView(GetTheUserFromTokenMixin, generics_views.UpdateAPIView):
    queryset = Cart.objects.prefetch_related('products').all()
    serializer_class = DeleteProductFromCartSerializer
    permission_classes = (IsAuthenticated,)
    filter_param = 'user'


class ListCartProductsView(GetTheUserFromTokenMixin, generics_views.ListCreateAPIView):
    queryset = CartProducts.objects.all()
    serializer_class = ListCartProductsSerializer
    permission_classes = (IsAuthenticated,)
    filter_param = 'cart__user_id'

    def get_queryset(self):
        user_id = self.get_user_id(self.request)
        return super().get_queryset().filter(**{self.filter_param: user_id})