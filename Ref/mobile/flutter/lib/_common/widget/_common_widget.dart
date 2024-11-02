import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

import '../constant/common_constant.dart';

/**
 * get image widget
 * strAsset : an asset path in String
 * width : width of an image
 * height : height of an image
 * isSvg : check whether asset file is SVG format or not
 * needImageWrap : wrap "Image" Widget for AssetImage (isSvg must be false)
 */
getImageWidget(strAsset, _width, _height, isSvg, needImageWrap, option) {
  if(isSvg) {
    return SvgPicture.asset(
      strAsset,
      width: _width != null ? _width.toDouble() : null,
      height : _height != null ? _height.toDouble() : null,
      color: option['color'] ?? option['color'],
      alignment: option['alignment'] != null ?  option['alignment'] : Alignment.center,
    );
  } else {
    if(needImageWrap) {
      return Image(
        image: AssetImage(
          strAsset,
        ),
        width: _width != null ? _width.toDouble() : null,
        height : _height != null ? _height.toDouble() : null,
        fit: option['fit'] ?? option['fit']
      );
    } else {
      return Image.asset(
        strAsset,
        fit: option['fit'] ?? option['fit']
      );
    }
  }
}

/**
 * get Appbar border
 */
getAppbarBorder() {
  return Border(
    bottom: BorderSide(
      color: appbarBorder,
      width: 2
    )
  );
}


/**
 * get Bottom Modal Sheet
 * options:
 *  title : modal title
 *  subtitle : modal subtitle
 *  message ; modal message
 *  hasClose : display cancel image button on upper right corner
 *  hasCancel : display cancel button
 *  isDismissible : set modal make dismissible when touch backdrop, default : true
 *  enableDrag : set drag feature to close by drag, default : true
 */

showBottomModal(BuildContext context, var options) {
  return showModalBottomSheet(
    context: context,
    isDismissible: options['isDismissible'] != null ? options['isDismissible'] : true,
    enableDrag: options['enableDrag'] != null ? options['enableDrag'] : true,
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.only(
        topLeft: Radius.circular(10),
        topRight: Radius.circular(10),
      ),
    ),
    backgroundColor: white,
    builder: (context) {
      return Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Text(options['title'], style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600)),

                ((){
                  if(options['hasClose']) {
                    return IconButton(
                      constraints: const BoxConstraints(),
                      padding: EdgeInsets.zero,
                      icon: const Icon(Icons.close),
                      color: black,
                      iconSize: 24.0,
                      onPressed: () {
                        Navigator.pop(context, {
                          "result" : false
                        });
                      }
                    );
                  } else {
                    return Container();
                  }
                })(),
              ]
            ),

            ((){
              if(options['subtitle'] != null) {
                return
                  Container(
                    margin: const EdgeInsets.fromLTRB(0, 20, 0, 0),
                    // padding: const EdgeInsets.symmetric(horizontal: 0, vertical: 16),
                    child: Text(options['subtitle'], style: const TextStyle(fontSize:16)),
                  );
              } else {
                return Container();
              }
            })(),

            ((){
              if(options['message'] != null) {
                return Row(
                  children: <Widget>[
                    Expanded(
                      child:Container(
                      // color: const Color(0xFFF8F9FB),
                        margin: const EdgeInsets.fromLTRB(0, 16, 0, 16),
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: bgMsgDetail,
                          borderRadius: BorderRadius.circular(10)
                        ),
                        child: Center(
                          child: Text(options['message'], style: TextStyle(color:defaultEnabled, fontSize:16)),
                        )
                      )
                    ),
                  ]
                );
              } else {
                return Container();
              }
            })(),

            ((){
              if(options['hasCancel']) {
                return Row(
                  children: <Widget>[
                    Flexible(
                      child: TextButton(
                        style: TextButton.styleFrom(
                          backgroundColor: bgBtnSecondary,
                          foregroundColor: black,
                          padding: const EdgeInsets.fromLTRB(0, 20, 0, 20),
                          textStyle: const TextStyle(fontSize: 17),
                          minimumSize: const Size.fromHeight(50),
                        ),
                        onPressed: () {
                          Navigator.pop(context, {
                            "result" : false
                          });
                        },
                        child: Text(strCancel),
                      ),
                    ),
                    Container(
                      margin: const EdgeInsets.fromLTRB(10, 0, 0, 10),
                    ),
                    Flexible(
                      child: TextButton(
                        style: TextButton.styleFrom(
                          backgroundColor: defaultEnabled,
                          foregroundColor: white,
                          padding: const EdgeInsets.fromLTRB(0, 20, 0, 20),
                          textStyle: const TextStyle(fontSize: 17),
                          minimumSize: const Size.fromHeight(50),
                        ),
                        onPressed: () {
                          Navigator.pop(context, {
                            "result" : true
                          });
                        },
                        child: Text(strConfirm),
                      ),
                    ),
                  ]
                );
              } else {
                return Row(
                  children: <Widget>[
                    Flexible(
                      child: TextButton(
                        style: TextButton.styleFrom(
                          backgroundColor: defaultEnabled,
                          foregroundColor: white,
                          padding: const EdgeInsets.fromLTRB(0, 20, 0, 20),
                          textStyle: const TextStyle(fontSize: 17),
                          minimumSize: const Size.fromHeight(50),
                        ),
                        onPressed: () {
                          Navigator.pop(context, {
                            "result" : true
                          });
                        },
                        child: Text(strConfirm),
                      ),
                    ),
                  ]
                );
              }
            })(),
          ]
        )
      );
    }
  );
}













