import Vue from 'vue'
import Router from 'vue-router'
import ums from '../pages/Umschreibung/Umschreibung'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'ums',
            component: ums,
        }
    ]
})