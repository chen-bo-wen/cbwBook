## 时间复杂度
冒泡排序，比较的次数是 (N-1)+(N-2)+(N-3)+……+1 = aN²+bN+c，时间复杂度其实算的就是当数值在无穷尽大时，它计算需要的时间，因此只选择最高优先级，并且忽略最高优先级的系数，因此它的时间复杂度就是 O(N)。

## 运算符
| 运算符 |     名称     |                           描述                           |
| :----: | :----------: | :------------------------------------------------------: |
|   &    |     AND      |             只有两位都是 1 得到的结果才是 1              |
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

<b>一个数组中，有1个数出现了奇数次，其它数都出现了偶数次，怎么找出出现奇数次的这1个数。</b><br>

一个数组中，有2个数出现了奇数次，其它数都出现了偶数次，怎么找出出现奇数次的这2个数。<br>

要求：时间复杂度 O(N)，额外时间复杂度 O(1)</b>

```javascript
    // 认识复杂度和简单排序算法（1小时08分处）
    // 有1个数出现奇数次
    let array = [1, 2, 2, 3, 3]
    let b = 0
    for (let i = 0; i <= array.length; i++) {
        b = b ^ array[i]
    }
    console.log('bbbbbbbbb', b)

    // 有2个数出现奇数次
    // 数组里的数全都是二进制数
    // 首先将数组里的所有数都异或一遍，得到的结果就是 a^b
    let ero
    for (let i = 0; i < arr.length; i++) {
        ero ^= arr[i] // 假设得到的结果是 1001100
    }

    // 因为需要得到 a 或者 b，先计算出其中一个出现奇数次的数
    // 可以选择获取 ero 上最右侧的 1（其他位上可能也是 1，但是只需要通过其中某一位进果筛选即可），因为如果同一位上出现的所有数存在只出现奇数次的，才会得到 1
    let Ero = (~ero + 1) & ero
    // ~ero 是 0110011 ，~ero+1 是 0110100
    // & 只有当两者都是 1 时，结果才是 1。因此得到的结果时 0000100 

    // 是因为 a 和 b 都出现的时奇数次，并且两者不想等，才会出现位里存在 1 的情况，否有位都等于 0。
    let a
    for (let i = 0; i < arr.length; i++) {
        // 只有 该位上是 1 的才被允许计算，这样就将 a 和 b 划分到两个阵营了
        if ((arr[i] & Ero) === 0) { // & 只有当两者都是 1 时，得到的结果才是 1。
            a ^= arr[i] // 这样就能得到两者中的一个
        }
    }
    let b = ero ^ a
```

计算机中的有符号数有三种表示方法，即原码、反码和补码。

<b>把某一个不等于0的二进制的数，最右侧的1提取出来。</b>

```JavaScript
// 例：10101100，提取该数最右侧的 1
let b = 10101100
let c = ~b + 1 // ~b是01010011，+1 变成 01010100 （+1补码）
let d = b & c  // 00000100
```

## 插入排序
跟 冒泡排序 和 选择排序 的区别

## 二分法
O(logN)，以下情况全部可以使用二分法。

<b>（1）在一个有序数组中，找出某个数是否存在。</b><br>
<b>（2）在一个有序数组中，找>=某个数最左侧的位置。</b><br> 
<b>（3）在一个无序数组中，求局部最小值问题。</b><br>

## 对数器

## 递归
用递归的方式求一个数组的最大值。<br>

当一个数组很长的时候，其左边界是 L，右边界是 R，L+R 可能存在溢出的情况，因此使用 (L+R)/2 得到其中点可能会得到的是一个负数，出现报错的情况。这时可以表示为 L + (R-L)/2 或 L + (R-L) >> 1 ，右移一位就相当于 除2。优先使用 >> ，比 除2 要快。

### 右移
右移一位相当于除以2。 例：5>>1，5的二进制表示是101，那么右移一位之后是10就是2了，是整除的；左移的话就是在后面补一个零，相当于是乘以二，那么变成了1010，十进制是10<br>

n为非负数时，>> 1和/ 2的结果是一样的<br>
n为负数且还是偶数时，>> 1和/ 2的结果是一样的<br>
n为负数且还是奇数时，>> 1和/ 2的结果是不一样的<br>

### 递归求一个数组的最大值

同时也涉及到了二分法

```javascript
    let arr = [6, 7, 89, 289, 2, 3, 189]
    // Math.max()中的参数不可以传数组
    // 利用二分法找出数组里的最大值  Math.max.apply(null,arr)，apply 传递的参数是数组 ，传 null 是不需要改变 this 指向
    // 使用 二分法 要快，编写使用二分法的方法 
    function process(L, R) { // L,R是数组的下标
        if (L == R) {
            return arr[L] // 当 L==R 的时候，说明不需要拆分，则返回当前值即可
        } else {
            // 当数组非常大时，L+R 可能会出现内存溢出的情况，因此不使用 (L+R)/2 来求中点
            // 位运算 比 除二 的运行时间要快
            let mid = L + ((R - L) >> 1)  // 右移一位，当数字非负时，相当于除二
            let Lmax = process(L, mid) // 因为在 L==R 的判断条件运行里，返回的是值。所以 findMax 运行之后最终返回的结果是数组的值
            let Rmax = process(mid + 1, R) // mid +1
            return Math.max(Lmax, Rmax)
        }
    }

    let max = process(0, arr.length - 1)
    console.log('max的值是', max)
```

master 公式的使用：<br>
T(N) = a * T(N/b) + O(N^d) ，在上述求数组最大值的代码中，符合master公式：2*T(N/2) + O(1)，其中 N/2 为数据量的大小。<br>

满足子问题等规模的递归行为<br>
1) log(b,a) > d => 复杂度为 O(N^log(b,a))<br>
2) log(b,a) = d => 复杂度为 O(N^d*logN)<br>
3) log(b,a) < d => 复杂度为 O(N^d)<br>

[算法的复杂度与master定理](https://blog.gocalf.com/algorithm-complexity-and-master-theorem)

## 归并排序
归并排序，数组里每两个数会比较到大小。
左侧部分 和 右侧部分 先分别排好序，然后将两部分的数 merge 到一起。

```javascript
        //  归并排序
        let arrr = [1, 67, 4, 5, 98]
        function pro(L, R) {
            if (L == R) { // 排序只需要知道数组的下标值即可
                return  // 当 L == R 的时候，则不需要二分下去了
            }
            let mid = L + ((R - L) >> 1)
            // 二分法分层下去，左右两部分分别递归二分
            pro(L, mid) // L,R就是下标值。这里也不需要赋值，因此当 L==R 的时候，也不需要 return。
            pro(mid + 1, R)
            return mergeArr(L, mid, R)
        }
        function mergeArr(L, mid, R) {
            let p = [] // 准备一个额外的数组用于接收排序好的数据
            let i = 0
            let p1 = L
            let p2 = mid + 1  // 左右两部分都从 0 开始，进行比对，进入额外数组的部分指针才往下移动
            while (p1 <= mid && p2 <= R) {
                p[i++] = arrr[p1] <= arrr[p2] ? arrr[p1++] : arrr[p2++]
            }
            while (p1 <= mid) { // 当右部分的数据全部都进入额外数组后，再将左部分的数据放入数组
                // 因为是一层一层递归下去的，因此这时左部分的数据必然是有序状态
                p[i++] = arrr[p1++]
            }
            while (p2 <= R) {
                p[i++] = arrr[p2++]
            }

            // 
            // 把 p 里的东西拷贝回原数组里去。因为所有递归都是基于原数组进行操作的，如果排序后的数据没有同步到原数组，则会出错
            for (let i = 0; i < p.length; i++) { // 注意拷贝数组的时候，下标不要超出数组长度
                arrr[L + i] = p[i]
            }
            return arrr
        }
        let newArrr = pro(0, arrr.length - 1)
        console.log('newarrr是', newArrr)
```

额外空间复杂度为 O(N)，因为每次申请后空间就释放了，到最大的一次需要准备的空间就是 N。

### 小和问题
在一个数组中，每一个数左边比当前数小的数积累起来，叫做这个数组的小和。求一个数组的小和。

```javascript
// 下面这个方法函数没有返回，而是设置了一个全局变量 num
        // 小和问题
        let arr = [1, 3, 4, 2, 5]
        function process(L, R) {
            if (L == R) { // 排序只需要知道数组的下标值即可
                return  // 当 L == R 的时候，则不需要二分下去了
            }
            let mid = L + ((R - L) >> 1)
            // 二分法分层下去，左右两部分分别递归二分
            process(L, mid) // L,R就是下标值。这里也不需要赋值，因此当 L==R 的时候，也不需要 return。
            process(mid + 1, R)
            mergy(L, mid, R)
        }

        let num = 0
        function mergy(L, M, R) {
            let i = 0
            let p = []
            let p1 = L
            let p2 = M + 1
            while (p1 <= M && p2 <= R) { // 符合条件的时候就一直循环进行下去
                let oldP1 = p1
                if (arr[p1] < arr[p2]) {
                    p[i++] = arr[p1]
                    console.log('arr[p1]是：', arr[p1])
                    console.log('(R - p2 + 1)', (R - p2 + 1))
                    num += arr[p1] * (R - p2 + 1)
                    p1++
                } else {
                    p[i++] = arr[p2++]
                }
                // p[i++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++]  // 当左右两边相等的时候，是右边的先进入额外数组里
                // 当前判断的值 arr[p1]，p2 移动的长度为 P2-(M+1)，因此对于该值，加进去的和为 arr[p1] * (p2-(M+1))

                // num += arr[oldP1] * (R - p2 + 1)

            }
            console.log('num', num)
            while (p1 <= M) {
                p[i++] = arr[p1++]
            }
            while (p2 <= R) {
                p[i++] = arr[p2++]
            }
            // console.log('2--p的结果是', p)


            for (let j = 0; j <= p.length - 1; j++) {
                arr[L + j] = p[j]
            }
            console.log('arr是：', arr)
        }

        process(0, arr.length - 1)
```

### 逆序对
只要左边的数大于右边的数，则称这两个数是逆序对。求所有逆序对的数量。<br>
如：数组[3,2,4,5,0]，逆序对有[3,2],[3,0],[2,0],[4,0],[5,0]。

```javascript
        // 逆序对
        let arr1 = [3, 2, 4, 5, 0]
        let arr = arr1.reverse() // 需要比小值
        // 因为放到额外数组里，是从小到大的顺序排列的，放置规则是左边比右边小的就先进入
        console.log('arr是--', arr)

        function process(L, R) {
            if (L == R) {
                return
            }
            let mid = L + ((R - L) >> 1)
            return process(L, mid) +
                process(mid + 1, R) +
                compare(L, mid, R)
        }
        let compareArr = []
        function compare(L, mid, R) {
            let p = []
            let i = 0
            let p1 = L
            let p2 = mid + 1
            while (p1 <= mid && p2 <= R) {
                for (let i = p2; i <= R; i++) { // 
                    arr[p1] < arr[p2] ? compareArr.push([arr[i], arr[p1]]) : ''
                }
                p[i++] = arr[p1] <= arr[p2] ? arr[p1++] : arr[p2++]
            }

            while (p1 <= mid) {
                p[i++] = arr[p1++]
            }
            while (p2 <= R) {
                p[i++] = arr[p2++]
            }
            for (let j = 0; j <= p.length - 1; j++) {
                arr[L + j] = p[j]
            }
            console.log('arr是', arr)
            console.log('compareArr', compareArr)
            return compareArr
        }
        let a = process(0, arr.length - 1)
        console.log('a是', a)
```

## 快排
？？还未学习

## 堆
<!-- js 里现成堆结构的用法是。。。。。。。。。。。？ -->

### 二叉树的节点
这里的 i 是指数在数组里的下标值。任何一个二叉树的父节点为 (i-1)/2 ，左节点为 2*i+1，
右节点为 2*i+2

### 完全二叉树
只要左节点存在就是完全二叉树，右节点可有可无。

### 大根堆
每一个子树，都是头节点（需要是头节点，只是父节点不行）为最大值。

#### 某个数现在处于 index 位置，继续往上移动，使其变成一个大根堆。
```javascript
        let arr = [9, 6, 7, 4, 3]
        // 形成大根堆

        // 插入一个值，还是大根堆
        function heapInsert(index) { // index 为数值插入的节点值（不是该数值）
            while (arr[(index - 1) / 2] < arr[index]) {  // (index - 1) / 2 是该节点的父节点
                sweap(FatherIndex, index)
                index = (index - 1) / 2
            }
        }

        // 某个数在 index 位置，是否需要往下移动使其重新变成大根堆。
        function heapify(index, heapSize) { // heapSize 是堆的总数量
            let leftIndex = 2 * index + 1
            while (leftIndex <= heapSize) { // 存在左孩子

                // 左右孩子数值比较
                let largeChildIndex = (2 * index + 2) < heapSize && arr[leftIndex] < arr[2 * index + 2] ?
                    2 * index + 2 : leftIndex  // 右孩子也不超过 heapSize，左右孩子比大小

                // 父节点 和 左右孩子里较大的孩子比较
                let largestIndex = arr[largeChildIndex] > arr[index] ? largeChildIndex : index

                // 跳出循环的条件
                if (largestIndex == index) {
                    break
                }

                // 继续循环的条件
                sweap(largeChildIndex, index)
                index = largeChildIndex 
                leftIndex = 2 * index + 1 // 继续循环
            }
        }

        // 依次将根节点与最后一个节点的值交换，然后得到根节点的值（并且减少 heapSize），将其放入一个新的数组里

        // 交换值
        function sweap(FatherIndex, index) {
            arr[FatherIndex] = arr[FatherIndex] ^ arr[index]
            arr[index] = arr[FatherIndex] ^ arr[index]
            arr[FatherIndex] = arr[FatherIndex] ^ arr[index]
        }
```

### 比较器的使用
比较器使用 sort。

```javascript
        // 数组里有多个学生，将学生 id 由小到大进行排序
        function Student(name, id, age) {
            this.name = name;
            this.id = id;
            this.age = age;
        }
        let student1 = new Student('a', '2', '18')
        let student2 = new Student('b', '3', '17')
        let student3 = new Student('c', '1', '19')
        let student4 = new Student('d', '3', '16')

        let studentArray = []
        studentArray.push(student1, student2, student3, student4)

        studentArray.sort((a, b) => {
            if (a.id == b.id) {
                return a.age - b.age
            } else {
                return a.id - b.id
            }
        })

        console.log('studentArray', studentArray)
```

### 基数排序（桶子法）
有一些数，将所有数字的长度补齐到一直，如 100，89，56，39，就需要将每个数的长度都补齐到三位数，变成 100，089，056，039。<br>
首先按照它的个位数的进行排序，变成 100，56，89，38。<br>
再按照十位数进行排序，变成 100，38，56，89。<br>
再按照百位数进行排序，变成 38，56，89，100。<br>

```javascript
        // 基数排序
        let arr = [3, 80, 78, 90, 567, 34]

        console.log('原数组：', arr)
        radixSort(arr);
        console.log('基数排序后：', arr)

        // 基数排序方法
        function radixSort(arr) {
            // 定义一个二维数组，表示10个桶，每个桶就是一个一维数组
            let bucket = new Array(10);
            for (let i = 0; i < bucket.length; i++) {
                bucket[i] = new Array(arr.length);
            }

            //定义一个一维数组来记录每个桶的每次放入的数据个数
            //比如：Counts[0],记录的就是bucket[0]桶的放入数据个数
            let Counts = new Array(10).fill(0); // 得到一个数组 [0,0,0,0,0,0,0,0,0,0]

            // 得到数组中的最大值
            let max = arr[0];
            for (let i = 1; i < arr.length; i++) {
                if (arr[i] > max) {
                    max = arr[i]
                }
            }
            // 得到最大值是几位数
            let digit = (max + '').length; // max + '' ，将其变成字符串，得到字符串的长度值

            // 每一轮，对数组的各个位数进行排序
            // 获取位数

            for (let i = 0, n = 1; i < digit; i++, n = n * 10) { // i 是计算一共有几位数，n 是用于获得各个位数的
                for (let j = 0; j < arr.length; j++) {
                    let digitOfElement = Math.floor(arr[j] / n) % 10 // 获取各个 位数
                    // 将每个数都放进相对应的桶里
                    bucket[digitOfElement][Counts[digitOfElement]] = arr[j]
                    // 记录每个桶里分别放了多少数据
                    Counts[digitOfElement]++
                }


                let index = 0
                // 遍历每一个桶，将每一个桶的数据放回到原数组里
                for (let k = 0; k < Counts.length; k++) { // 遍历每一个桶
                    if (Counts[k] != 0) { // 该桶里存放有数据
                        for (let l = 0; l < Counts[k]; l++) {
                            arr[index] = bucket[k][l]
                            index++
                        }
                    }
                    // 每一轮处理后，将相应的桶数据清空
                    Counts[k] = 0
                }
            }
        }
```

## 链表
### 排序算法的稳定性
值相同的那些数，在排序完后顺序还能保持和原来的一样，则说明该算法有稳定性。

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
|           1 && ‘’            |  ‘’   |
| :--------------------------: | :---: |
|         Boolean('')          | false |
| 1 && true && 'gx' && 0 && 66 |   0   |
| 1 && true && 'gx' && 6 && 66 |  66   |
|   var a = '66'; a && (+a);   |  66   |
|    a = null;  a && (+a);     | null  |
|         true && true         | true  |
|        false && true         | false |
|        true && false         | false |
|        false && false        | false |
   
逻辑或<br>
|| 【返回第一个真值，或者最后一个假值】<br>
|      6 II ‘ssss’ II 0 II null       |   6   |
| :---------------------------------: | :---: |
| 0 II '' II 6 II ‘ssss’ II 0 II null |   6   |
|   0 II '' II ‘undefined’ II null    | null  |
|           false II false            | false |
|            true II false            | true  |
|            false II true            | true  |
|            true II true             | true  |

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
