import { onMount } from "svelte";
import { Router, Link, Route, link, navigate } from 'svelte-routing';
import Button, { Group, Label } from '@smui/button';
import IconButton, { Icon } from '@smui/icon-button';
import { Svg } from '@smui/common/elements';


// page definition


onMount(() => {
    document.body.scrollTo(0,0);
})
// navigate(`/admin/${path}`);


function navigateList() {
    navigate(`/front/list`);
}

function navigateOne(num) {
    navigate(`/front/one/${num}`);
}

function navigateInsert() {
    navigate(`/front/insert`);
}

function navigateUpdate(num) {
    navigate(`/front/update/${num}`);
}

function navigateDelete(num) {
    navigate(`/front/delete/${num}`);
}