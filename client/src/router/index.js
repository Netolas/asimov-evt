import Vue from 'vue'
import Router from 'vue-router'
import QRPayment from '@/components/QRPayment'
import Temporizer from '@/components/Temporizer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'QRPayment',
      component: QRPayment
    },
    {
      path: '/tiempo',
      name: 'Temporizer',
      component: Temporizer
    }
  ]
})
