---
title: 数据结构
author: 阿楷
date: 2022-03-31
categories:
 - 笔记
tags:
 - 数据结构
---

## 什么是数据结构 

**数据结构是计算机存储、组织数据的方式**。

数据结构是指相互之间存在一种或多种特定关系的数据元素的集合。通常情况下，精心选择的数据结构可以带来更高的运行或者存储效率。数据结构往往同高效的检索**算法**和索引技术有关。

### 常见的数据结构：
- 数组（Aarray）
- 栈（Stack）
- 队列（Queue）
- 链表（Linked List）
- 图（Graph）
- 散列表（Hash）
- 树（Tree）
- 堆（Heap）

常见的数据结构有很多，**不同的数据结构**的不同操作的**性能都是不同的**，所以使用**正确的数据结构**来解决问题，能直接**提高处理的效率**

::: tip
**数据结构与算法与语言无关**，常见的编程语言都有直接或间接的使用上述常见的数据结构
:::

## 数组

通常意义上，数组（Array）是指**有限个**的**有序排列**的**同类数据**元素的集合，数组在做插入和删除的操作时效率较低（因为还需要做元素的移动处理）

::: tip
但在Javascript中：
  * 数组定义时可以无需指定数组长度，数组长度是可变的
  * 数组定义时无需指定数据类型，可以保存不同类型的元素，但是并不推荐这么处理
:::

## 栈

数组是一个线性结构，并且可以在数组的任意位置插入和删除元素。但是在某些场景中，我们需要对这种任意性加以限制，这就是**受限的线性结构**
栈

栈（Stack）就是一种常见的受限的线性结构，限定仅在表尾进行插入和删除操作

所以，栈的特点为**先进后出，后进先出**，可进行操作的一端称为叫**栈顶**。相对地，把另一端称为**栈底**

向一个栈插入新元素又称作**进栈**、**入栈**或**压栈**；从一个栈删除元素又称作**出栈**或**退栈**

举个例子

生活中的栈结构：

* 类似于自动餐托盘, 最后放上的托盘, 往往先把拿出去使用

程序中的栈结构：

* **函数调用栈**：A(B(C(D()))))：即A函数中调用B，B调用C，C调用D；在A执行的过程中会将A压入栈，随后B执行时B也被压入栈，函数C和D执行时也会被压入栈。所以当前栈的顺序为：A->B->C->D（栈顶）；函数D执行完之后，会弹出栈被释放，弹出栈的顺序为D->C->B->A;
    https://zhuanlan.zhihu.com/p/59479513

* **递归**：为什么没有停止条件的递归会造成栈溢出？比如函数A为递归函数，不断地调用自己（因为函数还没有执行完，不会把函数弹出栈），不停地把相同的函数A压入栈，最后造成**栈溢出**（Stack Overfloat）

### 栈常见的操作：

* push(element)：添加一个新元素到栈顶位置
* pop()：移除栈顶的元素，同时返回被移除的元素
* peek()：返回栈顶的元素，不对栈做任何修改（该方法不会移除栈顶的元素，仅仅返回它）
* isEmpty()：如果栈里没有任何元素就返回true，否则返回false
* size()：返回栈里的元素个数。这个方法和数组的length属性类似
* toString()：将栈结构的内容以字符串的形式返回

## 队列

**队列（Queue）**是另外一种常见的**受限的线性结构**，限定只允许在表的一端进行删除操作，而在表的另外一端进行插入操作

所以，队列的特点为**先进先出，后进后出**

进行**插入操作**的端称为**队尾**，队尾指针**rear**

进行**删除操作**的端称为**队头**，队头指针**front**

队列的数据元素又称为**队列元素**。在队列中**插入**一个队列元素称为**入队**，从队列中**删除**一个队列元素称为**出队**

队列中没有元素时，称为**空队列**

举个例子

生活中的队列结构：

* 管道
* 排队买票
* ...

程序中的栈结构：

* 多线程操作

### 队列的种类

* **顺序队列**
* **循环队列**：在实际使用队列时，为了使队列空间能重复使用，往往对队列的使用方法稍加改进：无论插入或删除，一旦rear指针增1或front指针增1时超出了所分配的队列空间，就让它指向这片连续空间的起始位置。自己从MaxSize-1增1变到0，可用取余运算**rear%MaxSize**和**front%MaxSize**来实现。这实际上是把队列空间想象成一个环形空间，环形空间中的存储单元循环使用，用这种方法管理的队列也就称为循环队列。除了一些简单应用之外，**真正实用的队列是循环队列**



### 队列常见的操作：

* enqueue(element)：向队列尾部添加一个（或多个）新的项
* dequeue()：移除队列的第一（即排在队列最前面的）项，并返回被移除的元素
* front()：返回队列中的第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何变动（不移除元素，只返回元素信息与Stack类的peek方法非常类似）
* isEmpty()：如果队列中不包含任何元素，返回true，否则返回false
* size()：返回队列包含的元素个数，与数组的length属性类似
* toString()：将队列中的内容，转成字符串形式

### 优先级队列：

优先级队列（riority Queue），就是在普通的队列基础上加入**优先级**的概念。普通的队列是一种先进先出的数据结构，元素在队列尾追加，而从队列头删除。

而在优先队列中，**元素被赋予优先级**。当访问元素时，**元素进入队列后需要根据优先级进行排序**，具有优先队列具有最高级最先删除。

## 链表

链表（Linked List），和数组一样，也是一种**线性数据结构**

但是和数组不一样的是：
* 数组是顺序的储存结构，链表是链式的存储结构
* 链表通过**指针**来连接元素与元素，数组则是把所有元素按次序依次存储
* **数组寻找某个元素较为简单，但插入与删除比较复杂；链表的插入删除元素相对数组较为简单，不需要移动元素，但是寻找某个元素较为困难**
* 数组一般一开始时需要指定最大长度，扩容不如链表方便

总结一下链表相较于数组的优点主要有：
* 链表在内存中不需要是连续的空间，充分利用计算机内存
* 创建时不需要确定大小，同时可以一直演延伸下去
* 在插入删除数据时更有效率

**但是在访问元素时，链表都需要从头开始，从第一个元素开始一个一个往下访问**

### 链表常见的操作：

* append: 在表尾添加一个元素
* insert: 在表指定位置插入一个元素
* get: 获取对应位置的元素
* indexOf: 获取对应元素在表中的索引
* update: 修改某个位置的元素
* removeAt: 删除某个位置的元素
* remove: 删除某个元素
* isEmpty: 链表是否为空
* size: 链表长度
* toString: 输出元素值

### 双向链表：

双向链表是链表的一种, 它和一般的(单向)链表的区别是双向链表比一般的链表每个节点多一个尾指针。

双链表对于单链表的优点是：

* **方便了添加的操作**，双向链表添加节点可以利用尾指针直接找到最后一个节点，不需要向单链表一样从头查询到最后一个节点
* **方便了删除的操作**，单链表的删除需要多一个变量来保存删除节点的上一个节点，而双链表只用找到需要删除的节点就可以定位到上一个节点
* **查找时的效率更高**，借用二分法的思路，从头节点向后查找操作和尾节点向前查找操作同步进行，查找效率提高一倍。

但双向链表从存储结构来看，**双向链表的每个节点都要比单链表多一个指针，占用空间大于单链表所占用的空间**。

### 循环链表

循环链表是另一种形式的链式存储结构。它的特点是表中最后一个结点的指针域指向头结点，整个链表形成一个环。

根据节点指针差异又分为单循环链表，双向循环链表

循环链表的特点是

* 循环链表中没有NULL指针，涉及遍历操作时，其终止条件就不再是像非循环链表那样判别p或p->next是否为空，而是判别它们是否等于某一指定指针，如头指针或尾指针等
* 从任一结点出发都可访问到表中所有结点


## 集合

集合（Set）通常是由一组**无序的**, **不能重复**的元素构成的一种数据结构

**JavaScript(ES6)中，已经实现了Set类！**

### 集合常见的操作：
 
* add(value)：向集合添加一个新的项。
* remove(value)：从集合移除一个值。
* has(value)：如果值在集合中，返回true，否则返回false。
* clear()：移除集合中的所有项。
* size()：返回集合所包含元素的数量。与数组的length属性类似。
* values()：返回一个包含集合中所有值的数组

### 集合间的操作：

* 交集：同时在两个集合里的元素
* 并集：只要在一个集合里面的元素
* 差集：只包含第一个集合的元素
* 子集：一个集合里所有的元素是另一个集合的元素

## 字典

字典（Dictionary）是一种**通过名字引用值**的数据结构，这种结构类型称之为**映射**

**JavaScript(ES6)中，已经实现了Map(映射)类！**

### 字典的特点：
 
* 字典的主要特点是一一对应的关系
* 字典的键是无序的，不可以重复的，而值可以重复

## 哈希表

哈希表（Hash table）也叫散列表，是根据关键码值(Key value)而直接进行访问的数据结构。也就是说，它通过把关键码值映射到表中一个位置来访问记录，以加快查找的速度。这个映射函数叫做散列函数，**存放记录的数组叫做散列表**。

几乎所有的编程语言都有直接或间接的应用这种数据结构，**JavaScript 的对象（Object），本质上就是用这种数据结构去实现的**。

**哈希表的操作(增删查改)效率很高**，所需的时间接近常量的时间O(1)

**但是在哈希表中，数据是没有顺序的，所以不能通过一种固定的方式去遍历其中的元素**

### 基本概念：

哈希表可以存储各种类型的数据，当我们从哈希表中查找所需要的数据时，理想情况是**不经过任何比较**，**一次**存取便能得到所查记录，那就**必须在记录的存储位置和它的关键字之间建立一个确定的对应关系f，使每个关键字和结构中一个唯一的存储位置相对应**。(关键字就是所要存储的数据，存储位置相当于数组的索引)

**哈希函数**：关键字与储存位置之间的确定的对应关系

### 哈希冲突：

假如，我们所要存储的数据其关键字是一个人的身份证号(18位数字)，通过某一种哈希函数计算出的索引，即使关键字不同，索引也会有可能相同。即多个数据计算出同一个索引，这就是**哈希冲突**

当索引相同时，我们该怎么存储数据，解决哈希冲突，是我们建哈希表的另一个关键问题

### 解决哈希冲突

解决哈希冲突，常见的情况有两种方案：
* **链地址法**：数组单元中存储的不再是单个数据, 而是一个链表，当有统一索引的数据时，添加到链表后端
* 开放地址法：寻找空白的单元格来添加重复的数据

关于开放地址法，探索这个空白位置的方式有：
* 线性探测
* 二次探测
* 再哈希法

在真实开发中, **使用链地址法的情况较多**, 因为它不会因为添加了某元素后性能急剧下降

比如在Java的HashMap中使用的就是链地址法


## 树


树（Tree）是一种重要的**非线性数据结构**，直观地看，它是数据元素（在树中称为结点）按分支关系组织起来的结构，很象自然界中的树那样。

一棵树（tree）是由n（n>0）个元素组成的有限集合，其中：
（1）**每个元素称为结点**（node）；
（2）有一个特定的结点，称为**根结点**或根（root）；
（3）除根结点外，其余结点被分成m（m>=0）个互不相交的有限集合，而每个子集又都是一棵树（称为原树的子树）

### 树的相关概念
#### 度
树的度，简单地说，就是结点的分支数。以组成该树各结点中最大的度作为该树的度，**树中度为零的结点称为叶结点或终端结点**。**树中度不为零的结点称为分枝结点或非终端结点**。除根结点外的分枝结点**统称为内部结点**。

#### 深度
树的深度——组成该树各结点的最大层次

#### 层次
根结点的层次为1，其他结点的层次等于它的父结点的层次数加1

#### 路径
对于一棵子树中的任意两个不同的结点，如果从一个结点出发，按层次自上而下沿着一个个树枝能到达另一结点，称它们之间存在着一条路径。可用路径所经过的结点序列表示路径，路径的长度等于路径上的结点个数减1

#### 森林
指若干棵互不相交的树的集合

### 二叉树
如果树的每个节点最多只能有2个子节点，这个树就是二叉树， 空值也可以是二叉树

#### 二叉树的特性

* 第i层的最大节点数为：`2^(i -1), i > 0` 个
* 深度为k的二叉树的最大节点数为: `2^k - 1, k > 0` 个
* 二叉树所有的**叶子节点个数n0**与**度为2的节点个数n2**的关系为: n0 = n2 + 1

* 完美二叉树：**一个深度为k(>=-1)且有2^(k+1) - 1个结点的二叉树称为完美二叉树**
* 完全二叉树：**完全二叉树从根结点到倒数第二层满足完美二叉树，最后一层可以不完全填充，其叶子结点都靠左对齐**
* 完满二叉树：**所有非叶子结点的度都是2的二叉树就是完满二叉树**

#### 二叉树的存储
二叉树的常见存储方式是数组和链表，但是通过数组的方式存储非完全二叉树会造成很大的空间浪费


#### 二叉搜索树

二叉搜索树（BST，Binary Search Tree）或者是一棵空树，或者是具有下列性质的二叉树：
* 若它的左子树不空，则左子树上所有结点的（健）值均小于它的根结点的（健）值
* 若它的右子树不空，则右子树上所有结点的（健）值均大于它的根结点的（健）值
* 它的左、右子树也分别为二叉搜索树。

#### 二叉搜索树的常见操作

insert: 向树中插入一个新的节点
search: 在树中查找节点
preOrderTraverse: 通过先序遍历的方式遍历节点
inOrderTraverse: 通过中序遍历的方式遍历节点
postOrderTraverse: 通过后序遍历的方式遍历及节点
min: 返回树中最小的键的节点
max: 返回树中最大的键的节点
find: 返回树中指定的键的节点
remove: 删除某个节点

#### 二叉搜索树的优缺点

二叉搜索树查找效率高，查找效率与树的深度有关，本质类似二分查找法, 查找效率为O(logN)

但是， 请注意： **当插入连续数据时，导致左右分布会不均匀，当该二叉树左右分布极端不均匀的情况下，这颗树其实可以当作一个链表， 查找效率会变成为O(N)。**

这种左右分布会不均匀的二叉树为**非平衡二叉树** 而左右分布会均匀的二叉树为**平衡二叉树**

#### 如何保证二叉搜索树的平衡

通过以上的结论可以发现，为了保证二叉搜索树查找效率，我们必须要保证二叉搜索树的平衡。

常见的平衡二叉树：

* AVL树: 
    * 是最早的自平衡二叉查找树
    * 通过每个节点多储存了一个数据去实现树的平衡(平衡因子: 某结点的左子树与右子树的高度(深度)差即为该结点的平衡因子, 如果某一结点的平衡因子绝对值大于1则说明此树不是平衡二叉树)
    * 但是插入效率不高(增加和删除可能需要通过一次或多次树旋转来重新平衡这个树)
    * 现在不常用

* **红黑树**

#### 红黑树
红黑树除了满足二叉搜索树的规则之外，还添加了一些自己的规则：

1. 节点有颜色属性，红色或者黑色
2. 根节点的颜色是黑色
3. 每个叶子节点都是黑色的空节点（NIL节点）
4. 每个红色的节点的两个子节点都是黑色的，不能有连续的两个红色节点
5. 从任意节点到其每个叶子节点的路径中所包含的黑色节点个数是一致的

这些规则确保了红黑树的关键特性： **根到叶子的最长路径不超过最短路径的两倍**

为什么可以做到根到叶子的最长路径不超过最短路径的两倍：

* **规则4**决定了路径不可能有连续的红色节点
* 最短的可能路径都是黑色节点
* 最长的可能路径一定是红黑节点都有的路径
* 根节点和叶子节点一定是黑色节点
* **规则5**定义了每个路径的黑色节点数目是一致的

**所以 **最长路径中的红色节点数目不会超过黑色节点数目**，由此推断根到叶子的最长路径不超过最短路径的两倍**

为了使**插入数据**的红黑树符合以上的特性，我们需要在插入删除操作后通过一下三种操作：
* 变色：**为了符合红黑树的规则，需要变换红黑树节点的颜色**
* 左旋转
* 右旋转

变色：
* **新插入的节点通常为红色，违反红黑树规则时再进行变色调整**

左旋：
* **对某个节点进行左旋，意味着将这个节点变成它右子节点的左节点**
左旋示例图(以x为节点进行左旋，中序表示)：
xyz ————》zxy

右旋：
* **对某个节点进行右旋，意味着将这个节点变成它左子节点的右节点**
右旋示例图(以x为节点进行右旋，中序表示)：
xyz ————》yxz

#### 红黑树插入节点的情况讨论：

父节点：该节点的父节点
叔节点：该节点的父节点的兄弟节点
祖节点：该节点的父节点的父节点

* 情况1: 没有父节点：
    * 插入的节点为根节点，插入后进行变色
    * 满足红黑树**根节点时黑色的规则**

* 情况2: 父节点是黑色的：
    * 叶子节点是黑色的， 插入新节点(红色)时， 不需要对新节点进行变色
    * 但是需要在新节点加入两个黑色的nil节点作为叶子节点，使插入后还是符合红黑树的规则

* 情况3: 父节点是红色的并且叔节点也是红色的
    * 将父节点以及叔节点变成黑色的，祖节点的变成红色
    * 为什么不将自己变成黑色的？因为自己变黑会使这条路径比其他路径多一个黑色节点，不合红黑树的规则
    * **但是，如果祖节点的父节点是红色的话，变换后并不符合红黑树规则**，这个时候只需要递归进行变色操作就可以了

* 情况4: 父节点是红色的，叔节点是黑色的，并且该节点是父节点的左节点
    * 将祖节点进行右旋转
    * 将父节点变成黑色
    * 将祖节点变成红色（这个时候原本的祖节点就变成了该节点的兄弟节点）

* 情况5: 父节点是红色的，叔节点是黑色的，并且该节点是父节点的右节点
    * 将P进行左旋转
    * 将祖节点进行左旋转
    * 改变祖节点的颜色



## 十一、图

在计算机科学中，图（Graph）结构是一种非常常见的数据结构，理论上，树也是图的一种
一个图就是一些顶点的集合，这些顶点通过一系列边结对（连接），
顶点用圆圈表示，边就是这些圆圈之间的连线。顶点之间通过边连接。

一个图可以表示一个社交网络，每一个人就是一个顶点，互相认识的人之间通过边联系

### 图的基本概念

* 图：描述一组对象的结构
* 顶点： 表示描述的对象
* 边：表示描述的对象们之间的关系
* 有向图和无向图： 如果边是有方向的则称为有向图，如果边没有方向则称为无向图
* 无权图和带权图： 对图中的边赋予具有一定意义的数值(路程、费用等等)的图称为带权图
* 完全图：任意两个顶点之间都存在一条边的图
* 邻接点：如果两顶点之间存在一条边，则称它们互为邻接点
* 顶点的度：
    * 对于无向图，顶点v的度定义为和v相关联的边数
    * 对于有向图，顶点v的度分为入度和出度
* 路径：若顶点之间可以由若干条边连通，则称vp到vq存在一条路径
    * 无权图的路径长就是路径上经过边数
    * 带权图的路径长要乘以每条边的权
* 简单路径：除了起点和终点可以为同一个顶点外，其余顶点均不相同
* 回路/环：起点和终点为同一个顶点的简单路径
* 图的连通性：两个顶点之间有路径，则称两个顶点之间是连通的
* 连通图：如果图中任意两个顶点都是连通的，则称该图是连通图
* 强连通图：对于有向图，如果图中的任意两个顶点之间是双向连通的，则该图是强连通图
* 生成树：在图论中，树被定义为没有回路的连通图，生成树的研究对象是连通图
连通图G中包含所有顶点的极小连通子图（边最少）称为G的一棵生成树

### 图的表示方法

* 邻接矩阵表示法： 用**一个一维数组存放图中所有顶点数据**；用一个**二维数组存放顶点间关系**（边或弧）的数据，这个二维数组称为邻接矩阵。邻接矩阵又分为有向图邻接矩阵和无向图邻接矩阵
    * 邻接矩阵表示法能很好的表示顶点间的关系（边），也能直观的展示出边的权重
    * 当表示的图是一个稀疏图（边很少），用邻接矩阵表示法需要用到大量的0区表示没有边，造成了极大的空间浪费

* 邻接表：图的邻接表存储方法跟树的孩子链表示法相类似，是一种顺序分配和链式分配相结合的存储结构。如这个表头结点所对应的顶点存在相邻顶点，则把相邻顶点依次存放于表头结点所指向的单向链表中。

邻接表的优点：
* 结构简单，不会浪费太多空间
* 方便获取某个顶点连接了哪些边(出度)

邻接表的缺点：
* 获取有哪些边连接了某个顶点比较困难（出度）


### 图的遍历方法

图的遍历意味着需要将图中所有顶点右访问一遍且不重复访问，有两种算法可以帮助我们进行图的遍历

* 广度优先搜索
* 深度度优先搜索

* 深度优先搜索用栈（stack）来实现，整个过程可以想象成一个倒立的树形：
    + 把根节点压入栈中。
    + 每次从栈中弹出一个元素，搜索所有在它下一级的元素，把这些元素压入栈中。
    + 并把这个元素记为它下一级元素的前驱。
    + 找到所要找的元素时结束程序。
    + 如果遍历整个树还没有找到，结束程序。

* 广度优先搜索使用队列（queue）来实现，整个过程也可以看做一个倒立的树形：
    + 把根节点放到队列的末尾。
    + 每次从队列的头部取出一个元素，查看这个元素所有的下一级元素，把它们放到队列的末尾。
    + 并把这个元素记为它下一级元素的前驱
    + 找到所要找的元素时结束程序。
    + 如果遍历整个树还没有找到，结束程序

注意：这两种遍历算法都需要指明第一个被访问的节点