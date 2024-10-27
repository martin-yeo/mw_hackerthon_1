import cookie from "cookie";

class FrontInfo {}

export function buildParams(adminInfo) {
    const cookieObj = cookie.parse((document.cookie));
    const xsrfToken = cookieObj['XSRF-TOKEN']
    const params = {
        method:'post',
        headers: {
            'Content-Type':'application/json',
            'X-XSRF-TOKEN':xsrfToken,
            'Authorization' : `Bearer ${getInfo("token")}`
        },
    };
    // console.log(params);
    return params;
}

export function setInfo(key, value) {
    sessionStorage.setItem(key, value);
}

export function getInfo(key) {
    return sessionStorage.getItem(key);
}

export function clearInfo() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("tenant_type");
}

export default new FrontInfo();

