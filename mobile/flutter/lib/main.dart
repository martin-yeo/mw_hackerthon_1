import 'dart:async';
import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import '_common/constant/common_constant.dart';

// page import declarations
import './splash/screen/splash_page.dart';
import './main/screen/main_page.dart';

final storage = const FlutterSecureStorage();

// const notificationChannelId = 'login_service_channel';
// const notificationId = 888;

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  runApp(const MWHacktonApp());
}


class MWHacktonApp extends StatefulWidget  {
  const MWHacktonApp({super.key});

  @override
  State<MWHacktonApp> createState() => _MWHacktonAppState();
}

class _MWHacktonAppState extends State<MWHacktonApp> {
  int? _remainedTime;
  BuildContext? ctx;

  @override
  initState() {
    super.initState();
  }

  @override
  void dispose() {
    storage.deleteAll();

    super.dispose();
  }

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {

    return MaterialApp(
      title: '목원대햌톤',
      theme: ThemeData(
        // primarySwatch: blue,
          primaryColor: bgAppBar,
          fontFamily: 'SUIT',
          appBarTheme: const AppBarTheme(
              systemOverlayStyle: SystemUiOverlayStyle(
                statusBarColor: Color(0xFFA72038),
              )
          )
      ),
      debugShowCheckedModeBanner: false,
      home: const SplashPage(),

      // 페이지 전환시마다 token refresh 되게 하기
      onGenerateRoute: (RouteSettings settings) {
        // token refresh 할 곳만 지정해서 넣기
        // loginService.extendLoginInfo();

        switch(settings.name) {
          case '/main': return MaterialPageRoute(builder: (BuildContext context) {
            ctx = context;
            return const MainPage();
          }, settings:settings); // 로그인 후 메인페이지

          // {PageName}은 Dart 파일 생성 후 페이지 이름 변경
          // case '/routename' : return MaterialPageRoute(builder: (BuildContext context) => const {PageName}(), settings:settings);

        }
      },
    );
  }
}