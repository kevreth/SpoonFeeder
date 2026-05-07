#!/usr/bin/env node
/**
 * Phase 2 scanner: finds direct localStorage/sessionStorage/WebStorageVariable/WebStorageFlag
 * usage outside the StorageAdapter layer. Zero output = Phase 3 gate passed.
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const ROOT = new URL('../src/ts', import.meta.url).pathname;
const EXEMPT_PATHS = [
  'main/infrastructure/storage',
  'main/dataaccess/persistence/webPersistence', // legacy layer — migrated in Phase 3
];

const PATTERNS = [
  /\blocalStorage\s*\.\s*(getItem|setItem|removeItem|clear|key)\b/,
  /\bsessionStorage\s*\.\s*(getItem|setItem|removeItem|clear|key)\b/,
  /\bnew\s+WebStorageVariable\b/,
  /\bnew\s+WebStorageFlag\b/,
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
    } else if (entry.endsWith('.ts') && !entry.endsWith('.test.ts')) {
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
    for (const pattern of PATTERNS) {
      if (pattern.test(line)) {
        console.log(`${relative(ROOT, file)}:${i + 1}: ${line.trim()}`);
        violations++;
      }
    }
  });
}

if (violations === 0) {
  console.log('storage-key-audit: no violations found ✓');
} else {
  console.log(`\nstorage-key-audit: ${violations} violation(s) found`);
  process.exit(1);
}
