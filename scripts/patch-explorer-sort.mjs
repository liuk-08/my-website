import { readFileSync, writeFileSync } from 'node:fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import Slugger from 'github-slugger';
import { slugifyFilePath } from '@quartz-community/utils/path';

// Match Quartz's heading text and anchor generation, including duplicate headings.
function sections(page, includeCourses) {
  const text = readFileSync(new URL(`../content/${page}.md`, import.meta.url), 'utf8');
  const tree = unified().use(remarkParse).parse(text.replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, ''));
  const slugger = new Slugger();
  const result = [];
  visit(tree, 'heading', heading => {
    const label = toString(heading);
    const anchor = slugger.slug(label);
    const item = { label, href: `${slugifyFilePath(page + '.md')}.html#${anchor}` };
    if (heading.depth === 2) result.push(item);
    if (includeCourses && heading.depth === 3 && result.length) {
      (result.at(-1).children ??= []).push(item);
    }
  });
  return result;
}

const notes = ['Notes', 'Notes@USTC'].map(label => {
  const page = `笔记/${label}`;
  return { label, href: `${slugifyFilePath(page + '.md')}.html`, children: sections(page, label === 'Notes@USTC') };
});
const topic = sections('研究', false).find(item => item.label === '量子精密测量x暗物质探测');
if (!topic) throw new Error('Missing research topic heading');
const navigation = [
  { label: '笔记', href: '笔记.html', children: notes },
  { label: '研究', href: '研究.html', children: [topic] },
];

// Explorer serializes mapFn into each page, so all its data must be self-contained.
const mapFn = `mapFn: (node) => {
    /* notes-navigation:start */
    if (node.slugSegments.length === 0) {
      const makeNode = (item, order) => {
        const child = new node.constructor([item.href], { slug: item.href, title: item.label });
        child.navigationOrder = order;
        child.children = (item.children || []).map(makeNode);
        child.isFolder = child.children.length > 0;
        // Explorer normally adds /index to folder links. Link these branches to their articles.
        Object.defineProperty(child, 'slug', { value: item.href });
        return child;
      };
      node.children = ${JSON.stringify(navigation)}.map(makeNode);
    }
    return node;
    /* notes-navigation:end */
  },`;
const sortFn = `sortFn: (a2, b2) => {
    /* source-order:start */
    return a2.navigationOrder - b2.navigationOrder;
    /* source-order:end */
  },`;
const mapPattern = /mapFn: \(node\) => \{\s*(?:\/\* notes-navigation:start \*\/[\s\S]*?\/\* notes-navigation:end \*\/|return node;)\s*\},/;
const sortPattern = /sortFn: \(a2, b2\) => \{[\s\S]*?\r?\n  \},(?=\r?\n  filterFn:)/;
for (const filename of ['index.js', 'components/index.js']) {
  const file = new URL(`../.quartz/plugins/explorer/dist/${filename}`, import.meta.url);
  const bundle = readFileSync(file, 'utf8');
  if (!mapPattern.test(bundle) || !sortPattern.test(bundle)) throw new Error(`Explorer API changed: ${filename}`);
  const patched = bundle.replace(mapPattern, () => mapFn).replace(sortPattern, () => sortFn);
  if (patched !== bundle) writeFileSync(file, patched);
}
console.log('Explorer navigation prepared for both plugin entry points.');
