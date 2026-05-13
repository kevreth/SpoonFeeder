import { z } from 'zod';

export const TelemetryEventSchema = z.object({
  traceId: z.string(),
  parentTraceId: z.string().optional(),
  subsystem: z.enum(['storage', 'lifecycle', 'quiz', 'spoony', 'boot', 'invariant']),
  event: z.string(),
  timestamp: z.number(),
  platform: z.enum(['web', 'android']),
  metadata: z.record(z.string(), z.unknown()).optional(),
  severity: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  patchId: z.string().optional(),
});

export type TelemetryEvent = z.infer<typeof TelemetryEventSchema>;

export type TelemetryEventInput = {
  traceId: string;
  parentTraceId?: string;
  subsystem: TelemetryEvent['subsystem'];
  event: string;
  timestamp?: number;
  platform: TelemetryEvent['platform'];
  metadata?: Record<string, unknown>;
  severity?: TelemetryEvent['severity'];
  patchId?: string;
};
