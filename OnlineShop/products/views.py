import os
import uuid
from _ast import Delete

from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics as generics_views
from OnlineShop.core.base64_to_img import upload_photo
from OnlineShop.integrations.s3 import s3

from OnlineShop.products.models import Product, Category
from OnlineShop.products.serializers import ListProductsSerializer, AddProductSerializer, RetrieveProductSerializer, \
    UpdateDeleteProductSerializer, CreateUpdateCategorySerializer
from OnlineShop.settings import STATICFILES_DIRS


class ListCreateProductsView(generics_views.ListCreateAPIView):
    queryset = Product.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ListProductsSerializer
        return AddProductSerializer

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


class RetrieveProductView(generics_views.RetrieveUpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = RetrieveProductSerializer


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

