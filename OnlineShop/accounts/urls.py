from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

from OnlineShop.accounts.views import RegisterView, LoginView, RetrieveUpdateDeleteUserView

urlpatterns = (
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('token/validate/', TokenVerifyView.as_view()),
    path('user/<int:pk>', RetrieveUpdateDeleteUserView.as_view())
)