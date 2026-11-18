# 官网维护上下文

## 当前决定（2026-11-18，覆盖下方历史方案）

本地排版：左侧一级为笔记、研究。笔记下的 Notes 和 Notes@USTC 分别由 content/笔记/Notes.md 和 content/笔记/Notes@USTC.md 维护。Notes 默认折叠，展开后按正文顺序显示所有学科。Notes@USTC 展示学期及课程，导航定位到相应资料页标题。研究下的“量子精密测量x暗物质探测”暂定位到研究页中的建设中章节。右侧保留文章目录。

## 2026-11-18：Notes@USTC 导航修复

- 用户要求：不新增内容，侧边栏显示“学期 → 课程名称”，点击课程定位现有笔记汇总页对应标题。用户明确指定直接在桌面项目工作。
- 实现：scripts/patch-explorer-sort.mjs 从 content/笔记.md 的二级、三级标题生成导航，复用 github-slugger 计算标题锚点；替换 Notes@USTC 子树，保留其他导航；quartz.config.yaml 设置文件夹点击为展开。
- 现有 GitHub Pages 工作流在构建前已执行该补丁，无需新增部署步骤。后续本地构建也需先执行 node scripts/patch-explorer-sort.mjs。
- 验证：node quartz/bootstrap-cli.mjs build 成功，17 个 Markdown 输入、162 个输出；node scripts/verify-notes-navigation.mjs 通过（2 学期、8 课程、全部锚点存在、重复映射不重复目录）；git diff --check 通过。
- 限制：没有浏览器自动化环境，未做真实浏览器点击测试；构建有既有公式严格模式及 CustomOgImagesEmitterName 导出警告。计算机程序设计沿用原有空课程章节。
- 资料来源：用户本次决策、content/笔记.md、Explorer 插件源码及本地构建产物。
- 工作区中曾建立 C:/physics/code/my_website 副本，用户随后指定桌面项目，该副本不是最新修复版本。

## 2026-11-18：同步内容与目录原文顺序

- 用户要求按本地文件修改更新官网，目录按源文件中的顺序显示。
- 本次用户内容变更：笔记页末尾知乎链接改为 p29dxi；首页和研究页未发现本地内容修改。
- 修复：为学期与课程设置原文位置索引，阻止 Explorer 名称排序打乱标题顺序；顶层通过页面路径排序，避免“研究探索”显示标题与“研究”路径不一致影响顺序。
- 回归验证覆盖实际排序阶段：先反转生成目录，再排序，检查与源文件标题序列完全一致，并核对课程锚点。
- 上次修复提交 1fb5108 已上线，部署记录：https://github.com/liuk-08/my-website/actions/runs/44298575617 。
