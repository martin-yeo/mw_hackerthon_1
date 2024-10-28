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
    path('api/health_check', health_check, name='health_check'),
    path('api/keyword/extract', extract_keyword, name='extract_keyword'),
    path('api/keyword/monthly_news_count', monthly_news_count, name='monthly_news_count'),
    path('api/keyword/shpping_trend_keyword', shopping_trend_keyword, name='shopping_trend_keyword'),

    path('api/keyword/fetch_shopping_live', shopping_live_keyword, name='shopping_live_keyword'),
    path('api/keyword/fetch_shopping_live_category', shopping_live_keyword_category, name='shopping_live_keyword_category'),

    path('api/keyword/fetch_shopping_live_info', shopping_live_keyword_info, name='shopping_live_keyword_info'),
    # path('api/keyword/parse_shopping_live_category_code', parse_shopping_live_category_code, name='parse_shopping_live_category_code'),
]
'''
urlpatterns = [
    # http://localhost:8000/
    path('', index_view, name='index'),

    # http://localhost:8000/api/<router-viewsets>
    path('api/', include(router.urls)),
    path('api/itpe/search', api_itpe_search, name='api_itpe_search'),
    # path('api/itpe/search/<str:keyword>', api_itpe_search, name='api_itpe_search'),

    path('api/itpe/question/random', api_itpe_question_random, name='api_itpe_question_random'),

    path('api/itpe/question/recentQuestion', api_itpe_question_recent, name='api_itpe_question_recent'),
    path('api/itpe/question/simulation/<str:test_no>/<str:subject>', api_itpe_question_simulation, name='api_itpe_question_simulation'),
    path('api/itpe/question/simulation/<str:test_no>/<str:subject>/<str:period>', api_itpe_question_simulation, name='api_itpe_question_simulation'),

    path('api/itpe/question/camp/<str:test_no>/<str:subject>', api_itpe_question_camp, name='api_itpe_question_camp'),
    path('api/itpe/question/camp/<str:test_no>/<str:subject>/<str:period>', api_itpe_question_camp, name='api_itpe_question_camp'),

    path('api/itpe/question/<str:test_no>/<str:subject>', api_itpe_question, name='api_itpe_question'),
    path('api/itpe/question/<str:test_no>/<str:subject>/<str:period>', api_itpe_question, name='api_itpe_question'),

    path('api/subnote/domain', api_subnote_domain, name='api_subnote_domain'),
    path('api/subnote/domain/<str:subdomain>', api_subnote_domain, name='api_subnote_domain'),
    path('api/subnote/domain/<str:subdomain>/<str:subtopics>', api_subnote_domain, name='api_subnote_domain'),

    path('admin/', admin.site.urls),
    path('favicon.ico', RedirectView.as_view(url=staticfiles_storage.url("favicon.ico"))),

    # kakao Auth Redirect URI
    path('api/member/login', api_member_login, name='api_member_login'),
    path('api/member/withdraw', api_member_withdraw, name='api_member_withdraw'),

    # url(r'^static/(?P<path>.*)$', serve, {'document_root': os.path.join(BASE_DIR, 'static')}),
]
'''