let HomePage = () => import('/.components/HomePage');

export default {
    mode: 'history',

    routes: [
        {
            path: '/',
            component: HomePage
        }
    ]
}