class EndPoint {
  // static const DOMAIN = "http://    :8080";  // JAVA
  // static const DOMAIN = "http://    :8000";  // Python-django
  static const DOMAIN = "http://    :3000";     // Nodejs
  static const END_POINT = "${DOMAIN}/api/front";



  // END POINT - DB template
  static const LIST = "${END_POINT}/list";
  static const ONE = "${END_POINT}/one";
  static const INSERT = "${END_POINT}/insert";
  static const UPDATE = "${END_POINT}/update";
  static const DELETE = "${END_POINT}/delete";
}