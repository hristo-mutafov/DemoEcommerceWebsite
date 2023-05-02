from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, UserManager
from django.db import models

from OnlineShop.accounts.enums import GenderEnum


class AppUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        unique=True,
        null=False,
        blank=False,
    )
    is_staff = models.BooleanField(
        default=False,
    )

    USERNAME_FIELD = 'email'
    objects = UserManager()



class UserProfile(models.Model):
    NAMES_MAX_LEN = 30
    PHONE_NUMBER_MAX_LEN = 10

    first_name = models.CharField(
        max_length=NAMES_MAX_LEN,
        null=False,
        blank=True
    )

    last_name = models.CharField(
        max_length=NAMES_MAX_LEN,
        null=False,
        blank=True
    )

    phone_number = models.CharField(
        max_length=PHONE_NUMBER_MAX_LEN,
        null=False,
        blank=True
    )

    address = models.TextField(
        null=False,
        blank=True
    )

    gender = models.CharField(
        choices=GenderEnum.get_values(),
        max_length=GenderEnum.get_longer_value(),
        null=False,
        blank=False
    )

    user = models.OneToOneField(
        AppUser,
        on_delete=models.CASCADE,
        primary_key=True
    )
