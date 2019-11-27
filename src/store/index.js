import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        StatusBarHeight: 64,
    },
    mutations: {
        getHeaderHeight(state, data){
            state.StatusBarHeight = data
        }
    },
    plugins: [vuexLocal.plugin]
})
