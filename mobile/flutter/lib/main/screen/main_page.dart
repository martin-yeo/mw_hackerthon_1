import 'dart:async';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import '../../_common/constant/common_constant.dart';
import '../../_common/function/common_function.dart';
import '../../_common/widget/_common_widget.dart';
import '../../_common/widget/main_drawer.dart';

const storage = FlutterSecureStorage();

class MainPage extends StatefulWidget {
  const MainPage({super.key});

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  final mainDrawer = MainDrawer();

  // Drawer 열고 닫힐 때 정보가 변했으면 레이아웃 refresh
  Key _drawerRefreshKey = UniqueKey();
  bool _isDrawerOpen = false;

  DateTime? _backBtnPressedTime;



  @override
  initState() {
    super.initState();
  }

  @override
  void dispose() {

    super.dispose();
  }


  scrollTop() {

  }

  @override
  Widget build(BuildContext context) {
    final double statusBarHeight = MediaQuery.of(context).padding.top;
    double deviceWidth = MediaQuery.of(context).size.width;
    double deviceHeight = MediaQuery.of(context).size.height;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: white,
        elevation: 0,
        leadingWidth : 0,
        leading: Container(),
        automaticallyImplyLeading: false,
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            // getImageWidget(logo, null, 32, false, true, {"fit":BoxFit.contain}),

            InkWell(
              onTap: (){
                scrollTop();
              },
              child: getImageWidget(logo, null, 32, false, true, {"fit":BoxFit.contain}),
            ),

            Builder(
              builder: (context) => Center(
                child: IconButton(
                  icon: Icon(Icons.menu, color: black),
                  padding: EdgeInsets.zero, // 패딩 설정
                  constraints: const BoxConstraints(),
                  onPressed: () => Scaffold.of(context).openEndDrawer(),
                ),
              ),
            ),
          ],
        ),
        shape: getAppbarBorder(),
        actions: <Widget> [Container()],
      ),

      resizeToAvoidBottomInset: false,
      drawerEnableOpenDragGesture: false,
      endDrawer: mainDrawer.getDrawer(context),
      onEndDrawerChanged: (result) async {
        _isDrawerOpen = result;
        // true : opened
        // false : closed
        // Drawer가 닫혔을 때 업데이트된 사업장이 있는지 확인하고, null이 아닐 경우 화면 새로고침

        if(!result) {
          String? bn = await storage.read(key: "updateRepresent");
          if(bn != null) {
            setState(() {
              _drawerRefreshKey = UniqueKey();
              storage.delete(key: "updateRepresent");
            });
          }
        }
      },
      body : SafeArea(
        child : WillPopScope(
          onWillPop: (){
            DateTime currentTime = DateTime.now();
            bool backButton = _backBtnPressedTime == null || currentTime.difference(_backBtnPressedTime!) > Duration(seconds: 3);

            // While drawer is opened, close it first.
            if(_isDrawerOpen) {
              return Future(() => true);
            }

            if (backButton) {
              _backBtnPressedTime = currentTime;
              showToast(strAppExit);
              return Future(() => false);
            }

            return Future(() => true);
          },

          child: Column(
            children: [],
          )
        ),
      ),
    );
  }
}