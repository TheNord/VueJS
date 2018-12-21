<template>
    <div class="col-md-4">
        <!-- Форма добавления нового сообщения -->
        <form @submit.prevent="saveTweet">
            <div class="form-group">
                <textarea 
                    class="form-control" 
                    rows="8" cols="8" 
                    maxlength="130"
                    v-model="body"
                    required>
                </textarea>
            </div>
            <div class="form-group">
                <button class="btn btn-primary">
                    Tweet
                </button>
            </div>
        </form>        
    </div>
</template>
<script>
// импортируем event.js
import Event from '../event.js';
export default {
    data() {
        return {
            body: '',
            postData: {}
        }
    },
    methods: {
        // метод добавления нового поста
        saveTweet() {
            // отправляем post запрос на добавление
            axios.post('/tweet/save', {body: this.body}).then(res => {
                // в postData записываем ответ (само сообщение и связь с пользователем)
                this.postData = res.data;
                // Запускаем событие по добавлению нового поста передавая добавленное сообщение
                // для дальнейшей обработки в TimelineComponent
                Event.$emit('added_tweet', this.postData);
            }).catch(e => {
                console.log(e);
            });
            // обнуляем текстовое поле
            this.body = '';
        }
    }
}
</script>