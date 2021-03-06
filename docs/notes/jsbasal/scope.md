---
title: 浅谈JavaScript中的作用域
author: 阿楷
date: 2022-04-08
categories:
 - 笔记
tags:
 - js基础
---

::: tip
几乎所有语言的最基础的功能之一，就是在变量中存储值，并且在稍后取出或修改这些值。

在变量中存储值和取出值的能力，给程序赋予了状态。这就引伸出两个问题：
1. **这些变量被存储在哪里**
2. **程序如何在需要的时候找到它们**？

回答这些问题需要一组明确定义的规则，它定义了如何存储变量，以及如何找到这些变量。我们称这组规则为：**作用域**
:::

## 运行过程
在了解`javascript`中的作用域之前，我想应该先了解一下`javascript`的运行过程，这对于作用域的理解有所帮助。

### 编译
在`javascript`中，一段源码在被执行之前大概会经历以下三个步骤，这也被称之为**编译**：

* **分词/词法分析**：编译器会先将一连串字符打断成（对于语言来说）有意义的片段，称为`token`（记号），例如`var a = 2;`。这段程序很可能会被打断成如下token：`var`，`a`，`=`，`2`，`;`。

* **解析/语法分析**：编译器将一个`token`的流（数组）转换为一个“抽象语法树”（`AST —— Abstract Syntax Tree`），它表示了程序的语法结构。
* **代码生成**：编译器将上一步中生成的抽象语法树转换为机器指令，等待引擎执行。

### 执行
编译器一顿操作猛如虎，生成了一堆机器指令，JS引擎开心地拿到这堆指令，开始执行，这个时候我们要说的`LHS`和`RHS`就登场了。

`LHS(Left-hand Side)`和`RHS(Right-hand Side)`，是在代码执行阶段JS引擎操作变量的两种方式，二者区别就是对变量的查询目的是**变量赋值**还是**查询**。

`LHS`可以理解为**变量在赋值操作符(=)的左侧**，例如`a = 1`，当前引擎对变量`a`查找的目的是**变量赋值**。这种情况下，引擎不关心变量`a`原始值是什么，只管将值`1` 赋给`a`变量。
`LHS`意味着**变量赋值或写入内存**，,他强调是写入这个动作，所以`LHS`查询的是这个变量对应的内存地址。

`RHS`可以理解为**变量在赋值操作符(=)的右侧**，例如：`console.log(a)`，其中引擎对变量`a`的查找目的就是**查询**，它需要找到变量`a`对应的实际值是什么，然后才能将它打印出来。
当变量出现在赋值操作右侧或没有赋值操作时，是`RHS`。
`RHS`意味着**变量查找或读取内存**，它强调的是读这个动作，查询的是变量的内容。

``` js

function func(a) { // LHS 查询
  console.log(a); // RHS 查询

}

func(2); // RHS 查询

```
为了执行`func(2)`，JS 引擎既做了LHS查询又做了RHS查询，只不过这里的LHS比较难发现。

总之，引擎想对变量进行获取/赋值，就离不开`LHS`和`RHS`，然而这两个操作只是手段，到哪里去获取变量才是关键。`LHS`和`RHS`获取变量的位置就是**作用域**。

## 什么是作用域

简单来说，**作用域**指程序中定义变量的区域，它决定了代码区块中变量和其他资源的**可见性**(访问权限)。

`javascript`有三种作用域类型：
* **全局作用域**：全局作用域为程序的最外层作用域，在代码中任何地方都能访问。
* **函数作用域**：函数作用域只有函数被定义时才会创建，包含在父级函数作用域/全局作用域内。
* **块级作用域**：块级作用域可通过新增命令let和const声明，所声明的变量在指定块的作用域外无法被访问。

### 全局作用域
全局作用域为程序的最外层作用域是一直存在的，在代码中任何地方都能访问到的对象拥有全局作用域。

一般来说以下几种情形拥有全局作用域：
1. **window对象的属性、方法**
2. **定义在最外层的变量、函数、对象**
``` js

var a = 1; // 最外层变量

function func1() { // 最外层函数
  var b = 2;
  console.log(1)

  function func2() { // 内层函数
    console.log(2)
  }
}

console.log(a); // 1
console.log(b); // ReferenceError: b is not defined
func1(); // 1
func2(); // Uncaught ReferenceError: func2 is not defined
```
在此例中，变量`a`和函数`func1`拥有全局作用域，在任何地方都能访问到。

但变量`b`和函数`func2`没有定义在全局作用域中，在全局作用域中无法访问。

3. **未定义直接赋值的变量**：
``` js
function func1() { // 最外层函数
  a = 1;
}
function func2() { // 最外层函数
  var b = 2;
}

func1();
func2();

console.log(a); // 1
console.log(b); // ReferenceError: b is not defined
```
以上代码中，变量`a`在函数`func1`中没有定义直接被赋值，那么变量`a`会自动挂到`window`对象上，等同**情形1**

::: tip
事实上，情形2:定义在最外层的变量、函数、对象相当于将定义的变量、函数、对象挂载到`window`对象上
`Window`对象表示一个浏览器窗口或一个框架。在`JavaScript`中，`Window`对象是全局对象，可以在全局作用域中直接使用。
:::


全局作用域有个弊端：如果我们写了很多行代码，变量定义都没有用函数（或者块）包括，那么它们就全部都在全局作用域中。这样就会污染全局命名空间, 容易引起命名冲突。

``` js
// 张三写的代码中
var data = { a: 100 }

// 李四写的代码中
var data = { x: true }

console.log(data.a) // undifind 张三???

```

通常，为了避免变量污染的情况，我们将变量用函数包起来，放在函数里面的所有变量，都不会被外泄和暴露，不会污染到外面，不会对其他`JS`脚本造成影响。**这是函数作用域的一个体现**。

### 函数作用域
函数作用域指在函数内部的变量，只能在该函数内部被访问，在函数外部无法访问。

函数作用域只有函数被定义时才会创建，包含在父级函数作用域 / 全局作用域内。

``` js
function doSomething() {
  var name = "吴彦祖";

  function innerSay() {
    alert(name);
  }

  innerSay();
}
alert(name); // ReferenceError: name is not defined

innerSay(); // ReferenceError: innerSay is not defined

```
### 块级作用域

我们知道了函数可以创建函数作用域，我们可以将这个函数看作是一个**独立的执行代码块**。使函数内部的变量只能在该函数内部被访问，在函数外部无法访问。
那么类似函数的块语句，如`if`和`switch`条件语句或`for`和`while`循环语句能不能创建属于自己的作用域（**块作用域**）呢？

``` js
if (true) {
  var name = 'Hammad';
}

switch (true) {
  default:
    var age = 18;
    break;
}


console.log(name); // 'Hammad'
console.log(age); // 18
```
**遗憾的是，`JS`在`ES6`之前并没有块的概念**。

从上面的代码可以看出这些块语句并不会创建一个新的作用域，因为从表现上看定义在块内部的变量是能被外部访问的。

``` js
for (var index = 0; index < 3; index++) {
  // do something
}

var index;

console.log(index); // 3

```

上面的代码中，定义了`index`变量进行循环，循环之后重新`index`变量进行其他的操作，可以确定的是，在这两段代码里的`index`变量是两个不同含义/作用的变量，但是由于没有块作用域，在这段代码中，`index`变量不会因为离开了循环就失效，他的值仍是`3`。

为了避免这种情况，让变量的生命周期更加可控，**`ES6`引入了块级作用域**

通过新增命令`let`和`const`声明，所声明的变量在指定块(由`{}`包裹的代码块)的作用域外无法被访问

改变上面的代码，将`var`声明改为`let`声明：

``` js
for (let index = 0; index < 3; index++) {
 console.log(index, 'innerFor')
}

let index;

console.log(index);

// 0 'innerFor'
// 1 'innerFor'
// 2 'innerFor'
// undefined

```
我们可以看到代码按照我们期望的运行了！

`let`和`const`声明有有以下几个特点：

* 不存在变量提升
``` js
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```
上面代码中，变量`foo`用`var`命令声明，会发生变量提升，即脚本开始运行时，变量`foo`已经存在了，但是没有值，所以会输出`undefined`。

变量`bar`用`let`命令声明，不会发生变量提升。这表示在声明它之前，变量`bar`是不存在的，这时如果用到它，就会抛出一个错误。

而在代码块内，**使用`let`命令声明变量之前，该变量都是不可用的**。这在语法上，称为“**暂时性死区**”

> 关于变量提升，进入[深入理解JavaScript中的提升](/notes/jsbasal/hoisting.html)

* 不允许重复声明

``` js
var me = '吴彦祖';
let me = '金城武'; // Uncaught SyntaxError: Identifier 'me' has already been declared
```

在上面的代码中， `me`变量被声明了两次：一次使用`var`，另一次使用`let`。因为`let`不能在同一作用域内重复声明一个已有标识符，此处的`let`声明就会抛出错误。但如果在嵌套的作用域内使用`let`声明一个同名的新变量，则不会抛出错误。

> 关于`let`和`const`的更多细节，进入 [ES6中let与const声明](https://es6.ruanyifeng.com/#docs/let)

### 作用域链

在上面所有的代码示范中，可执行代码块总能够在自己的作用域中找到变量的，那么如果在自己的作用域中找不到目标变量，程序能否正常运行？

来看下面的代码：

``` js
function foo(a) {
  var b = a * 2;

  function bar(c) {
    console.log( a, b, c );
  }

  bar(b * 3);
}

foo(2); // 2 4 12
```

上面的代码中，函数`bar`要得到`a`变量，但是在当前的函数作用域中没有定义`a`，那么`a`变量称之为**自由变量**，`a`变量的值就需要在当前作用域的父级作用域找到定义

当可执行代码内部访问变量时，会先查找本作用域有无定义，如果找到目标变量即返回，如果没有找到就会到他的父级作用域中查找，如果父级也没找到定义就会接着一层一层的向上寻找。直到找到全局作用域还是没找到的话，就结束寻找，认定为变量未定义。

**这种一层一层的作用域嵌套关系，就是作用域链**。

为什么强调的是找到**定义**，观察如下代码：

``` js
var name = '吴彦祖';
function fn() {
  console.log(x)
}
function show(f) {
  var name = '金城武';
  (function() {
    f()
  })()
}
show(fn) // 吴彦祖 而不是 金城武
```
在fn函数中，取自由变量name的值时，**要到定义fn函数的那个作用域中取，无论fn函数将在哪里调用**。

这就是所谓的"**静态作用域**"

### 静态作用域

静态作用域就是**词法作用域**，与之相对的还有动态作用域。这是两种作用域模型分类
**词法作用域（Lexical Scopes）**是`javascript`中使用的词法作用域模型。

* 词法作用域：也称静态作用域，是最为普遍的一种作用域模型
* 动态作用域：相对“冷门”，bash脚本、Perl等语言采纳的是动态作用域

#### 什么是词法作用域

词法作用域**即在词法分析时生成的作用域**，词法分析阶段，也可以理解为**代码书写阶段**，当你把函数（块级作用域同理）书写到某个位置，不用执行，它的作用域就已经确定了，**而后无论函数将在哪里执行，他的作用域都是固定的**

看下面这段代码：

``` js
var num = 10;
function f1(){
  console.log(num)
}
function f2(){
  var num  = 20;
  f1()
}
f2(); // 10

```

这段代码经历了这样的执行过程：

1. `f2`函数调用，`f1`函数调用
2. 在`f1`函数作用域内查找是否有局部变量`num`
3. 发现没找到，于是根据**书写位置**，向上一层作用域（全局作用域）查找，发现`num = 10`，打印`10`

## 作用域与执行上下文

MDN中对**作用域**的说明是：当前的**执行上下文**。值和表达式在其中 "可见" 或可被访问到的上下文，如果一个变量或者其他表达式不 "在当前的作用域中"，那么它就是不可用的

> [详细内容](https://developer.mozilla.org/zh-CN/docs/Glossary/Scope)

## 总结

在本文中我们简单的了解了：
* `JavaScript`的运行过程分为**编译**与**执行**
* **作用域**决定了代码区块中变量和其他表达式的**可见性**
* `JavaScript`中的作用域都是**静态作用域**，也叫**词法作用域**，词法作用域**即在词法分析时生成的作用域**，
* `JavaScript`中的作用域分为：**全局作用域**、**函数作用域**、**块作用域（ES6开始）**
* 引出了**执行上下文**的概念


**执行上下文**是`JavaScript`核心的概念之一，也是`JavaScript`**作用域**、**作用域链**、**提升**等一系列概念背后的原理，后续需要深入的去学习理解**执行上下文**（重要‼️）

## 参考
* [你不知道的JavaScript（上卷）](https://book.douban.com/subject/26351021/)
* [深入理解JavaScript作用域和作用域链](https://juejin.cn/post/6844903797135769614#heading-12)
* [深入理解JS中的词法作用域与作用域链](https://juejin.cn/post/7069578126979760158#heading-9)
* [面试官：说说作用域和闭包吧](https://juejin.cn/post/6844904165672484871#heading-5)
* [ECMAScript 6 入门](https://es6.ruanyifeng.com/)