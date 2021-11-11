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
