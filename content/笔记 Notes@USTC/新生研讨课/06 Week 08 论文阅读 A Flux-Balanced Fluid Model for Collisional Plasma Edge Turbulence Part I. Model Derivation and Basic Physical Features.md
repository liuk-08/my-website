---
zhihu-title: 新生研讨课研究06：论文阅读 中
zhihu-topics: physics，plasma，HW model，numerical simulation
创建日期:
zhihu-cover:
zhihu-toc: "1"
zhihu-created-at: 2026-04-17 22:33
zhihu-updated-at: 2026-05-21 16:12
zhihu-link: https://zhuanlan.zhihu.com/p/2028602009968723390
---
继续上次论文阅读
[新生研讨课研究04：论文阅读 上 - 知乎](https://zhuanlan.zhihu.com/p/2025350873795019436 "card")

## C. Hasegawa-Wakatani Models

## C. 长谷川-若谷模型

Hasegawa-Mima模型在方程中包含强迫项时，能够捕捉漂移波-带状流动力学的基本特征，但在没有强迫的情况下，不包含任何内在的漂移不稳定性来驱动漂移波-带状流反馈回路。Hasegawa-Wakatani模型通过引入电子-离子摩擦来解决这一局限性，该摩擦松弛了电子密度与静电势之间的从属关系，从而导致了漂移波不稳定性。由于密度和电势之间的一一对应关系被打破，HW模型成为针对离子相对涡度和离子密度涨落的双场模型。与HM模型类似，可以区分原始HW模型（oHW）和改进的HW模型（mHW），两者在处理平行电流的方式上有所不同。mHW模型考虑了纬向模（波数 $k_y​=0$）对平行电流没有贡献，而oHW模型则没有考虑这一点。与HM模型类似，我们可以将两个HW模型写成统一形式，其中开关参数 $j$ 满足：$j=0$ 对应oHW模型，$j=1$ 对应mHW模型：

$$
\begin{aligned}
\frac{\partial\zeta}{\partial t}+J(\varphi,\zeta)&=\alpha\left[(\tilde{\varphi}-\tilde{n})+\delta_{j0}(\bar{\varphi}-\bar{n})\right]+\mu\nabla^2 \zeta\\

\frac{\partial n}{\partial t}+J(\varphi,n)+\kappa\frac{\partial \tilde{\varphi}}{\partial y}&=\alpha\left[(\tilde{\varphi}-\tilde{n})+\delta_{j0}(\bar{\varphi}-\bar{n})\right]
\end{aligned}
$$
式中，$ζ=\nabla^2 φ$是离子相对涡度，$n=\dfrac{n_1}{​n_0}$ ​是相对密度涨落，其中 $N=n_0​+n_1$ ​是总离子密度，并且所有量都已按照与HM模型相同的方式进行了归一化。项 $μ\nabla^2\zeta$ 是垂直于磁场的碰撞离子粘性的近似模型，其中 $μ=\tilde{\mu}/(\rho_s^2​\omega_{ci}​)$ ，$\tilde{\mu}​=3T_{i}​\nu_{ii}​/(10m_i​ω_{ci}^2​)$ 是运动离子粘性系数，$T_i$ ​是离子温度，$\nu_{ii}$ ​是离子-离子碰撞频率，$m_i$ ​是离子质量。需要指出的是，严格来说，上述两个方程方程并非mHW模型，因为mHW模型与oHW模型具有不同的耗散项。具体来说，在mHW模型中，离子相对涡度的耗散写作 $D\nabla^4ζ$ ，离子密度的耗散写作 $D\nabla^4n$，其中 $D$ 在两个方程中是相同的未指定常数。我们不在此进一步详述此区别，因为这些项在文献[21]中并未给出任何物理论据，似乎只是为了保证数值稳定性而包含在内。

（未完待续）