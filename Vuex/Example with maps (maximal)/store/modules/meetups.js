import axios from 'axios'

export default {
  // устанавливаем неймспейс в true, чтобы все модули vuex были уникальн внутри себя
  // обращение к модулям будет также происходить по имени
  // пример:  this.$store.dispatch('meetups/fetchMeetups')
  // либо через mapActions ...mapActions('meetups', ['fetchMeetups'])
  namespaced: true,

  state: {
    items: [],
    item: {}
  },
  actions: {
    // получаем все митапы
    fetchMeetups ({state, commit}) {
      // предварительно удаляем все ранее установленные митапы
      // вызываем мутацию у рута, передаем в качестве ресурса meetups и пустой массив
      commit('setItems', {resource: 'meetups', items: []}, {root: true})
      axios.get('/api/v1/meetups')
        .then(res => {
          const meetups = res.data
          commit('setItems', {resource: 'meetups', items: meetups}, {root: true})
          return state.meetups
        })
    },
    fetchMeetupById ({state, commit}, meetupId) {
      commit('setItem', {resource: 'meetups', item: {}}, {root: true})
      axios.get(`/api/v1/meetups/${meetupId}`)
        .then(res => {
          const meetup = res.data
          commit('setItem', {resource: 'meetups', item: meetup}, {root: true})
          return state.meetup
        })
    }
  }
}
