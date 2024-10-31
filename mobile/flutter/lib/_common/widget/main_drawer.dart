import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class MainDrawer {

  getDrawer(BuildContext context) {
    final double statusBarHeight = MediaQuery.of(context).padding.top;
    // ctx = context;

    return Drawer(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [

        ],
      ),
    );
  }
}