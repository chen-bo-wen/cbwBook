## Type annotations can only be used in TypeScript files
在首选项->设置里面打开setting.json文件删除或者注释掉下面代码，

 "files.associations": {
     ".eslintrc": "json",
     "*.vue": "html"
 },

 ## 让 vscode 完美支持属性的自动补全
点击 Vetur 插件的设置 -> Extension Setting -> Edit in setting.json -> 加入 "vetur.experimental.templateInterpolationService": true,

通过将 vue 文件转换成 ts 文件，然后通过 language server 分析 ts 语法，再把结果转换为 vue 文件，这样就可以实现在 template 上面自动分析和补全来支持 ts 的类型。

[Vue 的 template 中自动补全 ts 语法设置的属性](https://blog.csdn.net/qq_40282732/article/details/109608374)

## module ‘*.vue‘ has no exported member ‘xxx‘
bug复盘

在启动写vue项目后，新增一个vue，这个script标签中未添加lang=ts 修改script lang=ts后，发现无论怎么修改ts都会报这个错，Module ‘".vue"’ has no exported member ‘xxx’. Did you mean to use 'import xxx from ".vue"’ instead?

这个时候就需要重启一下服务了，不然就算添加上去也无法被识别到
