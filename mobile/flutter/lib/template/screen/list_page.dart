import 'dart:async';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';

import '../../_common/constant/common_constant.dart';
import '../../_common/widget/_common_widget.dart';
import '../service/template.dart';

class TemplateListPage extends StatefulWidget {
  const TemplateListPage({super.key});

  @override
  State<TemplateListPage> createState() => _TemplateListPageState();
}

class _TemplateListPageState extends State<TemplateListPage> {
  final templateService = TemplateService();

  // Pull to Refresh Controller
  final RefreshController _refreshController = RefreshController(initialRefresh: false);

  Future<dynamic>? _fetchTemplateList;
  Key _drawerRefreshKey = UniqueKey();

  int page = 1;
  var templateList;
  List _templateList = [];
  List<Widget> _templateWidgetList = [];

  @override
  initState() {
    _fetchTemplateList = getTemplateList(false);
    super.initState();
  }

  @override
  void dispose() {
    _refreshController.dispose();
    _fetchTemplateList = null;

    _templateList = [];
    _templateWidgetList = [];

    super.dispose();
  }

  Future<dynamic> getTemplateList(bool isForce) async {
    if(isForce) {
      templateList = await templateService.fetchTemplateList(context, page, 10);
    } else {
      templateList ??= await templateService.fetchTemplateList(context, page, 10);
    }

    _templateList = templateList['list'];

    return templateList;
  }

  List<Widget> inflateTemplateContents(dynamic data) {
    _templateWidgetList = [];

    for(var tplData in data['list']) {
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
                Text("${tplData['num']}"), // field 변경 필요
                Text(tplData['name']), // field 변경 필요
              ],
            ),
            
        ),
      );
    }

    return _templateWidgetList;
  }

  void _onRefresh() async {
    // monitor network fetch
    await Future.delayed(Duration(milliseconds: 1000));
    // if failed,use refreshFailed()
    page = 0;
    _templateList = [];
    _templateWidgetList = [];

    setState(() {
      _templateList = [];
      _templateWidgetList = [];
      _drawerRefreshKey = UniqueKey();
      _fetchTemplateList = getTemplateList(true);
    });

    _refreshController.refreshCompleted();
  }

  void _onLoading() async {
    await Future.delayed(Duration(milliseconds: 1000));
    // await fetchMoreCSHistory();

    if(templateList['list'].length > 0) {
      _refreshController.loadComplete();
    } else {
      _refreshController.loadNoData();
    }
  }

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
                "게시글 리스트",
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
                child: SmartRefresher(
                  enablePullDown: true,
                  enablePullUp: true,
                  header: MaterialClassicHeader(),
                  footer: CustomFooter(
                    builder: (BuildContext context, LoadStatus? mode) {
                      Widget body;

                      if(mode == LoadStatus.idle) {
                        body = const Text("조회 내역을 더 보시려면 화면을 당겨주세요.");
                      } else if(mode == LoadStatus.loading) {
                        body = const CupertinoActivityIndicator();
                        // 다음페이지 읽음
                      } else if(mode == LoadStatus.failed) {
                        body = const Text("내역 조회에 실패했습니다. 다시 시도해 주세요.");
                      } else if(mode == LoadStatus.canLoading) {
                        body = const Text("더 보시려면 손가락을 놓아주세요.");
                      } else {
                        body = const Text("조회할 데이터가 없습니다.");
                      }

                      return Container(
                        padding: const EdgeInsets.fromLTRB(0, 0, 0, 10),
                        decoration: BoxDecoration(
                            border: Border.all(
                              color: transparent, // defaultFocused,
                              width: 2,
                            ),
                            borderRadius: BorderRadius.circular(4)
                        ),
                        child: Center(child:body),
                      );
                    },
                  ),
                  controller: _refreshController,
                  onRefresh: _onRefresh,
                  onLoading: _onLoading,
                  child: SingleChildScrollView(
                    scrollDirection: Axis.vertical,
                    key: _drawerRefreshKey,
                    padding: const EdgeInsets.all(0),
                    child: FutureBuilder(
                        future: _fetchTemplateList,
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
                          }
                        }
                    ),
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