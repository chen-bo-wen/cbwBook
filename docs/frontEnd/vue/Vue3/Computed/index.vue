<template>
    <div>
        <div>num：{{num}}</div>
        <div>comp：{{comp}}</div>
        <button @click='changeNum'>改变 comp 的值</button>
    </div>
</template>

<script>
    import { ref, reactive, provide, computed } from 'vue'
    export default {
        setup() {
            let num = ref(0)
            let comp = computed({
                get: () => num.value + 1,
                set: (newVal) => {
                    num.value = newVal + 1
                }
            })

            function changeNum() {
                num.value = 7
                comp.value = 9 // 如要改变 computed 制造出来的值，也需要使用 .value
            }
            return { num, comp, changeNum }
        },
    };
</script>

<style>
</style>