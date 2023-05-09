import os
import uuid

from rest_framework.response import Response
from rest_framework import generics as generics_views
from rest_framework import views as base_view
from OnlineShop.core.base64_to_img import upload_photo
from OnlineShop.integrations.s3 import s3

from OnlineShop.products.models import Product
from OnlineShop.products.serializers import ListProductsSerializer, AddProductSerializer
from OnlineShop.settings import STATICFILES_DIRS


class ListProductsView(generics_views.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ListProductsSerializer


class AddProductView(base_view.APIView):

    @staticmethod
    def post(request):
        photo_name = f'{uuid.uuid4()}.{request.data.get("extension")}'
        path = os.path.join(STATICFILES_DIRS[0], photo_name)
        upload_photo(request.data.get('image'), path)
        image_url = s3.upload(path, photo_name)
        request.data['image'] = image_url
        os.remove(path)
        del request.data['extension']
        serializer = AddProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'massage': 'Product is added successfully!'}, 201)
        return Response({'message': 'Bad Request', 'details': serializer.errors}, 400)
