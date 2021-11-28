<template>
    <div>
        <div>学生name：{{studentName}}</div>
        <div>学生age：{{studentAge}}</div>
        <div>老师name：{{teacherName}}</div>
        <button @click='changeStudent'>改变 student 的信息</button>
        <button @click='changeTeacher'>改变 teacher 的信息</button>
    </div>
</template>

<script>
    import { reactive, toRefs, watch } from 'vue'
    export default {
        setup() {
            let student = reactive({
                studentName: 'cbw',
                studentAge: 22
            })
            let teacher = reactive({
                teacherName: 'Su'
            })
            function changeStudent() {
                student.studentAge = 23
            }
            function changeTeacher() {
                teacher.teacherName = 'Hu'
            }
            // () => teacher.teacherName ，这种格式用于监听 reactive 创建对象的某一个属性发生改变。
            // 使用 方括号 的形式，能同时监听多个数据源
            watch([student, () => teacher.teacherName], () => {
                console.log('信息发生了变化')
            })
            return { ...toRefs(student), ...toRefs(teacher), changeStudent, changeTeacher }
        },
    };
</script>

<style>
</style>