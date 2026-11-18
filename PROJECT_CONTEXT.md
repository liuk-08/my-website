# 官网维护上下文

## 2026-11-18：Notes@USTC 导航修复

- 用户要求：不新增内容，侧边栏显示“学期 → 课程名称”，点击课程定位现有笔记汇总页对应标题。用户明确指定直接在桌面项目工作。
- 实现：scripts/patch-explorer-sort.mjs 从 content/笔记.md 的二级、三级标题生成导航，复用 github-slugger 计算标题锚点；替换 Notes@USTC 子树，保留其他导航；quartz.config.yaml 设置文件夹点击为展开。
- 现有 GitHub Pages 工作流在构建前已执行该补丁，无需新增部署步骤。后续本地构建也需先执行 node scripts/patch-explorer-sort.mjs。
- 验证：node quartz/bootstrap-cli.mjs build 成功，17 个 Markdown 输入、162 个输出；node scripts/verify-notes-navigation.mjs 通过（2 学期、8 课程、全部锚点存在、重复映射不重复目录）；git diff --check 通过。
- 限制：没有浏览器自动化环境，未做真实浏览器点击测试；构建有既有公式严格模式及 CustomOgImagesEmitterName 导出警告。计算机程序设计沿用原有空课程章节。
- 资料来源：用户本次决策、content/笔记.md、Explorer 插件源码及本地构建产物。
- 工作区中曾建立 C:/physics/code/my_website 副本，用户随后指定桌面项目，该副本不是最新修复版本。
