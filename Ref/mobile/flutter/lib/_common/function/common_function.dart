import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import 'package:fluttertoast/fluttertoast.dart';
import 'package:intl/intl.dart';

final storage = const FlutterSecureStorage(); //flutter_secure_storage 사용을 위한 초기화 작업

String parsePhoneNumberFormat(String phoneNumber) {
  String phone1 = phoneNumber.substring(0, 3);
  String phone2 = phoneNumber.substring(3, 7);
  String phone3 = phoneNumber.substring(7, 11);

  return "${phone1}-${phone2}-${phone3}";
}

String parseBizNumberFormat(String bn) {
  String bn1 = bn.substring(0, 3);
  String bn2 = bn.substring(3, 5);
  String bn3 = bn.substring(5, 10);

  return "${bn1}-${bn2}-${bn3}";
}

String parseDate2DigitFormatted(String date) {
  return DateFormat('yy.MM.dd').format(DateTime.parse(date));
}

String getCurrentMonth() {
  return DateFormat('M').format(DateTime.now());
}

String getCurrentYearMonth() {
  return DateFormat('yyyyMM').format(DateTime.now());
}

bool checkPhoneNumRegex(String phoneNumber) {
  bool pattern = phoneNumber.length >= 3 && RegExp(r'^010|^010([0-9]{4})([0-9]{4})$').hasMatch(phoneNumber);

  return pattern;
}

bool checkKorStrRegex(String str) {
  bool pattern = RegExp(r'^[가-힣]+$').hasMatch(str);

  return pattern;
}

void showToast(String message) {
  Fluttertoast.showToast(msg: message, toastLength: Toast.LENGTH_SHORT, gravity: ToastGravity.BOTTOM);
}