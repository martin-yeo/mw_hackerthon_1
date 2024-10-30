"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic import RedirectView
from rest_framework import routers
from django.http import HttpResponseRedirect
from django.conf import settings
from django.views.static import serve
# from django.conf.urls import url
from django.conf.urls.static import static
import os

from .api.views import *

SETTINGS_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE_DIR = os.path.dirname(SETTINGS_DIR)

router = routers.DefaultRouter()
router.register('messages', MessageViewSet)

urlpatterns = [
    path('', index_view, name='index'),
    path('api/list', list, name='list'),
    path('api/insert', insert, name='insert'),
    path('api/update', update, name='update'),
    path('api/delete', delete, name='delete')
]