import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { resolveBasePath, simplifySlug } from '@quartz-community/utils/path';
import { slug } from 'github-slugger';
import { parse } from 'yaml';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const plugin = '.quartz/plugins/explorer';
const client = read(`${plugin}/src/components/scripts/explorer.inline.ts`);
const trieClass = client.match(/class FileTrieNode \{[\s\S]*?\n\}/)[0];
const FileTrieNode = vm.runInNewContext(`(${trieClass})`);
const config = parse(read('quartz.config.yaml'));
const getPlugin = name => config.plugins.find(p => p.source.endsWith('/' + name));
assert.equal(getPlugin('explorer').options.folderClickBehavior, 'link');
assert.equal(getPlugin('table-of-contents').layout.position, 'right');
assert.equal(getPlugin('table-of-contents').enabled, true);
const titles = n => Array.from(n.children, c => c.displayName);
const headings = (name, depth) => Array.from(read(`content/笔记/${name}.md`).matchAll(new RegExp(`^#{${depth}} (.+?)\\s*$`, 'gm')), m => m[1]);
const sourceOnly = process.argv.includes('--source-only');
for (const filename of ['index.js', 'components/index.js']) {
  const bundle = read(`${plugin}/dist/${filename}`);
  const extract = (key, marker) => {
    const expr = bundle.match(new RegExp(`${key}: (\\([^)]*\\) => \\{\\s*/\\* ${marker}:start \\*/[\\s\\S]*?/\\* ${marker}:end \\*/\\s*\\}),`))[1];
    return vm.runInNewContext(`(${expr})`);
  };
  const map = extract('mapFn', 'notes-navigation');
  const sort = extract('sortFn', 'source-order');
  const root = FileTrieNode.fromEntries([['extra', { slug: 'extra', title: '资料' }]]);
  root.map(map);
  root.map(map);
  root.map(node => node.children.reverse());
  root.sort(sort);
  assert.deepEqual(titles(root), ['笔记', '研究']);
  const [notes, research] = root.children;
  assert.deepEqual(titles(notes), ['Notes', 'Notes@USTC']);
  const [subjects, terms] = notes.children;
  assert.equal(subjects.slug, '笔记/notes.html');
  assert.equal(terms.slug, '笔记/notes@ustc.html');
  assert.deepEqual(titles(subjects), headings('Notes', 2));
  assert.deepEqual(titles(terms), headings('Notes@USTC', 2));
  assert.deepEqual(Array.from(terms.children).flatMap(titles), headings('Notes@USTC', 3));
  assert.deepEqual(titles(research), ['量子精密测量x暗物质探测']);
  assert.equal(research.children[0].slug, '研究.html#量子精密测量x暗物质探测');
  for (const [page, sections] of [[subjects.slug, subjects.children], [terms.slug, terms.children]]) {
    for (const item of sections) {
      for (const entry of [item, ...item.children]) assert.equal(entry.slug, `${page}#${slug(entry.displayName)}`);
    }
  }
  root.map(node => {
    if (node === root) return;
    const href = node.isFolder ? simplifySlug(node.slug) : node.data.slug;
    assert.equal(resolveBasePath(href, '/my-website'), `/my-website/${node.slug}`);
    if (sourceOnly) return;
    const [path, anchor] = href.split('#');
    const html = read(`public/${path}`);
    if (anchor) assert.ok(html.includes(`id="${anchor}"`), `Missing target ${href}`);
    if (path === subjects.slug || path === terms.slug) assert.ok(html.includes('class="toc'), `Missing TOC in ${path}`);
    assert.ok(html.includes('notes-navigation:start') && html.includes('data-behavior="link"'), `Missing Explorer in ${path}`);
  });
}
console.log(sourceOnly ? 'PASS: both Explorer entry points, source order, page links and anchors.' : 'PASS: Explorer tree, generated pages, heading IDs and article TOCs.');
