from rest_framework import serializers

from OnlineShop.orders.models import Order


class CreateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

    def to_representation(self, instance):
        return {'message': 'Order Created Successfully'}


class ListShortOrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('order_number', 'date', 'price')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['order_number_short'] = data['order_number'].split('-')[0] + '...'
        return data
