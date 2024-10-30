import { onMount } from "svelte";
import { Router, Link, Route, link, navigate } from 'svelte-routing';
import Paper, { Content } from '@smui/paper';
import LinearProgress from '@smui/linear-progress';
import IconButton, { Icon } from '@smui/icon-button';
import Button, { Group, Label } from '@smui/button';
import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
import Dialog, {Title as DialogTitle, Content as DialogContent, Actions} from '@smui/dialog';
import type { SnackbarComponentDev } from '@smui/snackbar';
import Snackbar from '@smui/snackbar';

import UrlPath from "../../util/FrontUrlPath";
import FrontInfo, { buildParams } from "../../util/FrontInfo";

// page definition
export let num;
const frontPath = UrlPath.front;

let data = {};
let loaded = false;

let open = false;
let snackbar: SnackbarComponentDev;
let message = '';


onMount(()=> loadOne(num));

async function loadOne(reg_no) {
    let params = buildParams(FrontInfo);

    params['body'] = JSON.stringify({
        num:reg_no
    });

    const result = await fetch(`${frontPath.template.one}/${reg_no}`, params);
    const body = await result.json();

    if(result.ok && body) {
        data = body.data;
    } else {
        message = '게시글 로드에 실패했습니다. 다시 시도해 주세요';
        snackbar.open();
    }

    loaded = true;
}
