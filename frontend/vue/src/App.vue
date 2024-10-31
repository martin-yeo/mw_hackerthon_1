<template>
  <div id="app" class="h-100">
    <TemplateHeader/>
    <TemplateBody/>
    <TemplateFooter/>
  </div>
</template>

<script>
import TemplateHeader from './components/template/template/header.vue';
import TemplateBody from './components/template/template/body.vue';
import TemplateFooter from './components/template/template/footer.vue';

export default {
  name: 'App',
  components: {
    TemplateHeader,
    TemplateBody,
    TemplateFooter
  }
}
</script>
<style>
html, body{height:100%}
</style>