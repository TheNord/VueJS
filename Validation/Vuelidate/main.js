import Vue from 'vue'

import vuelidate from 'vuelidate'

Vue.use(vuelidate)

new Vue({
  vuelidate,
  render: h => h(App),
}).$mount('#app')