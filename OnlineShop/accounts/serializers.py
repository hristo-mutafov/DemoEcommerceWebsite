from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

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
        refresh_token = RefreshToken.for_user(instance)
        access_token = AccessToken.for_user(instance)
        return {
            'refresh_token': str(refresh_token),
            'access_token': str(access_token)
        }


class RetrieveUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('email',)

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        representation['first_name'] = instance.userprofile.first_name
        representation['last_name'] = instance.userprofile.last_name
        return representation


class EditUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('first_name', 'last_name', 'gender')


class DeleteUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'


