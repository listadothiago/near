import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const script = resolve('scripts/discover-audit.mjs');
const image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aWQAAAABJRU5ErkJggg==';
function run(args, meta, type = 'places') {
  const cwd = mkdtempSync(join(tmpdir(), 'near-discover-test-'));
  try {
    mkdirSync(join(cwd, 'content', type, 'example'), { recursive: true });
    writeFileSync(join(cwd, 'content', type, 'example', 'meta.json'), JSON.stringify(meta));
    const result = spawnSync(process.execPath, [script, ...args, '--report-dir', 'report'], { cwd, encoding: 'utf8' });
    let rows;
    try { rows = JSON.parse(readFileSync(join(cwd, 'report/discover-audit.json'), 'utf8')); } catch {}
    return { ...result, rows };
  } finally { rmSync(cwd, { recursive: true, force: true }); }
}
test('draft image is inspected without activation', () => {
  const result = run(['--slugs', 'example', '--include-drafts'], { status: 'draft', heroImage: { url: image } });
  assert.equal(result.rows.length, 1);
  assert.equal(result.rows[0].width, 1);
  assert.match(result.rows[0].reason, /width 1px/);
  assert.equal(result.status, 1);
});
test('explicitly selected excluded draft cannot yield a clean empty pass', () => {
  const result = run(['--slugs', 'example'], { status: 'draft', heroImage: { url: image } });
  assert.equal(result.status, 1);
  assert.match(result.rows[0].reason, /excluded/);
});
test('unknown requested slug fails visibly', () => {
  const result = run(['--slugs', 'missing'], { status: 'active' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unknown requested slugs: missing/);
});
test('collection uses coverImage and draft support', () => {
  const result = run(['--type', 'collections', '--slugs', 'example', '--include-drafts'], { status: 'draft', coverImage: { url: image } }, 'collections');
  assert.equal(result.rows[0].width, 1);
  assert.doesNotMatch(result.rows[0].reason, /no hero/);
});
test('empty active catalogue cannot pass', () => {
  const result = run([], { status: 'draft' });
  assert.equal(result.status, 1);
  assert.deepEqual(result.rows, []);
});
