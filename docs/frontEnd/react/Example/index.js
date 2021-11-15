import React, { Component } from "react";

export default class Weather extends Component {
    state = {
        isHot: true
    }

    changeState = () => {
        this.setState({ isHot: false })
    }

    render() {
        return (
            <div>
                <div>今天天气很{this.state.isHot ? '炎热' : '凉爽'}</div>
                <button onClick={this.changeState}>改变天气</button>
                {/* 注意不能是 changeState()，这样就执行了 changeState 函数，然后函数的返回值是
                undefined，因此是将 undefined 赋值给 onClick */}
            </div>
        )
    }
}