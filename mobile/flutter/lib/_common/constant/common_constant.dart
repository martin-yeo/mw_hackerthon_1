import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

// Color hex/variable code
Color transparent = Colors.transparent;
Color gray = Colors.grey;
MaterialColor blue = Colors.blue;
Color white = const Color(0xFFFFFFFF);
Color dimWhite = const Color(0xCCFFFFFF);
Color dimWhite2 = const Color(0x33FFFFFF);
Color black = const Color(0xFF000000);
Color danger = const Color(0xFFD32F2F);
Color bgDanger = const Color(0xFFf32626);
Color defaultText = const Color(0xFF1E2137);
Color defaultEnabled = const Color(0xFFA72038);
Color defaultFocused = const Color(0xFFA72038);
Color defaultFocusedDark = const Color(0xFF013CD4);
Color defaultCorp = const Color(0xFFA72038);
Color bgDisabled = const Color(0XFF80B3FF);
Color fgDisabled = const Color(0XFFBED8FF);
Color btnFgDisabled = const Color(0XFFD6D8DC);
Color tglSelected = const Color(0xFFF0F2F5);
Color hintText = const Color(0xFF6C737C);
Color dimText = const Color(0xFF5D646E);
Color disabledText = const Color(0xFFE3E5E8);
Color bgKakao = const Color(0xFFFEE500);
Color bgKakaoDisabled = const Color(0xFFFCF297);
Color fgKakaoDisabled = const Color(0XFFA2A2A2);
Color bgIcKakao = const Color(0xFFFAE100);
Color bgNaver = const Color(0xFF00C300);
Color kakaoText = const Color(0xD9000000);
Color bgCompanyClosed = const Color(0xC7000000); // 78% in figma
Color bgFilterItem = const Color(0xFF0ABF9D);
Color bgFilterItemDisabled = const Color(0xFFBEFFEA);


// appbar
Color bgAppBar = const Color(0xFFA72038);
Color appbarBorder = const Color(0xFFE9ECF2);

// modal
Color modalDimText = const Color(0xFF5D646E);
Color bgMsgDetail = const Color(0xFFF8F9FB);
Color bgBtnSecondary = const Color(0xFFE9ECF2);


// ASSETS 
// - 일반 String으로 넣으면 코드가 길어지기 때문에 한 파일에서 관리
// - String 문자열 추가지 pubspec.yaml 에서 추가하고 pub get dependencies를 통해서 업데이트 해야됨
// String assetName = "asset경로";
String svgIcNavArrowDown = 'assets/images/icon/ic_nav_arrow_down.svg';
String logo = 'assets/images/logo.png';
String logoWhite = 'assets/images/logo_white.png';

// COMMON Strings
String strAppExit = '뒤로 버튼을 한 번 더 누르시면 앱이 종료됩니다.';
String strConfirm = '확인';
String strCancel = '취소';
