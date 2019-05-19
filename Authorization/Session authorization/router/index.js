import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import PageLogin from '@/pages/PageLogin'
import PageRegister from '@/pages/PageRegister'
import PageSecret from '@/pages/PageSecret'
import PageNotAuthenticated from '@/pages/PageNotAuthenticated'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/meetups/secret',
      name: 'PageSecret',
      component: PageSecret,
      meta: { onlyAuthUser: true }
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

// перед заходом на любой из роутеров выполняем функцию
router.beforeEach((to, from, next) => {
  // инициализурем получение информации о текущем пользователе (авторизацию)
  store.dispatch('auth/getAuthUser')
    .then(() => {
      // получаем статус аутентификации
      const isAuthenticated = store.getters['auth/isAuthenticated']

      // если в мета указан параметр onlyAuthUser, то проверяем авторизован ли пользователь
      if (to.meta.onlyAuthUser) {
        // если авторизован переключаем на следующую страницу
        if (isAuthenticated) {
          next()
          // если нет, то выводим страницу о необходимости авторизации
        } else {
          next({name: 'PageNotAuthenticated'})
        }
        // если в мета указан параметр onlyGuestUser, то проверяем не авторизован ли пользователь (гость)
      } else if (to.meta.onlyGuestUser) {
        // если авторизован, перекидываем на главную страницу
        if (isAuthenticated) {
          next({name: 'PageHome'})
        } else {
          // если не авторизован открываем страницу
          next()
        }
      // если никаких мета проверок нет то просто открываем страницу
      } else {
        next()
      }
    })
})







export default router
