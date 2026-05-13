export type InvariantSeverity = 'low' | 'high' | 'critical';

export type InvariantSubsystem =
  | 'storage'
  | 'lifecycle'
  | 'quiz'
  | 'spoony'
  | 'boot'
  | 'invariant';

export type Invariant = {
  id: string;
  subsystem: InvariantSubsystem;
  description: string;
  severity: InvariantSeverity;
  check: () => void | Promise<void>;
};

export type InvariantViolation = {
  invariantId: string;
  subsystem: InvariantSubsystem;
  severity: InvariantSeverity;
  message: string;
  timestamp: number;
};
