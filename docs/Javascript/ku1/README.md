### 防抖 & 节流
 
 #### 防抖

<<< @/docs/Javascript/ku1/prevent/1debounce.js

 #### 节流

<<< @/docs/Javascript/ku1/prevent/2throttle.js

 #### promise & asyn + await
 例子：先打印“喝奶茶”，后打印“吃火锅”。<b>await + Promise，就可以将 Promise 里 resolve / reject 的值直接赋值给 “=” 左边</b>

<<< @/docs/Javascript/ku1/prevent/3promise.vue

#### 构造函数和原型
分为<b>静态成员</b>和<b>实例成员</b>。<b>静态成员</b>只能通过构造函数来访问，不可通过实例对象。<b>实例成员</b>则是函数内部通过this添加的成员，只能通过实例对象来访问。

<<< @/docs/Javascript/ku1/prevent/4prototype.js

#### 构造函数 prototype
<b>prototype的作用</b>：原型的作用，就是共享方法。因为构造函数的每个实例对象都会开辟新的内存，因此会造成内存的浪费。

```JavaScript
console.dir(Star)
Star.prototype.sing=function(){}
```

#### 对象原型 __proto__
首先看实例对象是否拥有该方法，如若没有，则因有 __proto__ 的存在，就去构造函数原型对象 prototype 身上去找。

#### constructor
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

#### 构造函数、实例、原型对象三者之间的关系

![三者关系](/docs/Javascript/ku1/Image/proto.png)

#### 原型对象 this 指向
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

#### 利用原型对象拓展内置对象
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
