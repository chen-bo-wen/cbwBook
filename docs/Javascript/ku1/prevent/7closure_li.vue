<template>
    <li>11</li>
    <li>22</li>
    <li>33</li>
    <li>44</li>
  </template>
  
  <script>
  export default {
    mounted() {
      let lis = document.querySelectorAll("li");
      for (var i = 0; i < lis.length; i++) {
        // 这里定义 i 的时候，使用的是var，因此需要用到闭包。如果是 let 的话，就不需要。
        lis[i].onclick = (function (i) {
            return function(){
                console.log(i);
            }
        })(i);
      }
    },
  };
  </script>
  
  <style>
  </style>