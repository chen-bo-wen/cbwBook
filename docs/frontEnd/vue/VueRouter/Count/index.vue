<template>
    <div>
      获取vuex里的num值{{ this.$store.state.num }}
      <button @click="addnum">mutation更改vuex里num的值</button>
      <button @click="getnum">getters计算vuex里num的值</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      addnum() {
        let payload = {
          number: 1,
        };
        // 因为在入口文件 main.js 里注入的是 store，因此可以获取到 this.$store
        this.$store.commit("addNum", payload); // addNum是在vuex的mutation里定义的函数名称
      },
      getnum() {
        let num = this.$store.getters.computNum(10);
        console.log("num", num);
      },
    },
  };
  </script>
  
  <style>
  </style>