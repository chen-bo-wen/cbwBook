module.exports = {
    title: 'chenbowen',  // 设置网站标题
    description: 'chenbwoen的学习笔记',
    // base: '/v1/adroi-h5/adroiapi/',
    themeConfig: {
        logo: '/assets/img/logo.png',
        nav: [
            { text: '首页', link: '/' },
            {
                text: '前后端', items: [
                    {
                        text: '前端', link: '/frontEnd/', items: [
                            { text: 'vue', link: '/frontEnd/vue/' },
                            { text: 'react', link: '/frontEnd/react/' },
                        ]
                    },
                    { text: '后端', link: '' },
                ]
            },
            { text: '大数据', link: '/bigData/' },
            {
                text: '第三方工具', items: [
                    { text: 'GitHub', link: '/git/' },
                    { text: 'markdown', link: '/markdown/' }
                    // {
                    //     text: 'markdown', items: [
                    //         { text: 'markdown', link: '/markdown/' }
                    //     ]
                    // }
                ]
            }
        ],
        sidebar: {
            "/frontEnd/react/": [
                "",
                "react1"
            ],
            "/frontEnd/vue/": [
                "",
                "vue1"
            ],
            // "/frontEnd/": [
            //     {
            //         title: '前端',
            //         collapsable: false,
            //         children: [
            //             { title: 'react', path: '/frontEnd/react/' },
            //             { title: 'vue', path: '/frontEnd/vue/' },
            //         ]
            //     }
            // ],
            "/bigData/JAVA/": [
                ""
            ],
            "/bigData/python/": [
                ""
            ],
            "/bigData/": [
                "JAVA/",
                "python/",
            ],
            "/git/": [
                ""
            ],
            "/markdown/": [
                ""
            ],
        },
        sidebarDepth: 2
    }
}