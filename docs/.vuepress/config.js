module.exports = {
    title: 'chenbowen',  // 设置网站标题
    description: 'chenbwoen的学习笔记',
    // base: '/v1/adroi-h5/adroiapi/',
    themeConfig: {
        logo:'/assets/img/logo.png',
        nav: [
            { text: '首页', link: '/' },
            { text: '前端', link: '/frontEnd/' },
            { text: '大数据', link: '/bigData/' },
        ],
        sidebar:{
            "/frontEnd/react/":[
                "",
                "react1"
            ],
            "/frontEnd/vue/":[
                "",
                "vue1"
            ],
            "/frontEnd/":[
                "react/",
                "vue/"
            ],
            "/bigData/JAVA/":[
                ""
            ],
            "/bigData/python/":[
                ""
            ],
            "/bigData/":[
                "JAVA/",
                "python/",
            ],
        },
        // sidebar: {
        //     '/': [
        //         "/", //指的是根目录的md文件 也就是 README.md 里面的内容
        //         "apiword", 根目录创建 apiword.md文件
        //       "api", 根目录创建 api.md文件
        //       "error" 根目录创建 error.md文件
        //     ]
        // },
        sidebarDepth: 2
    }
}