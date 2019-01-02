import Vue from 'vue';
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import indexStore from './indexStore/indexStore';
Vue.use(Vuex);
const store = new Vuex.Store({
    modules:{
        indexStore
    },
    plugins: [createLogger()]
})
export default store