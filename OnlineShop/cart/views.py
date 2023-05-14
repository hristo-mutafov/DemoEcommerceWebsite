from rest_framework import generics as generics_views
from rest_framework.permissions import IsAuthenticated

from OnlineShop.cart.models import Cart
from OnlineShop.cart.serializers import AddToCartSerializer, RemoveFromCartSerializer
from OnlineShop.core.view_mixins import GetTheUserFromTokenMixin


class AddToCartView(GetTheUserFromTokenMixin, generics_views.UpdateAPIView):
    queryset = Cart.objects.prefetch_related('products')
    serializer_class = AddToCartSerializer
    permission_classes = (IsAuthenticated, )
    filter_param = 'user'


class RemoveFromCartView(GetTheUserFromTokenMixin, generics_views.UpdateAPIView):
    queryset = Cart.objects.all()
    serializer_class = RemoveFromCartSerializer
    permission_classes = (IsAuthenticated,)
    filter_param = 'user'


'''
remove the user id-s from the urls
second id in url for the product, not in the data
think about how the app will use the data and what will need
'''

