<script lang="ts">
    import { Router, Link, Route, link, navigate } from 'svelte-routing';

    // page definition
    import Main from "../../front/page/main/main.svelte";
    // import 컴포넌트이름 from "파일경로기입";

    import TemplateList from "../../front/page/template/list.svelte";
    import TemplateOne from "../../front/page/template/one.svelte";
    import TemplateInsert from "../../front/page/template/insert.svelte";
    import TemplateUpdate from "../../front/page/template/update.svelte";
    import TemplateDelete from "../../front/page/template/delete.svelte";

    // page routes
    export let url = "";
</script>


<Router url="{url}">
    <Route path="" component="{Main}" />
    <Route path="/" component="{Main}" />

    <!-- 여기에 Route와 path, component 기입 -->
    <!-- <Route path="경로" component="{컴포넌트이름}"/> -->

    <!-- template path start -->
    <Route path="/front/list" component="{TemplateList}" />
    <Route path="/front/one/:num" component="{TemplateOne}" />
    <Route path="/front/insert" component="{TemplateInsert}" />
    <Route path="/front/update/:num" component="{TemplateUpdate}" />
    <Route path="/front/delete/:num" component="{TemplateDelete}" />
    <!-- template path end -->

    <Route path="/error" component="{Error}" />
</Router>