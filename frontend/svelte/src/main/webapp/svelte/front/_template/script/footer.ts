import {onMount} from "svelte";
import { Router, Link, Route, link, navigate } from 'svelte-routing';

import UrlPath from "../util/FrontUrlPath";
import FrontInfo, { setInfo, getInfo, clearInfo, buildParams } from "../util/FrontInfo";
const frontPath = UrlPath.front;

onMount(() => {
});