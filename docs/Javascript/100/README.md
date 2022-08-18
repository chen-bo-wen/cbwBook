## 算法复杂度
### 复杂度
1）程序执行时需要的计算量和内存空间（和代码是否简洁五关）。<br>
2) 复杂度是数量级（方便记忆，推广），不是具体的数字。<br>
3) 一般针对一个具体的算法，而非一个完整的系统。

### 时间复杂度
即程序执行时需要的计算量（CPU）

1）O(1) 一次就够（数量级，即2次，5次等都是 1 的数量级）<br>
2）O(logn) 数据量的对数（数量级）<br>
3）O(n) 和传输的数据量一样（数量级）<br>
4）O(nlogn) 数据量*数据量的对数（数量级）<br>
5）O(n^2) 数据量的平方（数量级）

### 空间复杂度
即程序执行时需要的内存空间

1）O(1) 有限的，可数的空间（数量级）<br>
2）O(n) 和输入的数据量相同的空间（数量级）<br>

## 将一个数组旋转 k 步
输入一个数组 [1,2,3,4,5,6,7]，k = 3，即旋转 3 步，输出 [5,6,7,1,2,3,4]。

```JavaScript
// export 用于单元测试
export function rotate(arr: number[], k: number): number[] {
    let length = arr.length
    if (length === 0 || !k) return arr
    let steps = Math.abs(k % length) // 例如：如果是 13 步

    // 获取后面的要换位置的数组
    let part1 = arr.slice(-steps)
    // 获取前面的不需要换位置的数组
    let part2 = arr.slice(0, length - steps)
    // 将两个数组拼到一起
    let part3 = part1.concat(part2)

    console.log('part3',part3)

    return part3
}

rotate([1,2,3,4,5,6,7], 3)
```

### 单元测试
```JavaScript
// 引入需要测试的文件
import { rotate } from './array-rotate'

describe('数组旋转', () => {
    it('正常情况的旋转', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7]
        const k = 3
        const res = rotate(arr, k)
        expect(res).toEqual([5, 6, 7, 1, 2, 3, 4]) // 断言
    })

    it('数组为空', () => {
        const res = rotate([], 3)
        expect(res).toEqual([]) // 断言
    })

    it('k 是负值', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7]
        const res = rotate(arr, -3)
        expect(res).toEqual([5, 6, 7, 1, 2, 3, 4]) // 断言
    })

    it('k 是 0', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7]
        const res = rotate(arr, 0)
        expect(res).toEqual(arr) // 断言
    })

    it('k 不是数字', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7]

        // @ts-ignore 
        // 可以忽略 ts 的检查报错
        const res = rotate(arr, '-3')
        expect(res).toEqual(arr) // 断言
    })

})

// 运行方法：
// 进入目录，输入命令：npx jest src/01-algorithm/array-rotate.test.js
```

### 性能分析
#### 性能测试
```JavaScript
const arr = []
for (let i = 0; i < 10 * 10000; i++) {
    arr.push(i)
}
console.time('rotate')
rotate(arr, 9 * 10000)
console.timeEnd('rotate')
```

数组是一个有序结构，unshift 操作非常慢。从数组里 pop 出一个元素后，再 unshift 进去，需要将每个元素都挪动一遍，时间复杂度就是 O(n)。slice 方法不会影响原数组，时间复杂度是 O(1)。

## 快速排序
用 JavaScript 实现快速排序，并说明时间复杂度。

## 判断字符串是否括号匹配
一个字符串 s 可能包括 {} () [] 三种括号，判断 s 是否是括号匹配的。如 (a{b}c) 匹配，而 {a(b 或 {a(b}c) 就不匹配。

考察的是栈。对比记忆：回文结构。

### 栈 和 数组
逻辑结构 和 物理结构

栈：逻辑结构。理论模型，不管如何实现，不受任何语言的限制。<br>
数组：物理结构。真实的功能结构，受限于编程语言。<br>
使用数组可以实现栈的效果。

```JavaScript
// 思路：遇到左括号 ( { [ 就入栈。遇到右括号 ) } ] 就判断栈顶，匹配则出栈。最后判断 length 是否为 0

/**
 * 判断括号是否匹配
 * @params str
 */
export function matchBracket(str: string): boolean {
    // 如果传来的是空字符串
    let length = str.length
    if (length === 0) return true

    let leftBracket = '({['
    let rightBracket = ')}]'
    let stack = []

    // 不是空字符串，则遍历字符串，遇到左括号就入，遇到右括号就出
    for (let i = 0; i < str.length; i++) {
        // 一个一个的去获取字符串的字母
        let s = str[i]
        
        if (leftBracket.includes(s)) {
            console.log('s', s)
            stack.push(s)
        } else if (rightBracket.includes(s)) {
            // let left = stack.pop()
            let left = stack[stack.length - 1]
            if (isMatch(left, s)) {
                // 匹配上了才 pop
                stack.pop()
            } else {
                return false
            }
        }
    }

    return stack.length === 0
}

/**
 * 判断左边和右边是否相等
 * @params
 */
function isMatch(left: string, right: string): boolean {
    if (left === '(' && right == ')') return true
    if (left === '{' && right == '}') return true
    if (left === '[' && right == ']') return true

    return false
}

let str = '((({{}})))'
let res = matchBracket(str)
console.log('res', res)

```

单元测试 

```JavaScript
/**
 * @description 括号匹配 test
 */

import { matchBracket } from './match-bracket'

describe('括号匹配', () => {
    it('正常情况', () => {
        const str = '{([])}'
        const res = matchBracket(str)
        expect(res).toBe(true)
    })

    it('不匹配', () => {
        const str = '{([(])}'
        const res = matchBracket(str)
        expect(res).toBe(false)
    })

    it('空字符串', () => {
        const str = ''
        const res = matchBracket(str)
        expect(res).toBe(true)
    })
})
```

## 用两个栈实现一个队列
```JavaScript
/**
 * 入队
 * @params n 
 */
export class myQueue {
    private stack1: number[] = []
    private stack2: number[] = []

    /**
     * 
     * @param n 入队
     */
    add(n: number) {
        this.stack1.push(n)
    }

    /**
     * @params 出队
     */
    delete(): number | null {
        let res

        const stack1 = this.stack1
        const stack2 = this.stack2

        // 将 stack1 里的所有元素移动到 stack2 中
        while (stack1.length) {
            const n = stack1.pop()
            if (n != null) {
                stack2.push(n)
            }
        }

        // stack2 pop
        res = stack2.pop()

        // 将 stack2 的元素返还给 stack1
        while (stack2.length) {
            const n = stack2.pop()
            if (n != null) {
                stack1.push(n)
            }
        }

        return res || null
    }

    // 写上 get，可以将 length 当作属性去获取
    get length(): number {
        return this.stack1.length
    }
}

// 功能测试
const q = new myQueue()
q.add(1)
q.add(2)
q.add(3)
console.log('q.length', q.length)
console.log('q.delete()', q.delete())
console.log('q.length', q.length)
```

单元测试

```JavaScript
import { myQueue } from './two-stack-one-queue'

describe('两个栈实现一个队列', () => {
    it('add and length', () => {
        const q = new myQueue()
        expect(q.length).toBe(0)
        q.add(100)
        q.add(100)
        q.add(100)
        expect(q.length).toBe(3)
    })

    it('delete', () => {
        const q = new myQueue()
        expect(q.delete()).toBeNull()
        q.add(100)
        q.add(200)
        q.add(300)
        expect(q.delete()).toBe(100)
        expect(q.length).toBe(2)
        expect(q.delete()).toBe(200)
        expect(q.length).toBe(1)
    })
})
```

## 反转单向链表
输入一个单向链表，输出它的反转。

根据数组去生成链表，需要从后往前的逐步去生成。因为链表是从前到后访问的。。。？没懂

```JavaScript
```

## 二分查找
凡有序，就一定可以使用到二分。

使用 while 循环的方式

```JavaScript
/**
 * 使用 while循环 的方式
 */
function binarySearch(arr: number[], target: number): number {
    // 空数组
    let length = arr.length
    if (length === 0) return -1

    let L = 0 // 索引值
    let R = length - 1

    while (L <= R) {
        let M = L + ((R - L) >> 1) // 获取中点索引值
        if (arr[M] > target) { // 说明是去左半部分查找
            R = M - 1
        } else if (arr[M] < target) {
            L = M + 1
        } else { // 如果是相等
            return M
        }
    }

    return -1 // 说明数组里没有该值

}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 45, 80, 89, 160, 170]
let res1 = binarySearch(arr, 80)
console.log('res1', res1)
let res2 = binarySearch(arr, 8)
console.log('res2', res2)
```

使用递归的方式

```JavaScript
/**
 * 使用递归的方式
 */
function binarySearch2(arr: number[], target: number, L?: number, R?: number): number {
    let length = arr.length
    if (length === 0) return -1

    // 没有定义的时候才赋值
    if (L == null) L = 0 // 索引值
    if (R == null) R = length - 1

    // 如果两个边界相等了，也有可能就是相等的这个值
    if (L > R) return -1

    let M = L + ((R - L) >> 1)

    if (arr[M] > target) { // 说明是去左半部分查找
        return binarySearch2(arr, target, L, M - 1)
    } else if (arr[M] < target) {
        return binarySearch2(arr, target, M + 1, R)
    } else { // 如果是相等
        return M
    }
}

```

### 循环和递归
```JavaScript
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 45, 80, 89, 160, 170]
const target = 10

console.time('binarySearch2')
for (let i = 0; i < 100 * 10000; i++){
    binarySearch2(arr, taret)
}
console.timeEnd('binarySearch2')
```

循环会比递归稍微快一些。两者的复杂度是同一个等级。

## 找出一个数组中和为 n 的两个数
有一个递增的数组 [1, 2, 4, 7, 11, 15] 和一个 n = 15，数组中有两个数，和是 n，即 4 + 11 === 15，找出这两个数。

嵌套循环是不可用的，因为时间复杂度太高。优化，就要选择双指针的思路。

随便找两个数，如果和大于 n，则需要向前查找；如果和小于 n，则需要向后查找。

```JavaScript

```