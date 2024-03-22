
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.http import Http404
from rest_framework import generics as generic_views
from rest_framework import views
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

from OnlineShop.accounts.serializers import RegisterSerializer, RetrieveUserSerializer, EditUserSerializer, \
    DeleteUserSerializer
from OnlineShop.core.view_mixins import GetTheUserFromTokenMixin

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
                    'access_token': str(access_token),
                    'is_staff': user.is_staff
                })
            else:
                raise Http404
        except Http404:
            return Response({'message': 'User not found'}, status=404)


class RetrieveUpdateDeleteUserView(GetTheUserFromTokenMixin, generic_views.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated, )
    filter_param = 'id'

    def get_queryset(self):
        if self.request.method == 'GET' or self.request.method == 'DELETE':
            return UserModel.objects.all()
        if self.request.method == 'PATCH':
            return UserModel.objects.prefetch_related('userprofile')

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return RetrieveUserSerializer
        if self.request.method == 'PATCH':
            return EditUserSerializer

        if self.request.method == 'DELETE':
            return DeleteUserSerializer


class ValidatePasswordView(GetTheUserFromTokenMixin, views.APIView):
    permission_classes = (IsAuthenticated, )

    @staticmethod
    def post(request):
        user_id = GetTheUserFromTokenMixin.get_user_id(request)
        user = UserModel.objects.filter(id=user_id).get()
        if check_password(request.data['password'], user.password):
            return Response({'message': 'Valid Password'}, 200)
        else:
            return Response({'message': 'Wrong Password'}, 400)
