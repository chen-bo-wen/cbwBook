module.exports = {
    title: 'chenbowen',  // 设置网站标题
    description: 'chenbwoen的学习笔记',
    // base: '/v1/adroi-h5/adroiapi/',
    themeConfig: {
        logo: '/assets/img/logo.png',
        nav: [
            { text: '首页', link: '/' },
            {
                text: '前端', items: [
                    {
                        text: '框架', link: '/frontEnd/', items: [
                            { text: 'vue', link: '/frontEnd/vue/' },
                            { text: 'react', link: '/frontEnd/react/' },
                        ]
                    },
                    {
                        text: '语言', link: '/frontEnd/language', items: [
                            { text: 'typescript', link: '/frontEnd/language/typescript/' },
                        ]
                    }
                ]
            },
            {
                text: '第三方工具', items: [
                    { text: 'GitHub', link: '/git/' },
                    { text: 'markdown', link: '/markdown/' },
                    { text: '搭建博客', link: '/boke/' },
                ]
            },
            {
                text: '编程例题', items: [
                    { text: '算法知识', link: '/codeExample/learn/' },
                    { text: '题库1', link: '/codeExample/ku1/' }
                ]
            },
            {
                text: 'interview', items: [
                    {
                        text: '前端Javascript', items: [
                            { text: '题库1', link: '/Javascript/process/' },
                            { text: '题库2', link: '/Javascript/ku1/' }
                        ]
                    }
                ]
            },
        ],
        sidebar: {
            "/frontEnd/react/": [
                "",
                "react1"
            ],
            "/frontEnd/vue/": [
                "",
                { title: 'vue3', path: 'Vue3/' },
                { title: '项目', path: 'project/' },
                { title: '问题', path: 'problem/' },
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
                // "",
                {
                    title: 'java',
                    collapsable: false,
                    children: [
                        {
                            title: '案例', path: '', children: [
                                { title: 'helloWord案例', path: '/bigData/JAVA/case/helloword/' },
                            ]
                        },
                    ]
                }
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
            "/codeExample/ku1": [
                // "",
                {
                    title: '编程例题',
                    collapsable: false,
                    children: [
                        { title: '题库1', path: '/codeExample/ku1/' },
                    ]
                }
            ],
            "/codeExample/learn": [
                // "",
                {
                    title: '算法知识',
                    collapsable: false,
                    children: [
                        { title: '算法知识', path: '/codeExample/learn/' },
                    ]
                }
            ],
            "/Javascript/": [
                // "",
                {
                    title: 'Javascript',
                    collapsable: false,
                    children: [
                        { title: 'Javascript', path: '/Javascript/ku1/' },
                    ]
                }
            ],
        },
        sidebarDepth: 2
    }
}