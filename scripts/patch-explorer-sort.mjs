import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import GithubSlugger from "github-slugger";

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

// Derive navigation from the existing summary, including PDF-only courses.
const notes = readFileSync(join(__dirname, "..", "content", "笔记.md"), "utf-8");
const slugger = new GithubSlugger();
const semesters = [];
let semester;
for (const line of notes.split(/\r?\n/)) {
  const heading = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
  if (!heading) continue;
  const anchor = slugger.slug(heading[2]);
  if (heading[1] === "##") {
    semester = { title: heading[2], anchor, courses: [] };
    semesters.push(semester);
  } else if (heading[1] === "###" && semester) {
    semester.courses.push({ title: heading[2], anchor });
  }
}
if (!semesters.length || semesters.some((term) => !term.courses.length)) {
  throw new Error("Expected semester and course headings in the notes summary");
}
const navigationMap = `mapFn: (node) => {
    /* notes-navigation:start */
    if (node.slugSegments.length === 0) {
      const Node = node.constructor;
      let root = node.children.find((child) => child.slugSegment === "笔记-notes@ustc");
      if (!root) {
        root = new Node(["笔记-notes@ustc"], null);
        node.children.push(root);
      }
      root.isFolder = true;
      root.displayName = "笔记 Notes@USTC";
      root.children = ${JSON.stringify(semesters)}.map((term) => {
        const branch = new Node([...root.slugSegments, term.title], null);
        branch.isFolder = true;
        branch.displayName = term.title;
        branch.children = term.courses.map((course) => {
          const leaf = new Node([...branch.slugSegments, course.title], {
            slug: "笔记#" + course.anchor, title: course.title
          });
          return leaf;
        });
        return branch;
      });
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
