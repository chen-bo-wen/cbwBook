<template>
    <div>
        <div>姓名:{{studentName}}</div>
        <div>年龄:{{studentAge}}</div>
    </div>
</template>

<script>
    import { inject } from 'vue'
    export default {
        setup() {
            let student = inject('student') // inject，带引号
            return {...student}
        }
    };
</script>

<style>
</style>