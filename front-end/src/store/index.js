import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import state from './state'
import mutations from './mutations'
import action from './actions'

const vuexPersist = new VuexPersist({
    storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [vuexPersist.plugin],

    state: state,

    mutations: mutations,

    actions: action,

    getters: {},

    modules: {}
})