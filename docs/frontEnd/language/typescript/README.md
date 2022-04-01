# typescript
安装 typescript 指定版本

```javascript
  npm install -g typescript@3.8.3
```

把 ts 文件编译成 js 文件
？？？看不懂

在 cmd 里运行
```JavaScript
  cd typescript-basic // 代码放置的文件夹
  tsc test.ts // 自己创建的 ts 文件名称
  ls // 可以看到生成了一个新的 js 文件
  cat test.js // 可以看到文件里的代码内容
```

## 函数
可选参数后面不能再添加确定的参数

```JavaScript
// 可选参数
function add(x: number, y: number, z?: number,t:number): number { // 这里的 t:number 会报错 
  if (typeof z === 'number') {
    return x + y + z
  } else {
    return x + y
  }
}
```

函数本身的类型

```JavaScript
function add(x: number, y: number, z?: number): number => { // z?: number 说明 z 是可选参数
  if (typeof z === 'number') {
    return x + y + z
  } else {
    return x + y
  }
}

 // 这里的箭头 不是 箭头函数，而是申明函数类型返回值的方法
const add2: (x: number, y: number, z?:number) => number = add

// TS 里，凡是在冒号后面，都是在申明类型。和实际的代码逻辑没有什么关系
```

Interface 描述函数类型
```JavaScript
interface ISum {
   // (x: number, y: number) 是输入值的类型，number 是输出值的类型（即返回值的类型）
  (x: number, y: number): number
}
```

## 类型断言&类型守卫
```JavaScript
// (input: string | number) 输入的参数值类型，number 输出的参数值类型
function getLength(input: string | number): number {
    // 这里我们可以用 as 关键字，告诉typescript 编译器，你没法判断我的代码，但是我本人很清楚，这里我就把它看作是一个 string，你可以给他用 string 的方法。
  const str = input as string
  if (str.length) {
    return str.length
  } else {
    const number = input as number
    return number.toString().length
  }
}

// 类型守卫
// typescript 在不同的条件分支里面，智能的缩小了范围，这样我们代码出错的几率就大大的降低了。
function getLength2(input: string | number): number {
  if (typeof input === 'string') {
    return input.length
  } else {
    return input.toString().length
  }
}
```

## Class 类
```JavaScript
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name
  }
  run() {
    return `${this.name} is running`
  }
}

class Cat extends Animal {
    constructor(name) {
      // 这里我们重写构造函数，注意在子类的构造函数中，必须使用 super 调用父类的方法，要不就会报错。
    super(name)
    console.log(this.name)
  }
  run() {
    // 使用 super 调用父类的方法
    return 'Meow, ' + super.run()
  }
}
const maomao = new Cat('maomao')
console.log(maomao.run())
```

类成员的访问修饰符：public、private（#）、protected、readonly

## 类实现一个接口
```JavaScript
interface Radio {
    // trigger: boolean 输入的参数值类型是 boolean，void 是数值值，啥都不返回
  switchRadio(trigger: boolean): void;
}

interface Battery {
  checkBatteryStatus(): void;
}

// 要实现多个接口，我们只需要中间用 逗号 隔开即可。
class Cellphone implements Radio, Battery {
    // 类 implements Radio 后，就需要实现 它里面的方法，否则会报错
  switchRadio(trigger) {

  }

  checkBatteryStatus() {

  }
}
```

```JavaScript
interface Radio {
    // trigger: boolean 输入的参数值类型是 boolean，void 是数值值，啥都不返回
  switchRadio(trigger: boolean): void;
}

interface RadioWithBattery extends Radio{
  checkBatteryStatus(): void;
}

// 要实现多个接口，我们只需要中间用 逗号 隔开即可。
class Cellphone implements RadioWithBattery {
    // implements Radio 后，就需要实现 它里面的方法，否则会报错
  switchRadio(trigger) {
      
  }

  checkBatteryStatus() {

  }
}
```

## 枚举 Enums
```JavaScript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

console.log(Direction.Up) // 0
console.log(Direction[0]) // Up
```

```JavaScript
enum Direction {
  // 未赋值的枚举项会接着上一个赋值的枚举项递增 
  Up = 10,
  Down,
  Left,
  Right,
}
```

```JavaScript
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
const value = 'UP'
if (value === Direction.Up) {
  console.log('go up!')
}
```

常量枚举：可以提升性能

```JavaScript
const enum Direction { // 前面加上关键字 const，就可以被称为是常量枚举
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
const value = 'UP'
if (value === Direction.Up) {
  console.log('go up!')
}

// 在命令控制里输入 tsc enums.ts，这里 enums.ts 是代码所写在的 ts 文件
// 这样会生成一个 enums.js 文件
// 打开 enums.js，可以看到里面的简化代码是：
var value = 'UP'
if(value === 'UP'){
  console.log('go up!')
}
```

## 泛型
```JavaScript
// <T> 括号里面的是泛型的名称，这个里面可以写任何字母，T 只是常用的一种写法
// 它在定义时不指定类型，使用时再确定类型
function echo<T>(arg: T): T {
  return arg
}
const result = echo(123)

// 泛型也可以传入多个值
// [tuple[1] 对应的时 U，tuple[0] 对应的是 T，因此返回的是 [U, T]
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}

const result = swap(['string', 123])
```

## 泛型约束
在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法

```JavaScript
function echoWithArr<T>(arg: T): T {
  // 由于不知道变量类型，因此 arg.length 会报错
  console.log(arg.length)
  return arg
}
```

```JavaScript
// 有以下 不完美的 解决方案 T[]
function echoWithArr<T>(arg: T[]): T[] {
  // 由于不知道变量类型，因此 arg.length 会报错
  console.log(arg.length)
  return arg
}

// 存在一个弊端就是，只能传入数组类型的值
// 传入其它也有 length 属性的值，如 string 类型，会报错
const arr = echoWithArr([1, 2, 3]) 
```

```JavaScript
// 一个好的解决方案是 interface
interface IWithLength {
  length: number;
}
// <T extends IWithLength> 这样 T 就有了 length 这个属性
function echoWithLength<T extends IWithLength>(arg: T): T {
  console.log(arg.length)
  return arg
}

echoWithLength('str')
const result3 = echoWithLength({length: 10})
const result4 = echoWithLength([1, 2, 3])
```

## 泛型与类和接口
```JavaScript
class Queue {
  private data = [];
  push(item) {
    return this.data.push(item)
  }
  pop() {
    return this.data.shift()
  }
}

const queue = new Queue()
queue.push(1)
queue.push('str')
console.log(queue.pop().toFixed())
// 因为 toFixed() 四舍五入是 number 类型的值特有的方法。
// 因此当弹出的值的类型是字符串时，会因为没有 toFixed() 这个方法而报错
console.log(queue.pop().toFixed()) 

//在上述代码中存在一个问题，它允许你向队列中添加任何类型的数据，当然，当数据被弹出队列时，也可以是任意类型。在上面的示例中，看起来人们可以向队列中添加string 类型的数据，但是那么在使用的过程中，就会出现我们无法捕捉到的错误，

class Queue<T> {
  private data = [];
  push(item: T) {
    return this.data.push(item)
  }
  pop(): T {
    return this.data.shift()
  }
}
const queue = new Queue<number>() // 这样 queue.push() 就只能 push 数字类型的值。
queue.push(1)


//泛型和 interface
interface KeyPair<T, U> {
  key: T;
  value: U;
}

let kp1: KeyPair<number, string> = { key: 1, value: "str"}
let kp2: KeyPair<string, number> = { key: "str", value: 123}


// 之前的定义数组类型的
let arr: number[] = [1, 2, 3]
// 现在使用泛型的方式来表示
let arrTwo: Array<number> = [1, 2, 3]
```

## 类型别名 和 交叉类型
类型别名（就是给类型起一个别名，让它可以更方便的被重用）

```JavaScript
// 一个函数接收两个参数 (x: number, y: number)，返回的也是一个 number 类型的值
let sum: (x: number, y: number) => number
const result = sum(1,2)

// 如果每次创建一个函数都需要写这么一长串，就浪费时间
// 因此可以创建一个类型别名
type PlusType = (x: number, y: number) => number
let sum2: PlusType
const result2 = sum2(1,2)

// 支持联合类型
type StrOrNumber = string | number
let result2: StrOrNumber = '123'
result2 = 123

// 字符串字面量
const Str: 'name' = 'name' // 这是设立一个变量，它的值只能等于 name，等于其它的值都会报错
const num: 1 = 2 // 报错：因为规定 num 这一个变量的值只能等于 1，因此如果它等于 2 的话就会报错

type Directions = 'Up' | 'Down' | 'Left' | 'Right'
let toWhere: Directions = 'Up' // 可以选择 Up、Down、Left、Right 四个值里的任意一个值
```

交叉类型
```JavaScript
interface IName  {
  name: string
}
type IPerson = IName & { age: number }
let person: IPerson = { name: 'hello', age: 12}
```

## 声明文件
因为很多第三方库是直接通过 JavaScript或什么 写的，因此再 ts 里直接使用的话，会报错。<br>

可以对 jQuery 进行声明

```JavaScript
declare let jQuery: (selector: string) => any // 将这句代码放入根文件里，这样的话，所有的文件都不需要再次声明一次
// 根文件，命名为 jQuery.d.ts，那么所有的 ts 文件都可以获得 jQuery 的类型定义
jQuery('#123')
```

不需要每个都在文件里面引用，可以直接搜索相应声明库进行安装，[@types 搜索声明库](https://www.typescriptlang.org/dt/search?search=jQuery)

例如使用 redux 
```JavaScript
 npm install --save redux
```

 在 ts 文件里打印代码
```JavaScript
import { Action } from 'redux'
// 按住 Ctrl 键，再鼠标点击 Action，会跳转到 index.d.ts 文件（定义文件）
```

## utility types
partial：把传入的类型都变成可选<br>
Omit：忽略传入类型的某个属性

```JavaScript
// partial，它可以把传入的类型都变成可选
interface IPerson {
  name: string
  age: number
}

let viking: IPerson = { name: 'viking', age: 20 }
type IPartial = Partial<IPerson>
let viking2: IPartial = { } // 不传参数也可以
let viking2: IPartial = { name: 'viking' } // 传参数也可以，因为 partial 可以把传入的类型变成可选，参数可传可不传


// Omit，它返回的类型可以忽略传入类型的某个属性
type IOmit = Omit<IPerson, 'name'> // 希望忽略 name 这个属性
let viking3: IOmit = { age: 20 }

```