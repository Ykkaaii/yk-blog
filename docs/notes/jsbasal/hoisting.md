---
title：浅谈JavaScript中的提升
author：阿楷
date：2022-04-08
categories:
 - 笔记
tags:
 - js基础
---

::：tip
我们直觉上会认为`JavaScript`代码的执行是从上到下一行行顺序执行的, 但是如下代码：

``` js
console.log(num);
var num = 1;
```
按照代码顺序, 变量`num`在定义前调用, 应当提示变量未定义的错误`num is not defined`, 而事实上, 这段代码打印的是`undefind`, 这里就是**提升**的体现

:::

## 什么是提升
通常, 上述代码的执行可以被模拟成：
``` js
var num = undefind;

console.log(num);

num = 1;
```

从表现上看, 变量提升是指在`JavaScript`代码执行过程中, `JavaScript`引擎把变量和函数**声明**部分和的声明部分提升到代码开头的行为。

但是, `JavaScript`是并不会在物理层面上移动声明部分的代码, 实际上这种提升现象和`JavaScript`的编译过程密切相关, 提升被认为是,  `JavaScript`中**执行上下文** (特别是创建和执行阶段) 工作方式的一种认识. 

> 是的,  这里也有**执行上下文**上下文的身影！！

下面有一段代码：
``` js
console.log(outside); // undefined

foo() // TypeError：foo is not a function

fun(); // 函数声明执行了 undefined

console.log(inside); // ReferenceError：inside is not defined

function fun() {
  console.log('函数声明执行了', inside)

  var inside = '这是个内部变量';
}

var foo = function() {
  console.log('函数表达式执行了', inside)
}

var outside = '这是个外部变量';
```
从上面的例子可以看到，变量声明和函数声明都会被提升，而函数表达式被认为是声明一个变量并被赋值为某个函数（事实也是如此），所以上述代码中的`foo`在调用时会报错（`undefined`不能作为函数调用）

再观察函数内部，函数内部的变量也会提升到该函数的顶部，而函数外部并不能访问，所以可以得出：变量声明的范围是在当前作用域。

### 函数优先

``` js
foo(); // 1

var foo;

function foo() {
  console.log(1);
}

foo = function() {
  console.log(2);
}

```

上面代码可以看出在`var`和`function`同名的变量提升的条件下，函数会先执行。所以输出的结果都是一样的。换一句话说，**`var`和`function`的变量同名`var`会先进行变量提升，但是在变量提升阶段，函数声明的变量会覆盖`var`的变量提升，所以直接结果总是函数先执行优先。**

## 透过现象看本质

为什么会有变量提升的效果，我们这就要从`JavaScript`的执行开始说起。

### 

## 参考