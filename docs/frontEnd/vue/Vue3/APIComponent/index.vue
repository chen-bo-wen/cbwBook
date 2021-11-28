<template>
    <div>
        <h1 @click='changeNum'>计数:{{num}}</h1>
        <h1>用户:{{user.userName}}</h1>
        <h1>年龄:{{user.userAge}}</h1>
        <!-- 使用 toRefs 解构出来的 -->
        <h1>特点:{{type}}</h1>
        <button @click='changeType'>更改特点</button>
        <!-- computed(()=>{}) -->
        <h1>翻转特点:{{reverseType}}</h1>
    </div>
</template>

<script>
    // reactive 可以创建一个响应对象
    // toRefs 转换成一个 ref 的形式
    import { ref, reactive, toRefs, computed, watchEffect } from 'vue'
    export default {
        data() {
            console.log('data')
            return {};
        },
        setup() {
            console.log('setup')
            const num = ref(0) // ref 
            const user = reactive({ // reactive 响应对象
                userName: 'cbw',
                userAge: '22',
                type: '完美',
                reverseType: computed(() => {
                    return user.type.split('').reverse().join('')
                })
            })
            function changeNum() {
                num.value += 2 // 在 <template> 标签里就不需要使用 value，但是在这里需要获取到 num 的数值，就必须加 .value
            }
            function changeType() {
                user.type = '超级美'
            }
            watchEffect(user.type, (newVal) => {
                console.log('当user.type改变时会触发执行此函数', newVal)
            })
            // 使用 ...toRefs(解构很多个属性) 进行解构
            return { num, user, ...toRefs(user), changeNum, changeType }
        },
        beforeCreate() {
            console.log('beforeCreate')
        },
        created() {
            console.log('created')
        },
        beforeMount() {
            console.log('beforeMount')
        },
        mounted() {
            console.log('mounted')
        },
    };
</script>

<style>
</style>