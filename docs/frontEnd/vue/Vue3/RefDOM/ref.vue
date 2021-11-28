<template>
    <div>
        <!-- 在 setup 函数里面调用到该 DOM 元素 -->
        <div ref='h3Ref'>DOM元素</div>
    </div>
</template>

<script>
    import { ref, onMounted } from 'vue'
    export default {
        setup() {
            let h3Ref = ref('')
            console.log('h3Ref', h3Ref) // 可以获取到相应的 DOM 元素
            onMounted(() => {
                h3Ref.value.style.color = 'blue'
            })
            return { h3Ref }
        },
    };
</script>

<style>
</style>