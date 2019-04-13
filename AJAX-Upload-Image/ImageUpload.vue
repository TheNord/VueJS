<template>
    <input type="file" accept="image/*" @change="onChange">
</template>

<script>
    export default {
        methods: {
            // отслеживаем событие изменения
            onChange(e) {
                if (! e.target.files.length) return;
                // получаем файл из массива файлов
                let file = e.target.files[0];
                // инициализуруем читалку файлов
                let reader = new FileReader();
                // читаем файл
                reader.readAsDataURL(file);
                // как только файл загрузился  
                reader.onload = e => {
                    // получаем результаты загруженного файла
                    let src = e.target.result;
                    // кидаем событие о загрузке
                    this.$emit('loaded', { src, file });
                };
            }
        }
    }
</script>