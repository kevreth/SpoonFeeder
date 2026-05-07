import { describe, expect, it } from 'vitest';
import { FakeClock } from '../../main/infrastructure/clocks/FakeClock';
import { timestampNow } from '../../main/dataaccess/saveData/date';
import { TEST_NOW } from '../support/deterministic-setup';

// TEST_NOW = 1715083200000 = 2024-05-07T12:00:00.000Z
// UTCMonth is 0-indexed: May = 4
// Expected: year=2024, month=04, day=07, hour=12, min=00, sec=00 => '20240407120000'

describe('timestampNow', () => {
  it('formats clock.now() as a UTC timestamp string', () => {
    const clock = new FakeClock();
    clock.reset(TEST_NOW);
    expect(timestampNow(clock)).toBe('20240407120000');
  });

  it('advances with clock.tick()', () => {
    const clock = new FakeClock();
    clock.reset(TEST_NOW);
    clock.tick(61_000); // +61 seconds => :01:01
    expect(timestampNow(clock)).toBe('20240407120101');
  });

  it('returns epoch zero correctly', () => {
    const clock = new FakeClock();
    clock.reset(0); // 1970-01-01T00:00:00Z, UTCMonth=0
    expect(timestampNow(clock)).toBe('19700001000000');
  });

  it('pads single-digit fields', () => {
    const clock = new FakeClock();
    // 2024-01-05T03:04:05Z
    clock.reset(new Date('2024-01-05T03:04:05Z').getTime());
    expect(timestampNow(clock)).toBe('20240005030405');
  });
});
