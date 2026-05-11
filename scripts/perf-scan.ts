#!/usr/bin/env node
/**
 * Phase 2 scanner: finds performance anti-patterns.
 * Flags: unbounded while/for loops, synchronous blocking in async functions.
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const ROOT = new URL('../src/ts/main', import.meta.url).pathname;

const PATTERNS: Array<{ pattern: RegExp; label: string }> = [
  { pattern: /\bwhile\s*\(\s*true\s*\)/, label: 'unbounded while(true)' },
  { pattern: /\bfor\s*\(\s*;\s*;\s*\)/, label: 'unbounded for(;;)' },
  { pattern: /\bJSON\.parse\b/, label: 'JSON.parse (verify not in async hot path)' },
];

function walk(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory() && !entry.startsWith('.')) {
      results.push(...walk(full));
    } else if (entry.endsWith('.ts') && !entry.endsWith('.test.ts')) {
      results.push(full);
    }
  }
  return results;
}

let issues = 0;
for (const file of walk(ROOT)) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (line.trimStart().startsWith('//') || line.trimStart().startsWith('*')) return;
    for (const { pattern, label } of PATTERNS) {
      if (pattern.test(line)) {
        console.log(`${relative(ROOT, file)}:${i + 1} [${label}]: ${line.trim()}`);
        issues++;
      }
    }
  });
}

if (issues === 0) {
  console.log('perf-scan: no issues found ✓');
} else {
  console.log(`\nperf-scan: ${issues} issue(s) found — review manually`);
}
