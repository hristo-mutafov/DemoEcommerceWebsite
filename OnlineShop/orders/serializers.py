from rest_framework import serializers

from OnlineShop.orders.models import Order


class CreateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

    def to_representation(self, instance):
        return {'message': 'Order Created Successfully'}
