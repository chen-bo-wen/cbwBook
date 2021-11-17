<template>
    <div></div>
  </template>
  
  <script>
  export default {
    methods: {
      getBubbleTea() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve("喝奶茶");
          }, 1000);
        });
      },
      getHotpot() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve("吃火锅");
          }, 1000);
        });
      },
      getThingListOne() {
        // 方法1
        this.getBubbleTea()
          .then((res) => {
            console.log(res);
            return this.getHotpot();
          })
          .then((res) => {
            console.log(res);
          });
      },
      getThingListTwo() {
        // 方法2 
        let _this = this;
        async function getThing() {
        // await + Promise，就可以将 Promise 里 resolve / reject 的值直接赋值给 “=” 左边
          let bubble = await _this.getBubbleTea();
          console.log("方法2", bubble);
          let Hotpot = await _this.getHotpot();
          console.log("方法2", Hotpot);
        }
        getThing();
      },
    },
    created() {
      this.getThingListOne();
      this.getThingListTwo();
    },
  };
  </script>
  
  <style>
  </style>