---
创建日期: 2026-03-25
标签:
  - 等离子体物理
  - HW模型
  - 推导笔记
  - 不稳定性
aliases: []
zhihu-created-at: 2026-03-26 20:53
tags:
zhihu-link: https://zhuanlan.zhihu.com/p/2020604081039783209
cssclasses:
zhihu-topics: physics
zhihu-title: 新生研讨课研究02：等离子体 Hasegawa-Wakatani 模型学习与研究
zhihu-toc: "1"
zhihu-updated-at: 2026-03-28 16:47
---
# Hasegawa-Wakatani (HW) 模型研究笔记

## 1. 模型背景
Hasegawa-Wakatani模型是描述磁化等离子体中**漂移波湍流**的一个经典模型，特别关注于**密度梯度驱动的漂移波不稳定性**。


该模型采用如下假设：

*   **几何与磁场**：采用平板近似，设均匀强磁场$B_{0}=B_{0}\hat{z}$ 。背景等离子体密度 $n_{0}$仅沿径向（设为x方向）变化，形成驱动不稳定性的源：$\nabla n_{0}=\frac{d n_{0}}{dx}\hat{x}$。这模拟了托卡马克中从核心到边缘的密度衰减。
*   **电子动力学（“等温流体”假设）**：针对边缘碰撞区的特性，Landau阻尼作用远小于碰撞阻尼，可以假设电子碰撞频繁，平行方向热导率极高。因此，电子温度可视为均匀常数（$T_{e}=const$），其压强满足$p_{e}=nk_{B}T_{e}$。电子对电场的响应由包含电阻的欧姆定律描述，其惯性可忽略。
*   **离子动力学（“温流体”假设）**：离子被视为具有有限温度（$T_{i}=const$）和动力粘性的二维温流体，其压强为$p_{i}=nk_{B}T_{i}$，离子的垂直运动由$\vec{E}\times\vec{B}$漂移主导。
*   **漂移与准中性**：垂直于磁场的粒子漂移速度以$\overrightarrow{v_{E}}=\frac{-\nabla\phi\times\hat{z}}{B_{0}}$为主。对于低频扰动，等离子体保持准中性，即$n_{i}\approx n_{e}=n$。
*   **不稳定性机制**：系统的自由能来源于背景密度梯度。当考虑电阻（它打破了电子沿磁力线的等势分布）时，漂移波变得不稳定，成为湍流的能量来源。

基于上述假设，我们可以推导出**Hasegawa-Wakatani方程**。


## 2. Hasegawa-Wakatani方程
模型由两个耦合的非线性方程组成，描述了电势扰动 $\varphi$ 和密度扰动 $n$ 的演化。

$$
\begin{cases}
(\frac{\partial}{\partial t}-\nabla\varphi\times\hat z\cdot\nabla)\nabla^2 \varphi = c_1 (\varphi - n) + c_2 \nabla^4 \varphi \\[8pt]
(\frac{\partial}{\partial t}-\nabla\varphi\times\hat z\cdot\nabla) (n + \ln n_0) = c_1 (\varphi - n)
\end{cases}
$$

利用泊松括号

$$
\{f, g\} = \frac{\partial f}{\partial x} \frac{\partial g}{\partial y} - \frac{\partial f}{\partial y} \frac{\partial g}{\partial x} = (\hat{z} \times \nabla f) \cdot \nabla g
$$
方程也可以写成
$$
\begin{cases}
\frac{\partial}{\partial t} \nabla^2 \varphi - \{\varphi, \nabla^2 \varphi\} = c_1 (\varphi - n) + c_2 \nabla^4 \varphi \\[8pt]
\frac{\partial n}{\partial t} - \{\varphi, n + \ln n_0\} = c_1 (\varphi - n)
\end{cases}
$$
**线性化近似**
对非线性项（泊松括号项）进行线性化处理：
- $\{\varphi, \nabla^2 \varphi\}$ 和 $\{\varphi, n\}$ 是扰动的**二阶小量**，在**线性理论中可忽略**。
- 背景密度梯度项 $\{\varphi, \ln n_0\}$ 需保留至一阶：
  $$
  \{\varphi, \ln n_0\} \approx -\frac{\partial (\ln n_0)}{\partial x} \frac{\partial \varphi}{\partial y} = \kappa \frac{\partial \varphi}{\partial y}
  $$
  其中定义了 **密度梯度参数**：
  $$
  \kappa \overset{\text{def}}=-\frac{\partial (\ln n_0)}{\partial x}
  $$

**线性化的 HW 方程**

$$
\boxed{
\begin{cases}
\displaystyle \frac{\partial}{\partial t} \nabla^2 \varphi = c_1 (\varphi - n) - c_2 \nabla^4 \varphi \\[10pt]
\displaystyle \frac{\partial n}{\partial t} - \kappa \frac{\partial \varphi}{\partial y} = c_1 (\varphi - n)
\end{cases}}
$$

- **第一式**：涡度方程，包含 **绝热响应** ($c_1(\varphi - n)$) 和**耗散** ($-c_2 \nabla^4 \varphi$)。
- **第二式**：密度连续方程，包含 **$E \times B$ 对流** ($-\kappa \partial_y \varphi$) 和 **绝热响应**。

**平面波解与色散关系**
假设扰动具有平面波形式：
$$
\varphi(x, y, t) = \hat{\varphi} \, e^{i(k_x x + k_y y - \omega t)}, \quad n(x, y, t) = \hat{n} \, e^{i(k_x x + k_y y - \omega t)}
$$
对应微分算符替换为：
$$
\frac{\partial}{\partial t} \rightarrow -i\omega, \quad \frac{\partial}{\partial y} \rightarrow ik_y, \quad \nabla^2 \rightarrow -k_\perp^2, \quad \nabla^4 \rightarrow k_\perp^4
$$
其中 $k_\perp^2 = k_x^2 + k_y^2$。

代入线性方程，得到代数方程组：
$$
\begin{cases}
i\omega k_\perp^2 \hat{\varphi} = c_1 (\hat{\varphi} - \hat{n}) - c_2 k_\perp^4 \hat{\varphi} \\[8pt]
-i\omega \hat{n} - i \kappa k_y \hat{\varphi} = c_1 (\hat{\varphi} - \hat{n})
\end{cases}
$$
此方程组决定了振幅 $(\hat{\varphi}, \hat{n})^\top$ 和频率 $\omega$ 的关系。求解该齐次方程组（令系数矩阵行列式为零）即可得到**线性色散关系** $\omega = \omega(k_\perp, c_1, c_2, \kappa)$。

## 3. Matlab复刻无耗散项的的增长率曲线
$$
\begin{cases}
i\omega k_\perp^2 \hat{\varphi} = \alpha (\hat{\varphi} - \hat{n}) \\[8pt]
-i\omega \hat{n} - i \kappa k_y \hat{\varphi} = \alpha (\hat{\varphi} - \hat{n})
\end{cases}
$$
即，
$$
\begin{cases}
(i\omega k^2 + \alpha)\varphi + (i\omega - \alpha)n = 0 \\[8pt]

(i k_y\kappa + \alpha)\varphi + (-i\omega - \alpha)n = 0 
\end{cases}
$$
#### 色散关系
方程组 有非零解的条件是系数行列式为零：
$$
\begin{vmatrix}
i\omega k^2 + \alpha & i\omega - \alpha \\
i k_y\kappa + \alpha & -i\omega - \alpha
\end{vmatrix} = 0
$$

展开行列式：
$$
(i\omega k^2 + \alpha)(-i\omega - \alpha) - (i\omega - \alpha)(i k_y\kappa + \alpha) = 0
$$

整理为关于 ω 的二次方程：
$$
k^2\omega^2 + \omega[k_y\kappa - i\alpha(k^2 + 2)] + i\alpha k_y\kappa = 0 
$$

#### 增长率表达式
方程 的解为：
$$
\omega = \frac{-[k_y\kappa - i\alpha(k^2 + 2)] \pm \sqrt{[k_y\kappa - i\alpha(k^2 + 2)]^2 - 4k^2(i\alpha k_y\kappa)}}{2k^2}
$$

增长率 $γ = Im(ω)$ 需通过数值求解获得。

#### Matlab 代码实现
```matlab
% Hasegawa-Wakatani linear growth rate - improved plotting

% 1) multiple alpha (c1) comparison

% 2) mark peak points on gamma-vs-k plots

% 3) improved colormap scaling for gamma 2D map

clear; close all;

% ---------- PARAMETERS ----------

kappa = 0.4; % drift drive parameter κ (fixed here)

alpha_list = [0.001, 0.005, 0.02]; % list of alpha (c1) values to compare

% You can change alpha_list to other values as needed

% k grid

kx_vals = linspace(0,2,600); % higher resolution

ky_vals = linspace(0,2,600);

% fixed slices for 1D plots (choose commonly used value from paper)

ky_fix = 0.59;

kx_fix = 0.59;

% helper: compute roots of quadratic and return two omegas

compute_omega_roots = @(kx,ky,alpha) ...

roots([ (kx^2+ky^2), ( ky*kappa - 1i*alpha*( (kx^2+ky^2) + 2 ) ), 1i*alpha*ky*kappa ]);

% preallocate storage for 1D results

gamma_kx_all = zeros(length(alpha_list), length(kx_vals));

gamma_ky_all = zeros(length(alpha_list), length(ky_vals));

% compute 1D gamma curves for each alpha

for ia = 1:length(alpha_list)

alpha = alpha_list(ia);

% gamma vs kx (ky fixed)

for ix = 1:length(kx_vals)

kx = kx_vals(ix);

rts = compute_omega_roots(kx, ky_fix, alpha);

gamma_kx_all(ia, ix) = max(imag(rts)); % choose dominant mode

end

% gamma vs ky (kx fixed)

for iy = 1:length(ky_vals)

ky = ky_vals(iy);

rts = compute_omega_roots(kx_fix, ky, alpha);

gamma_ky_all(ia, iy) = max(imag(rts));

end

end

% ---------- PLOT gamma vs kx (multiple alphas) ----------

figure('Position',[200 200 800 400]);

colors = lines(length(alpha_list));

subplot(1,2,1);

hold on;

peak_info_kx = cell(length(alpha_list),1);

for ia = 1:length(alpha_list)

plot(kx_vals, gamma_kx_all(ia,:), 'Color', colors(ia,:), 'LineWidth', 1.6);

% find peak

[gmax, idx] = max(gamma_kx_all(ia,:));

kx_peak = kx_vals(idx);

scatter(kx_peak, gmax, 60, colors(ia,:), 'filled', 'MarkerEdgeColor','k');

text(kx_peak, gmax, sprintf(' \\alpha=%.4g\\n(k_x=%.3f, \\gamma=%.4g)', alpha_list(ia), kx_peak, gmax), ...

'VerticalAlignment','bottom','FontSize',9);

peak_info_kx{ia} = [kx_peak, gmax];

end

xlabel('k_x'); ylabel('\gamma = Im(\omega)');

title(sprintf('\\gamma vs k_x (k_y = %.2f, \\kappa=%.2f)', ky_fix, kappa));

legend(arrayfun(@(a) sprintf('\\alpha=%.4g',a), alpha_list,'UniformOutput',false),'Location','best');

grid on; box on; hold off;

% ---------- PLOT gamma vs ky (multiple alphas) ----------

subplot(1,2,2);

hold on;

peak_info_ky = cell(length(alpha_list),1);

for ia = 1:length(alpha_list)

plot(ky_vals, gamma_ky_all(ia,:), 'Color', colors(ia,:), 'LineWidth', 1.6);

[gmax, idx] = max(gamma_ky_all(ia,:));

ky_peak = ky_vals(idx);

scatter(ky_peak, gmax, 60, colors(ia,:), 'filled', 'MarkerEdgeColor','k');

text(ky_peak, gmax, sprintf(' \\alpha=%.4g\\n(k_y=%.3f, \\gamma=%.4g)', alpha_list(ia), ky_peak, gmax), ...

'VerticalAlignment','bottom','FontSize',9);

peak_info_ky{ia} = [ky_peak, gmax];

end

xlabel('k_y'); ylabel('\gamma = Im(\omega)');

title(sprintf('\\gamma vs k_y (k_x = %.2f, \\kappa=%.2f)', kx_fix, kappa));

legend(arrayfun(@(a) sprintf('\\alpha=%.4g',a), alpha_list,'UniformOutput',false),'Location','best');

grid on; box on; hold off;

% ---------- 2D GAMMA MAP for last alpha in list (you can choose which) ----------

% We compute gamma2d for a selected alpha and display with better color scaling.

alpha_sel = alpha_list(end); % choose last (largest) alpha for example

gamma2d = zeros(length(kx_vals), length(ky_vals));

for ix = 1:length(kx_vals)

for iy = 1:length(ky_vals)

rts = compute_omega_roots(kx_vals(ix), ky_vals(iy), alpha_sel);

gamma2d(ix,iy) = max(imag(rts));

end

end

% Improve visualization: clip negative gamma to min near zero to show positive region,

% and set color limits by percentiles to avoid colormap dominated by tiny values.

gamma_positive = gamma2d;

gamma_positive(gamma_positive < 0) = 0; % set negative to zero (no growth)

% Determine color scale using percentiles to boost contrast

p_low = prctile(gamma_positive(gamma_positive>0), 2); % 2nd percentile of positive values

p_high = prctile(gamma_positive(:), 98); % 98th percentile overall

if isempty(p_low) || isnan(p_low)

p_low = 0;

end

if isempty(p_high) || isnan(p_high) || p_high==0

p_high = max(gamma_positive(:));

end

% Make sure p_high > p_low

if p_high <= p_low

p_high = max(gamma_positive(:));

end

figure('Position',[200 200 600 500]);

imagesc(ky_vals, kx_vals, gamma_positive);

axis xy;

colormap(parula); colorbar;

caxis([p_low, p_high]); % clipped color scaling

xlabel('k_y'); ylabel('k_x');

title(sprintf('\\gamma(k_x,k_y) (\\alpha=%.4g, \\kappa=%.2f) -- color clipped to [%.1e, %.1e]', alpha_sel, kappa, p_low, p_high));

% Overlay contour lines for gamma levels to emphasize structure

hold on;

levels = linspace(p_low, p_high, 6);

contour(ky_vals, kx_vals, gamma_positive, levels, 'LineColor','k','LineWidth',0.6);

% mark the global peak

[max_g, idx_lin] = max(gamma_positive(:));

[ix_peak, iy_peak] = ind2sub(size(gamma_positive), idx_lin);

kx_peak_global = kx_vals(ix_peak);

ky_peak_global = ky_vals(iy_peak);

scatter(ky_peak_global, kx_peak_global, 80, 'r', 'filled', 'MarkerEdgeColor','k');

text(ky_peak_global, kx_peak_global, sprintf(' peak (k_x=%.3f, k_y=%.3f, \\gamma=%.4g)', kx_peak_global, ky_peak_global, max_g), ...

'Color','r','FontWeight','bold');

hold off;
```



![[HW_model_gamma_k_{x}.png]]


![[HW_model_gamma_k_{y}.png]]

![[HW_model_k_x_k_y.png]]


#### 图像分析与物理意义解读

1. **峰值位置**：增长率 $\gamma$ 通常在 $k_y \rho_s \sim 0.5 - 1.0$ 处达到最大。这说明等离子体湍流的能量主要在**离子声拉莫尔半径**尺度注入。
    
2. **绝热参数 $\alpha$ 的影响**：
    
    - **$\alpha \ll 1$ (流体极限)**：电子响应极慢，$\phi$ 和 $n$ 解耦，不稳定性极强。
        
    - **$\alpha \gg 1$ (绝热极限)**：电子能迅速沿磁力线移动平衡势能，$\phi \approx n$，不稳定性消失（$\gamma \to 0$）。
        
3. **不稳定性来源**：电阻（$\nu_{ei}$）导致了电子响应的**滞后（Phase Shift）**。在 $x-y$ 平面上，这种相位差导致 $E \times B$ 漂移不断地将高密度区的粒子向外搬运。

## 4. 其他结论

Hasegawa & Wakatani：“环形几何结构中，等离子体会选择平行波数，使得在给定扰动垂直波数值时，不稳定性增长率达到最大。”

这表明在实际环形装置（如托卡马克）中，由于**磁场曲率**和**剪切**的影响，不稳定性（如漂移波）的增长率 $\gamma = \text{Im}(\omega)$ 会依赖于平行波数 $k_\parallel$，并且系统倾向于激发使 $\gamma$ 最大化的模式。这是理解**反常输运**尺度选取的关键。


## 5. 后续研究计划 (Research Roadmap)

### 短期：非线性演化仿真

- **任务**：编写 2D 伪谱法（Pseudo-spectral）程序。
    
- **目标**：观察线性增长阶段结束后的**非线性饱和**。
    
- **重点**：计算输运通量 $\Gamma = \langle n v_{Ex} \rangle$，验证是否符合 **Bohm 扩散** ($D \propto 1/B$)。

### 中期： zonal flow (区带流) 研究

- **任务**：在 HW 模型中加入背景流项。
    
- **物理意义**：区带流可以通过剪切力撕裂湍流涡团（Turbulent Eddies），是托卡马克实现高约束模（H-mode）的关键机制。

### 长期：创新点探索

- **方向**：考虑**非均匀磁场（Magnetic Shear）**或**三维效应**。
    
- **挑战**：在 $k_z$ 不再是常数的情况下，$\alpha$ 将变成空间的函数。研究这种空间非均匀性如何改变湍流的相干结构。

