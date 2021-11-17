// 防抖：只有停止输出2s后才会输出值
function debounce(fn, date) {
    let timer = null // 
    return function () {
        if (timer) {
            clearTimeout(timer) // 清除定时器
        }
        timer = setTimeout(() => {
            fn
        }, date)
    }
}