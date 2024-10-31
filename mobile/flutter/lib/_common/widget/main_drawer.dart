import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import '../constant/common_constant.dart';
import '_common_widget.dart';

class MainDrawer {

  navigateListPage(BuildContext context) async {
    Navigator.pushNamed(context, '/template/list');
  }

  getDrawer(BuildContext context) {
    final double statusBarHeight = MediaQuery.of(context).padding.top;
    // ctx = context;

    return Drawer(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            margin: EdgeInsets.fromLTRB(0, statusBarHeight, 0, 0),
            padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
            height: AppBar().preferredSize.height,
            decoration: BoxDecoration(
              border: Border.all(
                color: appbarBorder,
                width: 1,
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: <Widget> [
                Builder(
                  builder: (context) => Center(
                    child: IconButton(
                      constraints: const BoxConstraints(),
                      padding: EdgeInsets.zero,
                      icon: getImageWidget(svgIcClose, null, null, true, false, {}),
                      color: black,
                      iconSize: 24.0,
                      onPressed: () => Scaffold.of(context).closeEndDrawer(),
                    ),
                  ),
                ),
              ],
            )
          ),

          Expanded(
            child: SingleChildScrollView(
              scrollDirection: Axis.vertical,
              child: Container(
                padding: const EdgeInsets.all(20),
                color: snbBodyBg,
                child: Column(
                  children: <Widget>[
                    Builder(
                      builder: (context) => Column(
                        children: <Widget>[
                          TextButton(
                            style: TextButton.styleFrom(
                              backgroundColor: transparent,
                              foregroundColor: black,
                              padding: const EdgeInsets.fromLTRB(0, 16, 0, 16),
                              textStyle: const TextStyle(fontSize: 16),
                              minimumSize: const Size.fromHeight(40),
                              alignment: Alignment.centerLeft,
                            ),
                            onPressed: () => navigateListPage(context),
                            child: Text('리스트페이지', style: TextStyle(color:defaultText)),
                          ),


                          Row(
                            children: <Widget> [
                              TextButton(
                                style: TextButton.styleFrom(
                                  foregroundColor: black,
                                  textStyle: const TextStyle(fontSize: 14),
                                  padding: EdgeInsets.zero,
                                ),
                                onPressed: () => {
                                  launchUrl( Uri(scheme: 'tel', path: '0421111111') )
                                },
                                child: Text('042-111-1111', style: TextStyle(color: snbDimText)),
                              ),

                              Container(
                                height:14,
                                margin: const EdgeInsets.fromLTRB(6, 0, 9, 0),
                                decoration: BoxDecoration(
                                  border: Border.all(
                                    color: snbDimDivider,
                                    width: 0.5,
                                  ),
                                ),
                              ),

                              TextButton(
                                style: TextButton.styleFrom(
                                  foregroundColor: black,
                                  textStyle: const TextStyle(fontSize: 14),
                                  padding: EdgeInsets.zero,
                                ),
                                onPressed: () => {
                                  launchUrl( Uri(scheme: 'mailto', path: 'test@mokwon.ac.kr') )
                                },
                                child: Text('test@mokwon.ac.kr', style: TextStyle(color: snbDimText)),
                              ),
                            ],
                          ),
                        ]
                      )
                    ),
                  ],
                )
              )
            ),
          ),

        ],
      ),
    );
  }
}