<template>

</template>

<script>
    function linkedList() {
        this.items = []

        function Node(data) {
            this.data = data
            this.next = null
        }

        this.head = null
        this.length = 0

        linkedList.prototype.isEmpty = function () {
            return this.length == 0
        }

        // 向链表尾部新增数据有两种可能
        // 第一种，链表本身为空，新添加的数据是唯一节点
        // 第二种，链表不为空，需要向其它后面节点追加节点
        linkedList.prototype.append = function (ele) {
            let node = new Node(data)
            if (this.length == 0) { // 添加第一个节点
                this.head = node
            } else {
                // 通过 head 一步一步找到最后一个节点，让最后一个节点的 next 指向 null
                // ********
                let current = this.head // 这时指向的是第一个节点
                while (current.next) { // 当前节点的 next 有指向
                    current = current.next // 这个 next 指向的就是下一个节点
                }
                current.next = node // 向尾部新增的节点
            }
            this.length++ // 链表的长度 +1
        }
    }
</script>

<style>
</style>