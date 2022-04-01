## 工作中解决过的比较困难的问题，说一下自己项目中比较有亮点的地方
？？？？？？？
考察的是解决分析问题的能力

一个比较投机取巧的例子：当时是做一个需求，要根据不同人员的权限去更改他所要走的流程结构。。。如果要梳理整个逻辑，需要花费很长的事件。直接就用一个 div 的盒子对其进行遮挡，也达到了相应的效果。

需要使用之前没用过的插件库

## 浏览器的事件循环
### 为什么 js 在浏览器中有事件循环的机制
因为 js 有一个特性，即它是单线程（什么是单线程？？？）的。
举个例子：如果有两个线程同时在操作 DOM，一个线程删除了当前的 DOM 节点，而另一个线程是要操作当前的 DOM 节点，这样的话则会出错。通过 event loop 实现一些非阻塞事件，从而使得代码不需要必须从上往下一步一步执行。

### 事件循环中两种任务
单一任务事件中，微任务先执行<br>
宏任务：整体代码、setTimeout、setInterval、node里的I/O操作<br>
微任务：new Promise().then 这个 .then() 里的回调是微任务、MutationObserver（监听元素变化）（前端的回溯里可能会用到？）<br>
同步异步 <br>

### 为什么要有微任务的概念，只有宏任务可以吗
单一任务事件中，微任务会先执行。宏任务保持先进先出的原则执行。。。。。。

### Node中的事件循环 和 浏览器中的事件循环 的区别
宏任务的执行顺序：<br>
1、timers 定时器：执行已经安排的 setTimeout 和 setInterval 的回调函数 <br>
2、pending callback 特定回调：执行延迟到下一个循环迭代的 I/O 回调 <br>
3、idle，prepare：仅系统内部使用 <br>
4、poll：检索新的 I/O 事件，执行与 I/O 相关的回调 <br>
5、check：执行 setImmediate() 回调函数 <br>
6、close callbacks：socket.on('close',()=>{})

### 微任务和宏任务在 node 的执行顺序
Node v10及以前：<br>
1、执行完一个阶段中的所有任务 <br>
2、执行 nextTick 队列里的内容 <br>
3、执行完微任务队列的内容 <br>

Node v10 以后：<br>
和浏览器的行为统一了

## 判断事件的输出顺序
考察事件循环的时候会问到
```JavaScript
        // 执行一次整体代码（是宏任务）后，微任务先执行，宏任务再执行
        // 宏队列保持先进先出原则，要完成一个宏任务后才会执行下一个宏任务
        async function async1() { // 微队列
            console.log('async1 start'); // 2

            // await 可以理解成 new Promise
            await async2(); 
            console.log('async1 end') // 6

            // 上面两行代码就相当于
            // new Promise(() => {
            //     async2()
            // }).then(() => {
                   // 将 await 后面的语句全部都放入 .then() 里 
            //     console.log('async1 end')
            // })
        }

        async function async2() {
            console.log('async2'); // 3
        }

        console.log('script start') // 1

        // setTimeout 是宏任务，整体代码也是宏任务
        // 当整体代码这个宏任务没有执行完成时，setTimeout 这个宏任务不会开始执行
        setTimeout(function () { // 宏任务优先级低于微任务
            console.log('setTimeout') // 7 这里是 8
        }, 0)

        async1()

        new Promise(function (resolve, reject) {
            console.log('promise1') // 4
            resolve()
        }).then(function () { // new Promise().then() 的 .then() 里是微任务，相比宏任务要先执行
            console.log('promise2') // 8 这里是 7
        })
        console.log('script end') // 5
```


```JavaScript
        console.log('start')
        setTimeout(() => {
            console.log('children2')
            Promise.resolve().then(() => {
                console.log('children3')
            })
        }, 0)

        new Promise(function (resolve, reject) {
            console.log('children4')
            // setTimeout 是宏队列的
            setTimeout(function () {
                console.log('children5')
                resolve('children6')
            }, 0)
        }).then((res) => {
            console.log('children7')
            setTimeout(() => {
                console.log(res)
            }, 0)
        })

        // 整体代码、setTimeout、setInterval 是宏队列的
        // Promise 的 .then() 是微队列的，比宏队列要先执行
        // 执行顺序
        // start
        // children4
        // 第一轮宏任务结束，尝试清空微任务队列，发现没有微任务
        // 为什么没有微任务：因为  resolve('children6') ，是放在 setTimeout 里面的，说明第一轮宏任务完成的时候，promise 的 .then() 并没有添加到微任务里
        // children2
        // 第二轮宏任务结束，尝试清空微任务队列
        // children3
        // children5
        // children7
        // children6
```

```JavaScript
        const p = function () {
            return new Promise((resolve, reject) => {
                const p1 = new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(1)
                    }, 0)
                    resolve(2)
                })
                p1.then((res) => {
                    console.log(res)
                })
                console.log(3)
                resolve(4)
            })
        }

        p().then((res) => {
            console.log(res)
        })

        console.log('end')

        // 不会执行 resolve(1)，因为执行的条件是 状态发生改变，这里已经执行了 resolve(2)，状态改变的结果已经输出。
        // 因此执行结果是： 3 end 2 4

        // 如果将 resolve(2) 去掉，则执行结果是：3 end 4 1
```

## 事件的捕获和冒泡机制
事件捕获(自顶向下)：从最顶层的 window 对象开始逐渐往下传播事件，即最顶层的 window 对象最早接收事件，最低层的具体被操作的元素最后接收事件。<br>

事件冒泡(自底向上)：与事件捕获相反，是自底向上冒的。<br>

### window.addEventListener 
window.addEventListener 监听的是什么阶段的事件:<br>

window.addEventListener 里面有三个参数,第三个参数可传可不传,当不传的时候,默认是 false,这样就是冒泡阶段,如果传的是 true,则是捕获阶段    

window.addEventListener('click',()=>{

},true/false) // 默认是 false (冒泡阶段),设置为 true (捕获阶段)

### 平常有哪些场景用到了这个机制
事件委托通俗地来讲，就是把一个元素响应事件（click、keydown......）的函数委托到另一个元素；<br>

一般来讲，会把一个或者一组元素的事件委托到它的父层或者更外层元素上，真正绑定事件的是外层元素，当事件响应到需要绑定的元素上时，会通过事件冒泡机制从而触发它的外层元素的绑定事件上，然后在外层元素上去执行函数。  

[array.prototype 属性](https://cloud.tencent.com/developer/section/1191536)