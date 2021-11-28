<template>
    <div>
        <input type="text" v-model='keywords'>
    </div>
</template>

<script>
    import { ref, watch } from 'vue'
    export default {
        setup() {
            let keywords = ref('')

            const asyncPrint = val => {
                return setTimeout(() => {
                    console.log('val', val)
                }, 2000)
            }

            watch(keywords, (newVal, oldVal, onCleanup) => { // 第三个参数，是一个清除的函数
                let timerId = asyncPrint(newVal) // 先调用异步打印

                onCleanup(() => { // 清除之前未完成的异步
                    clearTimeout(timerId) // 只要 watch 在2秒之内被重复执行了，就调用 onClearup 进行清除
                })
            }, { lazy: true }) // 进入页面第一次不执行 watch
            return { keywords }
        },
    };
</script>

<style>
</style>