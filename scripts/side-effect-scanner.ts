#!/usr/bin/env node
/**
 * Phase 2 scanner: finds direct Date.now(), Math.random(), setTimeout, clearTimeout, setInterval
 * calls outside the infrastructure/clocks and infrastructure/random directories.
 * Zero output in migrated subsystems = Phase 4 gate passed for those subsystems.
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const ROOT = new URL('../src/ts', import.meta.url).pathname;
const EXEMPT_PATHS = [
  'main/infrastructure/clocks',
  'main/infrastructure/random',
  'test/', // test files may use these intentionally
];

const PATTERNS: Array<{ pattern: RegExp; label: string }> = [
  { pattern: /\bDate\.now\s*\(\)/, label: 'Date.now()' },
  { pattern: /\bMath\.random\s*\(\)/, label: 'Math.random()' },
  { pattern: /\bsetTimeout\s*\(/, label: 'setTimeout' },
  { pattern: /\bclearTimeout\s*\(/, label: 'clearTimeout' },
  { pattern: /\bsetInterval\s*\(/, label: 'setInterval' },
  { pattern: /\bclearInterval\s*\(/, label: 'clearInterval' },
];

function isExempt(filePath: string): boolean {
  const rel = relative(ROOT, filePath).replace(/\\/g, '/');
  return EXEMPT_PATHS.some((e) => rel.includes(e));
}

function walk(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
      results.push(...walk(full));
    } else if (entry.endsWith('.ts')) {
      results.push(full);
    }
  }
  return results;
}

let violations = 0;
for (const file of walk(ROOT)) {
  if (isExempt(file)) continue;
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    // Skip comment lines
    if (line.trimStart().startsWith('//') || line.trimStart().startsWith('*')) return;
    for (const { pattern, label } of PATTERNS) {
      if (pattern.test(line)) {
        console.log(`${relative(ROOT, file)}:${i + 1} [${label}]: ${line.trim()}`);
        violations++;
      }
    }
  });
}

if (violations === 0) {
  console.log('side-effect-scanner: no violations found ✓');
} else {
  console.log(`\nside-effect-scanner: ${violations} violation(s) found`);
  process.exit(1);
}
