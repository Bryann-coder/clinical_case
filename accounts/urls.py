from django.urls import path
from .views import LoginView, UserCreateView, ChangePasswordView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('users/create/', UserCreateView.as_view(), name='user-create'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
]