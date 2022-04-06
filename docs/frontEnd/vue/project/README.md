## 项目复杂点
数据结构比较复杂，覆盖了多层数据结构和依赖的情况，比如专栏和文章是一对多的结构，专栏和作者又是一一对应的。
创建文章处需要录入头图，文章详情的介绍需要支持 markdown，这里就需要一定的验证功能。表单的验证功能，和服务器交互的自定义验证功能，如需要检查用户名和邮箱是否已经被注册，且用户名的验证需要支持多种规则和自定义的验证（难点）。权限系统的实现和控制，需要客户有特定的权限才能进行数据的更新和录入。


eslint 格式选择 ESLint + Standard config
这个格式是。。。

## 开发流程
将 UI 划分出组件的层级
创建应用的静态版本（传入数据模型，渲染UI，但没有交互）

## 判断类型
|事件类型 | 名称 |
| :--:  |  :--:  |
|键盘输入事件 |KeyboardEvent |
|输入框等输入元素 | HTMLInputElement |
|点击事件 | MouseEvent |
|按钮等元素 | HTMLElement |

```JavaScript
<input type="email" class="form-control" id="exampleInputEmail1"
    :value="inputRef.val"
    @input="updateValue"
>

// 针对文本框等输入元素的输入事件 
const updateValue = (e: KeyboardEvent) => { // 键盘输入事件
    const targetValue = (e.target as HTMLInputElement).value // 输入元素 HTMLInputElement
}
```

```JavaScript
  const handler = (e: MouseEvent) => { // 设置类型为点击事件
    if (elementRef.value) { // 如果传进来的元素不是 null
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
```

## ColumnList 组件源代码

<!-- ![ColumnList 组件 UI](../project/Image/ColumnList.png) -->

![ColumnList 组件 UI](../project/Image/ColumnList.png)

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

![UI](../project/Image/GlobalHeader.png)

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
```JavaScript
<template>
<div class="dropdown">
  <!-- @click.preven 阻止其默认行为 -->
  <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">
    {{title}}
  </a>

  <!-- :style="{display: 'block'}"  -->
  <ul class="dropdown-menu" :style="{display: 'block'}" v-if="isOpen">
    <li class="dropdown-item">
      <a href="#">新建文章</a>
    </li>
    <li class="dropdown-item">
      <a href="#">编辑资料</a>
    </li>
  </ul>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'DropDown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    return {
      isOpen,
      toggleOpen
    }
  }
})
</script>
```

在 GlobalHeader 父组件里引入

```JavaScript
// 完整代码
<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="#">者也专栏</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">登陆</a></li>
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">注册</a></li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <!-- <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">你好 {{user.name}}</a></li> -->
      <li class="list-inline-item">
          <drop-down :title="`你好 ${user.name}`"></drop-down>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DropDown from '@/components/DropDown.vue'

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export default defineComponent({
  name: 'GlobalHeader',
  components: {
    DropDown
  },
  props: {
    user: {
      type: Object as PropType<UserProps>, // Object 存储的数据类型值都是 UserProps 类型
      required: true
    }
  }
})
</script>

```

## 为 Dropdown 添加 DropdownItem
```JavaScript
// DropdownItem 组件
<template>
  <li
    class="dropdown-option"
    :class="{'is-disabled': disabled}"
  >
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style>
.dropdown-option.is-disabled * {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>

```

DropDown 组件 

```JavaScript
// 变动部分
    <slot></slot>


// 完整代码如下：
<template>
<div class="dropdown">
  <!-- @click.preven 阻止其默认行为 -->
  <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">
    {{title}}
  </a>

  <!-- :style="{display: 'block'}"  -->
  <ul class="dropdown-menu" :style="{display: 'block'}" v-if="isOpen">
    <!-- <li class="dropdown-item">
      <a href="#">新建文章</a>
    </li>
    <li class="dropdown-item">
      <a href="#">编辑资料</a>
    </li> -->
    <slot></slot>
  </ul>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'DropDown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    return {
      isOpen,
      toggleOpen
    }
  }
})
</script>

```

GlobalHeader 组件

```JavaScript
// 新增部分
              <drop-down-item><a href="#" class="dropdown-item">新建文章</a></drop-down-item>
              <drop-down-item><a href="#" class="dropdown-item">编辑资料</a></drop-down-item>
              <drop-down-item><a href="#" class="dropdown-item">退出登录</a></drop-down-item>

import DropDownItem from '@/components/DropDownItem.vue'

// 完整代码如下：
<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="#">者也专栏</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">登陆</a></li>
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">注册</a></li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <!-- <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">你好 {{user.name}}</a></li> -->
      <li class="list-inline-item">
          <drop-down :title="`你好 ${user.name}`">
              <drop-down-item><a href="#" class="dropdown-item">新建文章</a></drop-down-item>
              <drop-down-item><a href="#" class="dropdown-item">编辑资料</a></drop-down-item>
              <drop-down-item><a href="#" class="dropdown-item">退出登录</a></drop-down-item>
          </drop-down>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DropDown from '@/components/DropDown.vue'
import DropDownItem from '@/components/DropDownItem.vue'

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export default defineComponent({
  name: 'GlobalHeader',
  components: {
    DropDown,
    DropDownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>, // Object 存储的数据类型值都是 UserProps 类型
      required: true
    }
  }
})
</script>

```

## Dropdown 点击外部区域自动隐藏
返回和 ref 同名的响应式对象，就可以拿到对应的 dom 节点

判断当前点击位置是否在某一个节点里 .contains()

Dropdown 组件里添加

```JavaScript
    <div class="dropdown" ref="dropdownRef">



    const dropdownRef = ref<null | HTMLElement>(null)
    // 因为它是一个点击事件，因此需要设置为 MouseEvent 
    const handler = (e: MouseEvent) => {
      // 判断 dropdownRef 是否存在，而不是 null
      if (dropdownRef.value) {
        // 第一个是判断 dropdownRef.value 节点是否包含当前节点
        // 即当前点击的位置是否在 ref="dropdownRef" 的元素里
        // e.target as HTMLElement ，类型断言
        // 如果不断言，可能出现 e.target 为 null 的情况
        // setup() 里获取 props 属性的值，需要加 .value
        if (!dropdownRef.value.contains(e.target as HTMLElement) && isOpen.value) {
          isOpen.value = false
        }
      }
    }
    onMounted(() => {
      // .addEventListener() 用于向指定元素添加事件
      // document.addEventListener方法监听全局, 然后判断是否点击了指定区域
      document.addEventListener('click', handler)
    })
    onUnmounted(() => {
      document.removeEventListener('click', handler)
    })
    return {
      isOpen,
      toggleOpen,
      // 返回和 ref 同名的响应式对象，就可以拿到对应的 dom 节点
      dropdownRef
    }
```

### 判断是否点击到了一个 dom 元素的外面 useClickOutside.ts 
将之前的点击下拉框之外地方，就关闭的这个性能，改造为一个自定义函数

第一个自定义元素，判断是否点击到了一个 dom 元素的外面

```JavaScript
// 函数功能： 判断是否点击到了一个 dom 元素的外面
// 这里的 Ref 是一个类型，响应式对象
import { ref, onMounted, onUnmounted, Ref } from 'vue'
// 如果仅仅是一个 dom 节点，在 setup() 里调用，它是不会变化的，我们必须需要一个响应式对象，ref 对象
const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  // 判断是否点击到了该元素的外面
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => { // 设置类型为点击事件
    if (elementRef.value) { // 如果传进来的元素不是 null
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
//   return {
//     isClickOutside
//   }
  return isClickOutside // 不需要加上 { }，否则这里会多一层？？？为什么？？？？
}
export default useClickOutside

```

在 dropdown 组件里使用

```JavaScript
import { defineComponent, onMounted, ref, onUnmounted, watch } from 'vue'
import useClickOutside from '@/hooks/useClickOutside'

    const isClickOutside = useClickOutside(dropdownRef) // 因为函数的返回值是 true/false
    // 因为该组件是通过 isOpen 来控制 下拉板块的显示和隐藏，因此可以通过 isClickOutside 来相应的更改 isOpen 的值
    // 这时需要 watch 来监控响应式对象的变化
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })


// 完整代码是：
<template>
  <div class="dropdown" ref="dropdownRef">
    <!-- @click.preven 阻止其默认行为 -->
    <a
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click.prevent="toggleOpen"
    >
      {{ title }}
    </a>

    <!-- :style="{display: 'block'}"  -->
    <ul class="dropdown-menu" :style="{ display: 'block' }" v-if="isOpen">
      <!-- <li class="dropdown-item">
      <a href="#">新建文章</a>
    </li>
    <li class="dropdown-item">
      <a href="#">编辑资料</a>
    </li> -->
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onUnmounted, watch } from 'vue'
import useClickOutside from '@/hooks/useClickOutside'
export default defineComponent({
  name: 'DropDown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }

    // // 类型为 null 或 html元素节点
    const dropdownRef = ref<null | HTMLElement>(null)

    const isClickOutside = useClickOutside(dropdownRef) // 因为函数的返回值是 true/false
    // 因为该组件是通过 isOpen 来控制 下拉板块的显示和隐藏，因此可以通过 isClickOutside 来相应的更改 isOpen 的值
    // 这时需要 watch 来监控响应式对象的变化
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })

    // const handler = (e: MouseEvent) => {
    //   if (dropdownRef.value) {
    //     if (!dropdownRef.value.contains(e.target as HTMLElement) && isOpen.value) {
    //       isOpen.value = false
    //     }
    //   }
    // }

    // onMounted(() => {
    //   // .addEventListener() 用于向指定元素添加事件
    //   // document.addEventListener方法监听全局, 然后判断是否点击了指定区域
    //   document.addEventListener('click', handler)
    // })

    // onUnmounted(() => {
    //   document.removeEventListener('click', handler)
    // })

    return {
      isOpen,
      toggleOpen,
      // 返回的和挂载在元素上的 ref="dropdownRef" 中的 dropdownRef 一样
      // 返回和 ref 同名的响应式对象，就可以拿到对应的 dom 节点
      dropdownRef
    }
  }
})
</script>

```

## 表单
![表单 组件 UI](../project/Image/formFram.png)

### 表单验证
输入为空的时候，提示 “输入不能为空”

```JavaScript
<template>
    <form>
    <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1"
                v-model="emailRef.val"
               @blur="validateEmail"
        >
        <div id="emailHelp" class="form-text" v-if="emailRef.error">{{emailRef.message}}</div>
    </div>
    <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1">
    </div>
    </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'foRm',
  setup () {
    // 输入框里绑定了 v-model，v-model="emailRef.val"
    const emailRef = reactive({
      val: '', // 文本框里输入的值
      error: false, // 验证结果是否错误
      message: '' // 验证错误时的提示信息
    })

    // 验证 Email 是否有效的正则表达式
    const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    // 验证表单函数
    const validateEmail = () => {
      if (emailRef.val.trim() === '') { // 是否输入为空
        emailRef.error = true
        emailRef.message = 'can not be empty'
      } else if (!emailReg.test(emailRef.val)) { // 输入的 Email 格式是否正确
        emailRef.error = true
        emailRef.message = 'should be valid email'
      }
    }
    return {
      emailRef,
      validateEmail
    }
  }
})
</script>

<style>
</style>

```

### 抽离验证规则
将抽离的规则放到一个组件里 ValidateInput.vue

<b> 设置一个 存放类型为 RuleProp 数据的数组 </b>

```JavaScript
// 子组件 ValidateInput.vue
 interface RuleProp {
        type: 'required' | 'email';
        message: string;
 }
//  设置一个 type ，是一个 存放类型为 RuleProp 数据的数组，然后将其导出
export type RulesProp = RuleProp[]


// 父组件 Form.vue
// 设置验证规则
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'

const emailRules: RulesProp = [ // 每一条数据都是 RulesProp 类型
  { type: 'required', message: '电子邮箱地址不能为空' },
  { type: 'email', message: '请输入正确的电子邮箱格式' }
]
```

完整的子组件 ValidateInput.vue 代码

```JavaScript
<template>
        <input type="email" class="form-control" id="exampleInputEmail1"
                v-model="inputRef.val"
               @blur="validateInput"
        >
        <div id="emailHelp" class="form-text" v-if="inputRef.error">{{inputRef.message}}</div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue'

 interface RuleProp {
        type: 'required' | 'email';
        message: string;
 }
//  设置一个 type ，是一个 存放类型为 RuleProp 数据的数组，然后将其导出
export type RulesProp = RuleProp[]

export default defineComponent({
  name: 'ValidateInput',
  props: {
    // 这个是用于接收在父组件定义的规则
    rules: Array as PropType<RulesProp>
  },
  setup (props) {
    // interface 和 reactive 的区别
    // reactive 和 ref ，都是创建数据, ref 是单个，reactive 是集中的一个对象
    const inputRef = reactive({
      val: '', // 文本框里输入的值
      error: false, // 验证结果是否错误
      message: '' // 验证错误时的提示信息
    })

    // 验证 Email 是否有效的正则表达式
    const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    const validateInput = () => {
      // 需要循环遍历每一条规则，只有输入的值对每一条设定的规则都通过，才算通过。
      if (props.rules) { // 如果有传过来的 props.rules
        const allPassed = props.rules.every(rule => {
        // debugger
          let passed = true
          inputRef.message = rule.message

          // return true
          switch (rule.type) {
            case 'required':
            // inputRef.val.trim() !== null 这个就不会执行？？为什么
              passed = (inputRef.val.trim() !== null)
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
      }
    }

    return {
      inputRef,
      validateInput
    }
  }
})
</script>

<style>
</style>

```

完整的父组件 Form.vue 代码

```JavaScript
<template>
    <form>
    <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <!-- <input type="email" class="form-control" id="exampleInputEmail1"
                v-model="emailRef.val"
               @blur="validateEmail"
        > -->
        <validate-input :rules="emailRules"></validate-input>
        <!-- <div id="emailHelp" class="form-text" v-if="emailRef.error">{{emailRef.message}}</div> -->
    </div>
    <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1">
    </div>
    </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'

export default defineComponent({
  name: 'foRm',
  components: {
    ValidateInput
  },
  setup () {
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    // 输入框里绑定了 v-model，v-model="emailRef.val"
    // const emailRef = reactive({
    //   val: '', // 文本框里输入的值
    //   error: false, // 验证结果是否错误
    //   message: '' // 验证错误时的提示信息
    // })

    // // 验证 Email 是否有效的正则表达式
    // const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    // // 验证表单函数
    // const validateEmail = () => {
    //   if (emailRef.val.trim() === '') { // 是否输入为空
    //     emailRef.error = true
    //     emailRef.message = 'can not be empty'
    //   } else if (!emailReg.test(emailRef.val)) { // 输入的 Email 格式是否正确
    //     emailRef.error = true
    //     emailRef.message = 'should be valid email'
    //   }
    // }
    return {
    //   emailRef,
    //   validateEmail
      emailRules
    }
  }
})
</script>

<style>
</style>

```

### 自定义组件的 v-model 改造
改造 ValidateInput.vue 使其支持 v-model ，总共有以下两步：

1.在自定义组件里创建一个 modelValue 的 props
```JavaScript
props: {
    modelValue: String
}
```

2.在更新值的时候，发送一个事件 'update:modelValue'
```JavaScript
context.emit('update:modelValue', targetValue)
```

vue2 原生 v-model

```JavaScript
// 下面两行代码的功能一样
<input v-model="val">
<input :value="val" @input="val = $event.target.value">
```

vue3 compile 以后的结果

```JavaScript
<input v-model="foo">
h(Comp, {
    modelValue: foo,
    'onUpdate: modelValue': value => (foo = values)
})
```

#### 具体代码
父组件里引入 ValidateInput.vue 的组件时，可以使用 v-model，从而可以在父组件获取得到子组件的文本框的值。

```JavaScript
<validate-input :rules="emailRules" v-model = 'emailVal'></validate-input>
{{emailVal}}

const emailVal = ref('viking') // 因为是要响应式的，因此需要时 ref 类型

return{
    emailVal
}
```

自定义组件 ValidateInput.vue 

```JavaScript
<!-- v-model="inputRef.val" 之前的这行去掉不用 -->
<input type="email" class="form-control" id="exampleInputEmail1"
       @blur="validateInput"
       :value="inputRef.val"
       @input="updateValue"
>
// :value 和 @input

props: {
  modelValue: String
},

const inputRef = reactive({
  val: props.modelValue || '', // 接收的值设置为 props.modelValue，这是该组件里需要
  error: false,
  message: '' 
})

const updateValue = (e: KeyboardEvent) => { // 键盘输入事件
  const targetValue = (e.target as HTMLInputElement).value // 输入元素 HTMLInputElement
  inputRef.val = targetValue
  context.emit('update:modelValue', targetValue) // 事件名称为 'update:modelValue'，发送到父组件
}

return{
    updateValue
}
```

## attr
[非 Prop 的 Attribute](https://cn.vuejs.org/v2/guide/components-props.html#%E9%9D%9E-Prop-%E7%9A%84-Attribute)

[vue文档 禁用 Attribute 继承](https://cn.vuejs.org/v2/guide/components-props.html#%E7%A6%81%E7%94%A8-Attribute-%E7%BB%A7%E6%89%BF)

如果不设置任何东西的话，可以看到，添加在 节点 上的 placeholder 并没有生效，而是添加到其根节点上。

只有设置以下，才会出现：

![attr 添加到指定的 dom 节点](../project/Image/attr.png)

```JavaScript
// 子组件
// 1. v-bind="$attrs"
<input type="email" class="form-control" id="exampleInputEmail1"
       @blur="validateInput"
       :value="inputRef.val"
       @input="updateValue"
       v-bind="$attrs"
>

// 2. inheritAttrs: false
setup(){
  inheritAttrs: false, // 不希望继承
}

// 引用子组件的父节点上添加非 prop 属性，同时又不是 class/style 属性
<validate-input :rules="emailRules" v-model="emailVal" placeholder="请输入邮箱"></validate-input>
```

### 插槽

[插槽](https://cn.vuejs.org/v2/guide/components-slots.html#%E5%85%B7%E5%90%8D%E6%8F%92%E6%A7%BD)

```JavaScript
// validateForm.vue
<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
    <!-- 1.具名插槽 -->
      <slot name="submit">
        <!-- 这个是默认的内容，什么都不添加的时候会显示这个默认的内容 -->
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

// 引用 validateForm.vue 的父组件
// 2. v-slot:submit，简写是 #submit
<template v-slot:submit>
  <span class='btn'>submit</span>
</template>
```

父组件里引用

```JavaScript
<template>
    // 不是之前的 form，而是使用自定义的组件 form-validate 
    // 1. 子组件自定义的事件
    <form-validate @form-submit="FromSubmit">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <validate-input :rules="emailRules" v-model="emailVal" placeholder="请输入邮箱"></validate-input>
            {{emailVal}}
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <!-- 2. #submit，是 v-slot: submit 的简写 -->
        <template #submit>
            <button>提交1111</button>
        </template>
    </form-validate>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
// 3. 引入自定义的子组件
import FormValidate from '@/components/FormValidated.vue'

export default defineComponent({
  name: 'foRm',
  components: {
    ValidateInput,
    FormValidate
  },
  setup () {
    const emailVal = ref('viking')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    // 4. 自定义事件，接收子组件传过来的值
    const FromSubmit = (result: boolean) => {
      console.log('result', result)
    }
    return {
      emailRules,
      emailVal,
      FromSubmit
    }
  }
})
</script>

<style>
</style>

```

### 自定义事件名称
方法一：可以使用 Object 定义

方法二：使用数组定义触发事件 emits:[]

```JavaScript
export default defineComponent({
  emits: ['form-submit'], // 使用数组定义自定义触发事件
  setup(props, context) {
    const submitForm = () => {
      context.emit('form-submit', true) // 
    }
    return {
      submitForm
    }
  }
})


// 区分 之前的 update:modelValue

props: {
  modelValue: String // 定义了 props
}

const updateValue = (e: KeyboardEvent) => {
  const targetValue = (e.target as HTMLInputElement).value 
  inputRef.val = targetValue
  context.emit('update:modelValue', targetValue) // 事件名称为 'update:modelValue'，发送到父组件
}
```

### 父子组件通讯
在父组件 Form.vue 中拿到子组件 ValidateInput.vue 表单的验证结果

```JavaScript
<template>
    // form-validate 也是引入的子组件
    <form-validate @form-submit="FromSubmit">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <!-- 1. ref 等于的值 和 setup() 里 return 的保持一致 -->
            <validate-input :rules="emailRules" v-model="emailVal" placeholder="请输入邮箱" ref="inputRef"></validate-input>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <template #submit>
            <button>提交1111</button>
        </template>
    </form-validate>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import FormValidate from '@/components/FormValidated.vue'

export default defineComponent({
  name: 'foRm',
  components: {
    ValidateInput,
    FormValidate
  },
  setup () {
    // 2.设置一个类型为 any 的 ref 数据
    const inputRef = ref<any>()
    const emailVal = ref('viking')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const FromSubmit = (result: boolean) => {
      // 3. 在这里可以拿到 子组件 ValidateInput.vue 的 setup() 里返回的数据
      console.log(inputRef.value.validateInput())
      console.log('result', result)
    }
    return {
      emailRules,
      emailVal,
      FromSubmit,
      // 4. 返回和 ref 同名的响应式对象
      inputRef
    }
  }
})
</script>

<style>
</style>

```

和之前的一个功能一样：

返回和 ref 同名的响应式对象，就可以拿到对应的 dom 节点

```JavaScript
    // 1. 设置 ref 
    <div class="dropdown" ref="dropdownRef">

    // 2. 定义一个 ref 数据
    const dropdownRef = ref<null | HTMLElement>(null)
    
    const handler = (e: MouseEvent) => {
      if (dropdownRef.value) {
        if (!dropdownRef.value.contains(e.target as HTMLElement) && isOpen.value) {
          isOpen.value = false
        }
      }
    }
    onMounted(() => {
      document.addEventListener('click', handler)
    })
    onUnmounted(() => {
      document.removeEventListener('click', handler)
    })
    return {
      isOpen,
      toggleOpen,
      // 3. 返回和 ref 同名的响应式对象，就可以拿到对应的 dom 节点
      dropdownRef
    }
```

### 一个子组件 A 从父组件中获取 另一个子组件 B 的值 ???
在 FormValidated.vue 组件中获取 

[程序化的事件侦听器](https://cn.vuejs.org/v2/guide/components-edge-cases#%E7%A8%8B%E5%BA%8F%E5%8C%96%E7%9A%84%E4%BA%8B%E4%BB%B6%E4%BE%A6%E5%90%AC%E5%99%A8)

在父组件中创建一个事件监听

```JavaScript
const validateFuncArr = []
this.$on('item-created', (func) => {
    validateFuncArr.push(func)
})
```

子组件

```JavaScript
// 和 $root 类似，$parent property 可以用来从一个子组件访问父组件的实例。
this.$parent.emit('item-created', validateInput)
```

在这里，借用 mitt库 创建监听器

在其中一个子组件 FormValidated.vue 中

```JavaScript
<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'

// 1. 导入 mitt 库
import mitt from 'mitt'

// 2. 新建一个监听器
// 导出是因为要拿给 ValidateInput 使用
export const emitter = mitt()

export default defineComponent({
  name: 'FormValidate',
  emits: ['form-submit'], // 自定义发送事件
  setup (props, context) {
    const submitForm = () => {
      console.log('点击了')
      context.emit('form-submit', true)
    }

    // 3。创建回调函数
    // const callback = (test: string) => {
    //   console.log(test)
    // }
    // 上面这行会报错？？？为什么
    const callback = (test: string | any) => {
      // 这里的 test 就是接收从别的组件传过来的值
      console.log(test)
    }

    emitter.on('form-item-created', callback) // 自己创建的一个名称 form-item-created

    // 4. 需要清理掉这个函数
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
    })
    // 5.然后去 ValidateInput 中发送信息
    return {
      submitForm
    }
  }
})
</script>

<style>
</style>

```

在另一个子组件 ValidateInput.vue 中

```JavaScript
<template>
        <input type="email" class="form-control" id="exampleInputEmail1"
               @blur="validateInput"
               :value="inputRef.val"
               @input="updateValue"
               v-bind="$attrs"
        >
        <div id="emailHelp" class="form-text" v-if="inputRef.error">{{inputRef.message}}</div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted } from 'vue'
// 6.引入 FormValidated 里创建好的监听器
import { emitter } from '@/components/FormValidated.vue'

 interface RuleProp {
        type: 'required' | 'email';
        message: string;
 }
export type RulesProp = RuleProp[]

export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String
  },
  inheritAttrs: false,
  setup (props, context) {
    console.log('context.attrs', context.attrs)
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false, 
      message: ''
    })

    const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message

          switch (rule.type) {
            case 'required':
              passed = (inputRef.val.trim() !== '')
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        console.log('allPassed==', allPassed)
        return allPassed
      }
      return true
    }

    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }

    // 7.触发对应的事件
    onMounted(() => {
      // 发送的值是 inputRef.val
      emitter.emit('form-item-created', inputRef.val)
    })

    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})
</script>

<style>
</style>

```


### 点击按钮循环验证表单的每个 input 值
比如说一个表单又账号, 密码等输入项，点击 “提交” 按钮，可以循环的验证表单的每个输入项。即验证整个表单，并且最后返回验证的结果。

难点：验证包裹的 ValidateInput 组件的结果




