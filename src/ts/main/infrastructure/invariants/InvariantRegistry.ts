import type { Clock } from '../clocks/Clock';
import type { TelemetryBus } from '../telemetry/TelemetryBus';
import type { Invariant, InvariantSubsystem, InvariantViolation } from './types';

export class InvariantRegistry {
  private invariants: Invariant[] = [];
  private violations: InvariantViolation[] = [];

  constructor(
    private clock: Clock,
    private platform: 'web' | 'android',
    private telemetry?: TelemetryBus
  ) {}

  register(inv: Invariant): void {
    this.invariants.push(inv);
  }

  async assertAll(options?: {
    subsystem?: InvariantSubsystem;
    throwOnViolation?: boolean;
  }): Promise<void> {
    const subset =
      options?.subsystem !== undefined
        ? this.invariants.filter((i) => i.subsystem === options.subsystem)
        : this.invariants;

    for (const inv of subset) {
      try {
        await inv.check();
      } catch (e) {
        const violation: InvariantViolation = {
          invariantId: inv.id,
          subsystem: inv.subsystem,
          severity: inv.severity,
          message: e instanceof Error ? e.message : String(e),
          timestamp: this.clock.now(),
        };
        this.violations.push(violation);
        this.telemetry?.emit({
          traceId: `inv-${inv.id}`,
          subsystem: 'invariant',
          event: 'invariant_violation',
          timestamp: this.clock.now(),
          platform: this.platform,
          severity: inv.severity === 'critical' ? 'error' : 'warn',
          metadata: { invariantId: inv.id, message: violation.message },
        });
        if (options?.throwOnViolation !== false) throw e;
      }
    }
  }

  getViolations(): InvariantViolation[] {
    return [...this.violations];
  }

  clearViolations(): void {
    this.violations = [];
  }
}
