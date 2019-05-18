import moment from 'moment'

Vue.filter('capitalize', function (value) {
    if (value && typeof value === 'string') {
        return value.charAt(0).toUpperCase() + value.slice(1)
    }

    return ''
})


// Пример использования {{post.updatedAt | formatDate('LLL')}} , вывести дату и время
Vue.filter('formatDate', function (value, formatType = 'LL') {
    if (!value) return ''

    return moment(value).format(formatType)
})