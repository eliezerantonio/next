import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Profile from '../views/Profile.vue'



Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',

        component: () =>
            import ('../views/About.vue')
    },
    // Nova aplicacao
    {
        meta: { protected: true },
        path: '/jobs/:id/application/new',
        name: 'ApplicationsNew',

        component: () =>
            import ('../views/ApplicationNew.vue')
    },
    //editar aplicacao
    {
        meta: { protected: true },
        path: '/jobs/:id/application/:applicationId/edit',
        name: 'ApplicationEdit',

        component: () =>
            import ('../views/ApplicationEdit.vue')
    },
    //mostrar jobs
    {
        meta: { protected: true },
        path: '/jobs/:id/show',
        name: 'JobsShow',

        component: () =>
            import ('../views/JobsView.vue')
    },
    //novo job
    {
        meta: { protected: true },
        path: '/jobs/new',
        name: 'JobsNew',

        component: () =>
            import ('../views/JobsNew.vue')
    },
    //editar jobs
    {
        meta: { protected: true },
        path: '/jobs/:id/edit',
        name: 'JobsEdit',

        component: () =>
            import ('../views/JobsEdit.vue')
    },

    //Registar
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    ///Login
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    // Dashboard
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { protected: true }
    },
    // Perfil
    {
        children: [{
                meta: { protected: true },
                path: '',
                component: () =>
                    import ('../views/parts/ProfileHome.vue'),
            },
            //skills

            {
                meta: { protected: true },
                path: 'skills',
                component: () =>
                    import ('../views/parts/ProfileSkills.vue'),
            },
            //Porfolio
            {

                path: 'portfolios',
                component: () =>
                    import ('../views/parts/ProfilePortfolios.vue'),
            },
            //Foto perfil

            {
                meta: { protected: true },
                path: 'pic',
                component: () =>
                    import ('../views/parts/ProfilePic.vue'),
            },
        ],
        name: 'Profile',
        path: '/profile/:userId',
        component: Profile,
        meta: { protected: true }

    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router