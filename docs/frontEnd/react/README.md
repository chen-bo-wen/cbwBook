### 命令
谷歌插件：react developer tools<br>

### 脚手架
安装依赖：npm install -g create-react-app<br>
创建项目：create-react-app<br>
启动项目：npm start

#### 语法糖
%PUBLIC_URL% 代表 public 文件夹的路径

## 组件三大核心属性
###  state

如果是类式组件，就使用 this.setState() 方法来修改属性

<<< @/docs/frontEnd/react/Example/index.js
 
>+	<b>组件自定义的方法中this为undefined，如何解决？</b><br>
a)	强制绑定this: 通过函数对象的bind()<br>
b)	箭头函数

>+	<b>更新状态</b><br>
 ```javascript
this.setState({状态:'值'})
```

### props
#### 批量传递 props
在原生 js 里，不可用<b>...（三点运算符）展开一个对象</b>（可以用其展开一个数组），但是<b>引入 react 加上 Babel，可以通过..（三点运算符）展开一个对象。</b>

子组件里：

<<< @/docs/frontEnd/react/ThreePoint/son.js 

父组件：

<<< @/docs/frontEnd/react/ThreePoint/father.js 

#### 对 props 进行限制
```javascript
export default class Person extends Component {
    static propTypes = { // static：静态方法调用直接在类上进行，不能在类的实例上调用
        name: PropTypes.string.isRequired, // 限制 name 为必传，且为字符串
        age: PropTypes.number,
        speak: PropTypes.func // func，限制为函数
    }

    defaultProps = { // 设置默认值
        age : 18
    }
}
```

### refs与事件处理
<b>字符串形式的ref</b>
 ```javascript
 <input ref="input1">
 ```
<b>回调形式的ref</b>
 ```javascript
 <input ref={c=>this.input1=c}>
 ```
 
<b>createRef创建ref容器</b>
 ```javascript
myRef = React.createRef()
<input ref={this.myRef}>
 ```

 ### this的指向问题
 类中的方法默认是开启了严格模式，this都是undefined。如要解决类中 this 的指向问题。

 #### bind方法

 <b>changeWeather.bind({a:1,b:2})</b>，
 则 changeWeather 函数的 this 为 <b>{a:1,b:2}</b>

 <<< @/docs/frontEnd/react/This/index.js



