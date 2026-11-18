import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import vm from "node:vm";

const bundle = readFileSync(new URL("../.quartz/plugins/explorer/dist/index.js", import.meta.url), "utf8");
const source = bundle.match(/mapFn: (\(node\) => \{\s*\/\* notes-navigation:start \*\/[\s\S]*?\/\* notes-navigation:end \*\/\s*\}),/)[1];
const map = vm.runInNewContext(`(${source})`);
class Node {
  constructor(slugSegments, data) {
    Object.assign(this, { slugSegments, data, children: [], isFolder: false });
  }
  get slugSegment() { return this.slugSegments.at(-1); }
  map(fn) { fn(this); this.children.forEach(child => child.map(fn)); }
}
const root = new Node([], null);
const oldNotes = new Node(["笔记-notes@ustc"], null);
oldNotes.children.push(new Node(["old-page"], { slug: "old-page" }));
const other = new Node(["研究"], { slug: "研究" });
root.children.push(oldNotes, other);
root.map(map);
assert.equal(root.children.length, 2);
assert.equal(root.children[1], other);
assert.equal(oldNotes.children.length, 2);
const courses = oldNotes.children.flatMap(term => term.children);
assert.equal(courses.length, 8);
const html = readFileSync(new URL("../public/笔记.html", import.meta.url), "utf8");
assert.ok(html.includes('data-behavior="collapse"'), "Semester folders must expand on click");
for (const course of courses) {
  assert.equal(course.isFolder, false);
  assert.equal(course.children.length, 0);
  const anchor = course.data.slug.split("#")[1];
  assert.ok(html.includes(`id="${anchor}"`), `Missing course anchor: ${anchor}`);
  assert.ok(html.includes("notes-navigation:start"), "Navigation missing from generated page");
  console.log(`${course.slugSegments[1]} / ${course.data.title} -> ${course.data.slug}`);
}
root.map(map);
assert.equal(root.children.length, 2, "Repeated render must not duplicate navigation");
assert.equal(oldNotes.children.flatMap(term => term.children).length, 8);
console.log("PASS: 2 semesters, 8 course links, all built anchors exist, repeat-safe.");
