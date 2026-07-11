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
    const order = ["首页", "笔记", "研究"]
    const ai = order.indexOf(a2.displayName ?? "")
    const bi = order.indexOf(b2.displayName ?? "")
    if (ai !== -1 || bi !== -1) {
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
    }
`;

let patched = 0;
for (const filePath of files) {
  let content = readFileSync(filePath, "utf-8");

  // Check if already patched
  if (content.includes('const order = ["首页", "笔记", "研究"]')) {
    console.log(`Already patched: ${filePath}`);
    patched++;
    continue;
  }

  const oldSortFn = `sortFn: (a2, b2) => {`;
  if (content.includes(oldSortFn)) {
    content = content.replace(oldSortFn, customSortFn);
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
