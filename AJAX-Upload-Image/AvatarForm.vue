<template>
    <div>
        <div class="level">
            <img :src="avatar" width="50" height="50" class="mr-1">

            <h1 v-text="user.name"></h1>
        </div>

        <form v-if="canUpdate" method="POST" enctype="multipart/form-data">
            <image-upload name="avatar" class="mr-1" @loaded="onLoad"></image-upload>
        </form>

    </div>
</template>

<script>
    import ImageUpload from './ImageUpload.vue';

    export default {
        props: ['user'],

        components: { ImageUpload },

        data() {
            return {
                avatar: this.user.avatar_path
            };
        },

        computed: {
            canUpdate() {
                return this.authorize(user => user.id === this.user.id);
            }
        },

        methods: {
            onLoad(avatar) {
                // после загрузки файла устанавливаем его в качестве аватара
                this.avatar = avatar.src;
                // вызываем функцию загрузки на сервер
                this.persist(avatar.file);
            },

            persist(avatar) {
                // инициализруем класс для отправки данных
                let data = new FormData();
                // подготавливаем файл к отправке
                data.append('avatar', avatar);
                // отправляем на сервер
                axios.post(`/api/users/${this.user.name}/avatar`, data)
                    .then(() => flash('Avatar uploaded!'));
            }
        }
    }
</script>