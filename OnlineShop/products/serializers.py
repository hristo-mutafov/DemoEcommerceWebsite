from rest_framework import serializers
from OnlineShop.products.models import Product, Category


class ListProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'image', 'name', 'price')


class AddProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class RetrieveProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        exclude = ('id', )


class UpdateDeleteProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

    def to_representation(self, instance):
        return {'massage': 'Saved Changes'}


class CreateUpdateCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

    def to_representation(self, instance):
        return {'massage': 'Saved Changes'}



