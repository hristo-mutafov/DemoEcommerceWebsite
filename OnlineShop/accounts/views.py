from _ast import Delete

from django.contrib.auth import get_user_model
from django.http import Http404
from rest_framework import generics as generic_views
from rest_framework import views
from rest_framework.decorators import permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

from OnlineShop.accounts.models import UserProfile
from OnlineShop.accounts.serializers import RegisterSerializer, RetrieveUserSerializer, EditUserSerializer, \
    DeleteUserSerializer

UserModel = get_user_model()


class RegisterView(generic_views.CreateAPIView):
    queryset = UserModel
    serializer_class = RegisterSerializer


class LoginView(views.APIView):
    @staticmethod
    def post(request):
        try:
            user = get_object_or_404(UserModel.objects.all(), email=request.data.get('email'))
            if user.check_password(request.data.get('password')):
                refresh_token = RefreshToken.for_user(user)
                access_token = AccessToken.for_user(user)
                return Response({
                    'refresh_token': str(refresh_token),
                    'access_token': str(access_token)
                })
            else:
                raise Http404
        except Http404:
            return Response({'message': 'User not found'}, status=404)


class RetrieveUpdateDeleteUserView(generic_views.RetrieveUpdateDestroyAPIView):
    # TODO Can be used for editing location
    permission_classes = (IsAuthenticated, )

    get_method_queryset = UserModel.objects.all()
    patch_method_queryset = UserProfile.objects.all()

    retrieve_serializer_class = RetrieveUserSerializer
    edit_serializer_class = EditUserSerializer
    delete_serializer_class = DeleteUserSerializer

    def get_queryset(self):
        if self.request.method == 'GET' or self.request.method == 'DELETE':
            return self.get_method_queryset
        if self.request.method == 'PATCH':
            return self.patch_method_queryset

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return self.retrieve_serializer_class
        if self.request.method == 'PATCH':
            return self.edit_serializer_class

        if self.request.method == 'DELETE':
            return self.delete_serializer_class

