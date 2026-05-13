#!/usr/bin/env node
/**
 * Phase 5: Differential replay pipeline.
 *
 * Compares storage snapshots produced by the E2E suite against a committed baseline.
 * Used to detect storage-layer regressions introduced by AI patches.
 *
 * Modes:
 *   --record   Run Cypress, write snapshots to cypress/replay/baselines/
 *   --diff     Run Cypress, diff snapshots against baselines, report deviations
 *
 * Exit codes:
 *   0  No deviations (diff mode) or baseline recorded successfully (record mode)
 *   1  Deviations detected or Cypress failed
 */
import { execSync } from 'child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import diff from 'microdiff';

const ROOT = new URL('..', import.meta.url).pathname;
const BASELINES_DIR = join(ROOT, 'cypress', 'replay', 'baselines');
const SNAPSHOT_FILE = join(ROOT, 'cypress', 'replay', 'current-snapshot.json');
const BASELINE_FILE = join(BASELINES_DIR, 'example.cy.json');

interface StorageSnapshot {
  local: Record<string, string | null>;
  session: Record<string, string | null>;
}

interface ReplayReport {
  timestamp: number;
  mode: 'record' | 'diff';
  deviations: number;
  details: ReturnType<typeof diff>;
}

function runCypress(): void {
  try {
    execSync('npx cypress run -q --env recordSnapshot=true', {
      stdio: 'inherit',
      cwd: ROOT,
    });
  } catch {
    console.error('Cypress run failed — see output above');
    process.exit(1);
  }
}

function loadSnapshot(path: string): StorageSnapshot {
  if (!existsSync(path)) {
    console.error(`Snapshot file not found: ${path}`);
    console.error('Run with --record first to create a baseline.');
    process.exit(1);
  }
  return JSON.parse(readFileSync(path, 'utf8')) as StorageSnapshot;
}

const args = process.argv.slice(2);
const mode = args.includes('--record') ? 'record' : 'diff';

if (mode === 'record') {
  console.log('differential-replay: recording baseline…');
  runCypress();

  if (!existsSync(SNAPSHOT_FILE)) {
    console.error(`Snapshot file not written by Cypress run: ${SNAPSHOT_FILE}`);
    console.error('Ensure cy.snapshotStorage() writes to this path in the spec.');
    process.exit(1);
  }

  mkdirSync(BASELINES_DIR, { recursive: true });
  const snapshot = loadSnapshot(SNAPSHOT_FILE);
  writeFileSync(BASELINE_FILE, JSON.stringify(snapshot, null, 2));
  console.log(`differential-replay: baseline saved to ${BASELINE_FILE} ✓`);
  process.exit(0);
}

// diff mode
console.log('differential-replay: running E2E and diffing against baseline…');
runCypress();

if (!existsSync(SNAPSHOT_FILE)) {
  console.error(`Snapshot file not written by Cypress run: ${SNAPSHOT_FILE}`);
  process.exit(1);
}

const baseline = loadSnapshot(BASELINE_FILE);
const current = loadSnapshot(SNAPSHOT_FILE);

const deviations = diff(baseline, current);
const report: ReplayReport = {
  timestamp: Date.now(),
  mode: 'diff',
  deviations: deviations.length,
  details: deviations,
};

console.log(JSON.stringify(report, null, 2));

if (deviations.length === 0) {
  console.log('\ndifferential-replay: no deviations found ✓');
  process.exit(0);
} else {
  console.log(`\ndifferential-replay: ${deviations.length} deviation(s) detected`);
  process.exit(1);
}
