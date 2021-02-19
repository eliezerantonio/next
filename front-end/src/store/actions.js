export default {
    login(context, {
        user,
        token
    }) {
        context.commit('setUser', user)
        context.commit('setToken', token)
        context.commit('setAuthenticated', true)
    },

    logout(context) {
        context.commit('setUser', {})
        context.commit('setToken', null)
        context.commit('setAuthenticated', false)
    }
}