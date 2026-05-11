import type { InvariantRegistry } from '../InvariantRegistry';

/**
 * Lifecycle invariants are registered during development builds.
 * In production, these are no-ops to avoid performance overhead.
 */
export function registerLifecycleInvariants(registry: InvariantRegistry): void {
  registry.register({
    id: 'lifecycle.no-write-after-teardown',
    subsystem: 'lifecycle',
    description: 'No storage write occurs after component onUnmounted',
    severity: 'high',
    check: () => {
      // Placeholder: full implementation requires instrumenting Vue's onUnmounted
      // lifecycle hook in each migrated composable to set a "torn-down" flag.
      // When the flag is set, any StorageAdapter write in that scope throws here.
      // Implemented per-composable in Phase 4.
    },
  });
}
