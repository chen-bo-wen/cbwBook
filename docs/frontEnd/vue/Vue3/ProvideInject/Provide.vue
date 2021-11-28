<template>
    <div>
        <Inject></Inject>
    </div>
</template>

<script>
    import Inject from './Inject.vue'
    import { reactive, provide } from 'vue'
    export default {
        components: {
            Inject
        },
        setup() {
            const student = reactive({
                studentName: 'cbw',
                studentAge: '22'
            })
            provide('student', student) // provide
        },
    };
</script>

<style>
</style>