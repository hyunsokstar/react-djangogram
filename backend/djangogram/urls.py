from django.urls import path, re_path , include
from . import views
from django.contrib.auth import views as auth_views
from django.conf import settings

urlpatterns = [
    path('hello/', views.hello_world , name="hello_world"),
]