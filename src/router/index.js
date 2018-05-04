import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home/home.vue'
import admin from '../components/home/admin.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', redirect: "/home"},
    {path: '/home', component: home},
    {path: '/admin', component: admin},
  ]
})
