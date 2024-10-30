import { onMount } from "svelte";
import { Router, Link, Route, link, navigate } from 'svelte-routing';

import { Input } from '@smui/textfield';
import Paper from '@smui/paper';

import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
import Select, { Option } from '@smui/select';
import Checkbox from '@smui/checkbox';
import IconButton, {Icon as IconButtonIC} from '@smui/icon-button';
import { Label, Icon } from '@smui/common';
import Dialog, {Title as DialogTitle, Content as DialogContent, Actions} from '@smui/dialog';
import Button, { Label as BtnLabel } from '@smui/button';
import LinearProgress from '@smui/linear-progress';
import type { SnackbarComponentDev } from '@smui/snackbar';
import Snackbar from '@smui/snackbar';

import UrlPath from "../../util/FrontUrlPath";
import FrontInfo, { buildParams } from "../../util/FrontInfo";

// page definition
export let num;
const frontPath = UrlPath.front;

$: list = [];
let loaded = false;

let open = false;
let snackbar: SnackbarComponentDev;
let message = '';

onMount(()=> loadList());

async function loadList() {
    let params = buildParams(FrontInfo);
    params['method'] = 'get'; // get/post/put/delete 방식

    const result = await fetch(`${frontPath.template.list}`, params);
    const body = await result.json();

    if(result.ok && body) {
        list = body.list;
    } else {
        message = '게시글 로드에 실패했습니다. 다시 시도해 주세요';
        snackbar.open();
    }

    loaded = true;
}
