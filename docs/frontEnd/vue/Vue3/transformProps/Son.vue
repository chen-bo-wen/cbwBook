<template>
    <div>
        <div>姓名:{{studentName}}</div>
        <div>年龄:{{studentAge}}</div>
        <div>描述:{{description}}</div>
    </div>
</template>

<script>
    export default {
        setup(props, context) { // setup 函数里默认接收两个参数
            let description = '姓名是' + props.studentName
            console.log('context', context)
            return { description }
        },
        props: ['studentName', 'studentAge'] // 接收父组件传递过来的参数
    };
</script>

<style>
</style>