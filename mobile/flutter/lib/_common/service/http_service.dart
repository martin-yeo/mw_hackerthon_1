import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class HttpService {
  var storage = const FlutterSecureStorage();

  Future<dynamic> request(BuildContext context, String type, String url, Map<String, String> header, Map<String, dynamic> body) async {
    try {
      var response;
      var _header = <String, String>{
        'Content-Type': 'application/json'
      };
      _header.addAll(header);

      var _body = jsonEncode(body);

      if(type == 'get') {
        response = await http.get(Uri.parse(url), headers: _header);
      } else if(type == 'post') {
        response = await http.post(Uri.parse(url), headers: _header, body:_body);
      } else if(type == 'put') {
        response = await http.put(Uri.parse(url), headers: _header, body:_body);
      } else if(type == 'delete') {
        response = await http.delete(Uri.parse(url), headers: _header, body:_body);
      }

      var result = json.decode(utf8.decode(response.bodyBytes));

      print("URL :: ${url}");
      print("result :: ${result}");

      if (response.statusCode == 200) {
        result['result'] = true;
        return result;
      } else {
        result['result'] = false;
        return result;
      }
    } catch(e) {
        print(e);
        result['result'] = false;
        return result;
    }
  }
}