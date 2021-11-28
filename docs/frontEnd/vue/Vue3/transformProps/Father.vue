<template>
    <div>
        <Son :studentName='studentName' :studentAge='studentAge'></Son>
    </div>
</template>

<script>
    import Son from './Son.vue'
    import { reactive, toRefs } from 'vue'
    export default {
        components: {
            Son
        },
        setup() {
            const student = reactive({
                studentName: 'cbw',
                studentAge: '22'
            })
            return { ...toRefs(student) }
        },
    };
</script>

<style>
</style>