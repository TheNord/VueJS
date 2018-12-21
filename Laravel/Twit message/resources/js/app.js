require('./bootstrap');

// подключаем Vue
window.Vue = require('vue');

// подключаем компоненты
Vue.component('form-component', require('./components/FormComponent.vue').default);
Vue.component('timeline-component', require('./components/TimelineComponent.vue').default);

// навешиваем на класс app (layouts.app)
const app = new Vue({
    el: '#app'
});