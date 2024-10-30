from django.http import JsonResponse
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from rest_framework import viewsets
import json

from .models import Message, MessageSerializer
from ..db.mysql_conn import mysql_get_conn


class MessageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows messages to be viewed or edited.
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


# Serve HTML File
index_view = never_cache(TemplateView.as_view(template_name='index.html'))

@csrf_exempt
def list(request):
    # data = json.loads(request.body.decode('utf-8'))    # Application/JSON 방식으로 파라미터를 JSON 형태로 받을 경우 이렇게 파싱
    # date = data['date']                                # 데이터를 가져와서 변수에 추가
    # date = request.GET.get("date")                     # URL을 GET 방식으로 호출할 경우 이와 같은 방법으로 호출
    rtn_msg = {}

    try:
        conn = mysql_get_conn()

        with conn.cursor() as cursor:
            # sql_select = "SELECT * FROM test WHERE num = %s"    # 테이블명 test와 num 부분 컬럼 변경 필요, 필요 시 * 을 컬럼 명으로 수정
            # cursor.execute(sql_select, ('1'))                     # 숫자 1 부분을 request에서 데이터 가져온 값으로 수정
            # result = cursor.fetchall()

            sql_select = "SELECT * FROM test"    # 테이블명 test 변경 필요, 필요 시 * 을 컬럼 명으로 수정
            print(sql_select)

            cursor.execute(sql_select)                     # 숫자 1 부분을 request에서 데이터 가져온 값으로 수정
            result = cursor.fetchall()


            rtn_list = []
            for row in result:
                rtn_list.append(row)

            rtn_msg['result'] = True
            rtn_msg['list'] = rtn_list
    except Exception as e:
        print(e)
        rtn_msg['result'] = False
    finally:
        # 연결 종료
        conn.close()

    return JsonResponse(rtn_msg, safe=False)


@csrf_exempt
def one(request, article_no):
    data = json.loads(request.body.decode('utf-8'))    # Application/JSON 방식으로 파라미터를 JSON 형태로 받을 경우 이렇게 파싱
    num = data['num']                                # 데이터를 가져와서 변수에 추가
    # date = request.GET.get("date")                     # URL을 GET 방식으로 호출할 경우 이와 같은 방법으로 호출
    rtn_msg = {}

    try:
        conn = mysql_get_conn()

        with conn.cursor() as cursor:
            # sql_select = "SELECT * FROM test WHERE num = %s"    # 테이블명 test와 num 부분 컬럼 변경 필요, 필요 시 * 을 컬럼 명으로 수정
            # cursor.execute(sql_select, ('1'))                     # 숫자 1 부분을 request에서 데이터 가져온 값으로 수정
            # result = cursor.fetchall()

            sql_select = "SELECT * FROM test WHERE num = {}".format(num)    # 테이블명 test 변경 필요, 필요 시 * 을 컬럼 명으로 수정
            print(sql_select)

            cursor.execute(sql_select)                     # 숫자 1 부분을 request에서 데이터 가져온 값으로 수정
            result = cursor.fetchall()

            rtn_msg['data'] = result[0]
            rtn_msg['result'] = True
    except Exception as e:
        print(e)
        rtn_msg['result'] = False
    finally:
        # 연결 종료
        conn.close()

    return JsonResponse(rtn_msg, safe=False)


@csrf_exempt
def insert(request):
    data = json.loads(request.body.decode('utf-8'))      # Application/JSON 방식으로 파라미터를 JSON 형태로 받을 경우 이렇게 파싱
    name = data['name']                                  # 데이터를 가져와서 변수에 추가
    # date = request.GET.get("date")                     # URL을 GET 방식으로 호출할 경우 이와 같은 방법으로 호출
    rtn_msg = {}

    try:
        conn = mysql_get_conn()

        with conn.cursor() as cursor:
            sql_insert = "INSERT INTO test (name) VALUES (%s)"    # 테이블명 test와 name 부분 컬럼 변경 필요
            print(sql_insert)

            cursor.execute(sql_insert, (name))                # value 부분을 request에서 데이터 가져온 값으로 수정
            conn.commit()  # 삽입 내용을 저장

            rtn_msg['result'] = True
    except Exception as e:
        print(e)
        rtn_msg['result'] = False
    finally:
        # 연결 종료
        conn.close()

    return JsonResponse(rtn_msg, safe=False)


@csrf_exempt
def update(request):
    data = json.loads(request.body.decode('utf-8'))      # Application/JSON 방식으로 파라미터를 JSON 형태로 받을 경우 이렇게 파싱
    num = data['num']                                    # 데이터를 가져와서 변수에 추가
    name = data['name']                                  # 데이터를 가져와서 변수에 추가
    # date = request.GET.get("date")                     # URL을 GET 방식으로 호출할 경우 이와 같은 방법으로 호출
    rtn_msg = {}

    try:
        conn = mysql_get_conn()

        with conn.cursor() as cursor:
            # 3. UPDATE - 데이터 수정
            sql_update = "UPDATE test SET name = %s WHERE num = %s"    # 테이블명 test와 name, num 컬럼 부분 변경 필요
            print(sql_update)

            cursor.execute(sql_update, (name, num))                  # value2와 숫자 1 부분을 request에서 데이터 가져온 값으로 수정
            conn.commit()  # 수정 내용을 저장

            rtn_msg['result'] = True
    except Exception as e:
        print(e)
        rtn_msg['result'] = False
    finally:
        # 연결 종료
        conn.close()

    return JsonResponse(rtn_msg, safe=False)


@csrf_exempt
def delete(request):
    data = json.loads(request.body.decode('utf-8'))      # Application/JSON 방식으로 파라미터를 JSON 형태로 받을 경우 이렇게 파싱
    num = data['num']                                    # 데이터를 가져와서 변수에 추가
    # date = request.GET.get("date")                     # URL을 GET 방식으로 호출할 경우 이와 같은 방법으로 호출
    rtn_msg = {}

    try:
        conn = mysql_get_conn()

        with conn.cursor() as cursor:
            sql_delete = "DELETE FROM test WHERE num = %s"    # 테이블명 test와 num 부분 컬럼 변경 필요
            print(sql_delete)

            cursor.execute(sql_delete, (num))                   # 숫자 1 부분을 request에서 데이터 가져온 값으로 수정
            conn.commit()  # 삭제 내용을 저장

            rtn_msg['result'] = True
    except Exception as e:
        print(e)
        rtn_msg['result'] = False
    finally:
        # 연결 종료
        conn.close()

    return JsonResponse(rtn_msg, safe=False)


