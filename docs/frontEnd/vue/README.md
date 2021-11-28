---
navbar:false
sidebar:auto
---

## vue路由

## vuex
如果出现报错： export 'createStore' was not found in 'vuex'，则是 vuex 的版本问题。 npm install --save @4.0.0

### 新建一个 store 文件夹
store 文件夹下的 index.js 里：

<<< @/docs/frontEnd/vue/VueRouter/store/index.js

### 入口文件 main.js 里注入

<<< @/docs/frontEnd/vue/VueRouter/store/main.js

### 在 vue 文件里面使用

<<< @/docs/frontEnd/vue/VueRouter/Count/index.vue

### vue 文件里批量引入 getters
The mapGetters helper simply maps store getters to loacal computed properties:

```javascript
import { mapGetters } from 'vuex'
export default{
    computed:{
        ...mapGetters({
            'doneTodosCount'
        })
    }
}
```

## vue3 新特性
vue-composition-api

### 创建一个 vue3 项目
1. npm install -g @vue/cli <br>
2. vue create my-project <br>
3. npm install @vue/composition-api --save  （安装用来使用 vue3 的新特性）
4. 在入口文件
   
   ```javaScript
   import Vue from 'vue'
   import VueCompositionApi from '@vue/composition-api'

   Vue.use(VueCompositionApi)
   ```

### setUp()函数

### reactive()函数

### ref()函数


