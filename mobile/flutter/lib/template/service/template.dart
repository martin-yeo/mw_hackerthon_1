import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

// import URL End-Point
import '../../_common/constant/end_point.dart';
import '../../_common/service/http_service.dart';


class TemplateService extends HttpService{
  // final storage = const FlutterSecureStorage();

  // 게시글 목록 조회
  Future<dynamic> fetchTemplateList(BuildContext context, int page, int pageSize) async {
    var result = await super.request(
        context,
        "get",
        "${EndPoint.TEMPLATE_LIST}",
        {},
        {}
    );

    return result;
  }

  // 게시글 상세 조회
  Future<dynamic> fetchTemplateDetail(BuildContext context, int num) async {
    var result = await super.request(
        context,
        "POST",
        "${EndPoint.TEMPLATE_ONE}/${num}",
        {},
        {'num':num}
    );

    return result;
  }

  // 게시글 등록
  Future<dynamic> registerTemplate(BuildContext context, String title, String content) async {
    var result = await super.request(
      context,
      "post",
      EndPoint.TEMPLATE_INSERT,
      {},
      {'title': title, 'content': content}
    );
    // print(result);

    return result;
  }

  // 게시글 수정
  Future<dynamic> updateTemplate(BuildContext context, int num, String title, String content) async {
    var result = await super.request(
        context,
        "put",
        EndPoint.TEMPLATE_UPDATE,
        {},
        {'num':num, 'title': title, 'content': content}
    );
    // print(result);

    return result;
  }

  // 게시글 삭제
  Future<dynamic> deleteTemplate(BuildContext context, int num) async {
    var result = await super.request(
        context,
        "delete",
        EndPoint.TEMPLATE_UPDATE,
        {},
        {'num':num}
    );
    // print(result);

    return result;
  }
}