## 时间复杂度
冒泡排序，比较的次数是 (N-1)+(N-2)+(N-3)+……+1 = aN²+bN+c，时间复杂度其实算的就是当数值在无穷尽大时，它计算需要的时间，因此只选择最高优先级，并且忽略最高优先级的系数，因此它的时间复杂度就是 O(N)。

## 运算符
| 运算符 |     名称     |                     描述                               |
| :--:   |     :--:     |                     :--:                              |
|   &    |     AND      |              如果两位都是 1 则设置每位为 1               |
|   I    |      OR      |             如果两位之一为 1 则设置每位为 1              |
|   ^    |     XOR      |           如果两位只有一位为 1 则设置每位为 1            |
|   ~    |     NOT      |                        反转所有位                        |
|   <<   | 零填充左位移 |       通过从右推入零向左位移，并使最左边的位脱落。       |
|   >>   | 有符号右位移 | 通过从左推入最左位的拷贝来向右位移，并使最右边的位脱落。 |
|  >>>   | 零填充右位移 |      通过从左推入零来向右位移，并使最右边的位脱落。      |


|  操作   | 结果  |   等同于    | 结果  |
| :-----: | :---: | :---------: | :---: |
|  5 & 1  |   1   | 0101 & 0001 | 0001  |
|  5 I 1  |   5   | 0101 I 0001 | 0101  |
|  5 ^ 1  |   4   | 0101 ^ 0001 | 0100  |
|   ~ 5   |  10   |    ~0101    | 1010  |
| 5 << 1  |  10   |  0101 << 1  | 1010  |
| 5 >> 1  |   2   |  0101 >> 1  | 0010  |
| 5 >>> 1 |   2   | 0101 >>> 1  | 0010  |

### 异或运算
N^0=N，N^N=0<br>
做异或运算的前提是，两个数指向的是不同的地址空间，否则该地址的值就会被抹成0。<br>

【例如】：交换a和b的数值

```javascript
  let a=10
  let b=90
  a=a^b
  b=a^b
  a=a^b
  console.log('aaaaaaa',a)

  // a=甲^乙
  // b=甲^乙^乙=甲
  // a=甲^乙^甲=乙
```

<b>一个数组中，有1个数出现了奇数次，其它数都出现了偶数次，怎么找出出现奇数次的这1个数。<br>

一个数组中，有2个数出现了奇数次，其它数都出现了偶数次，怎么找出出现奇数次的这2个数。<br>

要求：时间复杂度 O(N)，额外时间复杂度 O(1)</b>

```javascript
    // 有1个数出现奇数次
    let array = [1, 2, 2, 3, 3]
    let b = 0
    for (let i = 0; i <= array.length; i++) {
        b = b ^ array[i]
    }
    console.log('bbbbbbbbb', b)

    // 有2个数出现奇数次
```

计算机中的有符号数有三种表示方法，即原码、反码和补码。

<b>把某一个不等于0的二进制的数，最右侧的1提取出来。</b>

```JavaScript
// 例：10101100，提取该数最右侧的 1
let b = 10101100
let c = ~b + 1 // ~b是01010011，+1 变成 01010100
let d = b & c  // 00000100
```

### 二分法的详情与拓展
<b>（1）在一个有序数组中，找出某个数是否存在。</b><br>
<b>（2）在一个有序数组中，找>=某个数最左侧的位置。</b><br> 
<b>（3）局部最小值问题。</b><br>

## 短路表达式
短路表达式是指作为"&&"和"||"操作符的操作数表达式,"&&"和"||"为二元逻辑运算符。<br>

举个简单例子：<br>

fun = fun && bar;  如果fun为true，则返回后者bar；<br>

fun = fun || bar； 如果fun为true，则返回前者fun；<br>

在javascript的逻辑运算中，0、""、null、false、undefined、NaN都会判定为false，而其他都为true。所以在上式的fun = fun || bar;中，||先计算第一个运算数，如果可以被转换成true，也就是表示fun已经存在有值，那么返回左边这个表达式的值，否则计算第二个运算数bar。<br>

另外，即使"&&" "||"运算符的运算数不是布尔值，仍然可以将它看作布尔OR运算，因为无论它返回的值是什么类型，都可以被转换为布尔值。<br>

```javascript
function (key, fn) {
  // if (!this.List[key]) {
  //   this.List[key] = []
  // }
  // this.List[key].push(fn)
  (this.List[key] || (this.List[key]=[])).push(fn) // 短路表达式
}

```

## 逻辑运算符
逻辑与<br>
&& 【返回第一个假值，或者最后一个真值】<br>
|1 && ‘’  |     ‘’|
|  :---: |   :---: |
| Boolean('')|  false|
|   1 && true && 'gx' && 0 && 66 |  0|
|   1 && true && 'gx' && 6 && 66  |  66|
|   var a = '66'; a && (+a);  |  66|
|   a = null;  a && (+a); |  null|
|   true && true  |  true|
|  false && true |  false|
|   true && false |  false|
|  false && false |  false|
   
逻辑或<br>
|| 【返回第一个真值，或者最后一个假值】<br>
|   6 II ‘ssss’ II 0 II null    |     6  |
|  :---: |   :---: | 
|   0 II '' II 6 II ‘ssss’ II 0 II null   |  6  |
|   0 II '' II ‘undefined’ II null   |  null|
|   false II false  |  false|
|    true II false  |  true|
|   false II true   |  true|
|    true II true  |  true|

## 题库1
### 例一：
<b>【题目】</b><br>
Let's assume that we have a pair of numbers(a,b) .  We can get a pair of new pair(a+b,b) or (a,a+b) from the given pair in a single step .<br>
Let the initial pair of numbers be (1,1) . Your task is to find number k , that is , the least number of steps needed to transform (1,1) into the pair where at least on number equals n.


<b>【解析】</b><br>
> 这道题由于解空间特别大，所以从前往后推，无论是动归还是递归都会超限制，动归超空间限制，递归超时间限制。因此，只能考虑
从后往前推。
<br>
设函数 f(a,b) 代表 (a,b) 经过题中规定的运算规则的逆运算，经过 k 步后能到达 (1,1)，其中 f(1,1)=0，为方便计算，我们不妨让 a>=b，即 a 总是两个值中那个大点的值，b 是两个值中小点的值。
<br>
>+ 若 b=1，则 f(a,b) = f(a,1) = a-1，例如：f(3,1) = f(2,1) + 1，f(1,1) + 1 + 1 = 2.
<br>
>+ 当 a%b = 0 时，则 f(a,b) 最终一定会走到 f(b,b)，而 f(b,b) 一定无法走到 f(1,1)，此时 f(a,b) 为无限大。
<br>
>+ 当 a%b != 0 时，f(a,b) = f(b,a%b) + a/b，举个栗子：f(5,2) -> f(3,2) -> f(1,2)，不难看出，在 a 减小到小于 b 之前，较小数总是 b，即在 a/b 步之后，
较小数变为a%b，而较大数变为b。
<br>
<br>
因此，我们便有递推式：
<br>f(a,b) = a-1，当 b=1 时；
<br>f(a,b) = ∞，当 a%b = 0 时；
<br>f(a,b) = f(b,a%b) + a/b，当 a%b != 0 时；

***
