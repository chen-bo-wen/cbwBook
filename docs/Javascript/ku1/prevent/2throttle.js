// 每隔 5s 才会执行一次
function throttle(fn, date) {
    let flag = true
    return function () {
        if (flag) {
            setTimeout(() => { // 每隔一段一时间就生成一个计数器，符合条件的时候才能生成计数器
                fn
            }, date)
            flag = true
        }
        flag = false
    }
}