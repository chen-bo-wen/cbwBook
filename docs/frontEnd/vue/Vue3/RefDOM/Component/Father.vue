<template>
    <div>
        <Son ref='refSon'></Son>
        <button @click='changeSonName'>改变值</button>
    </div>
</template>

<script>
    import Son from './Son.vue'
    import { ref, onMounted } from 'vue'
    export default {
        components: {
            Son
        },
        setup() {
            let refSon = ref(null)
            onMounted(() => { // 要等页面全都挂载上去了，才能拿到 refSon 这个元素
                console.log('refSon.value.sonName', refSon.value.sonName)
            })
            let changeSonName = () => { // 可以获取到对应 ref 组件的方法
                refSon.value.changeName()
            }
            return { refSon, changeSonName }
        },
    };
</script>

<style>
</style>