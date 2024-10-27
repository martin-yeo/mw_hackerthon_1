package kr.ac.mokwon.javaspring.web.util.string;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegularExpressionChecker {
    public static final String pattern1 = "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*#?&])[A-Za-z[0-9]$@$!%*#?&]{8,20}$"; // 영문, 숫자, 특수문자
    public static final String pattern2 = "^[A-Za-z[0-9]]{10,20}$"; // 영문, 숫자
    public static final String pattern3 = "^[[0-9]$@$!%*#?&]{10,20}$"; //영문, 특수문자
    public static final String pattern4 = "^[[A-Za-z]$@$!%*#?&]{10,20}$"; // 특수문자, 숫자
    public static final String pattern5 = "(\\w)\\1\\1\\1"; // 같은 문자, 숫자
    public static final String emailPattern = "^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$"; // 이메일 패턴

    Matcher match;

    public boolean pwdRegularExpressionChk(String passwd) {
        boolean chk = false;

        // 특수문자, 영문, 숫자 조합 (8~20 자리)
        match = Pattern.compile(pattern1).matcher(passwd);

        if (match.find()) {
            chk = true;
        }

        return chk;
    }

    public boolean validateEmailAddress(String email) {
        boolean chk = false;

        // 이메일 패턴 체크
        match = Pattern.compile(emailPattern).matcher(email);

        if (match.find()) {
            chk = true;
        }

        return chk;
    }

}
