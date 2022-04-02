## 项目复杂点
数据结构比较复杂，覆盖了多层数据结构和依赖的情况，比如专栏和文章是一对多的结构，专栏和作者又是一一对应的。
创建文章处需要录入头图，文章详情的介绍需要支持 markdown，这里就需要一定的验证功能。表单的验证功能，和服务器交互的自定义验证功能，如需要检查用户名和邮箱是否已经被注册，且用户名的验证需要支持多种规则和自定义的验证（难点）。权限系统的实现和控制，需要客户有特定的权限才能进行数据的更新和录入。


eslint 格式选择 ESLint + Standard config
这个格式是。。。

## 开发流程
将 UI 划分出组件的层级
创建应用的静态版本（传入数据模型，渲染UI，但没有交互）

## ColumnList 组件源代码

![ColumnList 组件 UI](/docs/frontEnd/vue/project/Image/ColumnList.png)

 Array 是没有类型的，只是一个数组。需要让数组里存放的值的类型为自己定义的那一类，利用泛型。<br>
  Array as PropType<ColumnProps[]>，ColumnProps[] 是自定义的类型。

```JavaScript
<template>
  <ul>
    <li v-for="column in list" :key="column.id">
      <img :src="column.avatar" :alt="column.title">
      <h5>{{column.title}}</h5>
      <p>{{column.description}}</p>
      <a href="#">进入专栏</a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export interface ColumnProps {
  id: number;
  title: string;
  avatar: string;
  description: string;
}
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      //这里特别有一点，我们现在的 Array 是没有类型的，只是一个数组，我们希望它是一个 ColomnProps 的数组，那么我们是否可以使用了类型断言直接写成 ColomnProps[]，显然是不行的 ，因为 Array 是一个数组的构造函数不是类型，我们可以使用 PropType 这个方法，它接受一个泛型，讲 Array 构造函数返回传入的泛型类型。
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  }
})
</script>
```

App.vue 父组件里使用

```JavaScript
<template>
  <div class="container">
    <column-list :list = "list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
// 将设置的 ColumnProps 也拿过来
import ColumnList, { ColumnProps } from '@/components/ColumnList.vue'

// 自定义 test 数据
const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }
]

export default defineComponent({
  name: 'App',
  components: {
    ColumnList
  },
  setup () {
    return {
      list: testData
    }
  }
})
</script>

<style>
</style>

```

## ColumnList 组件使用 Bootstrap 美化
[Bootstrap card](https://getbootstrap.com/docs/5.0/components/card/)

[Bootstrap 栅格](ttps://v5.getbootstrap.com/docs/5.0/layout/grid/)

```JavaScript
  // 使用 Bootstrap 美化后的 card 
  <div class="row">
    // mb: margin-bottom
    //  columnList， 这是下面会新设置的一个数据对象
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img  :src="column.avatar" :alt="column.title" class="rounded-circle border border-light w-25 my-3" >
          <h5 class="card-title">{{column.title}}</h5>
          <p class="card-text text-left">{{column.description}}</p>
          <a href="#" class="btn btn-outline-primary">进入专栏</a>
        </div>
      </div>
    </div>
  </div>
```

当有一个数据的 avatar数据 没有时，设置默认：

```JavaScript
  setup(props) {
    //   新设置一个对象数据
    const columnList = computed(() => {
      return props.list.map(column => {
        if (!column.avatar) {
          column.avatar = require('@/assets/column.jpg')
        }
        return column
      })
    })
    return {
      columnList
    }
  }
```

## GlobalHeader 组件 & DropDown 组件

![UI](/docs/frontEnd/vue/project/Image/GlobalHeader.png)

### GlobalHeader 组件

[Bootstrap nav 样式文档地址](https://v5.getbootstrap.com/docs/5.0/components/navs/)

```JavaScript
<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="#">者也专栏</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">登陆</a></li>
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">注册</a></li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">你好 {{user.name}}</a></li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
export default defineComponent({
  name: 'GlobalHeader',
  props: {
    user: {
      type: Object as PropType<UserProps>, // Object 存储的数据类型值都是 UserProps 类型
      required: true
    }
  }
})
</script>
```

App.vue 父组件里使用

```JavaScript
<global-header :user="currentUser"></global-header>

import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'

// 自定义 GlobalHeader 的 test 数据
const currentUser: UserProps = {
  isLogin: false
}

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader
  },
  setup () {
    return {
      currentUser
    }
  }
})
```

加上之前的代码，完整页面是

```JavaScript
<template>
  <div class="contaniner">
    <global-header :user="currentUser"></global-header>
    <column-list :list = "list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
// 将设置的 ColumnProps 也拿过来
import ColumnList, { ColumnProps } from '@/components/ColumnList.vue'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'

// 自定义 ColumnList 的 test 数据
const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧'
    // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }
]

// 自定义 GlobalHeader 的 test 数据
const currentUser: UserProps = {
  isLogin: false
}

export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader
  },
  setup () {
    return {
      list: testData,
      currentUser
    }
  }
})
</script>

<style>
</style>
```

### DropDown 组件
