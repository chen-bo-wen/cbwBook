import React, { Component } from "react";

export default class Person extends Component {
    render() {
        const { name, age } = this.props
        return (
            <div>
                <div>姓名:{name}</div>
                <div>年龄:{age}</div>
            </div>
        )
    }
}