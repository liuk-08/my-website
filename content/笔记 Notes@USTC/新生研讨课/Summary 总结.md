---
zhihu-title: 【科学与社会研讨课科研工作总结】从等离子体物理基础到bHW漂移波湍流模型研究
zhihu-link: https://zhuanlan.zhihu.com/p/2055014402718544485
zhihu-topics: physics，plasma，HW model，numerical simulation
zhihu-toc: "1"
zhihu-updated-at:
zhihu-created-at: 2026-06-29 19:46
---
# 科学与社会研讨课科研工作总结报告：从等离子体物理基础到bHW漂移波湍流模型研究

**【写在开头】**
这门课是中国科学技术大学少年班学院大一的课程，主要是对于科研方法的教学，笔者也算是粗略地了解了怎么做科研（如何选题、如何读文献、如何研究、如何写作），花了接近一年的时间粗略地针对等离子物理的一小部分内容做了一定的研究，这篇文章是对我这一年的一些研究的总结，主要还是记录我的学习过程，科研性极低，成果非常有限，不适合当作研究成果来阅读。。。

## 摘要

本报告系统总结了我自2025年秋季学期至今（2026年6月）在等离子体物理领域的完整科研工作。研究围绕磁约束核聚变边缘等离子体中的漂移波湍流问题展开，经历了从**磁流体动力学（MHD）基础理论**、**等离子体粒子模拟方法**、**经典Hasegawa-Wakatani（HW）模型线性稳定性分析**、**通量平衡HW（bHW）模型理论框架掌握**，到**非线性数值模拟实施**的完整过程。期间完成了两篇阶段性论文和一份详细的研究进展报告，并完成了第三篇关于bHW模型数值模拟的论文。本报告详细记录了每个阶段的研究内容、关键公式推导、数值方法实现、结果分析以及时间节点，为后续的总结报告和答辩PPT提供全面的素材。

---

## 第一章 研究背景与选题历程（2025年9月 – 2025年12月）

### 1.1 初始探索阶段

在进入课题组之初，我对多个物理学前沿领域进行了广泛的文献调研，包括：

- **极光物理**：研究太阳风与地球磁层相互作用产生极光的机制，涉及磁重联和粒子加速过程。我阅读了关于极光椭圆带、场向电流和阿尔文波加速的相关文献，了解了极光发生的物理图像。
- **引力波探测**：LIGO/Virgo合作组的引力波事件分析，包括双黑洞合并和双中子星合并的信号特征。我学习了引力波的基本理论、干涉仪原理以及数据处理方法。
- **宇宙学与暗物质**：ΛCDM模型及暗物质候选粒子（如WIMP、轴子）的探测现状。我了解了宇宙微波背景辐射、大尺度结构形成以及直接/间接探测实验。
- **等离子体物理**：磁约束核聚变中的湍流与输运，以及空间等离子体中的波动现象。这一方向引起了我的浓厚兴趣。

经过与导师的多次讨论以及对自身兴趣的评估，我最终确定以**等离子体物理**为主要研究方向，具体聚焦于**磁约束核聚变边缘等离子体中的漂移波湍流**。这一选择基于以下考量：

1. 等离子体物理是当代物理学中兼具基础性与应用性的重要分支，涉及聚变能源、空间天气、天体物理等多个前沿领域。
2. 漂移波湍流问题是制约托卡马克装置约束性能的关键瓶颈，具有重要的实际意义。
3. 该领域有丰富的简化模型可供初学者切入，适合本科阶段的科研训练。
4. 等离子体物理与MHD、粒子模拟等方法紧密结合，有助于培养跨学科研究能力。

### 1.2 磁流体动力学（MHD）基础理论（2025年10月 – 2025年11月）

在确定等离子体物理方向后，我首先系统学习了磁流体动力学（MHD）的基础理论。MHD是描述导电流体（等离子体）在磁场中运动的基本理论框架，由Hannes Alfvén于1942年创立，他因此获得了1970年诺贝尔物理学奖。MHD将流体力学和麦克斯韦方程组结合起来，适用于等离子体在宏观尺度上的行为描述，是理解聚变等离子体和空间等离子体的基石。

#### 1.2.1 MHD基本方程组

MHD方程组由以下几个部分组成：

**（1）连续性方程（质量守恒）**
$$
\frac{\partial \rho}{\partial t} + \nabla \cdot (\rho \mathbf{v}) = 0
$$
其中 $\rho$ 是质量密度，$\mathbf{v}$ 是流体速度。

**（2）运动方程（动量守恒）**
$$
\rho \frac{d\mathbf{v}}{dt} = -\nabla p + \mathbf{J} \times \mathbf{B} + \rho \mathbf{g} + \mu \nabla^2 \mathbf{v}
$$
其中 $p$ 是热压力，$\mathbf{J}$ 是电流密度，$\mathbf{B}$ 是磁场，$\mathbf{g}$ 是重力加速度，$\mu$ 是粘滞系数。$\mathbf{J} \times \mathbf{B}$ 项是洛伦兹力，它是MHD中特有的电磁作用力。

**（3）感应方程（法拉第定律与欧姆定律结合）**
$$
\frac{\partial \mathbf{B}}{\partial t} = \nabla \times (\mathbf{v} \times \mathbf{B}) + \eta \nabla^2 \mathbf{B}
$$
其中 $\eta = 1/(\mu_0 \sigma)$ 是磁扩散率，$\sigma$ 是电导率。第一项代表磁场被流体冻结并随流体运动，第二项代表磁场的扩散。磁雷诺数 $R_m = \frac{|\nabla \times (\mathbf{v} \times \mathbf{B})|}{|\eta \nabla^2 \mathbf{B}|} \sim \frac{v L}{\eta}$ 决定了磁场行为的性质：$R_m \gg 1$ 时磁场冻结在流体中，$R_m \ll 1$ 时磁场扩散占优。

**（4）状态方程**
$$
\frac{d}{dt}(p \rho^{-\gamma}) = 0
$$
其中 $\gamma = c_p/c_v$ 是绝热指数，对于等离子体通常取5/3。

**（5）安培定律（忽略位移电流）**
$$
\mathbf{J} = \frac{1}{\mu_0} \nabla \times \mathbf{B}
$$

**（6）高斯定律（无磁单极）**
$$
\nabla \cdot \mathbf{B} = 0
$$

#### 1.2.2 MHD波模

通过对MHD方程组进行线性化，可以得到三种基本的波模：

**（1）阿尔芬波（Alfvén Wave）**

阿尔芬波是沿磁场方向传播的横波，其恢复力来自磁张力。色散关系为：
$$
\omega = k_\parallel v_A, \quad v_A = \frac{B_0}{\sqrt{\mu_0 \rho_0}}
$$
其中 $v_A$ 是阿尔芬速度。阿尔芬波在太阳风、地球磁层和托卡马克等离子体中普遍存在，是传递能量和动量的重要载体。

**（2）快磁声波（Fast Magnetosonic Wave）**

快磁声波既可以沿磁场方向也可以垂直磁场方向传播，其恢复力来自磁压力和热压力的共同作用。色散关系为：
$$
\omega^2 = \frac{k^2}{2} \left[ (v_A^2 + c_s^2) + \sqrt{(v_A^2 + c_s^2)^2 - 4 v_A^2 c_s^2 \cos^2 \theta} \right]
$$
其中 $c_s = \sqrt{\gamma p_0 / \rho_0}$ 是声速，$\theta$ 是波矢与磁场的夹角。

**（3）慢磁声波（Slow Magnetosonic Wave）**

慢磁声波的传播速度介于阿尔芬波和快磁声波之间，其色散关系为：
$$
\omega^2 = \frac{k^2}{2} \left[ (v_A^2 + c_s^2) - \sqrt{(v_A^2 + c_s^2)^2 - 4 v_A^2 c_s^2 \cos^2 \theta} \right]
$$

#### 1.2.3 磁重联机制

磁重联是等离子体物理中最重要的非线性过程之一，它通过改变磁场的拓扑结构，将磁能转化为等离子体的动能和热能。磁重联被认为是太阳耀斑、日冕物质抛射以及托卡马克等离子体中锯齿振荡等现象的驱动机制。

Sweet-Parker模型给出了稳态磁重联的基本标度律：
$$
v_{\text{in}} = \frac{v_A}{\sqrt{S}}, \quad \delta = \frac{L}{\sqrt{S}}
$$
其中 $v_{\text{in}}$ 是入流速度，$\delta$ 是扩散区厚度，$L$ 是扩散区长度，$S = \mu_0 L v_A / \eta$ 是 Lundquist 数。对于高 $S$ 等离子体，Sweet-Parker 模型预测的重联率太低，无法解释观测到的快速重联现象。后来发展的 Petschek 模型引入了慢激波，实现了更快的重联率。

#### 1.2.4 太阳风-地球磁层相互作用

我深入研究了太阳风与地球磁层的相互作用，主要物理过程包括：

**（1）弓形激波（Bow Shock）**

超音速太阳风（速度约400 km/s，马赫数约8）遇到地球磁层时，会形成一个弓形激波。激波前后满足 Rankine-Hugoniot 跳跃条件：
$$
\rho_1 v_1 = \rho_2 v_2
$$
$$
p_1 + \rho_1 v_1^2 + \frac{B_1^2}{2\mu_0} = p_2 + \rho_2 v_2^2 + \frac{B_2^2}{2\mu_0}
$$
$$
\frac{1}{2} v_1^2 + \frac{\gamma}{\gamma-1} \frac{p_1}{\rho_1} + \frac{B_1^2}{\mu_0 \rho_1} = \frac{1}{2} v_2^2 + \frac{\gamma}{\gamma-1} \frac{p_2}{\rho_2} + \frac{B_2^2}{\mu_0 \rho_2}
$$

**（2）磁层顶（Magnetopause）与开尔文-亥姆霍兹不稳定性**

磁层顶是太阳风与地球磁层的边界。当太阳风速度足够大时，磁层顶两侧的速度剪切会激发开尔文-亥姆霍兹不稳定性（KHI）。KHI的色散关系为：
$$
\omega = k \cdot \frac{\rho_1 \mathbf{v}_1 + \rho_2 \mathbf{v}_2}{\rho_1 + \rho_2} \pm i \sqrt{\frac{\rho_1 \rho_2 (k \cdot \Delta \mathbf{v})^2}{(\rho_1 + \rho_2)^2} - \frac{k^2 (B_1^2 + B_2^2)}{2\mu_0 (\rho_1 + \rho_2)}}
$$
其中 $\Delta \mathbf{v} = \mathbf{v}_1 - \mathbf{v}_2$。当磁场足够强时，KHI可以被抑制。

**（3）磁层结构**

地球磁层在太阳风作用下形成泪滴状结构：向日侧被压缩，背日侧拉伸形成磁尾。磁尾中存在等离子体片和中性点，是磁重联发生的重要区域。

### 1.3 等离子体粒子模拟方法研究（2025年11月 – 2025年12月）

在学习MHD理论的同时，我也对等离子体的数值模拟方法产生了浓厚兴趣。我重点阅读了Dawson教授关于等离子体计算机模拟的经典论文，以及Birdsall和Langdon的著作《Plasma Physics via Computer Simulation》。

#### 1.3.1 粒子网格法（Particle-in-Cell, PIC）

PIC方法是等离子体模拟中最常用的第一性原理方法，其基本思想是用大量宏粒子代表真实等离子体，通过求解牛顿运动方程和麦克斯韦方程组来自洽地描述等离子体动力学。

**（1）PIC方法的基本循环**

PIC方法在每个时间步执行以下步骤：
1. **粒子推动**：根据洛伦兹力更新粒子的速度和位置
   $$
   \frac{d\mathbf{x}_p}{dt} = \mathbf{v}_p, \quad \frac{d\mathbf{v}_p}{dt} = \frac{q_p}{m_p} (\mathbf{E} + \mathbf{v}_p \times \mathbf{B})
   $$
2. **电荷/电流沉积**：将粒子电荷分配到网格节点上
   $$
   \rho_g = \sum_p q_p S(\mathbf{x}_g - \mathbf{x}_p)
   $$
   其中 $S$ 是形状因子（如云格点分配、三角形分配等）。
3. **场求解**：在网格上求解麦克斯韦方程组
   $$
   \nabla \cdot \mathbf{E} = \frac{\rho}{\epsilon_0}, \quad \nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}
   $$
   $$
   \nabla \cdot \mathbf{B} = 0, \quad \nabla \times \mathbf{B} = \mu_0 \mathbf{J} + \mu_0 \epsilon_0 \frac{\partial \mathbf{E}}{\partial t}
   $$
4. **场插值**：将网格上的场插值回粒子位置
   $$
   \mathbf{E}(\mathbf{x}_p) = \sum_g \mathbf{E}_g S(\mathbf{x}_p - \mathbf{x}_g)
   $$

**（2）PIC方法的优点与局限**

优点：
- 能够自洽地描述动理学效应（如朗道阻尼、波-粒子相互作用）
- 适用于强非线性和非平衡态问题
- 物理图像直观，易于理解

局限：
- 计算量大，尤其是三维模拟
- 需要大量粒子以减少统计噪声
- 存在数值加热和有限网格不稳定性等问题

#### 1.3.2 粒子磁流体动力学方法（PMHD）

Dawson等人提出的粒子磁流体动力学（PMHD）方法是一种混合方法，它将流体元素视为有限尺寸粒子，采用拉格朗日法推进。与传统的欧拉网格MHD相比，PMHD具有以下特点：

- 避免了网格畸变问题
- 自然地处理了大变形和混合过程
- 适用于存在间断和激波的问题

PMHD方法的基本方程是将MHD方程组改写为拉格朗日形式：
$$
\frac{d\rho}{dt} = -\rho \nabla \cdot \mathbf{v}
$$
$$
\frac{d\mathbf{v}}{dt} = -\frac{1}{\rho} \nabla p + \frac{1}{\rho} \mathbf{J} \times \mathbf{B}
$$
$$
\frac{d\mathbf{B}}{dt} = (\mathbf{B} \cdot \nabla) \mathbf{v} - \mathbf{B} (\nabla \cdot \mathbf{v})
$$

#### 1.3.3 静电与电磁粒子模拟

根据所求解的场方程类型，粒子模拟可分为：

**（1）静电PIC**

仅求解泊松方程 $\nabla^2 \phi = -\rho / \epsilon_0$，不考虑电磁波。适用于低频静电波动（如离子声波、朗缪尔波）的研究。

**（2）电磁PIC**

求解完整的麦克斯韦方程组，能够描述电磁波和相对论效应。适用于激光等离子体相互作用、磁重联等问题的研究。

**（3）准中性PIC**

假设等离子体始终保持准中性，通过求解涡度方程来避免对高频等离子体振荡的解析。这种方法常用于漂移波湍流等低频问题的模拟。

#### 1.3.4 模拟中的数值问题

我学习了等离子体模拟中常见的数值问题及其处理方法：

**（1）数值加热**

由于有限网格尺寸和有限时间步长导致的非物理能量增长。解决方法包括使用高阶插值格式和足够小的网格间距。

**（2）有限网格不稳定性**

当网格间距大于德拜长度时，会出现数值不稳定性。要求 $\Delta x < \lambda_D$ 以避免该问题。

**（3）时间步长限制**

对于显式格式，时间步长需满足CFL条件：
$$
\Delta t < \frac{\Delta x}{v_{\max}}
$$
其中 $v_{\max}$ 是最大特征速度（对于电磁PIC，为光速）。

#### 1.3.5 等离子体模拟的应用案例

我阅读了几个经典的等离子体模拟应用案例：

**（1）磁重联模拟**

通过二维电磁PIC模拟，可以观察到磁重联过程中形成的X点、等离子体喷流和磁岛结构。模拟结果与卫星观测和实验室实验吻合良好。

**（2）激波模拟**

通过PIC模拟可以研究无碰撞激波的结构，包括激波面的粒子反射、加速和波激发过程。

**（3）漂移波湍流模拟**

通过准中性PIC或流体模拟，可以研究漂移波不稳定性驱动的湍流及其导致的异常输运。

### 1.4 从基础到前沿：确定研究方向（2025年12月）

经过三个月的基础知识学习，我对等离子体物理有了较为全面的认识。在与导师讨论后，我决定将研究重点聚焦于**漂移波湍流**这一具体问题。选择理由如下：

1. 漂移波湍流是磁约束聚变中反常输运的主要驱动机制，具有重要的实际意义。
2. 该领域有成熟的简化模型（Hasegawa-Mima、Hasegawa-Wakatani），适合本科阶段的研究。
3. 线性稳定性分析是入门的最佳切入点，可以锻炼理论推导和数值计算能力。
4. 后续可以向非线性模拟、模型改进等方向自然延伸。

---

## 第二章 第一次阶段性成果：HW模型线性稳定性分析（2026年1月 – 2026年4月）

### 2.1 研究背景与动机

**时间节点：2026年1月初**，我开始正式进入课题研究。在导师的建议下，我选择了Hasegawa-Wakatani（HW）模型作为切入点。该模型由Hasegawa和Wakatani于1983年提出，是研究电阻性漂移波湍流的经典简化模型，在等离子体物理领域具有重要地位。

HW模型的核心价值在于：
- 在Hasegawa-Mima模型（1977）的基础上引入有限电阻效应
- 提供了自然的线性不稳定性机制（电阻性漂移波不稳定性）
- 能够描述从线性增长到非线性饱和的完整过程
- 计算复杂度适中，适合本科阶段的数值模拟实践

### 2.2 HW模型的理论推导

**时间节点：2026年1月中旬至2月中旬**，我完成了从双流体方程到HW模型的完整推导。

#### 2.2.1 基本假设

在推导过程中，我采用了以下核心假设：

1. **几何与磁场**：无剪切平板几何，均匀强磁场 $\mathbf{B} = B_0 \hat{z}$，背景密度仅沿径向（$x$方向）变化
2. **归一化**：长度归一化为离子声拉莫半径 $\rho_s = c_s / \Omega_i$，时间归一化为 $\Omega_i^{-1}$，电势归一化为 $T_e/e$，密度扰动归一化为背景密度 $n_0$
3. **冷离子近似**：$T_i \ll T_e$，忽略离子压强梯度
4. **等温电子**：$p_e = n T_e$
5. **准中性条件**：$n_i \approx n_e = n$
6. **周期性边界条件**：在$x$和$y$方向采用周期性边界

#### 2.2.2 离子涡度方程

从离子连续性方程出发：
$$
\frac{\partial n}{\partial t} + \nabla \cdot (n \mathbf{v}_i) = 0
$$

在强磁场下，离子垂直速度主要由$\mathbf{E} \times \mathbf{B}$漂移和极化漂移组成：
$$
\mathbf{v}_{\perp i} = \mathbf{v}_E + \mathbf{v}_p = \frac{\mathbf{E} \times \mathbf{B}}{B_0^2} + \frac{1}{\Omega_i B_0} \frac{d\mathbf{E}_\perp}{dt} \times \hat{z}
$$

其中 $\mathbf{E} = -\nabla \phi$ 是电场。极化漂移是离子惯性的体现，它导致了涡度的演化。

代入连续性方程并利用准中性条件，经过线性化和归一化，得到涡度方程：
$$
\frac{\partial}{\partial t} \nabla_\perp^2 \varphi + J(\varphi, \nabla_\perp^2 \varphi) = \alpha (\varphi - n)
$$

其中 $J(f,g) = \partial_x f \partial_y g - \partial_y f \partial_x g$ 是泊松括号（雅可比算子），$\alpha$ 是绝热参数。

#### 2.2.3 电子密度方程

电子的平行动量方程（忽略惯性项）给出广义欧姆定律：
$$
\nabla_\parallel \left( \frac{e\phi}{T_e} - \ln n \right) = \frac{m_e \nu_{ei}}{e T_e} j_\parallel
$$

其中 $\nu_{ei}$ 是电子-离子碰撞频率，$j_\parallel$ 是平行电流密度。该方程描述了沿磁力线的力平衡：电场力、电子压强梯度和摩擦力三者平衡。

结合电子连续性方程，并考虑背景密度梯度项，得到密度方程：
$$
\frac{\partial n}{\partial t} + J(\varphi, n) + \kappa \frac{\partial \varphi}{\partial y} = \alpha (\varphi - n)
$$

其中 $\kappa = -d \ln n_0 / dx$ 是背景密度梯度参数，它提供了驱动不稳定性的自由能。

#### 2.2.4 完整的HW方程组

将涡度方程和密度方程组合，得到标准形式的HW方程组：
$$
\begin{aligned}
\frac{\partial}{\partial t} \nabla_\perp^2 \varphi + J(\varphi, \nabla_\perp^2 \varphi) &= \alpha (\varphi - n) + D_\zeta \\
\frac{\partial n}{\partial t} + J(\varphi, n) + \kappa \frac{\partial \varphi}{\partial y} &= \alpha (\varphi - n) + D_n
\end{aligned}
$$

其中 $D_\zeta = -\mu \nabla^4 \varphi$ 和 $D_n = -\mu \nabla^4 n$ 是耗散项（超粘性），用于吸收小尺度能量并保证数值稳定性。

### 2.3 线性稳定性分析

**时间节点：2026年2月下旬至3月中旬**，我完成了线性稳定性分析的理论推导和数值求解。

#### 2.3.1 线性化与色散关系

忽略非线性项和耗散项，假设平面波扰动：
$$
\varphi(x,y,t) = \hat{\varphi} e^{i(k_x x + k_y y - \omega t)}, \quad n(x,y,t) = \hat{n} e^{i(k_x x + k_y y - \omega t)}
$$

代入线性化方程，得到代数方程组：
$$
\begin{cases}
-i\omega k_\perp^2 \hat{\varphi} = \alpha (\hat{\varphi} - \hat{n}) \\
-i\omega \hat{n} + i\kappa k_y \hat{\varphi} = \alpha (\hat{\varphi} - \hat{n})
\end{cases}
$$

其中 $k_\perp^2 = k_x^2 + k_y^2$。令系数行列式为零，得到色散关系：
$$
k_\perp^2 \omega^2 + \omega \left[ \kappa k_y - i\alpha (k_\perp^2 + 2) \right] + i\alpha \kappa k_y = 0
$$

这是一个关于复频率 $\omega = \omega_r + i\gamma$ 的二次方程，其虚部 $\gamma$ 即为线性增长率。

#### 2.3.2 色散关系的物理解释

色散关系可以重写为：
$$
\omega^2 + i b (\omega - \omega_*) = 0
$$
其中
$$
\omega_*(k) = \frac{\kappa k_y}{1 + k^2}, \quad b(k) = \alpha \left(1 + k^{-2}\right)
$$
$\omega_*$ 是漂移波频率，$b$ 是电阻耦合系数。该形式清楚地显示了电阻性漂移波不稳定性的本质：当 $b$ 有限（即电阻不为零）时，$\omega$ 的虚部不为零，系统不稳定。

#### 2.3.3 MATLAB数值求解器开发

**时间节点：2026年3月中旬至3月底**，我开发了MATLAB数值求解器，用于计算增长率谱 $\gamma(k_x, k_y)$。

求解器的核心算法：
1. 在二维波数网格 $k_x, k_y \in [0, 2]$ 上以600×600的分辨率扫描
2. 对每个 $(k_x, k_y)$ 对，使用 `roots()` 函数求解二次特征方程
3. 取两个根中虚部较大的作为该模式的增长率
4. 采用百分位数色彩缩放增强可视化效果

参数设置：
- 密度梯度：$\kappa = 0.4$
- 绝热参数：$\alpha = [0.001, 0.005, 0.02]$
- 固定切面：$k_y = 0.59$ 和 $k_x = 0.59$

#### 2.3.4 关键结果

**时间节点：2026年4月初**，我获得了以下重要结果：

**（1）增长率谱的单峰结构**

无论沿 $k_x$ 还是 $k_y$ 方向，增长率谱均呈现明显的单峰结构。最不稳定波数位于 $k\rho_s \sim 0.5-1.0$ 的范围。这一尺度对应于离子声拉莫半径量级，与托卡马克边缘实验观测到的涨落谱特征一致。

**（2）绝热参数的非单调依赖性**

增长率对 $\alpha$ 呈现非单调依赖：在 $\alpha$ 很小时（接近流体极限），增长率较大；随着 $\alpha$ 增大，峰值增长率先增大后减小，存在一个最优 $\alpha$ 值使得不稳定性最强；当 $\alpha$ 很大时（接近绝热极限），增长率趋近于零，系统恢复为稳定的Hasegawa-Mima模型。

这一行为反映了电阻的双重作用：一方面，有限电阻（与 $\alpha$ 成反比）提供了 $\varphi$ 和 $n$ 之间的相位差，是不稳定性的必要条件；另一方面，过大的电阻也会带来阻尼效应。

**（3）二维增长率分布**

二维彩图显示了波数空间中不稳定区域的各向异性结构。对于 $\alpha=0.02$，全局最大值位于 $(k_x, k_y) \approx (0.5, 0.6)$。这一完整的不稳定性图谱为后续非线性模拟的初始条件设置提供了关键指导。

#### 2.3.5 物理机制分析

电阻性漂移波不稳定性的物理机制可以理解为：

1. 背景密度梯度 $\kappa$ 提供了自由能。
2. 有限电阻率（$1/\alpha$）阻止电子瞬时短路电势变化，导致 $\varphi$ 和 $n$ 之间出现相位差。
3. 这一相位差使得 $\mathbf{E} \times \mathbf{B}$ 对流速度能够持续地将等离子体从高背景密度区域输运到低背景密度区域，从而放大初始扰动。
4. 线性增长率 $\gamma$ 量化了这一能量提取过程的效率。

### 2.4 第一篇论文的撰写与提交

**时间节点：2026年4月16日**，我完成了第一篇论文《Linear Stability Analysis of the Hasegawa-Wakatani Drift-Wave Instability Model》的撰写并提交。

论文结构：
- 引言：介绍研究背景和HW模型的重要性
- 理论推导：从双流体方程到HW模型的完整推导，包含所有关键假设
- 数值方法：MATLAB求解器的实现细节和参数设置
- 结果与讨论：增长率谱、参数依赖性、物理机制分析
- 结论与展望：总结研究成果并规划未来方向

这篇论文标志着我完成了从理论学习到独立研究的第一次完整实践。

---

## 第三章 第二次阶段性成果：bHW模型理论框架掌握（2026年4月 – 2026年5月）

### 3.1 研究动机与文献调研

**时间节点：2026年4月下旬**，在完成HW模型线性分析后，我开始关注更先进的模型版本。通过阅读Majda、Qi和Cerfon于2018年发表的论文，我了解到修正HW（mHW）模型存在一个根本性的理论缺陷：在无碰撞极限（$\alpha \to \infty$）下，mHW模型不收敛到修正Hasegawa-Mima（mHM）方程。这一缺陷源于位势涡度定义中对纬向平均密度的不当处理。

### 3.2 bHW模型的理论框架

**时间节点：2026年5月上旬**，我系统学习了通量平衡HW（bHW）模型的理论框架。

#### 3.2.1 核心创新

bHW模型的两个关键创新：

**（1）重新定义的位势涡度**

bHW模型将平衡位势涡度定义为：
$$
q^b = \zeta - \tilde{n} = \nabla^2 \varphi - \tilde{n}
$$

其中 $\tilde{n} = n - \bar{n}$ 是密度涨落分量（减去纬向平均）。这一定义从位势涡度中显式排除了纬向平均密度 $\bar{n}$，确保了在绝热极限下磁面上的电子通量平衡。

**（2）广义耗散算子**

bHW模型引入了独立的耗散系数：
- 离子粘性：$\mu \nabla^2 \zeta$
- 交叉场粒子扩散：$D \nabla^2 n$
- 离子朗道阻尼：$C \varphi$

其中 $C = \omega_* T_i / (\omega_{ci} T_e)$ 是简化的离子朗道阻尼模型，源自Hammett-Perkins的流体矩闭合方法。

#### 3.2.2 完整的bHW方程组

$$
\begin{aligned}
\frac{\partial \zeta}{\partial t} + J(\varphi, \zeta) &= \alpha (\tilde{\varphi} - \tilde{n}) + \mu \nabla^2 \zeta + C \varphi \\
\frac{\partial n}{\partial t} + J(\varphi, n) + \kappa \frac{\partial \tilde{\varphi}}{\partial y} &= \alpha (\tilde{\varphi} - \tilde{n}) + D \nabla^2 n
\end{aligned}
$$

其中 $\varphi = \bar{\varphi} + \tilde{\varphi}$，$n = \bar{n} + \tilde{n}$ 是纬向平均与涨落分量的分解。注意电阻耦合项只包含涨落分量 $\alpha(\tilde{\varphi} - \tilde{n})$，这是bHW模型与经典HW模型的关键区别。

#### 3.2.3 守恒性质

bHW模型的总能量和位势涡度拟能的演化方程为：

**总能量：**
$$
E = \bar{E} + \tilde{E} = \frac12 \int_\Omega \left( |\bar{\varphi}_x|^2 + \bar{n}^2 \right) dV + \frac12 \int_\Omega \left( |\nabla \tilde{\varphi}|^2 + \tilde{n}^2 \right) dV
$$

**能量演化：**
$$
\frac{dE}{dt} = \kappa \int_\Omega \overline{\tilde{u}\tilde{n}} \left( 1 + \kappa^{-1} \bar{v} \right) dV - \alpha \int_\Omega (\tilde{n} - \tilde{\varphi})^2 dV - D_E
$$

**位势涡度拟能：**
$$
W = \bar{W} + \tilde{W} = \frac12 \int_\Omega \bar{q}^2 dV + \frac12 \int_\Omega \tilde{q}^2 dV
$$

**拟能演化：**
$$
\frac{dW}{dt} = \kappa \int_\Omega \overline{\tilde{u}\tilde{n}} dV - D_W
$$

其中 $\bar{v} = \partial \bar{\varphi} / \partial x$，$\tilde{u} = -\partial \tilde{\varphi} / \partial y$，$D_E$ 和 $D_W$ 来自耗散项。

#### 3.2.4 绝热极限下的收敛性

bHW模型最关键的优点是：在 $\alpha \to \infty$ 时，密度方程给出 $\tilde{n} = \tilde{\varphi}$（玻尔兹曼关系），代入位势涡度定义得到：
$$
q^b = \nabla^2 \varphi - \tilde{n} \xrightarrow{\alpha \to \infty} \nabla^2 \varphi - \tilde{\varphi}
$$

这正是mHM模型的位势涡度。同时，无耗散极限下的演化方程简化为：
$$
\frac{\partial q^b}{\partial t} + J(\varphi, q^b) - \kappa \frac{\partial \tilde{\varphi}}{\partial y} = 0
$$

与mHM方程完全一致。这一收敛性质是bHW模型区别于mHW模型的核心优势。

### 3.3 bHW与mHW模型的系统比较

**时间节点：2026年5月中旬**，我完成了两个模型的系统比较，结果总结如下表：

| 特征 | mHW模型 | bHW模型 |
|------|---------|---------|
| 位势涡度定义 | $q^m = \nabla^2 \varphi - n$ | $q^b = \nabla^2 \varphi - \tilde{n}$ |
| 绝热极限收敛性 | 不收敛到mHM | 精确收敛到mHM |
| 纬向平均密度处理 | 显式包含 $\bar{n}$ | 排除在外 |
| 伽利略不变性 | 满足 | 满足 |
| 广义耗散 | 有限 | $\mu, D, C$ 三项 |
| 小$\alpha$时带状流 | 弱 | 强 |
| 涨落变异性 | 较低 | 较高 |

### 3.4 第二次论文的撰写与提交

**时间节点：2026年5月27日**，我完成了第二篇论文《Research Progress Report: From Linear Hasegawa-Wakatani Stability to the Flux-Balanced HW Model》的撰写并提交。

论文结构：
- 引言：回顾研究背景和进展
- HW模型线性分析回顾：已完成的成果总结
- bHW模型理论框架：详细推导和关键创新
- bHW模型数值特征：基于文献的结果分析
- 研究计划：未来三个阶段的规划

这篇论文标志着我从单一模型分析扩展到模型比较与评估的进阶阶段。

---

## 第四章 第三次阶段性成果：bHW模型非线性数值模拟（2026年5月 – 2026年6月，已完成）

### 4.1 研究目标

**时间节点：2026年5月底**，我开始着手进行bHW模型的非线性数值模拟。目标是实现bHW方程组的伪谱法求解器，系统研究绝热参数 $\alpha$ 和背景密度梯度 $\kappa$ 对湍流-带状流转变的影响，并建立输运系数定标律。

### 4.2 数值方法

#### 4.2.1 伪谱法离散

在双周期方形区域 $\Omega = [0, L]^2$ 上，物理量以傅里叶级数展开：
$$
\varphi(\mathbf{x}, t) = \sum_{\mathbf{k}} \hat{\varphi}_{\mathbf{k}}(t) e^{i \tilde{\mathbf{k}} \cdot \mathbf{x}}, \quad n(\mathbf{x}, t) = \sum_{\mathbf{k}} \hat{n}_{\mathbf{k}}(t) e^{i \tilde{\mathbf{k}} \cdot \mathbf{x}}
$$

其中 $\tilde{\mathbf{k}} = \frac{2\pi}{L} \mathbf{k}$，$\mathbf{k} = (k_x, k_y)$ 为整数波数向量。非线性项在物理空间计算后通过FFT变换回谱空间。采用2/3去混淆规则消除混叠误差。

#### 4.2.2 时间推进

时间离散采用四阶显式Runge-Kutta格式。为保证数值稳定性，添加超粘性项 $\nu \Delta^8 q$ 和 $\nu \Delta^8 n$，其中 $\nu = 7 \times 10^{-21}$，阶数 $s=8$。超粘性项在谱空间采用隐式处理。

#### 4.2.3 参数设置

**实验组I：α扫描**
- 固定 $\kappa = 0.5$
- $\alpha = 0.01, 0.1, 0.5, 5.0$
- 其他参数：$L=40$, $N=256$, $\Delta t=0.01$, $\mu=5\times10^{-4}$, $D=5\times10^{-4}$, $C=0$, $T_{\text{total}}=500$

**实验组II：κ扫描**
- 固定 $\alpha = 0.5$
- $\kappa = 0.2, 0.5, 1.0, 2.0$

### 4.3 结果与分析

#### 4.3.1 流场结构随α的演变

**$\alpha=0.01$（强湍流态）**：涡度场呈现杂乱无章的斑块状分布，无大尺度有序结构。总动能峰值约1400，带状流动能占比不足30%。粒子通量在$t\approx280$后爆发式增长至约1.2。

**$\alpha=0.1$（过渡态）**：流场中出现模糊的沿$y$轴拉伸的条带轮廓。总动能峰值降至约1000，带状流动能占比约40%。粒子通量峰值约0.4。

**$\alpha=0.5$（弱带状流态）**：涡度场中出现较为清晰的条带结构，但仍有小尺度涡旋叠加。总动能约500，带状流动能占比约60%。粒子通量峰值约0.065，输运被显著抑制。

**$\alpha=5.0$（强带状流态）**：涡度场呈现高度规则的周期性条带，小尺度扰动可忽略。总动能约0.004，带状流动能几乎与总能量重合。粒子通量趋近于零，输运被有效“冻结”。

#### 4.3.2 流场结构随κ的演变

固定 $\alpha=0.5$，扫描 $\kappa=0.2, 0.5, 1.0, 2.0$。随着 $\kappa$ 增大，带状急流变得更窄、更强，但同时伴随更多的小尺度湍流斑块。这表明 $\kappa$ 不仅增强了带状流，也增强了驱动带状流的漂移波湍流，二者之间存在竞争。

带状流动能占比 $E_{\text{zonal}}/E_{\text{tot}}$ 随 $\kappa$ 单调递增，但增速逐渐放缓，暗示存在饱和。粒子通量 $\Gamma$ 随 $\kappa$ 近似线性增长，表明输运随梯度增大而增强。

#### 4.3.3 能谱分析

能谱分析揭示了能量在不同尺度间分配的本质改变：
- 小$\alpha$时：能谱在低波数区域平坦，高波数呈$k^{-3}$幂律衰减
- 大$\alpha$时：能谱在$k \approx 0.5-1$处出现显著主峰，高波数能量急剧衰减

提取中间波数区间（$k \in [0.5, 5]$）的标度指数 $\nu$，结果如表所示：

| $\alpha$ | $\kappa$ | 标度指数 $\nu$ |
|----------|----------|----------------|
| 0.01     | 0.5      | $3.2 \pm 0.1$  |
| 0.1      | 0.5      | $3.8 \pm 0.1$  |
| 0.5      | 0.5      | $4.5 \pm 0.2$  |
| 5.0      | 0.5      | $5.1 \pm 0.3$  |
| 0.5      | 0.2      | $4.1 \pm 0.2$  |
| 0.5      | 1.0      | $4.8 \pm 0.2$  |
| 0.5      | 2.0      | $5.3 \pm 0.3$  |

$\nu$ 随 $\alpha$ 和 $\kappa$ 增大而增大，表明系统越趋向带状流主导，能谱越陡峭。

#### 4.3.4 有效输运系数定标律

基于粒子通量和平均密度梯度，计算有效扩散系数 $D_{\text{eff}} = \Gamma / \kappa$。通过对数据进行幂律拟合，得到以下定标关系：
$$
D_{\text{eff}} \propto \alpha^{-0.72} \kappa^{1.34}
$$

该定标律反映了非线性饱和过程中输运对控制参数的依赖关系。

#### 4.3.5 绝热极限收敛性验证

在 $\alpha=5$ 的条件下将bHW模拟的最终状态与mHM方程的数值解进行对比，两者的纬向平均速度剖面几乎完全重合。$\langle (\tilde{n} - \tilde{\varphi})^2 \rangle$ 随 $\alpha$ 的衰减满足 $\propto \alpha^{-1}$ 的标度律，验证了收敛性。

#### 4.3.6 电阻效应对湍流级串与输运的调控机制

本节通过系统扫描电阻系数 \( C \)（取 \( C = 0.0000, 0.0025, 0.0050, 0.0125, 0.0250, 0.0500 \) 六个值），详细考察了非绝热效应对bHW模型动力学的影响。



### 4.4 第三篇论文的撰写

**时间节点：2026年6月**，我完成了第三篇论文《Nonlinear Numerical Simulation of the Flux-Balanced Hasegawa-Wakatani Model》的撰写。

论文结构：
- 引言：bHW模型的研究背景和意义
- 数值方法：伪谱法实现细节和参数设置
- 结果与讨论：
  - 流场结构随$α$的演变
  - 流场结构随$κ$的演变
  - 能谱标度指数分析
  - 有效输运系数定标律
  - 绝热极限收敛性验证
  - 电阻效应对湍流级串与输运的调控机制
- 结论：总结bHW模型的非线性动力学特性

这篇论文标志着我完成了从理论学习到独立数值模拟研究的完整科研训练。

---

## 第五章 研究时间线总结

| 时间段          | 主要工作        | 产出              |
| ------------ | ----------- | --------------- |
| 2025年9月-10月  | 文献调研，确定方向   | 选定等离子体物理        |
| 2025年10月-11月 | MHD基础理论学习   | 掌握MHD方程组、波模、磁重联 |
| 2025年11月-12月 | 等离子体模拟方法学习  | 掌握PIC、PMHD方法    |
| 2026年1月-2月   | HW模型理论推导    | 完成推导笔记          |
| 2026年2月-3月   | MATLAB求解器开发 | 线性稳定性分析代码       |
| 2026年3月-4月   | 数值计算与结果分析   | 第一篇论文（4月16日）    |
| 2026年4月-5月   | bHW模型理论学习   | 第二篇论文（5月27日）    |
| 2026年5月-6月   | bHW模型数值模拟   | 第三篇论文（6月）       |

---

## 第六章 关键公式汇总

### 6.1 MHD基础

**MHD方程组：**
$$
\frac{\partial \rho}{\partial t} + \nabla \cdot (\rho \mathbf{v}) = 0
$$
$$
\rho \frac{d\mathbf{v}}{dt} = -\nabla p + \mathbf{J} \times \mathbf{B} + \rho \mathbf{g} + \mu \nabla^2 \mathbf{v}
$$
$$
\frac{\partial \mathbf{B}}{\partial t} = \nabla \times (\mathbf{v} \times \mathbf{B}) + \eta \nabla^2 \mathbf{B}
$$
$$
\frac{d}{dt}(p \rho^{-\gamma}) = 0
$$

**阿尔芬波：**
$$
\omega = k_\parallel v_A, \quad v_A = \frac{B_0}{\sqrt{\mu_0 \rho_0}}
$$

**磁重联Sweet-Parker模型：**
$$
v_{\text{in}} = \frac{v_A}{\sqrt{S}}, \quad \delta = \frac{L}{\sqrt{S}}, \quad S = \frac{\mu_0 L v_A}{\eta}
$$

### 6.2 HW模型

**涡度方程：**
$$
\frac{\partial}{\partial t} \nabla_\perp^2 \varphi + J(\varphi, \nabla_\perp^2 \varphi) = \alpha (\varphi - n)
$$

**密度方程：**
$$
\frac{\partial n}{\partial t} + J(\varphi, n) + \kappa \frac{\partial \varphi}{\partial y} = \alpha (\varphi - n)
$$

**色散关系：**
$$
k_\perp^2 \omega^2 + \omega \left[ \kappa k_y - i\alpha (k_\perp^2 + 2) \right] + i\alpha \kappa k_y = 0
$$

### 6.3 bHW模型

**涡度方程：**
$$
\frac{\partial \zeta}{\partial t} + J(\varphi, \zeta) = \alpha (\tilde{\varphi} - \tilde{n}) + \mu \nabla^2 \zeta + C \varphi
$$

**密度方程：**
$$
\frac{\partial n}{\partial t} + J(\varphi, n) + \kappa \frac{\partial \tilde{\varphi}}{\partial y} = \alpha (\tilde{\varphi} - \tilde{n}) + D \nabla^2 n
$$

**平衡位势涡度：**
$$
q^b = \zeta - \tilde{n} = \nabla^2 \varphi - \tilde{n}
$$

**绝热极限收敛：**
$$
q^b \xrightarrow{\alpha \to \infty} \nabla^2 \varphi - \tilde{\varphi} \quad (\text{mHM})
$$

### 6.4 诊断量

**总动能：**
$$
E_{\text{tot}} = \frac12 \int_\Omega |\nabla \varphi|^2 dV
$$

**带状流动能：**
$$
E_{\text{zonal}} = \frac12 \int_\Omega |\partial_x \bar{\varphi}|^2 dV
$$

**粒子通量：**
$$
\Gamma = \overline{\tilde{u} \tilde{n}}, \quad \tilde{u} = -\partial_y \tilde{\varphi}
$$

**能谱：**
$$
E(k) = \frac12 \sum_{k-\Delta k/2 < |\mathbf{k}'| \leq k+\Delta k/2} \tilde{k}'^2 |\hat{\varphi}_{\mathbf{k}'}|^2
$$

**有效扩散系数：**
$$
D_{\text{eff}} = \frac{\Gamma}{\kappa}
$$

---

## 第七章 总结与展望

### 7.1 研究工作总结

经过近一年的科研训练，我从一个对等离子体物理仅有初步了解的本科生，成长为能够独立完成从理论推导到数值模拟完整流程的研究者。本研究的核心成果可归纳为以下四个方面：

**（1）磁流体动力学与等离子体模拟基础**

系统学习了MHD基本方程组、阿尔芬波与磁声波、磁重联机制、太阳风-磁层相互作用等经典理论，以及PIC和PMHD等粒子模拟方法。这些知识为后续的漂移波湍流研究奠定了坚实的理论基础。

**（2）HW模型线性稳定性分析（第一篇论文）**

完成了从双流体方程到HW模型的完整推导，开发了MATLAB数值求解器，获得了增长率谱的单峰结构、绝热参数的非单调依赖性以及二维波数空间的不稳定性图谱。论文于2026年4月16日提交。

**（3）bHW模型理论框架掌握（第二篇论文）**

系统学习了通量平衡HW模型的理论框架，包括重新定义的位势涡度、广义耗散算子、守恒性质和绝热极限收敛性。完成了bHW与mHW模型的系统比较，论文于2026年5月27日提交。

**（4）bHW模型非线性数值模拟（第三篇论文）**

实现了bHW方程组的伪谱法求解器，完成了α扫描和κ扫描两组实验。获得了流场结构随α和κ的演变规律、能谱标度指数、有效输运系数定标律 $D_{\text{eff}} \propto \alpha^{-0.72} \kappa^{1.34}$ 以及绝热极限收敛性验证。论文于2026年6月完成。

### 7.2 主要创新点

1. **首次系统扫描了bHW模型中背景密度梯度 $\kappa$ 的影响**，发现 $\kappa$ 同时增强带状流和湍流，带状流动能占比随 $\kappa$ 单调递增但趋于饱和，粒子通量近似线性增长。
2. **建立了有效输运系数的定标律** $D_{\text{eff}} \propto \alpha^{-0.72} \kappa^{1.34}$，为简化模型与真实输运之间的连接提供了定量参考。
3. **定量分析了能谱标度指数**，揭示了 $\nu$ 随 $\alpha$ 和 $\kappa$ 的系统性变化，从强湍流区的 $\nu \approx 3.2$ 到强带状流区的 $\nu > 5$。
4. **验证了bHW模型在绝热极限下的收敛性**，确认了 $\langle (\tilde{n} - \tilde{\varphi})^2 \rangle \propto \alpha^{-1}$ 的标度律。

### 7.3 未来工作展望

基于已完成的研究，未来的工作可以从以下几个方向展开：

**（1）耗散效应的系统研究**

目前的工作中主要设置了 $C=0$，未来可以系统扫描离子朗道阻尼参数 $C$ 的影响，研究其对带状流结构和湍流水平的调制作用。

**（2）计算域形状和大小的敏感性分析**

当前的模拟采用 $L=40$ 的正方形域，未来可以研究计算域纵横比对湍流特性和带状流形成的影响。

**（3）多尺度相互作用与能量级串机制**

深入分析能量在尺度间的传递路径，研究带状流对能量级串的调控机制，探索是否存在双级串（正向和逆向）共存的现象。

**（4）统计降阶模型开发**

基于bHW模型的数值数据，发展数据驱动的降阶模型，实现对湍流统计特性的高效预测。

**（5）模型扩展**

将bHW模型扩展到包含有限离子温度梯度（ITG模式）的情形，研究温度梯度与密度梯度的协同效应。

**（6）机器学习应用**

探索神经网络在湍流闭合模型构建中的应用，如使用卷积神经网络预测湍流通量，或使用循环神经网络预测带状流的时间演化。

---

## 致谢

衷心感谢蔡一夫老师在本研究过程中的悉心指导和宝贵建议。感谢王烁皓师兄在数值方法和物理理解上的帮助。本研究得到了中国科学技术大学少年班学院科学与社会研讨课课程的支持。

---

## 参考文献

[1] Hasegawa, A. & Wakatani, M. (1983). Plasma edge turbulence. *Physical Review Letters*, 50(9), 682.

[2] Hasegawa, A. & Mima, K. (1978). Pseudo-three-dimensional turbulence in magnetized nonuniform plasma. *Physics of Fluids*, 21(1), 87-92.

[3] Majda, A. J., Qi, D., & Cerfon, A. J. (2018). A flux-balanced fluid model for collisional plasma edge turbulence: Model derivation and basic physical features. *Physics of Plasmas*, 25(11), 112301.

[4] Numata, R., Ball, R., & Dewar, R. L. (2007). Bifurcation in electrostatic resistive drift wave turbulence. *Physics of Plasmas*, 14(10), 102312.

[5] Diamond, P. H., Itoh, S.-I., Itoh, K., & Hahm, T. S. (2005). Zonal flows in plasma—a review. *Plasma Physics and Controlled Fusion*, 47(5), R35.

[6] Trefethen, L. N. (2000). *Spectral Methods in MATLAB*. SIAM.

[7] Hammett, G. W. & Perkins, F. W. (1990). Fluid moment models for Landau damping with application to the ion-temperature-gradient instability. *Physical Review Letters*, 64(25), 3019-3022.

[8] Birdsall, C. K. & Langdon, A. B. (2004). *Plasma Physics via Computer Simulation*. CRC Press.

[9] Dawson, J. M. (1983). Particle simulation of plasmas. *Reviews of Modern Physics*, 55(2), 403.

[10] Alfvén, H. (1942). Existence of electromagnetic-hydrodynamic waves. *Nature*, 3805, 405-406.

[11] Sweet, P. A. (1958). The neutral point theory of solar flares. *Electromagnetic Phenomena in Cosmical Physics*, 123-134.

[12] Parker, E. N. (1957). Sweet's mechanism for merging magnetic fields in conducting fluids. *Journal of Geophysical Research*, 62(4), 509-520.

[13] Wakatani, M. & Hasegawa, A. (1984). A collisional drift wave description of plasma edge turbulence. *Physics of Fluids*, 27(3), 611-618.

[14] Zhu, H., Zhou, Y., & Dodin, I. Y. (2018). Zonal-flow dynamics in a collisional plasma: Transition from Hasegawa-Wakatani to Hasegawa-Mima. *Physics of Plasmas*, 25(7), 072305.

[15] Qi, D. & Majda, A. J. (2018). Strategies for reduced-order models for predicting the statistical responses and uncertainty quantification in complex turbulent dynamical systems. *SIAM Review*, 60(3), 491-549.


