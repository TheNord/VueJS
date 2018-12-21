<template>
    <div class="col-md-8 posts">
        <p v-if="!posts.length">No posts</p>
        <!-- Проходим циклом по всем постам -->
        <div class="media" v-for="post in posts" :key="post.id">
            <img class="mr-3" />
            <div class="media-body">
                <div class="mt-3">
                    <!-- Прикрепляем ссылку на профиль пользователя -->
                    <!-- Ссылку получаем через appends и читателя -->
                    <!-- Отображаем время добавления поста, также через appends и читателя -->
                    <a :href="post.user.profileLink">{{ post.user.name }}</a> | {{ post.createdDate }}
                </div>
                <p>{{ post.body }}</p>
            </div>
        </div>
    </div>
</template>
<script>
// импортируем Event для подписки на события
import Event from '../event.js';

export default {
    data() {
        return {
            posts: [],
            post: {}
        }
    },
    // действия выполняемые при обработке шаблона
    mounted() {
        // получаем список постов через get запрос
        axios.get('/posts').then((resp => {
            // добавляем к постам полученный ответ
            this.posts = resp.data;
        }));
        // отслеживаем событие added_tweet
        Event.$on('added_tweet', (post) => {
            // добавляем полученный пост к списку постов
            this.posts.unshift(post);
        });
    }
}
</script>
