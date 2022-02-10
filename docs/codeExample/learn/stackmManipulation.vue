<template>

</template>

<script>
    function Stack() {
        this.items = []

        // this.push = function () { // this,这个是给对象的某一个实例添加方法

        // }

        Stack.prototype.push = function (ele) { // 这个是给整个类添加的方法。会节省内存。
            this.items.push(ele) // 往创建的数组里面添加元素
        }

        Stack.prototype.pop = function () {
            return this.items.pop()
        }

        Stack.prototype.peek = function () {
            return this.items[this.items.length - 1]
        }

        Stack.prototype.isEmpty = function () {
            // let length = this.items.length
            // if (length > 0) {
            //     return true
            // } else {
            //     return false
            // }   // 不需要写的这么麻烦
            console.log('this.items', this.items)
            console.log('this.items.length == 0', this.items.length == 0)
            return this.items.length == 0
        }

        Stack.prototype.size = function () {
            return this.items.length
        }

        Stack.prototype.toString = function (ele) {
            // 将数组元素转换为字符串的方法：join
            return this.items.join()
        }
    }

    // 利用栈进行十进制转二进制
    function DecToBin(dec) {
        let Dec = dec
        let stack = new Stack() // 前面自己定义的栈
        while (Dec / 2) {
            stack.push(Dec % 2)
            Dec = parseInt(Dec / 2)  // 取整
        }

        console.log('stack', stack)
        // return stack.reverse() // 数组的倒序输出：数组.reverse()

        // 使用栈的功能，自己写出 reverse的效果
        let string = ''
        while (!stack.isEmpty()) {
            // console.log('stack.pop()',stack.pop()) 
            // 在 console.log 进行打印的时候，栈的 pop 也会进行执行，从而影响栈里面的元素
            string += stack.pop()
        }
        return string
    }

    DecToBin(100)
</script>

<style>
</style>