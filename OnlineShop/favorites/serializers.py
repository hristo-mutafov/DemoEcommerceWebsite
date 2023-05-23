from rest_framework import serializers

from OnlineShop.favorites.models import Favorites
from django.shortcuts import get_object_or_404

from OnlineShop.products.models import Product
from OnlineShop.products.serializers import ListProductsSerializer


class AddToFavoritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorites
        fields = '__all__'

    def update(self, instance, validated_data):
        product_id = self.context['request'].parser_context['kwargs']['product_id']
        product = get_object_or_404(Product, pk=product_id)
        instance.products.add(product)
        return instance

    def to_representation(self, instance):
        return {'message': 'Product Added'}


class RemoveFromFavoritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorites
        fields = '__all__'

    def update(self, instance, validated_data):
        product_id = self.context['request'].parser_context['kwargs']['product_id']
        product = get_object_or_404(Product, pk=product_id)
        if product in instance.products.all():
            instance.products.remove(product)
        return instance

    def to_representation(self, instance):
        return {'massage': 'Product Removed'}


class ListFavoriteProductsSerializer(serializers.ModelSerializer):
    products = ListProductsSerializer(many=True)

    class Meta:
        model = Favorites
        fields = ('products', )


