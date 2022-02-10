---
navbar:false
sidebar:auto
---

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

[兼容ie8低版本浏览器不支持addEventListener](https://www.jianshu.com/p/3f65e05a8c6f)

```javascript
    <input type="text" id="username">
    <p id="userName"></p>

    <script>
        let obj = {}
        Object.defineProperty(obj, 'userN', { // object.defineProperty 的参数值
            // get() {
            //     console.log('get取值')
            // },
            set(newVal) {
                // 设置值
                document.getElementById('userName').innerText = newVal
                console.log('新22值', newVal) // 当 obj 的 userN 属性被赋予新的值时，就会触发 set 方法。
            }
        })

        document.getElementById('username').addEventListener("keyup",function(){
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

## 防抖 & 节流
 
 ### 防抖

<<< @/docs/Javascript/ku1/prevent/1debounce.js

 ### 节流

<<< @/docs/Javascript/ku1/prevent/2throttle.js

 ## promise & asyn + await
 例子：先打印“喝奶茶”，后打印“吃火锅”。<b>await + Promise，就可以将 Promise 里 resolve / reject 的值直接赋值给 “=” 左边</b>

<<< @/docs/Javascript/ku1/prevent/3promise.vue

## 构造函数和原型
分为<b>静态成员</b>和<b>实例成员</b>。<b>静态成员</b>只能通过构造函数来访问，不可通过实例对象。<b>实例成员</b>则是函数内部通过this添加的成员，只能通过实例对象来访问。

<<< @/docs/Javascript/ku1/prevent/4prototype.js

### 构造函数 prototype
<b>prototype的作用</b>：原型的作用，就是共享方法。因为构造函数的每个实例对象都会开辟新的内存，因此会造成内存的浪费。

```JavaScript
console.dir(Star)
Star.prototype.sing=function(){}
```

### 对象原型 __proto__
首先看实例对象是否拥有该方法，如若没有，则因有 __proto__ 的存在，就去构造函数原型对象 prototype 身上去找。

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
## 继承
ES6之前并没有提供extends继承，我们可以通过构造函数+原型对象模拟实现继承，被称为组合继承。

### 子构造函数继承父构造函数的属性或方法

```javaScript
function Father(uname,uage){
    this.name = uname
    this.age = uage
}

function Son(){
    Father.call(this) // 使用 call 方法使得其指向 Son 的实例对象
}
var son = new Son('ldh',55)
```

### 借用原型对象继承方法
如果使用 Son.prototype = Father.prototype，则会使得 Son原型对象 和 Father原型对象指向的是同一个地址。<b>如果想要 Son 的原型对象里继承 Father 的方法，同时又有自己的才有的方法。这时就可以利用原型对象继承方法。</b>


```javaScript
function Father(uname,uage){
    this.name = uname
    this.age = uage
}

function Son(){
    Father.call(this) // 使用 call 方法使得其指向 Son 的实例对象
}

Son.prototype = new Father()
Son.prototype.exam = function(){}
Son.prototype.constructor = Son // 注意：需要使用 constructor 指回原来的构造函数

var son = new Son('ldh',55)
```

![利用原型对象继承方法](/docs/Javascript/ku1/Image/extends.png)

### 类
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
|                                               |        <b>参数必须是以数组的形式传入</b>        | <b>返回的是原函数该改变this之后产生的新函数</b> |
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

<b>描述：</b>指有权访问另一个函数作用域中变量的函数。如防抖、节流，都是应用了闭包的原理。<br>
<b>主要作用：</b>延伸了变量的作用范围。<br>

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
|   值可改   |     值可改     |    值不可改    |

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