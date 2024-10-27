import cookie from "cookie";

import { onMount, onDestroy } from "svelte";
import { Router, Link, Route, link, navigate } from 'svelte-routing';
import { globalHistory } from 'svelte-routing/src/history';

// page definition
import Header from "../../_template/header.svelte";
import Footer from "../../_template/footer.svelte";
import Snb from "../../_template/snb.svelte";
import FrontRouter from "../../route/FrontRouter.svelte";

import FrontInfo, { setInfo, getInfo } from "../../util/FrontInfo";
import { loginInfo } from "../../util/store";

$: isAuth = false;

let pathname = window.location.pathname;
let unsub;
let tenantType = -1;

const info = loginInfo.subscribe(info=>{
    let isAuth = (info.id !== null && info.token !== null) || (getInfo("token") && getInfo("name"));

    if(isAuth) {
        tenantType = getInfo("tenant_type");
    } else {
        tenantType = -1;
    }
});

// onDestroy(info);
let checkPathName;

onMount(() => {
    // checkAuth();
    unsub = globalHistory.listen(({ location, action }) => {
        pathname = location.pathname;

        checkPathName = pathname.indexOf('/member') !== -1
            && pathname.indexOf('/member/login') === -1
            && pathname.indexOf('/member/join') === -1
            && pathname.indexOf('/member/auth') === -1
            && pathname.indexOf('/member/withdraw_success') === -1
            && pathname.indexOf('/member/withdraw_fail') === -1
            && pathname.indexOf('/member/join_success') === -1
            && pathname.indexOf('/member/join_error') === -1;
    });
});

onDestroy(() => {
    unsub();
});

function checkAuth() {
    const name = getInfo("name");
    const token = getInfo("token");
    isAuth = name !== null && token !== null;

    if(isAuth) loginInfo.set({id:name, token:token});
    // return isAuth;
}

