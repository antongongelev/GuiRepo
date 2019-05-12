import Vue from 'vue'
import Router from 'vue-router'
import ClientsTable from "./components/ClientsTable";

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/clients',
            name: 'clients',
            component: ClientsTable
        },

    ]
})
