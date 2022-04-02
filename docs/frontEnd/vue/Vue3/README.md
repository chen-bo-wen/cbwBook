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
|     vue2x     |      vue3x      |
| :-----------: | :-------------: |
| beforeCreate  |     setup()     |
|    created    |     setup()     |
|  beforeMount  |  onBeforeMount  |
|    mounted    |    onMounted    |
| beforeUpdate  | onBeforeUpdate  |
|    updated    |    onUpdated    |
| beforeDestroy | onBeforeUnmount |
|   destroyed   |   onUnmounted   |
| errorCaptured | onErrorCaptured |

## ref & reactive & toRef & isRef & computed
### ref
[ref](https://vue3js.cn/reactivity/ref.html)

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

```JavaScript
<template>
  <h1>{{count}}</h1>
  <h1>{{double}}</h1>
  <button @click="increase">+1</button>
</template>

import { ref } from "vue"

setup() {
  // ref 是一个函数，它接受一个参数，返回的就是一个神奇的 响应式对象 。我们初始化的这个 0 作为参数包裹到这个对象中去，在未来可以检测到改变并作出对应的相应。
  const count = ref(0)
  const double = computed(() => {
    return count.value * 2
  })
  const increase = () => {
    count.value++
  }
  return {
    count,
    increase,
    double
  }
}
```

### reactive
将所有的变量都包裹在一个对象里。和 ref 非常相似，也是一个函数，只不过里面的参数不是一个原始类型，而是一个 object，这样就可以将一系列的响应式数据放进去。

模板中使用的需要是响应式的数据，即 ref类型 的数据。这样才能完成模板响应式更新的工作。

```JavaScript
import { ref, computed, reactive, toRefs } from 'vue'

interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}

setup() {
  const data: DataProps  = reactive({ // reactive 里面放的是一个对象
    count: 0,
    increase: () => { data.count++}, // 这里就不跟使用 ref 一样，后面不用加 .value
    double: computed(() => data.count * 2)
  })

  // 如果去掉 : DataProps，则会报错
  // 因为在 computed 回调中使用 data.count，会造成一个类型推论的循环。
  // 由于 ts 的局限性，vue3 暂时没法解决这个问题，它会自动将 data 推断成 any 类型。
  // 因此需要我们自己给 data 指定一个类型。

  // const data = reactive({ 
  //   count: 0,  
  //   increase: () => { data.count++}, 
  //   double: computed(() => data.count * 2)
  // })

  const refData = toRefs(data)
  return {
    ...refData
  }

  // 如果是写
  // return {
  //   data
  // }
  // 则获取对象属性的值时，需要写
  // <template>
  //   <h1>{{ data.double }}</h1>    // data.double
  //   <h1>{{ data.count }}</h1>
  //   <button @click="data.increase">+1</button>
  // </template>


  // 响应式的数据是一个 ref 类型的数据，因此就算是
  // return{
  //   count: data.count,
  //   double: data.double,
  //   increase: data.increase
  // }
  // 去获得它的值的时候
  // <template>
  //   <h1>{{ double }}</h1>  
  //   <h1>{{ count }}</h1>
  //   <button @click="increase">+1</button>
  // </template>
  // 不会发生任何反应
  // 这时因为 count: data.count，得到的时一个 number 类型的值，而不是一个 ref类型的值
  // 因此它不会出现响应效果
  // 因此需要使用 toRefs，接收一个 reactive 对象作为参数，返回一个普通的对象，但是这个对象每一项都变成了 ref 类型。
}
```

### isRef
判断某个值是否是通过 ref 函数创建出来的

```javaScript
import { isRef } from 'vue'
const judge = isRef(foo) ? foo.value : foo
```

### toRefs
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

### computed

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
        const comp = computed(() => num.value + 1)
        comp.value = 9 // 这个是不能修改成功的
    },
  }
```

#### 创建可读可写的计算属性
需要使用 get 和 set

<<< @/docs/frontEnd/vue/Vue3/Computed/index.vue

## vue 响应式原理
[vue2 响应式原理的一些缺陷](https://cn.vuejs.org/v2/guide/reactivity#%E5%AF%B9%E4%BA%8E%E5%AF%B9%E8%B1%A1) ，vue3 使用了 ES6 的新特性 proxy 来实现响应式。

```JavaScript
   // vue2 
   // 需要知道拦截的 key 是什么，因此会对于对象上的新增属性无能为力  
    Object.defineProperty(data, "count", {
      get() {},
      set() {},
    });

    // vue3
    // 不需要知道具体的 key，因此可以拦截已有 key 和新增的 key
    new Proxy(data, {
      get(key) {},
      set(key, value) {},
    });
```

vue2 不支持：修改数组移项，新增 Object 属性
[vue2 不支持通过下标修改数组](https://www.cnblogs.com/lx2331/p/15065234.html)

vue3 支持了
```JavaScript
  <ul>
    <li v-for="(number, index) in numbers" :key="index">{{ number }}</li>
  </ul>
  <h1>{{ person.name }}</h1>

  import { defineComponent, toRefs, reactive } from "vue";

  export default defineComponent({
    name: "App",
    setup() {
      interface DataProps {
        numbers: number[];
        person: { name?: string }; // name 属性设置为可选，类型是 string
      }

      const data: DataProps = reactive({
        numbers: [1, 2, 3],
        person: {},
      });

      data.numbers[0] = 5; // 将里面数组第一项修改成 5 ，vue2 里不支持的，vue3 这里支持了
      data.person.name = "ccc";

      const refData = toRefs(data);
      return {
        ...refData,
      };
    }
  });
```

### watch
在默认情况下，当第一次进入页面后，会执行一次 watch，如果要使得 第一次进入页面的时候，不会触发 watch 的执行，可以加上 {lazy:true}

() => teacher.teacherName ，这种格式用于监听 reactive 创建对象的某一个属性发生改变。<br>
使用 方括号 的形式，能同时监听多个数据源

```JavaScript
<template>
  <h1>{{ count }}</h1>
  <button @click="increase">+1</button>
</template>

import { defineComponent, toRefs, reactive, watch, ref } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    interface DataProps {
      count: number;
      increase: () => void; // 输入的参数为空，输出值 viod，说明没有返回值
    }

    const data: DataProps = reactive({
      count: 1,
      increase: () => {
        data.count++;
      },
    });

    const refData = toRefs(data);

    const greetings = ref('')
    // // watch 简单应用
    // watch(data, () => {
    //   document.title = "updated " + data.count; // 修改浏览器的 title
    // });

    // // watch 的两个参数，代表新的值和旧的值
    // watch(refData.count, () => {
    //   document.title = "updated " + data.count;
    // });

    // // watch 多个值，返回的也是多个值的数组
    // watch([greetings, data], () => {
    //   document.title = "updated" + greetings.value + data.count;
    // });



    // 使用 getter 的写法 watch reactive 对象中的一项
    // () => data.count ，指向监听 data 里的 count 这个值，用回调的形式使其还是 ref 数据类型
    watch([greetings, () => data.count], (newValue, oldValue) => {
      console.log("old", oldValue);
      console.log("new", newValue);
      document.title = "updated" + greetings.value + data.count;
    });

    return {
      ...refData,
    };
  },
  components: {},
});
```

#### 清除监听

<<< @/docs/frontEnd/vue/Vue3/Watch/ClearWacth.vue

实例：一个输入框，监测文本框值的变化，只有当停止输入一秒后，才会输出此时文本框的值。

<<< @/docs/frontEnd/vue/Vue3/Watch/ClearWacthInput.vue

#### 在watch中清除无效的异步任务
当切换页面的时候，之前页面开启的任务，在页面实现跳转之后，要停止下来。

<<< @/docs/frontEnd/vue/Vue3/Watch/WacthMulti.vue

### watchEffect

<b> < h1 @click='changeNum'>计数:{ { num } }</ h1> </b> <br>

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

## 模块化(抽离公共方法)
composition API 不仅可以将相关的 feature 组合到一起，使其不分散在多个地方。另一个就是它可以非常容易的重用，有更高的灵活度。

将某个方法抽离出来成为一个单独的方法。

```JavaScript
// (1)
// 创建一个 useMousePosition.ts 文件
// 将组件内逻辑抽象成可复用的函数
function useMouseTracker() {
  // const positions = reactive<MousePostion>({
  //   x: 0,
  //   y: 0
  // })
  const x = ref(0)
  const y = ref(0)
  const updatePosition = (event: MouseEvent) => {
    x.value = event.clientX
    y.value = event.clientY 
  }
  onMounted(() => {
    document.addEventListener('click', updatePosition)
  })
  onUnmounted(() => {
    document.removeEventListener('click', updatePosition)
  })
  return { x, y }
}

export default useMouseTracker


// (2)
// 引入 该文件
import useMousePosition from './useMousePosition'
const {x, y} = useMousePosition()
```

### API 调用
```JavaScript
// (1)
// 自定义一个 useURLLoader.ts 文件
// 安装 axios 注意它是自带 type 文件的，所以我们不需要给它另外安装 typescript 的定义文件
// npm install axios --save
import { ref } from 'vue'
import axios from 'axios'
// 添加一个参数作为要使用的 地址
function useURLLoader(url: string){
// 声明几个ref，代表不同的状态和结果
  const result = ref(null)
  const loading = ref(true)
  const loaded = ref(false)
  const error = ref(null)

// 发送异步请求，获得data
// 由于 axios 都有定义，所以rawData 可以轻松知道其类型
  axios.get(url).then((rawData) => {
    loading.value = false
    loaded.value = true
    result.value = rawData.data 
  }).catch((e) => {
    error.value = e
  })
  // 将这些ref 一一返回
  return {
    result,
    loading,
    error,
    loaded
  }
}
export default useURLLoader


// （2）
// 引入文件
import useURLLoader from './useURLLoader.ts'
const { result, loading, loaded } = useURLLoader('https://dog.ceo/api/breeds/image/random')

<h1 v-if="loading">Loading!...</h1>
// result.message，因为在公共文件里 axios 调用 API 的时候
// result.value = rawData.data
// 这里使用 result 的值的时候，不需要加 .value
<img v-if="loaded" :src="result.message" >
``` 

### 模块化结合 typescript 泛型改造
接上面的代码，需要监听 result

```JavaScript
watch(result, () => {
  console.log(result.value.message) 
  // 这样肯定会报错，因为在 API 调用完成之前，result.value 还是一个 null，不可能有 message 这个属性
  // 因此首先需要判断 result.value 是否存在
  // 当它存在的时候，再去打印 (result.value.message
})
```

因此可以使用泛型来解决这个问题
```JavaScript
// 给公共文件里的那个函数添加泛型
// 为函数添加泛型
function useURLLoader<T>(url: string) {
  const result = ref<T | null>(null)
```

```JavaScript
   // 获取狗狗图片的接口的返回值是
   //  {"message":"https:\/\/images.dog.ceo\/breeds\/otterhound\/n02091635_1621.jpg","status":"success"}  
    interface DogResult { 
      message: string;
      status: string;
    }

    // 解构出调用该函数会返回的值
    const { loading, loaded, error, result } = useURLLoader<DogResult>(
      "https://dog.ceo/api/breeds/image/random"
    );

    watch(result, () => {
      if (result.value) { // 因为是运用了 ts 的泛型，因此可以在传值的时候再确定变量的类型
        console.log("result.value.message", result.value.message);
      }
```

另外一个需求，要求显示一个猫的图片，返回猫图片 API 的返回值是一个数组

```JavaScript
  <h1 v-if="loading">loading</h1>
  // 这里使用的时候就不要加 .value
  <img v-if="loaded" :src="result[0].url" />

   // 获取猫猫图片的接口的返回值是
   // [{"breeds":[],"categories":[{"id":1,"name":"hats"}],"id":"7hc","url":"https://cdn2.thecatapi.com/images/7hc.jpg","width":500,"height":333}]
      interface CatResult {
      id: string;
      url: string;
      width: number;
      height: number;
    }

    // 解构出调用该函数会返回的值
    // 接口返回的值是一个数组
    // CatResult[]
    const { loading, loaded, error, result } = useURLLoader<CatResult[]>(
      "https://api.thecatapi.com/v1/images/search?limit=1"
    );

    // 一个需求，监听 result 值的变化
    watch(result, () => {
      if (result.value) {
        // 这里获取 result 的值需要 .value
        console.log("result.value.message", result.value[0].url);
      }
    });
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
需求：页面上有一个文本框和一个按钮，点按钮之后，文本框出现，并且自动获取焦点。文本框失去焦点后，按钮出现。

### 方法一:使用 onUpdated<br>

```javaScript
<template>
    <div>
        <button v-if='showButton' @click='showButton=!showButton'>按钮</button>
        <input v-if='!showButton' type="text" ref='inputRef'>
    </div>
</template>

<script>
    import { ref, onUpdated } from 'vue'
    export default {
        setup() {
            let showButton = ref(true)
            let inputRef = ref('')
            onUpdated(() => { // 使用 onUpdated
                console.log('inputRef', inputRef)
                inputRef.value.focus()
            })
            return { showButton, inputRef }
        },
    };
</script>

<style>
</style>
```

### 方法二:$nextTick
。。。

## Teleport
vue3 里自带的一个默认组件 Teleport。

比如在某个组件渲染的时候，在某种条件下需要显示一个全局的对话框 modal组件（就是一个弹窗/浮层让用户完成一些确定或取消的工作）。这个 modal组件 是自定义的一个组件。

![之前的挂载情况](/docs/frontEnd/vue/Vue3/Image/old.png)

```JavaScript
// 之前代码的常用写法
<template>
    <div class="foo">
        <div class="foo">
            <div>...</div>
            // 将引入的 modal组件 放置在这里
            <modal v-if="modalopen"></modal>
        </div>
    </div>
</template>
```


![使用 Teleport 后的挂载情况](/docs/frontEnd/vue/Vue3/Image/new.png)

在自定义组件的最外层添加一个标签 teleport

```JavaScript
// vue3 新添加了一个默认的组件就叫 Teleport，我们可以拿过来直接使用，它上面有一个 to 的属性，它接受一个css query selector 作为参数，这就是代表要把这个组件渲染到哪个 dom 元素中
  <teleport to="#modal"> // 想将其渲染到 id 为 modal 的组件上去
    <div id="center">
      <h1>this is a modal</h1>
    </div>
  </teleport>
```

在引入 自定义 modal 组件的文件里，定义：

```JavaScript
<div id="modal"></div>
```

## emits
？？？？？ 为什么出不来？？？？？

## suspense 用于异步请求
没学。。。。

