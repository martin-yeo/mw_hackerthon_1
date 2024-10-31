import 'dart:async';
import 'package:flutter/material.dart';

import '../../_common/constant/common_constant.dart';
import '../../_common/widget/_common_widget.dart';

import '../service/template.dart';

class TemplateDeletePage extends StatefulWidget {
  const TemplateDeletePage({super.key});

  @override
  State<TemplateDeletePage> createState() => _TemplateDeletePageState();
}

class _TemplateDeletePageState extends State<TemplateDeletePage> {
  final templateService = TemplateService();

  var deleteResult;

  bool? _isSendBtnDisabled = false;
  String? _title = "";

  FocusNode _titleFocus = FocusNode();

  // 텍스트 입력 컨트롤러
  final txtTitleController = TextEditingController();

  @override
  initState() {
    txtTitleController.addListener(_setTitleValue);

    super.initState();
  }

  @override
  void dispose() {
    txtTitleController.dispose();
    _titleFocus.dispose();

    super.dispose();
  }


  void _setTitleValue() {
    _title = txtTitleController.text;

    // 로그인버튼 활성화 기준 : 아이디 입력값이 있고, 비밀번호가 공백이지 않으며 8자 이상인 경우
    setState(() {
      _isSendBtnDisabled = (_title!.isNotEmpty && _title!.length <= 40);
    });
  }

  deleteTemplateArticle(BuildContext context) async {
    _titleFocus.unfocus();

    int num = int.parse(_title!);
    deleteResult = await templateService.deleteTemplate(context, num);

    if(deleteResult != null) {
      // final data = await csInquiryResultModalBottomSheet.show(context, code);
      var result = deleteResult['result'];

      final data = await showBottomModal(context, {
        "title": result ? "게시글 삭제 완료" : "게시글 삭제 오류",
        "message": result
            ? "게시글 삭제이 완료되었습니다."
            : "게시글 삭제 시 오류가 발생했습니다. 다시 시도해 주세요.",
        "hasClose": false,
        "hasCancel": false,
        "isDismissible": false,
        "enableDrag": false
      });

      // 게시글 삭제이 성공 할 경우 이전 화면으로 리턴
      if (result) {
        Navigator.pop(context, {
          "result": true
        });
      }
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
                "게시글 삭제",
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
          child: SingleChildScrollView(
            scrollDirection: Axis.vertical,
            padding: const EdgeInsets.all(0),
            child: Column(
              children: <Widget>[
                Container(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    children: [
                      Container(margin: const EdgeInsets.fromLTRB(0, 32, 0, 0)),
                      const SizedBox(width: double.infinity, child: Text("글번호", textAlign: TextAlign.left, style: TextStyle(fontWeight: FontWeight.w600))),
                      Container(
                        margin: const EdgeInsets.fromLTRB(0, 4, 0, 0),
                        child: Row(
                          children: <Widget> [
                            Flexible(
                              child: TextFormField(
                                controller: txtTitleController,
                                textInputAction: TextInputAction.next,
                                maxLength: 40,
                                focusNode: _titleFocus,
                                // keyboardType: TextInputType.number,
                                decoration: InputDecoration(
                                  counterText: '',
                                  hintText: '글번호 입력',
                                  hintStyle: TextStyle(color: hintText),
                                  filled:true,
                                  fillColor: bgInput,
                                  contentPadding: const EdgeInsets.all(10),
                                  focusedBorder: OutlineInputBorder(
                                    borderSide: BorderSide(color: defaultFocused),
                                  ),
                                  enabledBorder: OutlineInputBorder(
                                    borderSide: BorderSide(color: transparent),
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),


                      Container(
                        margin: const EdgeInsets.fromLTRB(0, 20, 0, 0),
                        padding: const EdgeInsets.all(20),
                        child: Row(
                          children: <Widget>[
                            Flexible(
                              child: TextButton(
                                style: TextButton.styleFrom(
                                  disabledBackgroundColor: const Color(0XFFE85670),
                                  disabledForegroundColor: const Color(0XFFFFFFFF),
                                  backgroundColor: defaultEnabled,
                                  foregroundColor: white,
                                  padding: const EdgeInsets.fromLTRB(0, 20, 0, 20),
                                  textStyle: const TextStyle(fontSize: 17),
                                  minimumSize: const Size.fromHeight(50),
                                ),
                                onPressed: _isSendBtnDisabled! ? () => deleteTemplateArticle(context) : null,
                                child: const Text('삭제하기'),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          onWillPop: (){
            return Future(() => false);
          },
        )
    );
  }
}