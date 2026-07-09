---
zhihu-title: 新生研讨课研究07：论文阅读 中（续）
zhihu-toc: "1"
zhihu-link: https://zhuanlan.zhihu.com/p/2040874043889407825
zhihu-topics: physics，plasma，HW model，numerical simulation
zhihu-created-at: 2026-05-21 19:18
zhihu-updated-at: 2026-05-27 19:31
创建日期: 2026-05-21
---
继续上一篇
[新生研讨课研究06：论文阅读 中 - 知乎](https://zhuanlan.zhihu.com/p/2028602009968723390 “card”)
绝热参数 $\alpha=\dfrac{T_ek_z^2}{n_0e^2\eta\omega_{ci}}$ ，其中 $\eta$ 是平行于磁场线的电阻率，在无碰撞极限下，$\alpha\to\infty$ ，电子沿磁场线有绝热响应，而小$\alpha$的电子-离子摩擦使密度与静电势解耦。为了在渐近无碰撞极限下与HM模型建立数学联系 $α→∞$ 和 $µ→ 0$ ，我们可以通过假设oHW和mHW模型都仅包含粘性耗散 $µ\nabla^2ζ$ 作为耗散机制（这些耗散项最终将无关紧要，因为我们取极限 $µ→ 0$）
$$

\dfrac{\partial q}{\partial t}+J(\varphi,q)-\kappa\dfrac{\partial \tilde{\varphi}}{\partial y}=\mu \nabla^2\zeta
$$
$$
q=\nabla^2\varphi-n
$$
在无碰撞极限下 $µ → 0$，与HM模型的等效方程具有相同的形式，其中HM势涡度$∇^2ϕ− (\tilde{\varphi} +δ_{j0}\bar\varphi)$ 被HW势涡度 $q=∇^2\varphi−n$ 所取代。在无碰撞极限下， $α→∞$，mHW模型的方程给出 $n = \varphi$ ，因此oHW势涡度变为 $q =∇^2\varphi− \varphi$ ，从而oHW模型如预期般与oHM模型重合。

然而，在mHW模型中， $α → ∞$ 导致 $\tilde n = \tilde \varphi$，从而使 n 未被指定。位势涡度趋于 $q → ∇^2\varphi− \tilde\varphi-\bar n$，并且在零电阻极限下，mHW方程一般并不与mHM模型一致。在本文的后续部分，将再次回到这一重要结论，我们的数值模拟也证实了这一点，因为这是mHW模型与在下一节中引入的新bHW模型之间的一个关键区别。即使mHW模型在无碰撞极限下并未收敛到mHM模型，但已证明，与oHW模型相比，对平行电流的改进处理使得mHW模型产生了比oHW模型更强的带状平均结构，正如mHM模型相对于oHM模型所具有的优势一样。

附录A包含对HW模型中电阻漂移波的线性稳定性的详细讨论。在这一点上，足以说明可以采用平面波表示的小扰动 $\varphi = \hat \varphi \exp (i (\vec k· \vec x− ωt))$, $n = \hat n \exp (i (\vec k· \vec x− ωt))$，背景平均流为零且 $µ = 0$，我们发现 $ω$ 的虚部为
$$
\omega_i=-\dfrac{b}2\pm\dfrac b 2(1+16\gamma^2)^{1/4}\sin\frac{\theta}2
$$
其中
$$
\theta=\arg(-1+4i\gamma)
$$
$$
\gamma=\dfrac{\omega_*}{b}
$$
$$
b(k)=\alpha(1+k^{-2})
$$
因此，对于 $α \ne0$，$κ \ne 0$，所有模式均不稳定，且小尺度模式的增长率较小， $k\gg 1$。

# Ⅲ.  A GENERALIZED FLUX-BALANCED HASEGAWA-WAKATANI MODEL

新的bHW模型解决了mHW模型的一个主要缺陷，即在无碰撞极限下，无法收敛到mHM模型。在这个新模型中，还考虑了广义耗散效应，这使得能够单独研究不同耗散项的作用——这些耗散项通常只是为了数值稳定性而引入，其简单的形式很少有物理上的合理依据。

## A. The flux-balanced Hasegawa-Wakatani model

**耗散项**
从mHW模型出发，放宽离子相对涡度和密度涨落的粘性系数是相同的临时假设。此外，我们还加入了原Hasegawa-Wakatani文章中考虑的朗道阻尼项，当漂移波频率 $ω_∗$ 与 $k_zv_{T_i}$  相当时，其中 $v_{T_i}$ 是离子热速度 。方程变为
$$
\begin{aligned}
&\frac{\partial \zeta}{\partial t}+J(\varphi,\zeta)  &=\alpha(\tilde\varphi-\tilde n)+\mu \nabla^2\zeta+C\varphi\\
&\frac{\partial n}{\partial t}+J(\varphi,n)+\kappa\frac{\partial \tilde\varphi}{\partial y} &=\alpha(\tilde\varphi-\tilde n)+D\nabla^2n\\
\end{aligned}
$$
这里， $µ\nabla^2ζ$ 与mHW中的离子碰撞粘性项相同，而 $D\nabla^2n$ 可被视为由于电子垂直于磁场的碰撞扩散所引起的耗散项。最后， $C\varphi$，其中 $C = ω_∗T_i/(ω_{ci}T_e)$，是引入的离子朗道阻尼的简单模型。值得注意的是，Hasegawa和Wakatani建议对该项设置一个截止值，当 $ω_∗$ 较大时，他们将其设为零。为简化起见，我们并未施加这样的截止，注意到因为对于较大的 $k$，以及较小的 $k_y$， $ω_∗$ 本身都很小，因此只有当 $k_x$ 较小时且 $k_y$ 适中时，不施加截止的影响才会明显显现。此外，即使在 $k_x$ 较小时且 $k_y$ 适中时， $ω_∗$ 可能大于 $k_zv_{Ti}$ ，但此时离子粘性项 $µ\nabla^2ζ$ 仍很可能占据主导地位，因为它包含一个与 $k^4_y$ 成正比的项。

正如在第Ⅴ节中将根据数值结果以及附录A中的线性稳定性分析更详细地讨论那样，我们发现，新模型所建模的朗道阻尼对最大尺度具有稳定作用，同时又增加了小尺度涨落的变异性。

现在，转向在bHW模型中对mHW模型所做的关键修改。正如我们在第Ⅱ节中所做的那样，两式相减，带有绝热参数的项就会相互抵消，从而得到mHW模型中的位势涡度 $q^m≡ ζ− n = \nabla^2\varphi− n$ 及其方程
$$
\frac{\partial q}{\partial t}+J(\varphi,q)-\kappa\frac{\partial \tilde\varphi}{\partial y}=[(\mu-D)\nabla^4+C]\varphi+D\nabla^2q
$$
正如第Ⅱ节所讨论的，上述方程的问题在于，在极限 $µ,D,C → 0$ 以及 $α → ∞$下，由于势涡度中包含了非零的纬向平均态 $\bar n$，该方程违背了mHM意义下磁面上电子响应的平衡条件。我们提出对mHW模型进行一个简单的修正，即用修正后的形式 $q^b = ζ− \tilde n$ 取代原有的势涡度 $q^m$。由此得到的新势涡度 $q^b$ 的通量平衡方程不再显式依赖于纬向平均密度 $\bar n$。这一修正带来的直接且预期的效果是：在无碰撞极限下， $α→∞$ 将给出方程中的从属关系 $\tilde n→ \tilde \varphi$，而新势涡度 $q^b$ 将收敛到mHM意义下的势涡度 $q→∇^2\varphi− \tilde\varphi$ ，这与mHW意义下的势涡度有所不同。因此，在绝热极限下，且在不考虑耗散项的情况下，当以 $q^b$ 表示时，方程与mHM模型的方程完全一致。

下面介绍对于平衡位势涡度 $q =∇^2\varphi− \tilde n$ 以及相对粒子密度 $n = \bar n + \tilde n$的广义通量平衡的Hasegawa-Wakatani方程（bHW）
$$
\begin{aligned}
&\frac{\partial q}{\partial t}+J(\varphi,n)-\kappa\frac{\partial\tilde\varphi}{\partial y}&=[(\mu-D)\nabla^4+C]\varphi&+ D\nabla^2q\,,\,\,\,\,\, q=\nabla^2\varphi-\tilde{n}
\\
&\frac{\partial n}{\partial t}+J(\varphi,n)+\kappa\frac{\partial \tilde\varphi}{\partial y} &=\alpha(\tilde\varphi-\tilde{n})&+D\nabla^2n
\end{aligned}
$$
此势涡度方程的形式与mHM模型中的涡度方程类似，但与mMH模型不同的是，它通过与密度涨落 $\tilde n$ 的耦合，包含了电阻漂移不稳定性。相对粒子密度涨落的方程与mHW方程相同，只是多了一项耗散项 $D\nabla^2n$。

## B. Comparison with the modified Hasegawa-Wakatani model

![[Pasted image 20260521180039.png]]
![[Pasted image 20260521180053.png]]

下表总结了bHW模型与mHW模型之间的异同，包括总能量 $E$ 和涡量 $W$ 的表达式，将在下一节中讨论这些内容。再次强调，为了在两个模型之间建立恰当的类比，对mHW模型中原先提出的临时耗散项的形式进行了修改，以使两个模型的密度方程中的耗散项保持一致。
![[Pasted image 20260521180226.png]]

## C. Conservation laws for the flux-balanced Hasegawa-Wakatani model
对于新模型基本性质的分析以及数值代码的验证，确定动力学不变量总是具有重要意义。下面讨论bHW模型中的守恒定律，首先为bHW模型定义总能量 $E$ 和势涡度 $W$ 为
$$
E=\bar E+\tilde E=\frac12\int_{\Omega}(|\bar{\varphi_x}|^2+\bar n ^2) \mathrm d V+\frac12\int_\Omega(|\nabla\tilde\varphi|^2+\tilde n^2)\mathrm d V
$$
$$
W=\bar W+\tilde{W}=\frac12\int_{\Omega}\bar q^2\mathrm d V+\frac12\int_\Omega\tilde q^2\mathrm dV
$$
其中积分区域为计算区域 Ω，该区域是一个边长为 Lx 和 Ly 的周期性方盒；我们已将带状平均态的能量$\bar E$和涡度$\bar W$，与 $\tilde q = ∂^2\varphi/∂x^2$，以及围绕带状平均态的波动的能量和涡度 $\tilde E$ , $\tilde W$ 分开处理，其中 $\tilde q= \nabla^2 \tilde \varphi− \tilde n$。注意到，bHW模型中的涡度 W 是以平衡位势涡度 $q =∇^2\varphi− \tilde n$ 定义的。容易验证，方程中的非线性项 $J (\varphi,q)$ 和 $J (\varphi,n)$ 同时满足能量守恒和平衡涡度守恒，由此我们得到以下总能量和势涡度的动力学方程

$$
\begin{aligned}
&\frac{\mathrm dE}{\mathrm dt}=\kappa\int_\Omega\bar{\tilde{u}\tilde{n}}(1+\kappa^{-1}\bar{v})\mathrm dV-\alpha
\int_\Omega(\tilde n-\tilde \varphi)^2\mathrm dV-D_E\\
&\frac{\mathrm dW}{\mathrm dt}=\kappa\int_\Omega\bar{\tilde{u}\tilde{n}}\mathrm dV-D_W
\end{aligned}
$$
其中 $\bar v=\frac{\partial \bar\varphi}{\partial x}$，$D_E$，$D_W$ 来自bHW方程中的耗散项
![[Pasted image 20260521191732.png]]

