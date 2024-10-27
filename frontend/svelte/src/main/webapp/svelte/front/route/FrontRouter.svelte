<script lang="ts">
    import { Router, Link, Route, link, navigate } from 'svelte-routing';

    // page definition
    import Main from "../../front/page/main/main.svelte";

    // page routes
    export let url = "";

</script>


<Router url="{url}">
    <Route path="/" component="{Main}" />

    <Route path="/error" component="{Error}" />
</Router>