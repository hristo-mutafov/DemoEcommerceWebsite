from django.contrib.auth import get_user_model
from django.db import models

from OnlineShop.products.models import Product

UserModel = get_user_model()


class Favorites(models.Model):
    user = models.OneToOneField(
        UserModel,
        on_delete=models.CASCADE
    )

    products = models.ManyToManyField(
        Product,
    )
