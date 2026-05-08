#!/usr/bin/env node
/**
 * Phase 5: AI patch validation pipeline.
 * Runs all static scanners and type/lint checks against the current working tree.
 * Outputs structured JSON conforming to PatchValidationReport.
 *
 * Usage:
 *   node scripts/ai-patch-validate.ts [--json] [--fail-fast]
 *
 * Exit codes:
 *   0  All rules passed
 *   1  One or more rules failed
 */
import { execSync } from 'child_process';

type RuleStatus = 'pass' | 'fail' | 'error';

interface RuleResult {
  ruleId: string;
  description: string;
  status: RuleStatus;
  durationMs: number;
  output: string;
}

interface PatchValidationReport {
  timestamp: number;
  passed: boolean;
  failedRules: string[];
  results: RuleResult[];
}

const RULES: Array<{ id: string; description: string; command: string }> = [
  {
    id: 'type-check',
    description: 'TypeScript type checking (vue-tsc)',
    command: 'yarn type-check',
  },
  {
    id: 'lint',
    description: 'ESLint static analysis',
    command: 'yarn lint --max-warnings 0',
  },
  {
    id: 'scan:storage',
    description: 'No direct localStorage/sessionStorage access outside StorageAdapter',
    command: 'node scripts/storage-key-audit.ts',
  },
  {
    id: 'scan:sideeffects',
    description: 'No bare Date.now()/setTimeout outside infrastructure layer',
    command: 'node scripts/side-effect-scanner.ts',
  },
  {
    id: 'scan:security',
    description: 'No eval/innerHTML/hardcoded secrets',
    command: 'node scripts/security-scan.ts',
  },
  {
    id: 'scan:deps',
    description: 'No circular imports or forbidden layer crossings',
    command: 'npx dependency-cruiser --config analysis/dependency-cruiser.config.cjs src/ts',
  },
  {
    id: 'test:unit',
    description: 'All unit and property tests pass',
    command: 'yarn test:unit',
  },
];

const args = process.argv.slice(2);
const outputJson = args.includes('--json');
const failFast = args.includes('--fail-fast');

function run(command: string): { stdout: string; exitCode: number } {
  try {
    const stdout = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    return { stdout: stdout.trim(), exitCode: 0 };
  } catch (err: unknown) {
    const e = err as { stdout?: string; stderr?: string; status?: number };
    const combined = [e.stdout ?? '', e.stderr ?? ''].filter(Boolean).join('\n').trim();
    return { stdout: combined, exitCode: e.status ?? 1 };
  }
}

const results: RuleResult[] = [];
let anyFailed = false;

for (const rule of RULES) {
  if (!outputJson) {
    process.stdout.write(`  running ${rule.id}… `);
  }
  const start = Date.now();
  const { stdout, exitCode } = run(rule.command);
  const durationMs = Date.now() - start;
  const status: RuleStatus = exitCode === 0 ? 'pass' : 'fail';

  results.push({ ruleId: rule.id, description: rule.description, status, durationMs, output: stdout });

  if (!outputJson) {
    console.log(status === 'pass' ? '✓' : `✗  (exit ${exitCode})`);
  }

  if (status !== 'pass') {
    anyFailed = true;
    if (failFast) break;
  }
}

const report: PatchValidationReport = {
  timestamp: Date.now(),
  passed: !anyFailed,
  failedRules: results.filter((r) => r.status !== 'pass').map((r) => r.ruleId),
  results,
};

if (outputJson) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log('');
  if (report.passed) {
    console.log('ai-patch-validate: all rules passed ✓');
  } else {
    console.log(`ai-patch-validate: ${report.failedRules.length} rule(s) failed: ${report.failedRules.join(', ')}`);
    for (const r of results.filter((x) => x.status !== 'pass')) {
      console.log(`\n--- ${r.ruleId} output ---`);
      console.log(r.output.slice(0, 2000));
    }
  }
}

process.exit(anyFailed ? 1 : 0);
