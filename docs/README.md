---
home: true
heroImage: /logo.jpeg
heroText: 阿楷的作业本
tagline: 学不动了，阿Sir!!
actionText: 从入门到入土 →
actionLink: /notes/jsbasal/scope/
title: 首页
---

# 约定文本规范

## Front Matter

front matter 必须是 markdown 文件中的第一部分，并且必须采用在三点划线之间书写的有效的 YAML。 这是约定在每篇文章必须的：
```yaml
---
title: 文章标题
author: 作者
date: yyyy-MM-dd
categories:
 - 分类1
 - 分类2
tags:
 - 标签1
 - 标签2
---
```

## Markdown书写约定
为了文章的工整和可阅读性, 约定在每篇文章必须依照的书写格式：
```md
## 一级标题
用于展示区分文章章节

### 二级标题
用于展示区分章节内的小节

#### 三级标题
用于展示区分小节内的快

::: tip
用于展示提示内容
:::

::: danger
用于展示警告内容
:::

**加粗**
用于标记重点文字

`代码内容`
`《书名》`
用于标记正文中出现的代码内容或者书籍名称

(```代码类型(js/md/html...)
用于展示代码块, 约定必须写上代码类型
```)
```


