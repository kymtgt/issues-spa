import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import routes from './routes/index'

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

import css from './assets/styles/style.sass'

new Vue({
  router,
}).$mount('#app');