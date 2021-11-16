import { createStore } from "vuex";
export default createStore({
    state: {
        num: 1
    },
    mutations: { // mutations 相当于 method 方法
        addNum(state, payload) { // mutations 里第一个参数可以获取到 state
            const { number } = payload
            state.num += number
        }
    },
    getters: { // getters 相当于 computed 方法
        computNum(state, getters) { // 在这里可以获取到 state 参数 和 getters 参数
            return function (payload) { // 需要在返回一个函数，在这里才能接受到参数
                return state.num * payload + getters.computNumber
            }
        },
        computNumber(state) {
            return state.num + 1
        }
    }
})