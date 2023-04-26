from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from OnlineShop.accounts.models import UserProfile

UserModel = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('email', 'password')

    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data.get('password'))
        UserProfile.objects.create(user=user)
        user.save()

        return user

    def to_representation(self, instance):
        token = RefreshToken.for_user(instance)
        return {
            'token': str(token)
        }
