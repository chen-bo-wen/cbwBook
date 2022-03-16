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


// 代码分析
let dom1 = document.querySelector('input')

function debounce() {
    let timer = null // 只允许存在一个定时器
    return function () { // 函数调用需要有一个 return
        if (timer) { // 出现一个新的定时器，就清除掉旧的定时器
            clearTimeout(timer)
        }
        // } else { // 不需要设置 if else，这不是分选项，这两步每次都需要执行

        // 清除，创建，…… ，清除，创建，留下的是最后创建的这个定时器

        timer = setTimeout(() => {
            console.log('创建一个定时器')
            // isStop = true
        }, 1000)
    }
}

dom1.addEventListener('input', debounce())