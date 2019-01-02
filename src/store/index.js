import Vue from 'vue';
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import indexStore from './indexStore/indexStore';
import upload from './upload/upload'
Vue.use(Vuex);
const store = new Vuex.Store({
    modules:{
        indexStore,
        upload
    },
    plugins: [createLogger()]
})
export default store