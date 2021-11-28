<template>
    <div>
        <div>num：{{num}}</div>
        <button @click='clearWatch'>清除监听</button>
    </div>
</template>

<script>
    import { ref, watch } from 'vue'
    export default {
        setup() {
            let num = ref(0)

            let stopWatch = watch(() => {
                // 监听 ref 的值的时候，只要在函数里面写了相应的要监视的对象，就会监听该值的变化。
                console.log(num.value)
                console.log('监测到num的值发生了变化')
            })

            const clearWatch = () => {
                console.log('清除监听')
                stopWatch()
            }

            setTimeout(() => {
                num.value++
            }, 2000)
            return { num, clearWatch }
        },
    };
</script>

<style>
</style>