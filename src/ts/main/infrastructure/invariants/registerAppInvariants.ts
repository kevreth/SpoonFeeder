/**
 * Wires quiz and lifecycle invariants into the app invariant registry.
 * Called from the Vue boot layer (src/boot/) rather than from storageInit.ts
 * to avoid the circular dependency:
 *   storageInit → quizChecks → saveData → webStorage → storageInit
 */
import { appInvariantRegistry } from '../../infrastructure/storage/storageInit';
import { registerQuizInvariants } from './checks/quizChecks';
import { registerLifecycleInvariants } from './checks/lifecycleChecks';

export function registerAppInvariants(): void {
  registerQuizInvariants(appInvariantRegistry);
  registerLifecycleInvariants(appInvariantRegistry);
}
