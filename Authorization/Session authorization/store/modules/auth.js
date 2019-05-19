import axios from 'axios'

export default {
    namespaced: true,
    state: {
        user: null,
        isAuthResolved: false
    },
    getters: {
        // получение текущего пользователя
        authUser(state) {
            return state.user || null
        },
        // авторизован ли текущий пользователь
        isAuthenticated(state) {
            return !!state.user
        }
    },
    actions: {
        loginWithEmailAndPassword({commit}, userData) {
            return axios.post('/api/v1/users/login', userData)
                .then(res => {
                    const user = res.data
                    commit('setAuthUser', user)
                })
        },
        registerUser(context, userData) {
            return axios.post('/api/v1/users/register', userData)
        },
        logout({commit}) {
            return axios.post('/api/v1/users/logout')
                .then(() => {
                    commit('setAuthUser', null)
                    return true
                })
                .catch(err => {
                    return err
                })
        },
        getAuthUser({commit, getters}) {
            // перед отправкой запроса на проверку статуса авторизаци
            // сперва проверим нет ли в хранилище данных (ранее уже отправляли запрос на проверку)
            const authUser = getters['authUser']
            if (authUser) {
                // если ранее пользователь был получен то просто возращаем его с зарезолвленным промисом
                return Promise.resolve(authUser)
            }

            // отключаем кэширование запросов
            // это нужно на случай если пользователь например сделает логаут, и нажмет на кнопку назад в браузере
            // чтобы данные не взялись из кэша мы отменяем его и заного запрашиваем у сеорвера статус авторизации
            const config = {
                headers: {
                    'Cache-Control': 'no-cache'
                }
            }

            // отправляем на сервер запрос который сообщит о статусе авторизации текущего пользователя
            return axios.get('/api/v1/users/me', config)
                .then((res) => {
                    // сюда придет либо пользователь, либо null (false)
                    const user = res.data
                    commit('setAuthUser', user)
                    commit('setAuthState', true)
                    return user
                })
                .catch(err => {
                    commit('setAuthUser', null)
                    commit('setAuthState', true)
                    return err
                })
        }
    },
    mutations: {
        // сохраняем текущего пользователя
        setAuthUser(state, user) {
            return state.user = user
        },
        // сохраняем статус запроса на получение данных о пользователе
        setAuthState(state, authState) {
            return state.isAuthResolved = authState
        }
    }
}












