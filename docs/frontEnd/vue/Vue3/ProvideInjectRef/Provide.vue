<template>
    <div>
        <Middle></Middle>
        <button @click="sendColor='red'">红色</button>
        <button @click="sendColor='yellow'">黄色</button>
        <button @click="sendColor='blue'">蓝色</button>
    </div>
</template>

<script>
    import Middle from './Middle.vue'
    import { ref, provide } from 'vue'
    export default {
        components: {
            Middle
        },
        setup() {
            const sendColor = ref('red')
            provide('color', sendColor) // provide
            return { sendColor } // 这里需要将值 return 出去，否则点击按钮的时候，无法改变值
        },
    };
</script>

<style>
</style>