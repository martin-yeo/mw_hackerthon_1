import { onMount, afterUpdate } from "svelte";
import { Router, Link, Route, link, navigate } from 'svelte-routing';
import List, { Item, Text } from '@smui/list';

import UrlPath from "../util/FrontUrlPath";
import FrontInfo, { setInfo, getInfo, clearInfo, buildParams } from "../util/FrontInfo";
const frontPath = UrlPath.front;

export let pathname;
let currentmenu = '';

let isMgrConsoleVisible = false;

onMount(() => {
    currentmenu = pathname;

    determineMgrConsoleVisible();
});

afterUpdate(() => {
    currentmenu = pathname;
});

function navigatePath(path) { // append slash to router for push navigation
    currentmenu = path;
    navigate(`/member/${path}`);
}

async function determineMgrConsoleVisible() {
    let params = buildParams(FrontInfo);

    const result = await fetch(frontPath.member.chkMgrConsole, params);
    const body = await result.json();

    if(result.ok && body.result) {
        isMgrConsoleVisible = body['isSnbVisible'];
    }
}