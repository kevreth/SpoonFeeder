#!/usr/bin/env node
/**
 * Phase 2 scanner: finds security-sensitive patterns in source files.
 * Flags: eval, new Function, innerHTML assignments, hardcoded secrets/API-key-shaped strings.
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const ROOT = new URL('../src/ts', import.meta.url).pathname;
const EXEMPT_PATHS: string[] = [
  'test/', // test files may have intentional patterns
];

const PATTERNS: Array<{ pattern: RegExp; label: string; severity: 'error' | 'warn' }> = [
  { pattern: /\beval\s*\(/, label: 'eval()', severity: 'error' },
  { pattern: /\bnew\s+Function\s*\(/, label: 'new Function()', severity: 'error' },
  { pattern: /\.innerHTML\s*=(?!=)/, label: 'innerHTML assignment', severity: 'warn' },
  { pattern: /\.outerHTML\s*=(?!=)/, label: 'outerHTML assignment', severity: 'warn' },
  { pattern: /\bdocument\.write\s*\(/, label: 'document.write()', severity: 'error' },
  // Hardcoded API key patterns: 20+ alphanumeric chars assigned to a variable with key/secret/token in name
  {
    pattern: /(?:api[_-]?key|secret|token|password)\s*[=:]\s*['"][A-Za-z0-9+/=_-]{20,}['"]/i,
    label: 'possible hardcoded secret',
    severity: 'error',
  },
  { pattern: /\bprototype\[/, label: 'prototype pollution risk', severity: 'warn' },
  { pattern: /__proto__\s*[=[]/, label: '__proto__ mutation risk', severity: 'error' },
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

let errors = 0;
let warnings = 0;
for (const file of walk(ROOT)) {
  if (isExempt(file)) continue;
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (line.trimStart().startsWith('//') || line.trimStart().startsWith('*')) return;
    for (const { pattern, label, severity } of PATTERNS) {
      if (pattern.test(line)) {
        const tag = severity === 'error' ? 'ERROR' : 'WARN';
        console.log(`[${tag}] ${relative(ROOT, file)}:${i + 1} [${label}]: ${line.trim()}`);
        if (severity === 'error') errors++;
        else warnings++;
      }
    }
  });
}

if (errors === 0 && warnings === 0) {
  console.log('security-scan: no issues found ✓');
} else {
  console.log(`\nsecurity-scan: ${errors} error(s), ${warnings} warning(s)`);
  if (errors > 0) process.exit(1);
}
