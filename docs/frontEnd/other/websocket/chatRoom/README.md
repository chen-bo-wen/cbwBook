# 聊天室
## 使用第三方 websocket 库
[第三方库地址](https://github.com/sitegui/nodejs-websocket)

```javascript
var ws = require("nodejs-websocket")

// Scream server example: "hi" -> "HI!!!"
// 每次只要有用户连接，函数就会被执行，会给当前连接的用户创建一个 conn 对象
var server = ws.createServer(function (conn) {
	console.log("have a new connection")

    // 每当接收到用户传递过来的数据，text 事件就会被触发
	conn.on("text", function (str) {
        // str 就是用于接收用户传递的数据 
		console.log("Received data"+str)
		conn.sendText(str.toUpperCase()+"!!!")
	})

    // 只要 websocket 连接断开，close 事件就会触发
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
	})

    // 注册一个 error 事件，用于处理用户的错误信息
    conn.on("error",  () => {
		console.log("Connection error")
	})

}).listen(8001)
```

安装依赖包

```JavaScript
npm install nodejs-websocket

yarn add nodejs-websocket
```

## 简易聊天室代码

在 app.js 文件里

```javascript
var ws = require("nodejs-websocket")

let count = 0 // 记录用户总数
var server = ws.createServer(function (conn) {
	console.log("新的连接")
    count++ // 用户数 +1
    conn.userName = `用户${count}`

    // 给所有用户发消息
	broadcast(`${conn.userName}进入了聊天室`)

	conn.on("text", function (str) {
		console.log("Received data"+str)
        broadcast(str)
	})

    

    // 只要 websocket 连接断开，close 事件就会触发
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
        count--
        broadcast(`${conn.userName}离开了聊天室`)
	})

    // 注册一个 error 事件，用于处理用户的错误信息
    conn.on("error",  () => {
		console.log("发生异常")
	})

})

// function broadcast(server, msg) {
function broadcast(msg) {
    server.connections.forEach(function (conn) {
        // sendText 是给每个用户单独发送消息
        conn.sendText(msg)
    })
}
    
server.listen(8001, () => {
    console.log('监听端口 8001')
})
```

在 html 文件里

```JavaScript
```