import io from 'socket.io-client'

const AppSocket = {
  install (Vue, options) {

    Vue.prototype.$socket = io(options.connection)
  }
}

export default AppSocket


// Usage 

import AppSocket from './plugins/socket'

Vue.use(AppSocket, {connection: process.env.VUE_APP_URI})
