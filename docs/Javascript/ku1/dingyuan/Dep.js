// 订阅器模型
let Dep = {
    clientList: {},//容器
    // 添加订阅
    listen: function (key, fn) {
        // 短路表达式
        (this.clientList[key] || (this.clientList[key] = [])).push(fn)
    },
    // 发布
    trigger: function () {
        let key = Array.prototype.shift.apply(arguments) // 获取第一个参数？？
        let fns = this.clientList[key]
        if (!fns || fns.length === 0) {
            return false
        }
        // for(let i=0,fn;fn = fns[i++];){ // 意思同下
        //     fn.apply(this, arguments)
        // }
        // 假设 fns = [1,2,3,4,5]
        for (let i = 0; i < fns.length; i++) {
            let fn = fns[i]
            fn.apply(this, arguments)
        }
    }
}

// 需要劫持的数据，具体的目标元素，目标元素的key值（具体的某个属性值），关联一个选择器
let dataHI = function ({ data, tag, datakey, selector }) {
    let value = '',
        el = document.querySelector(selector)

    Object.defineProperty(data, datakey, { // data是对象。datakey是设置在data上的属性
        get: function () {
            console.log("取值")
            return value
        },
        set: function (val) {
            console.log("设置值");
            value = val
            // 发布
            Dep.trigger(tag, val)
        }
    })
    // 订阅，需要先订阅，才能产生之后的发布操作
    Dep.listen(tag, function (text) { // 第二个参数 function 这里就是附送的消息
        el.innerHTML = text
    })

}


