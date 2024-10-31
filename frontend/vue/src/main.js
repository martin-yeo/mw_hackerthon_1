import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMoment from 'vue-moment'
import App from './App.vue'
import { BootstrapVue, IconsPlugin, BLink } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter)
Vue.use(VueMoment)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('b-link', BLink)

Vue.config.productionTip = false


import Index from './components/template/index.vue'
import TemplateList from './components/template/article/list.vue';
import TemplateOne from './components/template/article/one.vue';
import TemplateInsert from './components/template/article/insert.vue';
import TemplateUpdate from './components/template/article/update.vue';
import TemplateDelete from './components/template/article/delete.vue';

const router = new VueRouter({
    routes:[
        { path:'/', component:Index },
        { path:'/template/list', component:TemplateList, props:true },
        { path:'/template/one/:num', component:TemplateOne, props:true },
        { path:'/template/insert', component:TemplateInsert, props:true },
        { path:'/template/update', component:TemplateUpdate, props:true },
        { path:'/template/delete', component:TemplateDelete, props:true },
    ]
});

new Vue({
    render: h => h(App),
    router: router,
}).$mount('#app');

