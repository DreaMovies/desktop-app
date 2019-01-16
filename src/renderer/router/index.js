import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/components/').default
    },
    {
      path: '/local-media',
      name: 'local-media',
      component: require('@/components/localMedia').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
