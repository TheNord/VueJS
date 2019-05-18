import Vue from 'vue'
import Vuex from 'vuex'

import meetups from './modules/meetups'
import threads from './modules/threads'
import categories from './modules/categories'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    meetups,
    categories,
    threads
  },
  mutations: {
    // инициализируем необходимые данные (state, новости)
    setItems (state, {resource, items}) {
      state[resource].items = items
    },
      // инициализурем необходимый единичный объект (state, новость)
    setItem (state, {resource, item}) {
      state[resource].item = item
    }
  }
})
