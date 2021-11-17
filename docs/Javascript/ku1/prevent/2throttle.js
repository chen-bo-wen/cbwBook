// 每隔 5s 才会执行一次
function throttle(fn, date) {
    let flag = true
    return function () {
        if (flag) {
            setTimeout(() => {
                fn
            }, date)
            flag = true
        }
        flag = false
    }
}