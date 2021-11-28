<template>
    <div>
        <div>姓名:{{sonName}}</div>
    </div>
</template>

<script>
    import { ref } from 'vue'
    export default {
        setup() {
            let sonName = ref('ccc')
            let changeName = () => {
                sonName.value = 'bbb'
            }
            return { sonName, changeName }
        },
    };
</script>

<style>
</style>