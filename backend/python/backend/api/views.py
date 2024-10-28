from datetime import datetime, timedelta

from dateutil.relativedelta import relativedelta
from django.http import HttpResponse, JsonResponse
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from rest_framework import viewsets
import json


from .models import Message, MessageSerializer
from ..keyword.crawl_naver_shopping_live import fetch_shopping_live_data, fetch_shopping_live_category, \
    fetch_shopping_live_info, parse_code_shopping_live_code
from ..keyword.shopping_trend_keyword import fetch_shopping_trend_keyword

from ..nlp.extract_keyword import nlp_keyword
from ..keyword.count_monthly_news_article import count_monthly_news_article
from ..db.mysql_conn import mysql_get_conn, get_naver_confidential


class MessageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows messages to be viewed or edited.
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


# Serve Vue Application
index_view = never_cache(TemplateView.as_view(template_name='index.html'))

@csrf_exempt
def health_check(request):
    rtn_msg = {}
    # print(data);
    rtn_msg['result'] = True

    return JsonResponse(rtn_msg, safe=False)


@csrf_exempt
def extract_keyword(request):
    rtn_msg = {}
    data = json.loads(request.body.decode('utf-8'))
    # print(data);
    sentence = data['sentence']
    # print(sentence)
    result = nlp_keyword(sentence)

    rtn_msg = result

    return JsonResponse(rtn_msg, safe=False)

# 월간 뉴스 카운팅 -> tmp. test
@csrf_exempt
def monthly_news_count(request):
    conn = mysql_get_conn(False)
    confidential = get_naver_confidential(conn)

    client_id = confidential['naver_app_client_id']
    client_secret = confidential['naver_app_client_secret']
    query = request.GET.get("query")
    start_date = request.GET.get("start_date")
    end_date = request.GET.get("end_date")
    # result = []

    if start_date is not None:
        print(start_date)
        month_ago = datetime.strptime(start_date, '%Y%m%d')

    if end_date is not None:
        print(end_date)
        today = datetime.strptime(end_date, '%Y%m%d')

    if start_date is None and end_date is None:
        today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        month = relativedelta(months=1)
        month_ago = today - month

    print(today)
    print(month_ago)
    de = today.strftime('%Y.%m.%d')

    arr_ds = []
    while month_ago <= today:
        # print(month_ago)
        # ds = month_ago.strftime('%Y.%m.%d')
        arr_ds.append(month_ago)
        # print(ds)
        month_ago += timedelta(days=1)

    print(arr_ds)

    result = count_monthly_news_article(query, client_id, client_secret, arr_ds)

    # print(result)
    return JsonResponse(result, safe=False)


# 카테고리별 쇼핑 -> tmp. test
@csrf_exempt
def shopping_trend_keyword(request):
    conn = mysql_get_conn(False)
    # result = []

    # query = request.GET.get("query")
    result = fetch_shopping_trend_keyword(conn)

    # print(result)
    return JsonResponse(result, safe=False)


# 카테고리별 쇼핑 -> tmp. test
@csrf_exempt
def shopping_live_keyword(request):
    # conn = mysql_get_conn(False)
    # result = []

    # query = request.GET.get("query")
    result = fetch_shopping_live_data()

    # print(result)
    return JsonResponse(result, safe=False)

@csrf_exempt
def shopping_live_keyword_category(request):
    # conn = mysql_get_conn(False)
    # result = []

    # query = request.GET.get("query")
    result = fetch_shopping_live_category()

    # print(result)
    return JsonResponse(result, safe=False)


@csrf_exempt
def shopping_live_keyword_info(request):
    conn = mysql_get_conn(False)
    # result = []

    # query = request.GET.get("query")
    result = fetch_shopping_live_info(conn)

    # print(result)
    return JsonResponse(result, safe=False)

@csrf_exempt
def parse_shopping_live_category_code(request):
    conn = mysql_get_conn(False)

    result = parse_code_shopping_live_code(conn)

    return JsonResponse(result, safe=False)