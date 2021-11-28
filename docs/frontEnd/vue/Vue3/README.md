## 生命周期顺序

<<< @/docs/frontEnd/vue/Vue3/APIComponent/index.vue

<b>输出顺序如下：</b><br>
setup<br>
beforeCreate<br>
data<br>
created<br>
beforeMount<br>
mounted

### vue2x 生命周期与新版 composition API 之间的映射关系
| vue2x        | vue3x           |
| :---:        | :---:           |
| beforeCreate | setup()         |
| created      | setup()         |
| beforeMount  | onBeforeMount   |
| mounted      | onMounted       |
| beforeUpdate | onBeforeUpdate  |
| updated      | onUpdated       |
| beforeDestroy| onBeforeUnmount |
| destroyed    | onUnmounted     |
| errorCaptured| onErrorCaptured |

## ref

<b><h1 @click='changeNum'>计数:{ { num } }</ h1></b> 

```javaScript
import { ref } from 'vue'
  export default {
    setup() {
        const num = ref(0) // ref 
        function changeNum() {
            num.value += 2 // 在 <template> 标签里就不需要使用 value，但是在这里需要获取到 num 的数值，就必须加 .value
        }
        return { num }
        },
  }
```

## isRef
判断某个值是否是通过 ref 函数创建出来的

```javaScript
import { isRef } from 'vue'
const judge = isRef(foo) ? foo.value : foo
```

## reactive && toRefs
toRefs()，用来将 reactive() 创建出来的响应式对象转换为普通对象。只不过，这个对象的每个属性节点，都是 ref() 类型的响应式数据。

<b> < h1 >用户:{{user.userName} }</ h1> </b> <br>
<b> < h1 >年龄:{{user.userAge} }</ h1></b><br> 
<b> < h1 >特点:{{type} }</ h1></b> <br>
因为 ...toRefs(user) 可以直接解构 user 获取其属性，因为可以直接使用 type

```javaScript
import { reactive, toRefs } from 'vue'
  export default {
    setup() {
        const user = reactive({ // reactive 响应对象
            userName: 'cbw',
            userAge: '22',
            type: '完美'
        })
        return { user, ...toRefs(user) }
        },
  }
```

<b>在 reactive 对象中访问 ref 创建的数据，新的 ref 会覆盖掉旧的 ref</b>，这里可以将其类比成地址，当覆盖时，会指向新的地址。

```javaScript
    const c1 = ref(0)
    const state = reactive({
        c1 // 接收 ref 创建的数据
    })
    const c2 = ref(9)

    state.c1 = c2
    state.c1++

    console.log(state.c1) // 10，state.c1 的地址就是 c2 的地址
    console.log(c2.value) // 10
    console.log(c1.value) // 0
```

## computed

<b> < h1 >翻转特点:{ {reverseType}}</ h1> </b> <br>

```javaScript
import { reactive, toRefs, computed } from 'vue'
  export default {
    setup() {
        const user = reactive({ // reactive 响应对象
        type: '完美',
        reverseType: computed(() => { // computed 计算属性
            return user.type.split('').reverse().join('')
        })
        })
        return { ...toRefs(user) }
    },
  }
```

computed 计算属性是只读的

```javaScript
import { ref, computed } from 'vue'
  export default {
    setup() {
        const num = ref(0)
        const comp = computed(()=>num.value + 1)
        comp.value = 9 // 这个是不能修改成功的
    },
  }
```

### 创建可读可写的计算属性
需要使用 get 和 set

<<< @/docs/frontEnd/vue/Vue3/Computed/index.vue

## watch
在默认情况下，当第一次进入页面后，会执行一次 watch，如果要使得 第一次进入页面的时候，不会触发 watch 的执行，可以加上 {lazy:true}

### 监听多个数据源
() => teacher.teacherName ，这种格式用于监听 reactive 创建对象的某一个属性发生改变。<br>
使用 方括号 的形式，能同时监听多个数据源

### 清除监听

<<< @/docs/frontEnd/vue/Vue3/Watch/ClearWacth.vue

实例：一个输入框，监测文本框值的变化，只有当停止输入一秒后，才会输出此时文本框的值。

<<< @/docs/frontEnd/vue/Vue3/Watch/ClearWacthInput.vue

### 在watch中清除无效的异步任务
当切换页面的时候，之前页面开启的任务，在页面实现跳转之后，要停止下来。

<<< @/docs/frontEnd/vue/Vue3/Watch/WacthMulti.vue

## watchEffect

<b> < h1 @click='changeNum'>计数:{ {num}}</ h1> </b> <br>

```javaScript
  export default {
    setup() {
      const num = ref(0) // ref 
      function changeNum() {
        num.value += 2 // 在 <template> 标签里就不需要使用 value，但是在这里需要获取到 num 的数值，就必须加 .value
      }
      watchEffect(num, (newVal) => {
        console.log('当num改变时会触发执行此函数', newVal)
      })
      return { num, changeNum }
    },
  }
```

## setup中使用生命周期函数
父组件向子组件里传递属性，在 setup 函数里，this 是 undefined，它接收的两个参数里，第二个参数，也就是 context，就相当于 this<br>

<b>父组件</b>

<<< @/docs/frontEnd/vue/Vue3/transformProps/Father.vue

<b>子组件</b>

<<< @/docs/frontEnd/vue/Vue3/transformProps/Son.vue

## provide && inject
父组件向子组件里传递属性--使用 provide 和 inject<br>

### 共享普通数据
provide 传递的值，在子组件和孙组件里都可以使用 inject 进行接收。

<b>父组件--provide需要传递的值</b>

<<< @/docs/frontEnd/vue/Vue3/ProvideInject/Provide.vue

<b>子组件--inject接收传递的值</b>

<<< @/docs/frontEnd/vue/Vue3/ProvideInject/Inject.vue

### 共享 ref 响应式数据
<b>父组件--provide需要传递的值</b>

<<< @/docs/frontEnd/vue/Vue3/ProvideInjectRef/Provide.vue

<b>子组件</b>

<<< @/docs/frontEnd/vue/Vue3/ProvideInjectRef/Middle.vue

<b>孙组件--inject接收传递的值</b>

<<< @/docs/frontEnd/vue/Vue3/ProvideInjectRef/Inject.vue

## ref 引用 DOM 元素和组件实例
通过 ref 还可以引用页面上的元素或组件，使用方法是一样的。<b>因此，通过 ref，也可以引用到子组件。</b>

### 普通元素

<<< @/docs/frontEnd/vue/Vue3/RefDOM/ref.vue

### 组件
父组件里使用子组件里的值以及方法

<<< @/docs/frontEnd/vue/Vue3/RefDOM/Component/Father.vue

子组件

<<< @/docs/frontEnd/vue/Vue3/RefDOM/Component/Son.vue

## $nextTick 的作用