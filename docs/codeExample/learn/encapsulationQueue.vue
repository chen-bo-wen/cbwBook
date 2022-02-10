<template>

</template>

<script>
    function Queue() {
        this.items = []

        // enqueue：向队列尾部添加一个元素
        Queue.prototype.enqueue = function (ele) {
            this.items.push(ele)
        }

        // dequeue：移除队列的第一个元素，并返回被移除的元素
        Queue.prototype.dequeue = function () {
            // 这里的 shift 会返回第一个元素，并且删除第一个元素
            return this.items.shift()  // unshift 是往前面添加
        }

        // front：返回队列的第一个元素，不会造成队列元素的更改
        Queue.prototype.front = function () {
            return this.items[0]
        }

        // isEmpty
        Queue.prototype.isEmpty = function () {
            return this.items.length == 0
        }

        // size
        Queue.prototype.size = function () {
            return this.items.length
        }

        // toString
        Queue.prototype.toString = function () {
            return this.items.join()
        }
    }

    // 击鼓传花 hotpotato
    // 前面不需要删除的人数要记得重新加回到队列
    function hotPotato() {
        let queue = new Queue()
        queue.enqueue('1')
        queue.enqueue('2')
        queue.enqueue('3')
        queue.enqueue('4')
        queue.enqueue('5')
        queue.enqueue('6')

        while (queue.size() > 1) {
            let i = 0
            while (i < 4) { // 第五个值删除，因此前四个要重新加入到队列里
                let pass = queue.dequeue()
                queue.enqueue(pass)
                i++
            }
            queue.dequeue()
        }
        console.log('queue.front()', queue.front())

        return queue.front()
    }

    hotPotato()
</script>

<style>
</style>