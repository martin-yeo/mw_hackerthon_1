import 'dart:async';
import 'package:flutter/material.dart';

import '../../_common/constant/common_constant.dart';
import '../../_common/widget/_common_widget.dart';
import '../service/template.dart';

class TemplateDetailPage extends StatefulWidget {
  const TemplateDetailPage({super.key});

  @override
  State<TemplateDetailPage> createState() => _TemplateDetailPageState();
}

class _TemplateDetailPageState extends State<TemplateDetailPage> {
  final templateService = TemplateService();

  var templateData;
  dynamic _templateData = {};
  List<Widget> _templateWidgetList = [];

  int num = 0;

  @override
  initState() {
    super.initState();
  }

  @override
  void dispose() {
    _templateData = {};
    _templateWidgetList = [];

    super.dispose();
  }

  Future<dynamic> getTemplateData() async {
    templateData = await templateService.fetchTemplateDetail(context, num);
    print(templateData);

    _templateData = templateData['data'];

    return templateData;
  }

  List<Widget> inflateTemplateContents(dynamic data) {
    data = data['data'];

    _templateWidgetList.add(
      Container(
        padding: const EdgeInsets.fromLTRB(0, 20, 0, 0),
        decoration: BoxDecoration(
          color: bgMsgDetail,
          border: Border(
            bottom: BorderSide(
              color: contentDivider,
              width: 1.0,
              style: BorderStyle.solid,
            ),
          ),
        ),

        child: Row(
          children: [
            Text("${data['num']}"), // field 변경 필요
            Text(data['name']), // field 변경 필요
          ],
        ),

      ),
    );

    return _templateWidgetList;
  }

  @override
  Widget build(BuildContext context) {
    final args = (ModalRoute.of(context)?.settings.arguments ?? <String, dynamic>{}) as Map;
    double deviceWidth = MediaQuery.of(context).size.width;
    num = args['num'];

    print(num);

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
              Expanded(
                  child: SingleChildScrollView(
                    scrollDirection: Axis.vertical,
                    padding: const EdgeInsets.all(0),
                    child: FutureBuilder(
                      future: getTemplateData(),
                      builder: (BuildContext context, AsyncSnapshot snapshot) {
                        if (snapshot.hasData == false) {
                          return Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: <Widget>[
                              // 로딩이미지 삽입
                            ],
                          );
                        } else if (snapshot.hasError) {
                          return Container();
                        } else {
                          var data = snapshot.data;

                          return Column(children: inflateTemplateContents(data));
                          // return Column(children: []);
                        }
                      }
                  ),
                ),
              ),
            ],
          ),
          onWillPop: (){
            return Future(() => false);
          },
        )
    );
  }
}