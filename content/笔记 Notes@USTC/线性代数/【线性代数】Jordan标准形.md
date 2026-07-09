---
tags:
  - 线性代数
  - Jordan标准型
  - 矩阵分析
zhihu-title: 【线性代数】Jordan 标准形及其应用
zhihu-link: https://zhuanlan.zhihu.com/p/2057474941034017906
zhihu-toc: "1"
zhihu-topics: Mathematics, Linear Algebra
创建日期: 2026-07-06
zhihu-updated-at: 2026-07-06 20:19
zhihu-created-at: 2026-07-06 14:44
---
# Jordan 标准形及其应用

【注】
1. 此部分内容适合学习特征值、特征向量和相似对角化后学习
2. Jordan标准形的求解方法在第4节，只对求解方法的可以跳过前面的理论介绍
## 1. 问题的提出

设 $V$ 是复数域 $\mathbb{C}$ 上的 $n$ 维线性空间，$T:V\to V$ 是线性变换。我们希望在 $V$ 中选取一组基，使得 $T$ 在这组基下的矩阵具有最简形式。

若 $T$ 有 $n$ 个线性无关的特征向量，则 $T$ 可对角化。但一般情形并非如此——几何重数可能小于代数重数。Jordan 标准形定理断言：**任何复方阵都相似于一个由 Jordan 块组成的分块对角阵，且该形式在块的排列顺序意义下唯一。**

本文旨在以严格的数学推导建立这一理论，并展示其在常系数线性微分方程组中的应用。

## 2. 广义特征空间与准素分解

### 2.1 广义特征向量

设 $\lambda$ 是 $T$ 的特征值。非零向量 $v\in V$ 称为 **属于 $\lambda$ 的广义特征向量**，若存在正整数 $k$ 使得
$$
(T-\lambda I)^k v = 0.
$$
集合
$$
G_\lambda = \{ v\in V \mid \exists k\ge 1,\ (T-\lambda I)^k v = 0 \}
$$
称为 **属于 $\lambda$ 的广义特征空间**。由于 $V$ 的维数有限，存在最小的正整数 $m_\lambda$ 使得 $\ker(T-\lambda I)^{m_\lambda} = \ker(T-\lambda I)^{m_\lambda+1}$，此后链稳定，且 $G_\lambda = \ker(T-\lambda I)^{m_\lambda}$。实际上可取 $m_\lambda$ 为 $\lambda$ 的代数重数。

### 2.2 准素分解定理

**定理 2.1** 设 $T$ 的特征多项式为 $f(t)=\prod_{i=1}^s (t-\lambda_i)^{a_i}$，其中 $\lambda_i$ 互异。则
$$
V = G_{\lambda_1}\oplus G_{\lambda_2}\oplus\cdots\oplus G_{\lambda_s},
$$
且 $\dim G_{\lambda_i}=a_i$。

>**证明**  
>令 $p_i(t) = \frac{f(t)}{(t-\lambda_i)^{a_i}}$，则多项式 $p_1,\dots,p_s$ 互质。由 Bezout 恒等式，存在多项式 $q_i(t)$ 使得
>$$q_1 p_1 + q_2 p_2 + \cdots + q_s p_s = 1$$
>代入 $T$ 得
>$$I = q_1(T)p_1(T) + \cdots + q_s(T)p_s(T)$$
>对任意 $v\in V$，令 $v_i = q_i(T)p_i(T)v$，则 $v = \sum v_i$。
>
>注意到
>$$(T-\lambda_i I)^{a_i} p_i(T) = f(T) = 0 \quad (\text{Hamilton-Cayley})$$
>故 $(T-\lambda_i I)^{a_i} v_i = 0$，即 $v_i\in G_{\lambda_i}$，这说明 $V = \sum G_{\lambda_i}$。
>
>再证和为直和。若 $\sum v_i = 0$，固定 $i$，将 $p_i(T)$ 作用于两边。对 $j\neq i$，因 $p_i(t)$ 含有因子 $(t-\lambda_i)^{a_i}$，故 $p_i(T) v_j = 0$。从而 $p_i(T)v_i = 0$。但 $p_i(T)$ 在 $G_{\lambda_i}$ 上是可逆的（因其与 $(T-\lambda_i I)^{a_i}$ 互质），故 $v_i = 0$。直和得证。
>
>由维数公式，$\dim G_{\lambda_i}$ 等于代数重数 $a_i$。 $\square$

此定理将问题分解为在各个 $G_\lambda$ 上单独研究 $T$。在 $G_\lambda$ 上，
$$
T|_{G_\lambda} = \lambda I + N,
$$
其中 $N = T|_{G_\lambda} - \lambda I$ 是 **幂零变换**（因 $N^{a}=0$）。于是核心任务转化为 **幂零变换的标准形**。

## 3. 幂零变换的 Jordan 标准形

设 $N:W\to W$ 是有限维空间上的幂零变换，幂零指数为 $r$（$N^r=0,\ N^{r-1}\neq0$）。我们要证明 $W$ 可分解为循环子空间的直和，每个循环子空间对应一个幂零 Jordan 块。

### 3.1 循环子空间与 Jordan 链

**定义 3.1** 设 $0\neq v\in W$，若 $N^k v =0$ 而 $N^{k-1}v\neq0$，则
$$
C(v) = \operatorname{span}\{v,N v,\dots,N^{k-1}v\}
$$
称为由 $v$ 生成的 **$N$-循环子空间**。向量组 $(v,N v,\dots,N^{k-1}v)$ 线性无关，构成 $C(v)$ 的基，且 $N$ 在此基下的矩阵为 $k$ 阶幂零 Jordan 块
$$
J_k(0) = \begin{pmatrix}
0 & 1 & & \\
& 0 & \ddots & \\
& & \ddots & 1 \\
& & & 0
\end{pmatrix}.
$$

### 3.2 循环分解的存在性

**定理 3.1** 设 $N$ 是 $W$ 上的幂零变换，则 $W$ 可分解为若干 $N$-循环子空间的直和。

>**证明**（对 $\dim W$ 归纳）  
>若 $N=0$，结论平凡。下设 $N\neq 0$。令 $U = \operatorname{im} N$，则 $\dim U < \dim W$。将 $N$ 限制在 $U$ 上仍为幂零变换，由归纳假设，
>$$U = C(u_1)\oplus C(u_2)\oplus\cdots\oplus C(u_m)$$
>其中 $u_i\in U$，生成循环子空间的链长记为 $k_i$。对每个 $u_i$，存在 $w_i\in W$ 使得 $N w_i = u_i$。考虑 $W$ 中的向量组
>$$w_i, N w_i, \dots, N^{k_i} w_i$$
>它们满足 $N(N^{k_i}w_i) = N^{k_i}u_i = 0$。于是每个 $w_i$ 生成一个链长至多为 $k_i+1$ 的循环子空间 $C(w_i)$。
>
>考察 $\ker N$。我们有 $\ker N \cap U$ 的一组基可由各 $C(u_i)$ 的尾部 $N^{k_i-1}u_i$ 给出。将其扩充为 $\ker N$ 的一组基，需要添加向量 $z_1,\dots,z_t \in \ker N \setminus U$。这些 $z_j$ 本身生成长度为 1 的循环子空间。
>
>接下来验证
>$$W = C(w_1)\oplus\cdots\oplus C(w_m)\oplus C(z_1)\oplus\cdots\oplus C(z_t)$$
>**线性无关**：假设存在线性组合为零，将 $N$ 作用于等式可逐次降低链长，结合归纳假设及扩充基的构造可得所有系数为零。**张成整个空间**：对任意 $x\in W$，$N x\in U$ 可用 $C(u_i)$ 的基线性表式，通过拉升可调整至 $x$ 被上述基表示，细节略。 $\square$

### 3.3 唯一性与零度序列

**定理 3.2** 幂零变换 $N$ 的 Jordan 块大小与个数由零度序列 $d_i = \dim\ker N^i$（$i\ge 0$，约定 $d_0=0$）唯一决定。

>**证明** 记 $\delta_i = d_i - d_{i-1}$，表示 $\ker N^i$ 中 “新增” 的维数。一个 $k$ 阶 Jordan 块 $J_k(0)$ 对 $\ker N^i$ 的维数贡献为 $\min(i,k)$。因此，$\delta_i$ 恰好等于 **阶数 $\ge i$ 的 Jordan 块个数**。
>进而，大小为 **恰好** $i$ 的 Jordan 块个数为
>$$\boxed{\delta_i - \delta_{i+1} = (d_i - d_{i-1}) - (d_{i+1} - d_i)}$$
>由于相似变换保持零度序列不变，故 Jordan 型唯一。 $\square$

## 4. 一般变换的 Jordan 标准形

综合准素分解与幂零部分的循环分解，立即得到

**定理 4.1（Jordan 标准型定理）**  
对任意复方阵 $A\in\mathbb{C}^{n\times n}$，存在可逆矩阵 $P$ 使得
$$P^{-1}AP = \operatorname{diag}\big(J_{k_1}(\lambda_1), J_{k_2}(\lambda_2), \dots, J_{k_m}(\lambda_m)\big)$$
其中
$$
J_k(\lambda) = \lambda I_k + J_k(0) = \begin{pmatrix}
\lambda & 1 & & \\
& \lambda & \ddots & \\
& & \ddots & 1 \\
& & & \lambda
\end{pmatrix}
$$
除 Jordan 块的排列次序外，该形式唯一。

**最小多项式** 为 $m_A(x) = \prod_{\lambda}(x-\lambda)^{s_\lambda}$，其中 $s_\lambda$ 是特征值 $\lambda$ 对应的 **最大 Jordan 块的阶数**。  
**初等因子** 为各 Jordan 块对应的多项式 $(x-\lambda)^k$，它们构成矩阵相似的全系不变量。

## 5. 算法：通过零度序列确定 Jordan 块

### 5.1 算法步骤

给定 $n\times n$ 矩阵 $A$，对每个特征值 $\lambda$ 执行：

1. 计算 $N = A - \lambda I$；
2. 计算 $d_i = \dim\ker N^i$，$i=1,2,\dots$，直到 $d_m = a$（$a$ 为 $\lambda$ 的代数重数）；
3. 计算一阶差分 $\delta_i = d_i - d_{i-1}$（约定 $d_0=0$），此为 **阶数 $\ge i$ 的 Jordan 块个数**；
4. 计算二阶差分 $\tau_i = \delta_i - \delta_{i+1}$，此为 **恰好大小为 $i$ 的 Jordan 块个数**；
5. 对每个特征值汇总所有块，即得 Jordan 标准型 $J$；
6. 对每个 Jordan 块，构造一条 Jordan 链，将所有链的向量按顺序排列成可逆矩阵 $P$，使得 $P^{-1}AP = J$。

### 5.2 例题

【例】求矩阵
$$
A = \begin{pmatrix}
3 & 1 & 0 & 0 \\
-1 & 2 & 1 & 0 \\
1 & 0 & 1 & 0 \\
0 & 0 & 0 & 3
\end{pmatrix}
$$
的 Jordan 标准形 $J$ 以及可逆矩阵 $P$，使得 $P^{-1}AP = J$。


**【解】**

**Step 1：求特征值**

计算特征多项式 $\det(\lambda I - A)$：
$$
\begin{aligned}
p_A(\lambda)=\det(\lambda I - A) &= \begin{vmatrix}
\lambda-3 & -1 & 0 & 0 \\
1 & \lambda-2 & -1 & 0 \\
-1 & 0 & \lambda-1 & 0 \\
0 & 0 & 0 & \lambda-3
\end{vmatrix}\\
&= (\lambda-3)  \begin{vmatrix}
\lambda-3 & -1 & 0 \\
1 & \lambda-2 & -1 \\
-1 & 0 & \lambda-1
\end{vmatrix}\\
&= (\lambda-3) (\lambda-2)^3
\end{aligned}
$$
故，特征值为 $\lambda=2$（三重），$\lambda=3$

**Step 2：对 $\lambda=2$ 计算**

令 $$N = A - 2I = \begin{pmatrix}
1 & 1 & 0 & 0 \\
-1 & 0 & 1 & 0 \\
1 & 0 & -1 & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}$$
- $d_1 = \dim\ker N$  
  解 $Nx = 0$，即
$$
\begin{cases}
x_1 + x_2 = 0 \\
-x_1 + x_3 = 0 \\
x_1 - x_3 = 0 \\
x_4 = 0
\end{cases}
$$
  由第一式 $x_2 = -x_1$，第二、三式给出 $x_3 = x_1$，第四式 $x_4=0$。$x_1$ 自由。故
  $$
  \ker N = \operatorname{span}\{(1, -1, 1, 0)^T\},\qquad d_1 = 1.
  $$

- **$d_2 = \dim\ker N^2$**  
  计算 $N^2$：
$$
N^2 = \begin{pmatrix}
  1 & 1 & 0 & 0 \\
  -1 & 0 & 1 & 0 \\
  1 & 0 & -1 & 0 \\
  0 & 0 & 0 & 1
  \end{pmatrix}^2 = \begin{pmatrix}
  0 & 1 & 1 & 0 \\
  0 & -1 & -1 & 0 \\
  0 & 1 & 1 & 0 \\
  0 & 0 & 0 & 1
  \end{pmatrix}
$$
  解 $N^2x = 0$，即
$$
\begin{cases}
  x_2 + x_3 = 0 \\
  -x_2 - x_3 = 0 \\
  x_2 + x_3 = 0 \\
  x_4 = 0
  \end{cases}
  \implies x_2+x_3=0\ ,\ x_4=0
$$
  $x_1, x_2$ 自由（$x_3 = -x_2$），故
  $$
  \ker N^2 = \operatorname{span}\{(1,0,0,0)^T,\ (0,1,-1,0)^T\},\qquad d_2 = 2.
  $$

- **$d_3 = \dim\ker N^3$**  
  计算 $N^3 = N \cdot N^2$。利用 $N^2$ 的结构，第四行为 $(0,0,0,1)$，前三行只有前三个分量非零。计算得
  $$
  N^3 = \begin{pmatrix}
  0 & 0 & 0 & 0 \\
  0 & 0 & 0 & 0 \\
  0 & 0 & 0 & 0 \\
  0 & 0 & 0 & 1
  \end{pmatrix}.
  $$
  解 $N^3x = 0$：仅 $x_4=0$，前三个分量任意，故$$\ker N^3 = \operatorname{span}\{e_1,e_2,e_3\}\ ,\qquad d_3 = 3$$
  已达到代数重数 $3$，序列稳定。

| $i$ | $d_i$ | $\delta_i$（阶数 $\ge i$ 的Jordan块的个数） | $\tau_i$（$i$ 阶Jordan块的个数） |
| --- | ----- | ---------------------------------- | ------------------------- |
| 0   | 0     | —                                  | —                         |
| 1   | 1     | 1                                  | 1-1 = 0                   |
| 2   | 2     | 1                                  | 1-1 = 0                   |
| 3   | 3     | 1                                  | 1-0 = 1                   |
| 4   | 3     | 0                                  | —                         |

结论：$\lambda=2$ 对应 **一个** $3\times3$ 的 Jordan 块 $J_3(2)$。

**Step 4：对 $\lambda=3$ 计算**

令 $$M = A - 3I = \begin{pmatrix}
0 & 1 & 0 & 0 \\
-1 & -1 & 1 & 0 \\
1 & 0 & -2 & 0 \\
0 & 0 & 0 & 0
\end{pmatrix}$$  
解 $Mx = 0$，即
$$
\begin{cases}
x_2 = 0 \\
-x_1 - x_2 + x_3 = 0 \\
x_1 - 2x_3 = 0
\end{cases}
\implies x_2=0,\ -x_1 + x_3 = 0,\ x_1 - 2x_3 = 0.
$$
由后两式得 $x_1 = x_3$ 且 $x_1 = 2x_3$，故 $x_3=0,\ x_1=0$。$x_4$ 自由。因此
$$
\ker M = \operatorname{span}\{e_4\} = \operatorname{span}\{(0,0,0,1)^T\},\qquad d_1 = 1.
$$
已达到代数重数 $1$，序列稳定。

| $i$ | $d_i$ | $\delta_i$（阶数 $\ge i$ 的Jordan块的个数） | $\tau_i$（$i$ 阶Jordan块的个数） |
| --- | ----- | ---------------------------------- | ------------------------- |
| 0   | 0     | —                                  | —                         |
| 1   | 1     | 1                                  | 1-0=1                     |
| 2   | 1     | 0                                  | —                         |

结论：$\lambda=3$ 有一个 $1\times1$ 的 Jordan 块 $J_1(3)$。

**Step 5：写出 Jordan 标准形**

合并两个特征值的块，得
$$
J = \begin{pmatrix}
J_3(2) & 0 \\
0 & J_1(3)
\end{pmatrix}
= \begin{pmatrix}
2 & 1 & 0 & 0 \\
0 & 2 & 1 & 0 \\
0 & 0 & 2 & 0 \\
0 & 0 & 0 & 3
\end{pmatrix}.
$$

**Step 6：构造过渡矩阵 $P$**

需要找到可逆矩阵 $P = (p_1, p_2, p_3, p_4)$，满足 $AP = PJ$，即
$$
A p_1 = 2p_1,\quad A p_2 = p_1 + 2p_2,\quad A p_3 = p_2 + 2p_3,\quad A p_4 = 3p_4.
$$
这等价于构造 Jordan 链：
- $p_1$ 是 $\lambda=2$ 的特征向量，$N p_1 = 0$；
- $p_2$ 满足 $N p_2 = p_1$；
- $p_3$ 满足 $N p_3 = p_2$；
- $p_4$ 是 $\lambda=3$ 的特征向量，$M p_4 = 0$。

且要求 $p_1,p_2,p_3,p_4$ 线性无关。

**构造 $\lambda=2$ 的链**：从链首 $p_3$ 开始，选取 $p_3$ 使得 $p_3 \in \ker N^3$ 但 $p_3 \notin \ker N^2$。
由 Step 2，$\ker N^2 = \{x \mid x_2+x_3=0,\ x_4=0\}$。我们选取 $p_3$ 为不在该核中的向量，最简单的取法：
$$
p_3 = e_3 = (0,0,1,0)^T.
$$
验证：$N^2 p_3$ 为 $N^2$ 的第三列 $(1,-1,1,0)^T \neq 0$，故 $p_3\notin\ker N^2$，符合要求。

依次向前递推：
$$
p_2 = N p_3 = \begin{pmatrix}
1 & 1 & 0 & 0 \\
-1 & 0 & 1 & 0 \\
1 & 0 & -1 & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}
\begin{pmatrix} 0 \\ 0 \\ 1 \\ 0 \end{pmatrix}
= \begin{pmatrix} 0 \\ 1 \\ -1 \\ 0 \end{pmatrix}.
$$
$$
p_1 = N p_2 = N \begin{pmatrix} 0 \\ 1 \\ -1 \\ 0 \end{pmatrix}
= \begin{pmatrix}
1\cdot0 + 1\cdot1 + 0\cdot(-1) + 0 \\
-1\cdot0 + 0\cdot1 + 1\cdot(-1) + 0 \\
1\cdot0 + 0\cdot1 + (-1)\cdot(-1) + 0 \\
0
\end{pmatrix}
= \begin{pmatrix} 1 \\ -1 \\ 1 \\ 0 \end{pmatrix}.
$$
检验：$N p_1 = N(1,-1,1,0)^T = (1-1,\ -1+0+1,\ 1+0-1,\ 0)^T = (0,0,0,0)^T$，正确。

**构造 $\lambda=3$ 的特征向量**：取 $p_4 = e_4 = (0,0,0,1)^T$，满足 $M p_4 = 0$。

这些向量显然线性无关。排列成矩阵
$$
P = (p_1, p_2, p_3, p_4) = \begin{pmatrix}
1 & 0 & 0 & 0 \\
-1 & 1 & 0 & 0 \\
1 & -1 & 1 & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}.
$$

>**验证**：可计算 $AP$ 与 $PJ$ 逐列对比：
>- $A p_1 = A\begin{pmatrix}1\\-1\\1\\0\end{pmatrix} = \begin{pmatrix}3-1\\ -1-2+1\\ 1+0+1\\0\end{pmatrix} = \begin{pmatrix}2\\-2\\2\\0\end{pmatrix} = 2p_1$，
>- $A p_2 = A\begin{pmatrix}0\\1\\-1\\0\end{pmatrix} = \begin{pmatrix}1\\2-1\\0-1\\0\end{pmatrix} = \begin{pmatrix}1\\1\\-1\\0\end{pmatrix}$，而 $p_1+2p_2 = \begin{pmatrix}1\\-1\\1\\0\end{pmatrix} + \begin{pmatrix}0\\2\\-2\\0\end{pmatrix} = \begin{pmatrix}1\\1\\-1\\0\end{pmatrix}$，相等。
>- $A p_3 = A\begin{pmatrix}0\\0\\1\\0\end{pmatrix} = \begin{pmatrix}0\\1\\1\\0\end{pmatrix}$，$p_2+2p_3 = \begin{pmatrix}0\\1\\-1\\0\end{pmatrix} + \begin{pmatrix}0\\0\\2\\0\end{pmatrix} = \begin{pmatrix}0\\1\\1\\0\end{pmatrix}$，相等。
>- $A p_4 = \begin{pmatrix}0\\0\\0\\3\end{pmatrix} = 3p_4$。

故 $AP = PJ$，从而 $P^{-1}AP = J$。因此过渡矩阵为 $P$，Jordan 标准型为 $J$。

对于更复杂的矩阵，块较多时需为每个块独立构造链，并确保所有链向量线性无关。

---
## 6. 应用：常系数线性微分方程组

Jordan 标准形的核心应用之一就是求解 $\dot{\mathbf{x}} = A\mathbf{x}$。其通解为 $\mathbf{x}(t) = e^{At}\mathbf{x}(0)$，而 $e^{At}$ 可通过 Jordan 标准形轻易计算。

### 6.1 矩阵指数的 Jordan 块公式

对于 $k$ 阶 Jordan 块 $J = \lambda I + N$，其中 $N$ 为幂零移位矩阵，有 $N^k = 0$。于是
$$e^{tJ} = e^{\lambda t I} e^{tN} = e^{\lambda t} \sum_{j=0}^{k-1} \frac{t^j}{j!} N^j$$
显式写为
$$
e^{tJ_k(\lambda)} = e^{\lambda t}
\begin{pmatrix}
1 & t & \frac{t^2}{2!} & \cdots & \frac{t^{k-1}}{(k-1)!} \\
& 1 & t & \ddots & \vdots \\
& & \ddots & \ddots & \frac{t^2}{2!} \\
& & & 1 & t \\
& & & & 1
\end{pmatrix}.
$$

若 $A = P J P^{-1}$，则 $e^{At} = P\, e^{Jt}\, P^{-1}$。通解中会出现形如 $t^m e^{\lambda t}$ 的项，其来源正是广义特征向量链。

### 6.2 一个完整的计算实例

【例】求解微分方程组 $\dot{\mathbf{x}} = A\mathbf{x}$，其中
$$
A = \begin{pmatrix}
3 & 1 & -1 \\
-1 & 2 & 1 \\
0 & 1 & 2
\end{pmatrix}
$$

【解答】

**Step 1：求特征值**

计算特征多项式 
$$
\begin{aligned}
p_A(\lambda)=\det(\lambda I - A) &= \begin{vmatrix}
\lambda-3 & -1 & 1 \\
1 & \lambda-2 & -1 \\
0 & -1 & \lambda-2
\end{vmatrix} \\
&= (\lambda-3)(\lambda-2)^2
\end{aligned}
$$
特征值为 $\lambda=2$（二重），$\lambda=3$

**Step 2：求 Jordan 标准形**

**对于 $\lambda=2$：**  
令 $$N = A - 2I = \begin{pmatrix} 1 & 1 & -1 \\ -1 & 0 & 1 \\ 0 & 1 & 0 \end{pmatrix}$$
- **$d_1 = \dim\ker N$**  
  解 $Nx=0$，即
  $$
  \begin{cases}
  x_1 + x_2 - x_3 = 0 \\
  -x_1 + x_3 = 0 \\
  x_2 = 0
  \end{cases}
  $$
  由第三式 $x_2=0$，代入第一式得 $x_1 - x_3 = 0$，第二式也给出 $x_1 = x_3$。故 $x_1$ 自由，$x_2=0$，$x_3=x_1$。因此  $\ker N = \operatorname{span}\{(1,0,1)^T\}$，$d_1 = 1$.

- **$d_2 = \dim\ker N^2$**  
  计算 $N^2$：
$$N^2 = \begin{pmatrix} 0 & 0 & 0 \\ -1 & 0 & 1 \\ -1 & 0 & 1 \end{pmatrix}$$
  解 $N^2x=0$，即$$\begin{cases}
- x_1 + x_3 = 0  \\
- x_1 + x_3 = 0 
\end{cases}$$
仅此一个方程 $x_3 = x_1$，$x_2$ 任意。所以自由变量为 $x_1$ 和 $x_2$。因此
$$
\ker N^2 = \operatorname{span}\{(1,0,1)^T,\ (0,1,0)^T\},\qquad d_2 = 2.
$$
与代数重数2一致，稳定。

| $i$ | $d_i$ | $\delta_i = d_i-d_{i-1}$（阶数 $\ge i$ 的Jordan块的个数） | $\tau_i = \delta_i-\delta_{i+1}$（ $i$ 阶的Jordan块的个数） |
| --- | ----- | ------------------------------------------------ | --------------------------------------------------- |
| 0   | 0     | —                                                | —                                                   |
| 1   | 1     | 1                                                | 1-1 = 0                                             |
| 2   | 2     | 1                                                | 1-0 = 1                                             |
| 3   | 2     | 0                                                | —                                                   |

结论：$\lambda=2$ 对应一个 $2\times2$ 的 Jordan 块 $J_2(2)$。

**对于 $\lambda=3$：**  
代数重数为 $1$，直接得 $J_1(3)$。

因此 Jordan 标准形为
$$
J = \begin{pmatrix}
2 & 1 & 0 \\
0 & 2 & 0 \\
0 & 0 & 3
\end{pmatrix}
$$


**Step 3：构造过渡矩阵 $P$ 使 $P^{-1}AP = J$**

- **$\lambda=2$ 的 Jordan 链**：需要 $p_1,p_2$ 满足 $N p_1 = 0$，$N p_2 = p_1$。  
  选取 $p_2$ 使得 $p_2 \in \ker N^2$ 但 $p_2 \notin \ker N$。由核的基可知，$\ker N = \{(x_1,0,x_1)^T\}$，$\ker N^2$ 中的 $(0,1,0)^T$ 不在 $\ker N$ 中。取$$p_2 = (0,1,0)^T$$
  则$$p_1 = N p_2 = \begin{pmatrix} 1 & 1 & -1 \\ -1 & 0 & 1 \\ 0 & 1 & 0 \end{pmatrix} \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix}$$
>  验证 $N p_1 = N(1,0,1)^T = (1+0-1,\ -1+0+1,\ 0+0+0)^T = (0,0,0)^T$，正确。

- **$\lambda=3$ 的特征向量**：解 $(A-3I)x = 0$，其中 $A-3I = \begin{pmatrix} 0 & 1 & -1 \\ -1 & -1 & 1 \\ 0 & 1 & -1 \end{pmatrix}$。方程：
  $$
  \begin{cases}
  x_2 - x_3 = 0 \\
  -x_1 - x_2 + x_3 = 0 \\
  x_2 - x_3 = 0
  \end{cases}
  \implies x_2=x_3,\ -x_1 = 0 \implies x_1=0.
  $$
  取 $x_2=1$，得 $p_3 = (0,1,1)^T$。

合并三列得过渡矩阵
$$
P = (p_1, p_2, p_3) = \begin{pmatrix}
1 & 0 & 0 \\
0 & 1 & 1 \\
1 & 0 & 1
\end{pmatrix}.
$$


**Step 4：计算矩阵指数 $e^{At}$**

利用 $e^{At} = P e^{Jt} P^{-1}$。先求 $e^{Jt}$：
$$
e^{Jt} = \begin{pmatrix}
e^{2t} & t e^{2t} & 0 \\
0 & e^{2t} & 0 \\
0 & 0 & e^{3t}
\end{pmatrix}
$$
求 $P^{-1}$：$P = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 1 \\ 1 & 0 & 1 \end{pmatrix}$，计算逆矩阵
$$
P^{-1} = \begin{pmatrix}
1 & 0 & 0 \\
1 & 1 & -1 \\
-1 & 0 & 1
\end{pmatrix}
$$

于是
$$
\begin{aligned}
e^{At} &= P e^{Jt} P^{-1} \\
&= \begin{pmatrix}
1 & 0 & 0 \\
0 & 1 & 1 \\
1 & 0 & 1
\end{pmatrix}
\begin{pmatrix}
e^{2t} & t e^{2t} & 0 \\
0 & e^{2t} & 0 \\
0 & 0 & e^{3t}
\end{pmatrix}
\begin{pmatrix}
1 & 0 & 0 \\
1 & 1 & -1 \\
-1 & 0 & 1
\end{pmatrix}\\
&= \begin{pmatrix}
1 & 0 & 0 \\
0 & 1 & 1 \\
1 & 0 & 1
\end{pmatrix}
\begin{pmatrix}
e^{2t} + t e^{2t} & t e^{2t} & -t e^{2t} \\
e^{2t} & e^{2t} & -e^{2t} \\
-e^{3t} & 0 & e^{3t}
\end{pmatrix} \\
&= \begin{pmatrix}
e^{2t} + t e^{2t} & t e^{2t} & -t e^{2t} \\
e^{2t} - e^{3t} & e^{2t} & -e^{2t} + e^{3t} \\
e^{2t} + t e^{2t} - e^{3t} & t e^{2t} & -t e^{2t} + e^{3t}
\end{pmatrix}
\end{aligned}
$$


**Step 5：通解**

基于已求得的矩阵指数 $e^{At}$，微分方程 $\dot{\mathbf{x}} = A\mathbf{x}$ 的通解为 $\mathbf{x}(t) = e^{At}\,\mathbf{c}$，其中 $\mathbf{c} = (c_1, c_2, c_3)^T$ 为任意常数向量。将上面得到的 $e^{At}$ 代入，通解可显式写为

$$
\begin{aligned}
x_1(t) &= \bigl(1+t\bigr)e^{2t}\,c_1 + t e^{2t}\,c_2 - t e^{2t}\,c_3, \\
x_2(t) &= (e^{2t} - e^{3t})\,c_1 + e^{2t}\,c_2 + (-e^{2t} + e^{3t})\,c_3, \\
x_3(t) &= \bigl((1+t)e^{2t} - e^{3t}\bigr)\,c_1 + t e^{2t}\,c_2 + (-t e^{2t} + e^{3t})\,c_3.
\end{aligned}
$$

若给定初始条件 $\mathbf{x}(0) = (x_1^0, x_2^0, x_3^0)^T$，则常数向量 $\mathbf{c} = \mathbf{x}(0)$，解由上式直接给出。从通解形式可以看到，系统的时间演化由指数函数 $e^{2t}$、$e^{3t}$ 以及由广义特征向量产生的 $t e^{2t}$ 项共同决定。

此例完整展示了当 $A$ 不是 Jordan 标准形时的标准流程：**特征多项式 → 零度序列与差分 → 确定 Jordan 块 → 构造过渡矩阵 $P$ → 计算 $e^{Jt}$ → 合成 $e^{At}$**。解中同时出现 $e^{2t}$、$t e^{2t}$ 和 $e^{3t}$，反映了矩阵的非对角结构与广义特征向量的作用。

### 6.3 一般系统的解法总结

1. 求 $A$ 的特征值，对每个特征值计算 $(A-\lambda I)^i$ 的零度序列，确定 Jordan 块。
2. 构造过渡矩阵 $P$（求出所有 Jordan 链作为列向量）。
3. 计算 $e^{Jt}$ 得到分块对角矩阵指数。
4. 计算 $e^{At} = P e^{Jt} P^{-1}$。
5. 通解 $\mathbf{x}(t) = e^{At}\,\mathbf{c}$，或指定初值定出常数。

## 7. 总结

本文从线性变换的最简表示问题出发，系统构建了 Jordan 标准形的完整理论，其核心推导遵循三层递进结构：首先通过准素分解将空间分解为广义特征空间的直和，把一般线性变换的研究约化为单个特征值上 $\lambda I + N$ 的形式，其中 $N$ 为幂零变换；接着对幂零部分 $N$ 进行循环分解，利用核与像的拉升关系将空间进一步分解为循环子空间的直和，每个循环子空间对应一个幂零 Jordan 块 $J_k(0)$ ；最后在每个广义特征空间上合成 $T = \lambda I + N$，得到一般 Jordan 块 $J_k(\lambda) = \lambda I_k + J_k(0)$，合并后即得完整的 Jordan 标准形。该标准形的唯一性由零度序列$d_i = \dim\ker(A-\lambda I)^i$的二阶差分完全刻画——大小为$i$的 Jordan 块个数等于 $(d_i - d_{i-1}) - (d_{i+1} - d_i)$，这使得Jordan块的确定完全机械化，无需预求特征向量；最小多项式由最大 Jordan 块阶数给出，初等因子集则构成相似全系不变量。

在应用上，Jordan 标准形是处理非对角矩阵的根本工具：通过 $e^{At} = P e^{Jt} P^{-1}$，常系数线性微分方程组的解可表示为有限项级数，自然出现 $t^m e^{\lambda t}$ 项，揭示广义特征向量产生的多项式增长模式；控制论中系统的能控性、能观性与动态响应直接由Jordan结构决定；矩阵函数 $f(A)$ 可借由 Jordan 标准形统一计算，为数值分析提供基础；马尔可夫链转移矩阵的 Jordan 标准形则揭示了长期分布与收敛速率。Jordan 标准形从代数的空间分解出发，以精巧的循环结构揭示了线性算子的最简形式，其思想跨越纯数学与应用数学，成为分析非正规线性系统的核心武器。