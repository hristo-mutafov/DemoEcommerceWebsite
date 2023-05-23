from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken


class GetTheUserFromTokenMixin:
    filter_param = 'user'

    def get_object(self, queryset=None):
        user_id = self.get_user_id(self.request)
        self.queryset = self.get_queryset()
        obj = self.queryset.filter(**{self.filter_param: user_id}).first()
        return obj

    @staticmethod
    def get_user_id(request):
        token = request.headers.get('Authorization', None).split(' ')[1]
        try:
            validated_token = JWTAuthentication().get_validated_token(token)
            user_id = validated_token['user_id']
            return user_id
        except (InvalidToken, KeyError):
            return Response({'message': 'Invalid Token'})