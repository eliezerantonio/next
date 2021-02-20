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
    {
        meta: { protected: true },
        path: '/jobs/:id/application/new',
        name: 'ApplicationsNew',

        component: () =>
            import ('../views/ApplicationNew.vue')
    },
    {
        meta: { protected: true },
        path: '/jobs/:id/application/:applicationId/edit',
        name: 'ApplicationEdit',

        component: () =>
            import ('../views/ApplicationEdit.vue')
    },

    {
        meta: { protected: true },
        path: '/jobs/:id/show',
        name: 'JobsShow',

        component: () =>
            import ('../views/JobsView.vue')
    }, {
        meta: { protected: true },
        path: '/jobs/new',
        name: 'JobsNew',

        component: () =>
            import ('../views/JobsNew.vue')
    }, {
        meta: { protected: true },
        path: '/jobs/:id/edit',
        name: 'JobsEdit',

        component: () =>
            import ('../views/JobsEdit.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { protected: true }
    }, {
        children: [{
            meta: { protected: true },
            path: '',
            component: () =>
                import ('../views/parts/ProfileHome.vue'),
        }, {
            meta: { protected: true },
            path: 'skills',
            component: () =>
                import ('../views/parts/ProfileSkills.vue'),
        }, {

            path: 'portfolios',
            component: () =>
                import ('../views/parts/ProfilePortfolios.vue'),
        }, {
            meta: { protected: true },
            path: 'pic',
            component: () =>
                import ('../views/parts/ProfilePic.vue'),
        }, ],
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