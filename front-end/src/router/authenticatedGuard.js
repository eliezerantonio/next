export default (router, store) => {

    router.beforeEach((to, from, next) => {

        if (to.meta.protected && !store.state.authenticated) {
            return next('/login')
        }
        return next()
    })
}