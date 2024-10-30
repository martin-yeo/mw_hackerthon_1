import { onMount } from "svelte";
import { Router, Link, Route, link, navigate } from 'svelte-routing';
import Paper, { Content } from '@smui/paper';
import LinearProgress from '@smui/linear-progress';
import IconButton, { Icon } from '@smui/icon-button';
import Button, { Group, Label } from '@smui/button';
import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
import Dialog, {Title as DialogTitle, Content as DialogContent, Actions} from '@smui/dialog';
import Textfield from '@smui/textfield';
import type { SnackbarComponentDev } from '@smui/snackbar';
import Snackbar from '@smui/snackbar';

// import icon components
import { Svg } from '@smui/common/elements';
import { mdiLogin, mdiWeatherSunny, mdiWeatherNight, mdiArrowLeft } from '@mdi/js';

import UrlPath from "../../util/FrontUrlPath";
import FrontInfo, { buildParams } from "../../util/FrontInfo";

// page definition
const frontPath = UrlPath.front;

let data = {};
let loaded = false;

let open = false;
let snackbar: SnackbarComponentDev;
let message = '';

// page definition
let num = 0;
let name = '';

onMount(() => {

});


async function update() {
    loaded = false;
    let params = buildParams(FrontInfo);
    params['method'] = 'put';

    params['body'] = JSON.stringify({
        num:num,
        name:name
    });

    const result = await fetch(`${frontPath.template.update}`, params);
    const body = await result.json();

    loaded = true;
    if(result.ok && body) {
        backToList();
    } else {
        message = '게시글 등록에 실패했습니다. 다시 시도해 주세요';
        snackbar.open();
    }
}

function backToList() {
    navigate('/front', { replace: true });
}