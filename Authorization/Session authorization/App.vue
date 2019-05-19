<template>
    <!--ожидаем пока выполнится проверка статуса авторизации-->
    <!--проверка присходит автоматически перед заходом на каждый из роутов-->
    <div v-if="isAuthResolved" id="app">
        <TheNavbar />
        <div class="page-wrapper">
            <router-view />
        </div>
        <TheFooter />
    </div>
</template>

<script>
    import TheNavbar from '@/components/shared/TheNavbar'
    import TheFooter from '@/components/shared/TheFooter'
    export default {
        name: 'app',
        components: {
            TheNavbar,
            TheFooter
        },
        computed: {
            isAuthResolved () {
                return this.$store.state.auth.isAuthResolved
            }
        }
    }
</script>