import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";


const __dirname = dirname(fileURLToPath(import.meta.url));
const pluginDir = join(__dirname, "..", ".quartz", "plugins", "explorer");

const files = [
  join(pluginDir, "dist", "index.js"),
  join(pluginDir, "dist", "components", "index.js"),
];

const customSortFn = `sortFn: (a2, b2) => {
    /* source-order:start */
    if (a2.navigationOrder !== undefined && b2.navigationOrder !== undefined) {
      return a2.navigationOrder - b2.navigationOrder;
    }
    const order = ["首页", "笔记", "研究", "笔记-notes@ustc"];
    const ai = a2.slugSegments.length === 1 ? order.indexOf(a2.slugSegment) : -1;
    const bi = b2.slugSegments.length === 1 ? order.indexOf(b2.slugSegment) : -1;
    if (ai !== -1 || bi !== -1) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    return (a2.displayName || "").localeCompare(b2.displayName || "", "zh-CN", { numeric: true });
    /* source-order:end */
  },`;

// Hide the duplicate left-hand notes tree; the article TOC remains available.
const navigationMap = `mapFn: (node) => {
    /* notes-navigation:start */
    if (node.slugSegments.length === 0) {
      node.children = node.children.filter((child) => child.slugSegment !== "笔记-notes@ustc");
    }
    return node;
    /* notes-navigation:end */
  },`;

let patched = 0;
for (const filePath of files) {
  let content = readFileSync(filePath, "utf-8");

  const mapPattern = /mapFn: \(node\) => \{\s*(?:\/\* notes-navigation:start \*\/[\s\S]*?\/\* notes-navigation:end \*\/|return node;)\s*\},/;
  if (!mapPattern.test(content)) throw new Error(`Explorer mapFn changed: ${filePath}`);
  content = content.replace(mapPattern, () => navigationMap);
  writeFileSync(filePath, content, "utf-8");

  const sortPattern = /sortFn: \(a2, b2\) => \{[\s\S]*?\r?\n  \},\r?\n  filterFn:/;
  if (sortPattern.test(content)) {
    content = content.replace(sortPattern, () => customSortFn + "\n  filterFn:");
    writeFileSync(filePath, content, "utf-8");
    console.log(`Patched: ${filePath}`);
    patched++;
  } else {
    console.error(`Could not find sortFn in: ${filePath}`);
    process.exit(1);
  }
}

if (patched === files.length) {
  console.log("All explorer files patched successfully.");
} else {
  console.log(`${patched}/${files.length} files patched.`);
}
