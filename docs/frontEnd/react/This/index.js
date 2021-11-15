import React, { Component } from "react";

export default class Weather extends Component {
    constructor(props){
         super(props)
         this.state={ isHot: true }
         this.change = this.changeWeather.bind(this)
    }

    changeWeather = () => {

    }

    render() {
        return (
            <div>
                <div>今天天气很{this.state.isHot ? '炎热' : '凉爽'}</div>
                <button onClick={this.change}>改变天气</button>
            </div>
        )
    }
}