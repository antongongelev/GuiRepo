import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Clients from "./components/Clients";
import ClientsTable from "./components/ClientsTable";
import ClientDialog from "./components/ClientDialog";
import AdminPage from "./components/AdminPage";


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminPage
        },
        {
            path: '/dialog',
            name: 'dialog',
            component: ClientDialog
        },
        {
            path: '/clients',
            name: 'clients',
            component: Clients
        },
        {
            path: '/get-all-clients',
            name: 'get-all-clients',
            component: ClientsTable
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: function () {
                return import(/* webpackChunkName: "about" */ './views/About.vue')
            }
        }
    ]
})
