from django.shortcuts import get_object_or_404

from rest_framework import serializers

from OnlineShop.cart.models import Cart, CartProducts
from OnlineShop.products.models import Product
from OnlineShop.products.serializers import RetrieveProductSerializer


class AddToCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('products', )

    def update(self, instance, validated_data):
        product_id = self.context['view'].kwargs.get('product_pk')
        product = get_object_or_404(Product, pk=product_id)
        if product in instance.products.all():
            cart_obj = CartProducts.objects.filter(product=product).get()
            cart_obj.count += 1
            cart_obj.save()
        else:
            instance.products.add(product)
        return instance

    def to_representation(self, instance):
        return {'message': 'Added Successfully'}


class RemoveFromCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('products', )

    def update(self, instance, validated_data):
        product_id = self.context['view'].kwargs.get('product_pk')
        product = get_object_or_404(Product, pk=product_id)
        cart_obj = get_object_or_404(CartProducts, product=product)
        if product in instance.products.all() and cart_obj.count > 1:
            cart_obj.count -= 1
            cart_obj.save()
        else:
            instance.products.remove(product)
        return instance

    def to_representation(self, instance):
        return {'message': 'Removed Successfully'}


class DeleteProductFromCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('products', )

    def update(self, instance, validated_data):
        product_id = self.context['view'].kwargs.get('product_pk')
        product = get_object_or_404(Product, pk=product_id)
        if product in instance.products.all():
            instance.products.remove(product)
        return instance

    def to_representation(self, instance):
        return {'message': 'Removed Successfully'}


class ListCartProductsSerializer(serializers.ModelSerializer):
    product = RetrieveProductSerializer()

    class Meta:
        model = CartProducts
        fields = ('product', 'count')




