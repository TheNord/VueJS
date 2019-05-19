import axios from 'axios'
import jwt from 'jsonwebtoken'
import axiosInstance from '@/services/axios'

function checkTokenValidity(token) {
    if (token) {
        const decodedToken = jwt.decode(token)

        return decodedToken && (decodedToken.exp * 1000) > new Date().getTime()
    }

    return false
}


export default {
    namespaced: true,
    state: {
        user: null,
        isAuthResolved: false
    },
    getters: {
        authUser(state) {
            return state.user || null
        },
        isAuthenticated(state) {
            return !!state.user
        }
    },
    actions: {
        loginWithEmailAndPassword({commit}, userData) {
            return axios.post('/api/v1/users/login', userData)
                .then(res => {
                    const user = res.data
                    // записываем токен в локальное хранилище
                    localStorage.setItem('meetuper-jwt', user.token)
                    // сохраняем пользователя в стор
                    commit('setAuthUser', user)
                })
        },
        registerUser(context, userData) {
            return axios.post('/api/v1/users/register', userData)
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                // удаляем токен их хранилища
                localStorage.removeItem('meetuper-jwt')
                commit('setAuthUser', null)
                resolve(true)
            })
        },
        getAuthUser({commit, getters}) {
            const authUser = getters['authUser']
            // перед запросом информации о авторизации с сервера, получаем их хранилища токен
            const token = localStorage.getItem('meetuper-jwt')
            // проверяем его валидность
            const isTokenValid = checkTokenValidity(token)

            // если пользователь есть  и токен валидный - возвращаем пользователя
            if (authUser && isTokenValid) {
                return Promise.resolve(authUser)
            }

            const config = {
                headers: {
                    'Cache-Control': 'no-cache'
                }
            }

            // если данных о пользователе нет в хранилище или токен истёк (или не валидный) то делаем запрос на сервер
            // сервер в свою очередь вернет информацию о текущем пользователе и новый (либо старый) токен,
            // при условии что в запросе был передан заголовок авторизации (добавляется в axiosInstance)
            // если заголовка не было - сервер вернет ошибку и значит пользователь - гость
            return axiosInstance.get('/api/v1/users/me', config)
                .then((res) => {
                    const user = res.data
                    // получаем данные о пользователе с сервера
                    // сохраяем пользователя в vuex и его токен в локальное хранилище
                    localStorage.setItem('meetuper-jwt', user.token)
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
        setAuthUser(state, user) {
            return state.user = user
        },
        setAuthState(state, authState) {
            return state.isAuthResolved = authState
        }
    }
}












