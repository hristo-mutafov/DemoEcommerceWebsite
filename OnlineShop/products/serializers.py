from rest_framework import serializers
from OnlineShop.products.models import Product, Category


class ListProductsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ('id', 'image', 'name', 'price', 'added_on')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        try:
            representation['in_favorites'] = instance.in_favorites
        except AttributeError:
            pass
        return representation


class AddProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class RetrieveProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        obj = Category.objects.filter(id=representation['category']).get()
        representation['category'] = obj.name

        try:
            representation['in_favorites'] = instance.in_favorites
        except AttributeError:
            pass
        return representation


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


class RetrieveProductShortInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('image', 'name', 'price')



