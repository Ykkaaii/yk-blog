module.exports = {
  base: '/yk-blog/',
  // 使用主题
  theme: 'reco',
  // 说明
  description: '使用vue-press构建的前端博客',
  // 网站标题
  title: '阿楷的作业本',
  // 语言设置
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  // 移动端优化
  // 在移动端，搜索框在获得焦点时会放大，并且在失去焦点后可以左右滚动，这可以通过设置元来优化。
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  // 主题配置
  themeConfig: {
    // 开启第二个侧边栏
    subSidebar: 'auto',
    // 导航栏配置 TODO：思考下怎么通过脚本实现配置
    nav: [
      { text: '阅读清单', link: '/book' },
      {
        text: '学习笔记',
          items: [
          { text: 'JS基础', link: '/notes/jsbasal/scope' },
          { text: '数据结构', link: '/notes/structure/structure' },
        ]
      },
    ],
    // 侧边栏配置
    sidebar: {
      '/notes/structure/': [
        {
          title: "数据结构&算法",
          path: '/notes/structure/structure',
          collapsable: false, // 不折叠
          children: [
            { title: "数据结构", path: "/notes/structure/structure" },
            { title: "算法", path: "/notes/structure/algorithm" }
          ],
        }
      ],

      '/notes/jsbasal/': [
        {
          title: "JavaScript基础",
          path: '/notes/jsbasal/scope',
          collapsable: false, // 不折叠
          children: [
            { title: "作用域与闭包", path: "/notes/jsbasal/scope" },
          ],
        }
      ],
    },
    // 最后更新时间
    lastUpdated: '更新于',
    // Git 仓库和编辑链接
    repo: '/Ykkaaii/yk-blog',
  },
};
