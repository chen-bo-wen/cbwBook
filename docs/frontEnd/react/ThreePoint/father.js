import React, { Component } from "react";
import Son from './son.js'

export default class Person extends Component {
    render() {
        const p = { name: 'lili', age: 18 }
        return (
            <div>
                <Son {...p}></Son>
            </div>
        )
    }
}