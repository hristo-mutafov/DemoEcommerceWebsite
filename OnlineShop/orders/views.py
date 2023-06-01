import stripe
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics as generics_views
from rest_framework import views
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from OnlineShop.cart.models import Cart
from OnlineShop.core.view_mixins import GetTheUserFromTokenMixin
from OnlineShop.orders.models import Order
from OnlineShop.orders.serializers import CreateOrderSerializer
from OnlineShop.settings import STRIPE_SECRET_KEY

UserModel = get_user_model()


class CreateOrderView(GetTheUserFromTokenMixin, generics_views.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = CreateOrderSerializer
    permission_classes = (IsAuthenticated, )

    def perform_create(self, serializer):
        instance = serializer.save()
        user_id = GetTheUserFromTokenMixin.get_user_id(self.request)
        cart = Cart.objects.prefetch_related('products').filter(user=user_id).get()
        try:
            products = Cart.objects.prefetch_related('products').filter(user=user_id).get().cartproducts_set.all()
        except ObjectDoesNotExist:
            raise NotFound(detail='No such user')

        total_price = 0

        for item in products:
            instance.products.add(item.product, through_defaults={'count': item.count})
            total_price += int(item.count) * float(item.product.price)
            cart.products.remove(item.product)
            item.product.quantity -= item.count
            item.product.save()

        instance.price = total_price
        instance.save()


class ProceedPayment(GetTheUserFromTokenMixin, views.APIView):
    permission_classes = (IsAuthenticated, )
    
    def post(self, request):
        user_id = GetTheUserFromTokenMixin.get_user_id(request)
        products = Cart.objects.prefetch_related('products').filter(user=user_id).get().cartproducts_set.all()
        amount = sum(int(item.count) * float(item.product.price) for item in products)
        stripe.api_key = STRIPE_SECRET_KEY
        payment = stripe.PaymentIntent.create(
            amount=int(amount * 10),
            currency='bgn',
            payment_method_types=('card',),
        )
        client_secret = payment.client_secret
        return Response({'client_secret': client_secret})
