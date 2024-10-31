import 'dart:async';
import 'package:flutter/material.dart';

import '../../_common/constant/common_constant.dart';
import '../../_common/widget/_common_widget.dart';

class TemplateDetailPage extends StatefulWidget {
  const TemplateDetailPage({super.key});

  @override
  State<TemplateDetailPage> createState() => _TemplateDetailPageState();
}

class _TemplateDetailPageState extends State<TemplateDetailPage> {
  @override
  Widget build(BuildContext context) {
    double deviceWidth = MediaQuery.of(context).size.width;

    return Scaffold(
        appBar: AppBar(
          backgroundColor: white,
          elevation: 0,
          leadingWidth : 0,
          automaticallyImplyLeading: false,
          title: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              IconButton(
                icon: Icon(
                  Icons.arrow_back_ios,
                  color: black,
                ),
                padding: EdgeInsets.zero, // 패딩 설정
                constraints: const BoxConstraints(),
                onPressed: () => Navigator.pop(context),
              ),
              Text(
                "게시글 상세",
                style: TextStyle(fontSize: 18, color:defaultText, fontWeight: FontWeight.w600),
              ),
              Builder(
                builder: (context) => Center(
                  child: IconButton(
                      icon: Icon(Icons.menu, color: transparent),
                      padding: EdgeInsets.zero, // 패딩 설정
                      constraints: const BoxConstraints(),
                      onPressed: () => {} // Scaffold.of(context).openEndDrawer(),
                  ),
                ),
              ),
            ],
          ),
          centerTitle: true,
          shape: getAppbarBorder(),
          actions: <Widget> [Container()],
        ),
        body: WillPopScope(
          child: Column(
            children: <Widget>[

            ],
          ),
          onWillPop: (){
            return Future(() => false);
          },
        )
    );
  }
}