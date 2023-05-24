import os
import uuid
from _ast import Delete

from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics as generics_views
from OnlineShop.core.base64_to_img import upload_photo
from OnlineShop.core.view_mixins import GetTheUserFromTokenMixin
from OnlineShop.favorites.models import Favorites
from OnlineShop.integrations.s3 import s3
from django.shortcuts import get_object_or_404

from OnlineShop.products.models import Product, Category
from OnlineShop.products.serializers import ListProductsSerializer, AddProductSerializer, RetrieveProductSerializer, \
    UpdateDeleteProductSerializer, CreateUpdateCategorySerializer
from OnlineShop.settings import STATICFILES_DIRS


class ListCreateProductsView(GetTheUserFromTokenMixin, generics_views.ListCreateAPIView):
    queryset = Product.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ListProductsSerializer
        return AddProductSerializer

    def list(self, request, *args, **kwargs):
        token = request.headers.get('authorization', None)
        queryset = self.queryset.all()
        if token:
            user_id = GetTheUserFromTokenMixin.get_user_id(request)
            for product in queryset:
                user_favorite_list = get_object_or_404(Favorites, user=user_id)
                if product in user_favorite_list.products.all():
                    product.in_favorites = True
                else:
                    product.in_favorites = False
                product.save()
            query_favorites_only = request.GET.get('favorites', None)
            if query_favorites_only:
                queryset = [x for x in queryset if x.in_favorites]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):

        photo_name = f'{uuid.uuid4()}.{request.data.get("extension")}'
        path = os.path.join(STATICFILES_DIRS[0], photo_name)
        upload_photo(request.data.get('image'), path)
        image_url = s3.upload(path, photo_name)
        request.data['image'] = image_url
        os.remove(path)
        del request.data['extension']

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'massage': 'Product is added successfully!'}, 201)
        return Response({'message': 'Bad Request', 'details': serializer.errors}, 400)


class RetrieveProductView(GetTheUserFromTokenMixin, generics_views.RetrieveUpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = RetrieveProductSerializer

    def retrieve(self, request, *args, **kwargs):
        token = request.headers.get('authorization', None)
        queryset = self.queryset.all()
        product_pk = kwargs['pk']
        product = queryset.filter(id=product_pk).get()
        if token:
            user_id = GetTheUserFromTokenMixin.get_user_id(request)
            user_favorite_list = get_object_or_404(Favorites, user=user_id)
            if product in user_favorite_list.products.all():
                product.in_favorites = True
            else:
                product.in_favorites = False
            product.save()

        serializer = self.get_serializer(product)
        return Response(serializer.data)


class UpdateDeleteProductsView(generics_views.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    http_method_names = ['patch', 'delete']
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_serializer_class(self):
        if self.request.method == 'PATCH':
            return UpdateDeleteProductSerializer


class CreateCategoryView(generics_views.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CreateUpdateCategorySerializer
    permission_classes = [IsAuthenticated, IsAdminUser]


class UpdateDeleteCategoryView(generics_views.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CreateUpdateCategorySerializer
    http_method_names = ['patch', 'delete']
    permission_classes = [IsAuthenticated, IsAdminUser]

