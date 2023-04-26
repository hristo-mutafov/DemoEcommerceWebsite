from django.contrib.auth import get_user_model
from django.http import Http404
from rest_framework import generics as generic_views
from rest_framework import views
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken
from OnlineShop.accounts.serializers import RegisterSerializer

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
                token = RefreshToken.for_user(user)
                return Response({'token': str(token)})
            else:
                return Response({'message': 'Wrong password'}, status=400)
        except Http404:
            return Response({'message': 'User not found'}, status=404)

