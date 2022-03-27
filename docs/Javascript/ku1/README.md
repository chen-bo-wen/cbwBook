---
navbar:false
sidebar:auto
---

## html 默认代码

```javascript
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Document</title>
</head>

<body>
</body>
</html>
```

## ES6 相关面试题
|    var   |  let  | const |  
| :---: | :---: | :---: |
| 声明提升 || 声明时就必须赋值，否则报错|
|可重复声明||只不能修改，否则报错|
|没有块级作用域|||

```javascript
function fn(){
  for( var a = 0; a < 3; a++ ){
    console.log(a) // 会按照顺序打印出 0，1，2
  }
   console.log(a) // 会打印出 3，因此可以得出这个没有块级作用域
}
fn()
```

### 值互换
<b>let a = 1; let b = 2;如何将两个值进行互换，并且不引用第三方变量。</b><br>

【方法1】：a=a^b; b=a^b; a=a^b;  // 异或运算的运用<br>
【方法2】：[a,b]=[b,a] // 解构赋值的运用<br>
[解构赋值，一一映射](https://blog.csdn.net/weixin_39572442/article/details/110799241)

### 去重
<b>let arr = [1,1,1,2,2,3,3]</b><br>

```javascript
let filterArr = [...new Set(arr)] // 得到的结果就是 [1,2,3]
```

### promise
promise 打印顺序问题

```javascript
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve();
  console.log(2)
})

promise.then(() => {
  console.log(3)
})
  
console.log(4)
```

构造函数是同步执行，.then()是异步执行，因此正确答案是 1，2，4，3

## v-model 原理
【1】双向数据绑定

[Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

[.addEventListener()](https://www.jianshu.com/p/3f65e05a8c6f)【兼容ie8低版本浏览器不支持addEventListener】

```javascript
    <input type="text" id="username">
    <p id="userName"></p>
    <p id="userName2"></p>

    <script>
        let obj = {}
        Object.defineProperty(obj, 'userN', { // object.defineProperty 的参数值
            // get() {
            //     console.log('get取值')
            // },
            set(newVal) { // 一次性拿到值，这样可以对多个元素进行响应（自己写的）
                // 设置值
                document.getElementById('userName').innerText = newVal
                document.getElementById('userName2').innerText = newVal
                console.log('新22值', newVal) // 当 obj 的 userN 属性被赋予新的值时，就会触发 set 方法。
            }
        })

        // let pname = document.getElementById('userName2') // 这就是一个一个的去设置响应
        document.getElementById('username').addEventListener("keyup",function(){
            // pname.innerText = event.target.value  
            obj.userN = event.target.value   // 监听输入框的输入事件，拿到对应的值
        })
    </script>
```

## data() 为什么是一个函数
data()是一个闭包的设计，闭包可以让每一个组件都有自己私有作用域，确保各组件数据不会相互干扰。

## v-if & v-show
需要进行多次渲染的时候，例如一个按钮，需要多次的进行显示和隐藏，就使用 v-show，因为 v-show 只是隐藏 dom，但是还是会渲染 dom 的。<br>
如果是 v-if ，则就是用于单次判断，当不符合条件的时候，直接就不会渲染 dom。<br>
v-if => 单次判断显示隐藏 => 不会渲染 dom <br>
v-show => 多次切换显示隐藏 => 会渲染但隐藏 dom （v-show 不能用于权限操作，因为可以直接在控制台修改 dom 的一些属性）

## 虚拟 DOM
[虚拟 DOM](https://www.cnblogs.com/bbldhf/p/13871197.html)

### 虚拟 DOM 如何提升渲染效率
【1】局部更新（节点数据）<br>
【2】将直接操作 DOM 的地方拿到两个 js 对象之中去比较

### diff 中的 patch() 方法
虚拟 DOM 生成的三要素：目标元素，属性，子节点

[document.createElement：创建真实DOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElement)

```javascript
    let n = document.createElement('div') 
    console.log(n)    // <div></div>  
```

[hasOwnProperty(属性)：判断虚拟DOM里是否拥有该属性]()

[setAttribute(属性名,属性值)：往真实DOM身上添加属性](https://www.w3school.com.cn/jsref/met_element_setattribute.asp)【html DOM 的 setAttribute() 方法】

[appendChild()](https://www.runoob.com/jsref/met-node-appendchild.html)【html DOM 的 appendChild() 方法】

```javascript
        // 写的是一个大概的思路，具体实现没写
        function createEle(vnode) {
            let tag = vnode.tag // 虚拟 DOM 的标签
            let attr = vnode.attr // 虚拟 DOM 的属性
            let children = vnode.childNode // 虚拟 DOM 的子节点

            if (!tag) {
                return null // 如果没有目标元素的话，则是返回 null
            }

            // 创建真实 DOM
            let ele = document.createElement(tag)
            let attrName

            // 为真实 DOM 添加属性
            for (attrName in attr) { // for in 循环用来遍历数组或对象的属性
                if (attr.hasOwnProperty(attrName)) { // hasOwnProperty 判断是否有该属性
                    // 添加属性 setAttribute()
                    ele.setAttribute(attrName, attr[attrName]) // 属性名，属性值
                }
            }

            // 真实 DOM 的子节点
            children.forEach(childNode => {
                ele.appendChild(createE(childNode)) // 如果子节点里有子节点，则使用递归的方式
            })
            return ele // 返回创建好的真实 DOM
        }

        // 更新 虚拟 DOM 
        function updatechild(vnode, newVnode) { // 更新子节点
            let children = vnode.children || [] // 旧的虚拟 DOM 的子节点，也有三个要素：元素、属性、子节点
            let newchildren = newVnode.children || [] // 新的虚拟 DOM 的子节点

            children.forEach((childrenNode, index) => {
                // 每一层都要判断是否发生了变化，如下面的结构
                // <ul>
                //     <li>
                //        <li></li>
                //        <li></li>
                //     </li>
                //     <li></li>
                //     <li></li>
                // </ul>
                let newChildrenNode = newchildren[index]

                if (childrenNode.tag === newChildrenNode.tag) { 
                  // 如何才算作是同一个节点，diff算法核心原理里有
                  // 深层次通过递归去比较
                    updatechild(childrenNode, newChildrenNode) // 比较该节点的子节点
                } else {
                    replaceNode(childrenNode, newChildrenNode) // 否则进行替换
                }
            })
        }
```

[diff算法核心原理](https://mp.apipost.cn/a/b59eca702d626581)

## $nextTick()
dom更新后延迟回调。如在A组件里调用B组件，需要等B组件加载完成之后才能调用B组件上的方法，如：

```javascript
$nextTick({
  this.$refs.B.fn()
})
```

## 单页面(SPA)与多页面的区别

![单页面(SPA)与多页面的区别](/docs/Javascript/ku1/Image/SPA.png)

[为何单页面的seo不友好](https://segmentfault.com/a/1190000020752752?utm_source=tag-newest)

## v-for & v-if
v-for 的优先级高于 v-if，这样的话会导致 v-if 运行在 v-for 的每个循环中间。

## Vue-router & location
?????????????
location.href：（跳外链），简单方便，刷新页面。<br>
Vue-router：（跳自身的页面）底层封装的是js的原生history，实现了按需加载，减少了DOM消耗。

## vue2.0 的响应式原理
响应式：1.数据联动（双向绑定） 2.可以捕获到数据的修改 <br>
？？？？ 没看懂
通过发布订阅模式，加上数据截持，也就是 Object.defineProperty

<<< @/docs/Javascript/ku1/dingyuan/Dep.js

<<< @/docs/Javascript/ku1/dingyuan/Dep.html

[数据响应式视频](https://www.bilibili.com/video/BV16Y411875j?p=5&spm_id_from=pageDriver)

[深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)

[Array.prototype.shift.call(arguments)](https://blog.csdn.net/weixin_44524243/article/details/119646895)

[document.querySelector()](https://www.runoob.com/jsref/met-document-queryselector.html)

### for 循环的一种简写法
如果我们用for循环要输出1到10，我们可以这么写:

```javascript
for(var i=0;i<10;i++){
  console.log(i);
}
```

但是！根据上面的语法说明，我们也可以写成这样

```javascript
for(var i=10;i--;){
  console.log(i);
}
```
  
刚开始看的时候我也很疑惑，怎么能这么写？语句2放的是循环条件，i–是什么判断条件。其实不然，在语句2中，如果返回true循环会继续执行。在js中0,null,undefined,false,'',””作为条件判断时，其结果为false，也就说当i–到0的时候就是false，循环就终止了。

再回到文章开头的代码

```javascript
for (var i = 0, rule; rule = rules[i++];) {
  //do something
}
```

这个rule = rules[i++]就是判断条件，当成为undefined时就会终止循环啦。所以这段代码换成普通写法就是这样的：

```javascript
for(var i = 0;i < rules.length;i++){
  var rule = rules[i]
}
```

## 防抖 & 节流
闭包就是能够读取其他函数内部变量的函数。
 
 ### 防抖

<<< @/docs/Javascript/ku1/prevent/1debounce.js

 ### 节流

<<< @/docs/Javascript/ku1/prevent/2throttle.js

 ## promise & asyn + await
 例子：先打印“喝奶茶”，后打印“吃火锅”。<b>await + Promise，就可以将 Promise 里 resolve / reject 的值直接赋值给 “=” 左边</b>

<<< @/docs/Javascript/ku1/prevent/3promise.vue

## 构造函数和原型
<b>原型（prototype）是函数所特有的。但是任何对象、数组、number 都有原型链（__proto__ 或 [[prototype]]）</b>
分为<b>静态成员</b>和<b>实例成员</b>。<b>静态成员</b>只能通过构造函数来访问，不可通过实例对象。<b>实例成员</b>则是函数内部通过this添加的成员，只能通过实例对象来访问。

<<< @/docs/Javascript/ku1/prevent/4prototype.js

### 构造函数（原型） prototype
<b>prototype的作用</b>：原型的作用，就是共享方法。因为构造函数的每个实例对象都会开辟新的内存，因此会造成内存的浪费。

```JavaScript
console.dir(Star) // console.dir()可以显示一个对象所有的属性和方法。
Star.prototype.sing=function(){}
```

### 对象原型(原型链) __proto__ 或 [[prototype]]
[[prototype]]为改版后的谷歌的写法。
首先看实例对象是否拥有该方法，如若没有，则因有  __proto__  的存在，就去构造函数原型对象 prototype 身上去找。

### 判断属性是原型上的还是原型链上的
```javascript
for(let item in person1){ // for in 循环属性
  if(person1.hasOwnProperty(item)){ // 这样就可以找到其私有属性
    console.log(item)
  }
}
```

### 示例
[链式编程](https://juejin.cn/post/6844903999536267277)

<<< @/docs/Javascript/ku1/prototype/chain.html

### constructor
对象原型（__proto__)和构造函数（prototype）原型对象里都有一个属性，即 constructor 属性。<b>constructor主要用于记录该对象引用于哪个构造函数，它可以让原型对象重新指向原来的构造函数。</b>如下：如若没有<b>constructor: Star</b>，则在打印Star.prototype.constructor的时候，指向的就是 object。

```JavaScript
Star.prototype = {
    constructor: Star
    sing: function(){
        console.log('我会唱歌')
    },
    movie: function(){
        console.log('我会演戏')
    }
}
```

### instanceof
console.log(arr instanceof object)

### 构造函数、实例、原型对象

![构造函数、实例、原型对象三者之间的关系](/docs/Javascript/ku1/Image/proto.png)

### 原型对象 this 指向
```javaScript
function Star(uname, uage) {
    this.name = uname // 构造函数中，this的指向是实例对象
    this.age = uage   
}

Star.prototype.sing = function(){
    console.log('我会唱歌') // 原型对象函数里的 this 指向的也是实例对象
}

let ldh = new Star('刘德华', 55)
```

### 利用原型对象拓展内置对象
例：<b>console.log( Array.prototype )</b>，可以看到处理数组的方法，如 shift，sort 等。现在扩展内置对象方法，写一个求和。
 
``` JavaScript
Array.prototype.sum = function(){
    let sum = this.reduce((total,cur)=>{
        return total + cur
    },0)
    return sum
}

let arr = [1,2,3] // 即 new Array(1,2,3)
console.log(arr.sum())
}
```
### 继承
ES6之前并没有提供extends继承，我们可以通过构造函数+原型对象模拟实现继承，被称为组合继承。

#### 子构造函数继承父构造函数的属性或方法

```javaScript
function Father(uname,uage){
    this.name = uname
    this.age = uage
}

function Son(name,age){
  // call 分别接收参数，apply 接收的参数是数组
    Father.call(this,name,age) // 使用 call 方法使得其指向 Son 的实例对象
}
var son = new Son('ldh',55)
```

#### 借用原型对象继承方法
如果使用 Son.prototype = Father.prototype，则会使得 Son原型对象 和 Father原型对象指向的是同一个地址。<b>如果想要 Son 的原型对象里继承 Father 的方法，同时又有自己的才有的方法。这时就可以利用原型对象继承方法。</b>


```javaScript
function Father(uname,uage){
    this.name = uname
    this.age = uage
}

function Son(name,age){
    Father.call(this,name,age) // 使用 call 方法使得其指向 Son 的实例对象
}

Son.prototype = new Father()
Son.prototype.exam = function(){}
Son.prototype.constructor = Son // 注意：需要使用 constructor 指回原来的构造函数

var son = new Son('ldh',55)
```

![利用原型对象继承方法](/docs/Javascript/ku1/Image/extends.png)

#### 类
类的本质其实还是函数，ES6中的类其实就是语法糖

```javaScript
class Star{

}
console.log(typeof Star) // function
```

![类的本质](/docs/Javascript/ku1/Image/class.png)

## 数组的方法
### filter、forEach 和 some
<b>三个方法中，只有在 some 里 return true 的时候，才会终止迭代。</b>因此，如果是查照数组中唯一的元素，就使用 some 方法。

```javaScript
var arr = ['red','green','blue']
arr.forEach(item=>{
    if(item === 'green'){
        console.log('找到绿色了') 
        return true // 三个方法中，只有在 some 里 return true 的时候，才会终止迭代
    }
})
```

## Object.defineProperty
Object.defineProperty 的第三个参数必须是对象的形式。

```javaScript
var myObj={
    name:'ldh',
    age:55
}

Object.defineProperty(myObj,'sex',{
    value: '男',
    writable: false, // 设置 myObj 的 sex 这个属性不可修改
    enmerable: false, // 则 console.log(Object.key(myObj))，sex这个属性不会被打印出来
    configuration: false // 则 该属性不能被删除，也不能被修改
})

delete myObj.sex // 因为设置了 configuration，因此这个属性不能被删掉
```

![Object.defineProperty](/docs/Javascript/ku1/Image/Object_defineProperty.png)

## 函数进阶
<b>自定义函数（具名函数）</b>

```javaScript
function fn(){
    
}
```

<b>函数表达式（匿名函数）</b>

```javaScript
let fn = function(){

}
```

<b>利用 new Function(){'参数1','参数2','函数体'}</b>，但是这个不利于性能。一般不建议使用。

```javaScript
let fn = new Function(a,b,console.log(a+b))
fn(1,2) // 输出 3
```

## this指向问题
|                     call                      |                      apply                      |                      bind                       |
| :-------------------------------------------: | :---------------------------------------------: | :---------------------------------------------: |
|                   调用函数                    |                    调用函数                     |              <b>不会调用函数 </b>               |
|                 改变this指向                  |                  改变this指向                   |                  改变this指向                   |
|           分别接收参数 person.fullName.call(person1, "Oslo", "Norway")                                   |        <b>参数必须是以数组的形式传入</b> person.fullName.apply(person1, ["Oslo", "Norway"])       | <b>返回的是原函数该改变this之后产生的新函数</b> |
| <b>主要用于子构造函数继承父构造函数的属性</b> | <b>经常和数组有关系，因为它的传参必须是数组</b> |              <b>不立即调用函数</b>              |

### call

```JavaScript
var o = { name:'cbw' }
function fn(){
    console.log(this)
    console.log(a)
}
fn.call(o) // 则输出的 this 是 { name:'cbw' }
// fn.call() 相当于 fn()
```

### apply
apply 的主要应用：在ES5中，计算数组的最大值。而到了ES6中，就可以使用 <b>Math.max(...arr)</b>

```JavaScript
var arr = [1,2,3,4,5]
var max = Math.max.apply(null,arr)
console.log(max)
```

### bind

```JavaScript
function fn(a,b){
    console.log(a+b)
}
var o = { name:'cbw' }
let fn1 = fn.bind(o,a,b)
fn1()
```

<b>bind方法应用</b><br>
应用场景：有一个按钮，当我们点击之后，就禁用这个按钮，3秒后再开启按钮。
<b>不使用箭头函数的情况下</b>

<<< @/docs/Javascript/ku1/prevent/6This.vue

## 严格模式
### 为整个脚本开启严格模式

```javaScript
<script>
    'use strict'
</script>
```

### 为函数开启严格模式

```javaScript
(function(){
    'use strict'
})()
```

### 严格模式下的this指向问题
![严格模式下的this指向问题](/docs/Javascript/ku1/Image/this.png)

## 高阶函数
指它接受的参数是函数 或 返回的值是函数

```javaScript
<div></div>
$('div').animate({
    left:500
},function(){
    $('div').css(' background-color','purple')
})
```

## 闭包

[js垃圾回收机制原理](https://cloud.tencent.com/developer/article/1852932)

<b>描述：</b>指有权访问另一个函数作用域中变量的函数。例如在javascript中，只有函数内部的子函数才能读取局部变量，所以闭包可以理解成“定义在一个函数内部的函数”。如防抖、节流，都是应用了闭包的原理。<br>
<b>主要作用：</b>【1】延长变量的生命周期。【2】创建私有环境。<br>例如在 data() 里，设计就是闭包，这样可以使得各个组件有各自的私有作用域，防止变量相互影响。

### 实例一
点击li，输出当前 li 的索引值。不使用 v-for 循环。

<<< @/docs/Javascript/ku1/prevent/7closure_li.vue

### 实例二
计算打车价格

## 递归
函数在内部调用其本身。但是如果可以使用循环解决的问题，就不尽量不用递归。

### 实例一
求 1 * 2 * 3 * 4...* n 的阶乘

```javaScript
    function fn(n) {
        if(n==1){ // 注意要写终止条件
            return 1
        }
      return n * fn(n - 1);
    }
    fn(2);
    console.log('fn(2)',fn(2))
```

### 实例二
求斐波那契数列 1 1 2 3 5 8，输入一个值，得到其在斐波那契数列中对应序列的该数值。如：输入3，得到的数值是2，输入6，得到的数值是8。

```JavaScript
    function fb(n) {
      // 这里的 n 指的 是第 n 项
      if (n === 1 || n === 2) {
        // 当 n 是 1或 2 时，它们对应的数值都是 1
        return 1;
      }
      return fb(n - 1) + fb(n - 2);
    }
    console.log("fb(4)", fb(4));
```

### 实例三
输入id号，返回对应的数据。总数据如下：

```JavaScript
    var data = [
      {
        id: 1,
        name: "家电",
        goods: [
          {
            id: 11,
            name: "冰箱",
            goods: [
              {
                id: 111,
                name: "西瓜",
              },
            ],
          },
          {
            id: 12,
            name: "洗衣机",
          },
        ],
      },
      {
        id: 2,
        name: "服饰",
      },
    ];
```

```JavaScript
    function fc(data, id) {
      let o = {};
      data.forEach((item) => {
        if (item.id === id) {
          o = item;
        } else if (item.goods && item.goods.length > 0) {
          o = fc(item.goods, id); // 当拿到内层的数据的时候，记得要将拿到的数据赋值给 o，否则内层的数据是拿不到的。
        }
      });
      return o;
    }
    console.log("fc(data, 111)", fc(data, 111));
```

## 浅拷贝 && 深拷贝
### 浅拷贝
浅拷贝:<b>只拷贝一层。</b>如果遇到对象级别的，更深层次的数据的话，就是将地址拷贝了，两个对象指向的是同一个地址，任何一个对象的数值发生改变，都会引起另一个的改变。<br>
如：

```JavaScript
    var obj = {
      name: "cbw",
      age: 22,
      hobby: {
        sing: true,
      },
    };

    var o = {};

    for (let k in obj) { // for in 可以遍历 对象 里的属性名
      o[k] = obj[k];
    }

    o.age = 23;
    o.hobby.dance = true;

    console.log("obj", obj); 
    // 打印输出结果：
    // age: 22
    // hobby: {sing: true, dance: true}
    // name: "cbw" 
```

```JavaScript
    function shallowCopy(newObj, oldObj) {
      for (let k in oldObj) {
        if (oldObj[k] instanceof Object || oldObj[k] instanceof Array) {
          newObj[k] = oldObj[k];
          shallowCopy(newObj[k], oldObj[k]);
        } else {
          newObj[k] = oldObj[k];
        }
      }
      return newObj
    }
    console.log('shallowCopy(o, obj)',shallowCopy(o, obj)) 
```

可以看到，上述结果，age 没有跟着变化，但是 hobby 跟着变化了。

#### Object.assign
是 es6 中新增的方法（语法糖），可以实现浅拷贝，只拷贝一层

```javaScript
Object.assign(o, obj) // 把 obj 拷贝给 o
```

### 深拷贝
#### 利用函数递归进行拷贝

```JavaScript
    function deepCopy(newObj, oldObj) {
      for (let k in oldObj) {
        let item = oldObj[k];

        if (item instanceof Array) {
          newObj[k] = [];
          deepCopy(newObj[k], item);
        } else if (item instanceof Object) {
          newObj[k] = {};
          deepCopy(newObj[k], item);
        } else {
          newObj[k] = item; // 只有普通数据类型的，才能直接就进行赋值
        }
      }
      return newObj;
    }
    console.log("deepCopy(o, obj)", deepCopy(o, obj));
    o.hobby.sing = false;
    console.log("o", o);
    console.log("obj", obj);
```

### 解构赋值
针对一维的数组和对象是深拷贝（改变一个不会影响另一个），针对多维的数组和对象是浅拷贝。

```javascript
let arr = [1,2,3,4]
arr2 = arr
arr2.push(5)
console.log(arr, arr2) // 都是 [1,2,3,4,5]

let array = [1,2,3,4]
array2 = [...array]
array2.push(5)
console.log(array, array2) //  [1,2,3,4]  [1,2,3,4,5]

let Arr = [[1],[1,2]] // 多维数组，解构赋值是 浅拷贝（一个数组的变动会影响另一个）
Arr2 = [...Arr]
Arr2[0].push(2)
console.log(Arr, Arr2) //  都是 [[1,2],[1,2]]
```

## 正则表达式
### 创建正则表达式
有两种方式：<br>
【1】通过调用 RegExp 对象的构造函数构建（regular expression）

```JavaScript
var regExp = new RegExp(/123/)
console.log(regExp)
```

【2】利用字面量创建正则表达式

```JavaScript
var rg = /123/
```

### 测试正则表达式 test
test()正则对象方法，用于检测字符串是否符合该规则，对象会返回 true 或 false，其参数是测试字符串。

```JavaScript
regExpObj.test(str)
// regExpObj 是我们写的正则表达式
// str 我们要测试的文本
// 就是检测 str 文本是否符合我们写的正则表达式规范
```

使用正则表达式对表单进行验证
使用正则表达式替换内容
正则表达式的特殊字符

### 边界符
| 边界符 |                      说明                      |
| :----: | :--------------------------------------------: |
|   ^    |         表示匹配行首的文本（以谁开始）         |
|   $    |         表示匹配行尾的文本（以谁结束）         |
|   []   | 表示有一系列字符可供选择，只要匹配其中一个即可 |
|  [-]   |                 方括号内范围符                 |
|  [^]   |                      取反                      |

```JavaScript
// 正则表达式里面不需要加引号，不管是数字型还是字符串型

var rg = /abc/; 
// /abc/ 只要包含有 abc 这个字符串，返回的都是 true
console.log(rg.test('abc'))
console.log(rg.test('abcd'))
console.log(rg.test('aabcd'))  // 这三个返回的都是 true

var rg = /^abc/; 
// /^abc/ 以 abc 这个字符串，返回的都是 true
console.log(rg.test('abc'))    // true
console.log(rg.test('abcd'))   // true
console.log(rg.test('aabcd'))  // false

var rg = /^abc$/; 
// /^abc$/ 精准匹配，只有字符串 abc，返回的才是 true
console.log(rg.test('abc'))    // true
console.log(rg.test('abcd'))   // false
console.log(rg.test('aabcd'))  // false

```

### 字符类
[] 表示有一系列字符可供选择，只要匹配其中一个就可以了<br>
[-] 方括号内范围符，表示在该范围内的都可<br>

```JavaScript
var rg = /[abc]/; 
// 只要字符串里包含有 a 或 b 或 c，都返回为 true。
console.log(rg.test('andy'))  // true
console.log(rg.test('baby'))  // true
console.log(rg.test('color')) // true
console.log(rg.test('red'))   // false

var rg = /^[abc]$/; 
// 三选一 ，只有是 a 或 b 或 c，才返回为 true。
console.log(rg.test('a'))     // true
console.log(rg.test('b'))     // true
console.log(rg.test('c'))     // true
console.log(rg.test('aa'))    // false

var rg = /^[a-z]$/   
// 26 个英文字母，任何一个字母都是返回 true
console.log(rg.test('a'))     // true
console.log(rg.test('A'))     // false
```

#### 字符组合

```JavaScript
var rg = /^[a-zA-Z0-9_-]$/   
// 26 个英文字母（大小写），数字0-9，任何一个字符都是返回 true
console.log(rg.test('a'))     // true
console.log(rg.test('A'))     // true
console.log(rg.test('Aa'))    // false

var rg = /^[^a-zA-Z0-9_-]$/   
// 取反，不能包含
console.log(rg.test('a'))     // false
console.log(rg.test('A'))     // false

```

### 量词符
| 量词  |              说明              |
| :---: | :----------------------------: |
|   *   | 相当于>=0，可以出现0次或很多次 |
|   +   | 相当于>=1，可以出现1次或很多次 |
|   ?   |          相当于 1或0           |
|  {n}  |            重复n次             |
| {n,}  |          重复 >=n 次           |
| {n,m} |      重复 >=n 次，<=m 次       |

```JavaScript
var rg = /^a*$/   
// * 前面的字符，允许出现 0 次或很多次
console.log(rg.test(' '))     // true
console.log(rg.test('a'))     // true
console.log(rg.test('aaaa'))  // true

var rg = /^a+$/   
// + 前面的字符，允许出现 1 次或很多次
console.log(rg.test(' '))     // false
console.log(rg.test('a'))     // true
console.log(rg.test('aaaa'))  // true

var rg = /^a?$/   
// ? 前面的字符，允许出现 1 次或 0 次
console.log(rg.test(' '))     // true
console.log(rg.test('a'))     // true
console.log(rg.test('aaaa'))  // false

var rg = /^a{3}$/   
// {3} 就是重复 3 次
console.log(rg.test(' '))     // false
console.log(rg.test('a'))     // false
console.log(rg.test('aaa'))   // true
console.log(rg.test('aaaa'))  // false

var rg = /^a{3,}$/   
// {3,} 就是重复 >=3 次
console.log(rg.test(' '))     // false
console.log(rg.test('a'))     // false
console.log(rg.test('aaa'))   // true
console.log(rg.test('aaaa'))  // true

var rg = /^a{3,16}$/   
// {3,16} 就是重复 >=3 次，并且 <=16 次
console.log(rg.test(' '))     // false
console.log(rg.test('a'))     // false
console.log(rg.test('aaa'))   // true
console.log(rg.test('aaaa'))  // true
```

#### 量词重复某个模式的次数

```JavaScript
// 量词是设定某个模式出现的次数
var reg = /^[a-zA-Z0-9_-]{6}$/
console.log(reg.test('a8'))        // false
console.log(reg.test('a81234_-'))  // true
```

## 预定义类

![预定义类](/docs/Javascript/ku1/Image/preDefined.png)

<b>例一：</b>座机号码验证：全国座机号码，两种格式 010-12345678 或 0530-1234567<br>

```JavaScript
 var reg = /^\d{3}-\d{8}/  // \d 匹配 0-9 之间的任一数字，相当于 [0-9],这个是匹配第一种格式的
 var reg2 = /^\d{3}-\d{8}|\d{4}-\d{7}/ // 这两种格式的都能匹配
//  正则里的 | 符号，是用一个 | 线来表示的
```

<b>例二：</b>手机号码的正则表达式

```JavaScript
var tel = \^1[3|4|5|7|8]\d{9}$\ // 表示是以 1 开头，第二位数字是 3 或 4 或 5 或 7 或 8
```

## replace
只能替换第一个符合条件的参数

```javaScript
let str = '老师上课有激情，同学保持激情'
str.replace(/激情/,'**') // 这样替换得到的效果就是：老师上课有**，同学保持激情
// 如果要做到全部替换的话，应该写为如下：
str.replace(/激情/g,'**')
```

## let var const
|    var     |      let       |     const      |
| :--------: | :------------: | :------------: |
| 函数作用域 |   块级作用域   |   块级作用域   |
|  变量提升  | 不存在变量提升 | 不存在变量提升 |
|  没有块级作用域  |         |               |
|   值可改   |     值可改     |    值不可改    |

```javascript
  console.log(name) // undefined
  var name = '小明'

  function fn2(){
    for(var i = 0; i < 3; i++){

    }
    console.log(i) // 因为 var 定义的没有局部作用域，因此打印出结果为 3
  }
  fn2()

  var a = 1
  var a = 2
  console.log(a) // a，不会报错，这是使用 var 的一个致命缺陷
```

## padding & margin
两者的作用对象不同。padding 是针对于自身的，margin是作用域外部对象的。

## vw & 百分比
vw 是参照屏幕的宽度，% 是参照父盒子的宽度。

## 如何让谷歌浏览器支持小字体
默认情况下，谷歌支持的最小字体是 12px，如果需要让谷歌支持比 12px 还要小的字体，则需要：

```javascript
    .divBox {
        font-size: 12px;
        transform: scale(0.6);
        -webkit-transform: scale(0.6);
    }
```

## 剩余参数

```javaScript
function sum(first,...args){
  console.log(first)   // 10
  console.log(...args) // [20,30]
}
sum( 10,20,30 )
```

在 ES6 之前直接获取全部参数是使用 arguments，但是在箭头函数里不能使用 arguments，只能使用剩余参数。

## 拓展运算符

将类数组可遍历对象转换为真正的数组

```JavaScript
 var oDivs = document.getElementsByTagName('div')
 console.log(oDivs)
 var ary = [...oDivs]
 ary.push('a')
 console.log(ary)
```

## 数组的拓展方法
### Array.from 方法
将类数组或可遍历对象转换为真正的数组

```JavaScript
let arrayLike = {
  '0':'a',
  '1':'b',
  '2':'c',
  length:3
}
let arr2 = Array.from(arrayLike)
let newAry = Array.from(aryLike, item => item*2)
```

### find()
找出<b>第一个</b>符合条件的数组成员，如果没有找到就返回 undefined

```JavaScript
let ary = [
  {
    id: 1,
    name:'张三'
  },
  {
    id: 2,
    name:'李四'
  }
]
let target = ary.find((item,index) => item.id == 2 )
```

### findIndex()
找出<b>第一个</b>符合条件的数组成员位置，如果没有找到就返回 -1

```JavaScript
let ary = [1,5,10,15]
let index = ary.findIndex((value,index) => value > 9 )
console.log(index) // 2
``` 