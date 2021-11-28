<template>
    <div>
        <div :style="{color:color}">孙组件</div>
        <div>姓名(孙组件):{{studentName}}</div>
        <div>年龄(孙组件):{{studentAge}}</div>
    </div>
</template>

<script>
    import { inject } from 'vue'
    export default {
        setup() {
            let color = inject('color') // inject，带引号
            return { color }
        }
    };
</script>

<style>
</style>