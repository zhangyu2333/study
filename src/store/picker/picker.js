import {cityList,costList} from '@/api/index';

const state = {

    cityList: [],

    costList: [],

    city: [],

    cost: [],

    money: ''
}

const mutations = {
    updateState(state, action){
        if (Object.keys(action)[0] == 'cost'){
            let value = action.cost;
            console.log(value)
            let proIndex = state.costList.findIndex(item=>item.name==value[0]),
            cityIndex = state.costList[proIndex].list.findIndex(item=>item.name==value[1]);
            
            state.money = state.costList[proIndex].list[cityIndex].cost;
            console.log(state.money)
        }
        state = Object.assign(state, action);
    }
}
const actions = {
    async getCityList({commit}){
        let res = await cityList();
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