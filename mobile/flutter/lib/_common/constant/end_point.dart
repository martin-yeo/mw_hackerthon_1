class EndPoint {
  // static const DOMAIN = "http://    :8080";  // JAVA
  static const DOMAIN = "http://172.30.1.63:8000";  // Python-django
  // static const DOMAIN = "http://    :3000";     // Nodejs
  static const END_POINT = "${DOMAIN}/api/front";



  // END POINT - DB template
  static const TEMPLATE_LIST = "${END_POINT}/list";
  static const TEMPLATE_ONE = "${END_POINT}/one";
  static const TEMPLATE_INSERT = "${END_POINT}/insert";
  static const TEMPLATE_UPDATE = "${END_POINT}/update";
  static const TEMPLATE_DELETE = "${END_POINT}/delete";
}