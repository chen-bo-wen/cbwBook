<template>
    <button :disabled="isClick" @click="changeBtn">点击按钮置灰，2秒后恢复</button>
  </template>
  
  <script>
  export default {
      data(){
          return{
              isClick:false
          }
      },
      methods:{
          changeBtn(){
              this.isClick=true
              setTimeout(function(){ // 不是使用箭头函数，括号里面也没有传参，不用写一个 this
                  this.isClick=false
              }.bind(this), 2000); // 这里使用 bind ，不会立即调用函数，又改变了 this 指向
          }
      }
  }
  </script>
  
  <style>
  </style>