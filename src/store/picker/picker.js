import {cityList,costList} from '@/api/index';

const state = {
    cityinit:[],
    cityList: [],
    costList: [],
    city: [],
    cost: [],

    money: '399'
}

const mutations = {
    updateState(state, action){
        if (Object.keys(action)[0] == 'cost'){
            let value = action.cost;
            let proIndex = state.costList.findIndex(item=>item.name==value[0]),
            cityIndex = state.costList[proIndex].list.findIndex(item=>item.name==value[1]);
            state.money = state.costList[proIndex].list[cityIndex].cost;
        }
        state = Object.assign(state, action);
    }
}
const actions = {
    async getCityList({commit,state}){
        let res = await cityList();
            state.cityinit = JSON.parse(JSON.stringify(res.data));
            console.log(state.cityinit)
            res.data.forEach(item=>{
            item.list.forEach(value=>{ 
                delete value.list;
            })
        })
        commit('updateState', {cityList: res.data})
    },
    async getCarCityList({commit,state}, action){
        let proIndex = state.cityList.findIndex(item=>item.name==state.city[0]);
        let cityIndex = state.cityList[proIndex].list.findIndex(item=>item.name==state.city[1]);
        let res = await costList(1, state.cityList[proIndex].id, state.cityList[proIndex].list[cityIndex].id);
        res.data.forEach(item=>{
            if (item.source_city == 1){
                item.name += '(签发地)'
                item.list.forEach(value=>{
                    if (value.source_city == 1){
                        value.name += '(签发地)'
                    }
                })
            }
        })
        commit('updateState', {costList: res.data})
        console.log('res.....', res);
        }
}
export default {
    namespaced: true,
    mutations,
    actions,
    state,
}