const state = {
    num:10000
}

const mutations = {
    changeNum(state,action){
        state.num = action === '+'? ++state.num : --state.num;
    }
}

const getters = {
    formatNum:state => {
        const reg = /(?=(?!(\b))(\d{3})+$)/g;
        return state.num.toString().replace(reg,',')
    }
}
const actions = {
    changeNumAsync:(store,action)=>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
                store.commit('changeNum', action)
                resolve(111)
            },1000)
        })
    }
}

export default {
    namespaced: true,
    mutations,
    getters,
    actions,
    state
}