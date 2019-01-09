import Vue from 'vue'
import Router from 'vue-router'
import ums from '../pages/Umschreibung/Umschreibung'
import doc from '../pages/doc/doc';
import writeAddress from '../pages/writeAddress/writeAddress';
import upLoad from '../pages/canvas/canvasImg.vue';
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'ums',
            // component: ()=>import('../pages/Umschreibung/Umschreibung'),
            component:ums
        },
        {
            path:'/doc',
            name:'doc',
            // component:()=>import('../pages/doc/doc'),
            component:doc
        },
        {
            path:'/writeAddress',
            name:'writeAddress',
            // component:()=>import('../pages/writeAddress/writeAddress'),
            component:writeAddress
        },
        {
            path:'/upload',
            name:'upload',
            component:upLoad
        }
    ]
})