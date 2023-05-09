from rest_framework import serializers

from OnlineShop.products.models import Product


class ListProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'image', 'name', 'price')


class AddProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
