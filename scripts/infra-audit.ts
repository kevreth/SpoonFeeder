#!/usr/bin/env node
/**
 * Phase 6: Infrastructure self-consistency audit.
 *
 * Scans only src/ts/main/infrastructure/ with stricter rules than the full-codebase
 * scanners: within the infrastructure layer, each "raw" API (Date.now, Math.random,
 * localStorage) must only appear in its designated implementation file.
 *
 * Rules:
 *   - Date.now() / window.setTimeout / clearTimeout — only in clocks/RealClock.ts
 *   - Math.random()                                 — only in random/RealRng.ts
 *   - localStorage / sessionStorage                 — only in storage/WebStorageAdapter.ts
 *                                                     and storage/SyncStorageAdapter.ts
 *   - eval / new Function(...)                      — forbidden everywhere in infrastructure
 *   - innerHTML assignments                         — forbidden in infrastructure
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const INFRA_ROOT = new URL('../src/ts/main/infrastructure', import.meta.url).pathname;

interface Rule {
  pattern: RegExp;
  label: string;
  allowedFiles: string[]; // relative paths from INFRA_ROOT; empty = forbidden everywhere
}

const RULES: Rule[] = [
  {
    pattern: /\bDate\.now\s*\(\)/,
    label: 'Date.now()',
    allowedFiles: ['clocks/RealClock.ts'],
  },
  {
    // Bare setTimeout call — not a method declaration (those appear as `setTimeout(fn` with type params)
    // Allowed in: RealClock (implementation), Clock interface, FakeClock (implementation)
    pattern: /(?<!\.)(?<!\w)\bsetTimeout\s*\(/,
    label: 'setTimeout()',
    allowedFiles: ['clocks/RealClock.ts', 'clocks/Clock.ts', 'clocks/FakeClock.ts'],
  },
  {
    pattern: /(?<!\.)(?<!\w)\bclearTimeout\s*\(/,
    label: 'clearTimeout()',
    allowedFiles: ['clocks/RealClock.ts', 'clocks/Clock.ts', 'clocks/FakeClock.ts'],
  },
  {
    pattern: /(?<!\.)(?<!\w)\bsetInterval\s*\(/,
    label: 'setInterval()',
    allowedFiles: ['clocks/RealClock.ts'],
  },
  {
    pattern: /\bMath\.random\s*\(\)/,
    label: 'Math.random()',
    allowedFiles: ['random/RealRng.ts'],
  },
  {
    // localStorage/sessionStorage: permitted in adapters, factory, storageInit, and storageChecks
    // (invariant checks intentionally read raw storage to validate its state)
    pattern: /\blocalStorage\b/,
    label: 'localStorage',
    allowedFiles: [
      'storage/WebStorageAdapter.ts',
      'storage/SyncStorageAdapter.ts',
      'storage/storageInit.ts',
      'storage/factory.ts',
      'invariants/checks/storageChecks.ts',
    ],
  },
  {
    pattern: /\bsessionStorage\b/,
    label: 'sessionStorage',
    allowedFiles: [
      'storage/WebStorageAdapter.ts',
      'storage/SyncStorageAdapter.ts',
      'storage/storageInit.ts',
      'storage/factory.ts',
      'invariants/checks/storageChecks.ts',
    ],
  },
  {
    pattern: /\beval\s*\(/,
    label: 'eval()',
    allowedFiles: [],
  },
  {
    pattern: /new\s+Function\s*\(/,
    label: 'new Function()',
    allowedFiles: [],
  },
  {
    pattern: /\.innerHTML\s*=/,
    label: 'innerHTML assignment',
    allowedFiles: [],
  },
];

function walk(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (!entry.startsWith('.') && entry !== 'node_modules') results.push(...walk(full));
    } else if (entry.endsWith('.ts') && !entry.endsWith('.test.ts')) {
      results.push(full);
    }
  }
  return results;
}

let violations = 0;

for (const file of walk(INFRA_ROOT)) {
  const rel = relative(INFRA_ROOT, file).replace(/\\/g, '/');
  const lines = readFileSync(file, 'utf8').split('\n');

  lines.forEach((line, i) => {
    if (line.trimStart().startsWith('//') || line.trimStart().startsWith('*')) return;
    for (const rule of RULES) {
      if (!rule.pattern.test(line)) continue;
      if (rule.allowedFiles.includes(rel)) continue;
      console.log(`infrastructure/${rel}:${i + 1} [${rule.label}]: ${line.trim()}`);
      violations++;
    }
  });
}

if (violations === 0) {
  console.log('infra-audit: no violations found ✓');
} else {
  console.log(`\ninfra-audit: ${violations} violation(s) found`);
  process.exit(1);
}
