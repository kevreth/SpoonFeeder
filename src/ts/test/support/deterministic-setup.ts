import { beforeEach, afterEach } from 'vitest';
import { FakeClock } from '../../main/infrastructure/clocks/FakeClock';
import { FakeRng } from '../../main/infrastructure/random/FakeRng';

export const TEST_SEED = 42;
// 2024-05-07T12:00:00Z — fixed epoch for all deterministic tests
export const TEST_NOW = 1715083200000;

export const testClock = new FakeClock();
export const testRng = new FakeRng();

beforeEach(() => {
  testClock.reset(TEST_NOW);
  testRng.seed(TEST_SEED);
});

afterEach(() => {
  testClock.reset();
});
