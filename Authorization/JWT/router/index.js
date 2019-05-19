import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import PageHome from '@/pages/PageHome'
import PageLogin from '@/pages/PageLogin'
import PageRegister from '@/pages/PageRegister'
import PageSecret from '@/pages/PageSecret'
import PageNotAuthenticated from '@/pages/PageNotAuthenticated'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'PageHome',
      component: PageHome
    },
    {
      path: '/meetups/secret',
      name: 'PageSecret',
      component: PageSecret,
      meta: {onlyAuthUser: true}
    },
    {
      path: '/login',
      name: 'PageLogin',
      component: PageLogin,
      meta: { onlyGuestUser: true }
    },
    {
      path: '/register',
      name: 'PageRegister',
      component: PageRegister,
      meta: { onlyGuestUser: true }
    },
    {
      path: '/401',
      name: 'PageNotAuthenticated',
      component: PageNotAuthenticated
    },
  ],
  mode: 'history'
})


router.beforeEach((to, from, next) => {
  // перед заходом на роутер вызываем метод получения текущего пользователя (либо из хранилища либо с сервера, при наличии токена)
  store.dispatch('auth/getAuthUser')
    .then(() => {
      // получаем статус авторизации
      const isAuthenticated = store.getters['auth/isAuthenticated']

      // если в мета передан onlyAuthUser, проверяем авторизован ли пользователь
      if (to.meta.onlyAuthUser) {
        if (isAuthenticated) {
          next()
        } else {
          next({name: 'PageNotAuthenticated'})
        }
        // если в мета передан onlyGuestUser, проверяем не авторизован ли пользователь ранее
      } else if (to.meta.onlyGuestUser) {
        if (isAuthenticated) {
          next({name: 'PageHome'})
        } else {
          next()
        }
      } else {
        next()
      }
    })
})







export default router
