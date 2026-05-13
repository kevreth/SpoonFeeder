/**
 * Property tests for sendMessage / buildSystemPrompt.
 *
 * Covers invariants over arbitrary inputs — message history size,
 * user message length, context substitution, and result type safety.
 */
import { afterEach, describe, expect, it } from 'vitest';
import { vi } from 'vitest';
import { FakeClock } from '../../main/infrastructure/clocks/FakeClock';
import {
  buildSystemPrompt,
  sendMessage,
  SpoonyErrorType,
} from '../../main/spoony/spoonyApi';
import type { SendMessageParams, SpoonyContext } from '../../main/spoony/spoonyApi';
import type { SpoonyMessage } from '../../main/spoony/spoony.types';

const MAX_USER_MESSAGE_LENGTH = 500;

const baseContext: SpoonyContext = {
  courseName: 'Test Course',
  unitName: 'Unit 1',
  lessonName: 'Lesson 1',
  moduleName: 'Module 1',
  slideText: 'slide text',
  infoSlides: [],
};

const baseParams: SendMessageParams = {
  apiKey: 'test-key',
  model: 'test-model',
  context: baseContext,
  history: [],
  userMessage: 'Hello',
};

function makeHistory(n: number): SpoonyMessage[] {
  return Array.from({ length: n }, (_, i) => ({
    role: i % 2 === 0 ? ('user' as const) : ('assistant' as const),
    content: `msg-${i}`,
    timestamp: 1_000_000 + i,
  }));
}

function successFetch(content = 'ok') {
  return () =>
    Promise.resolve(
      new Response(JSON.stringify({ choices: [{ message: { content } }] }), {
        status: 200,
      }),
    );
}

function statusFetch(status: number) {
  return () => Promise.resolve(new Response('', { status }));
}

afterEach(() => {
  vi.unstubAllGlobals();
});

// ---------------------------------------------------------------------------
// buildSystemPrompt — context substitution
// ---------------------------------------------------------------------------

describe('buildSystemPrompt — property: all context fields are substituted', () => {
  const contexts: SpoonyContext[] = [
    { ...baseContext, courseName: 'Alpha', unitName: 'U1', lessonName: 'L1', moduleName: 'M1' },
    { ...baseContext, courseName: 'Beta Course', infoSlides: ['slide A', 'slide B'] },
    { ...baseContext, courseNam: '', slideTex: '' } as unknown as SpoonyContext,
    { ...baseContext, infoSlides: Array.from({ length: 10 }, (_, i) => `info ${i}`) },
  ];

  it.each(contexts)('returns a non-empty string for any context', (ctx) => {
    const result = buildSystemPrompt(ctx);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('does not leave unreplaced {{…}} placeholders', () => {
    const result = buildSystemPrompt(baseContext);
    expect(result).not.toMatch(/\{\{[A-Z_]+\}\}/);
  });

  it('embeds infoSlides as a bullet list when provided', () => {
    const ctx: SpoonyContext = { ...baseContext, infoSlides: ['fact 1', 'fact 2'] };
    const result = buildSystemPrompt(ctx);
    expect(result).toContain('fact 1');
    expect(result).toContain('fact 2');
  });

  it('omits the background section when infoSlides is empty', () => {
    const result = buildSystemPrompt({ ...baseContext, infoSlides: [] });
    expect(result).not.toContain('Course Background');
  });
});

// ---------------------------------------------------------------------------
// sendMessage — truncation invariant
// ---------------------------------------------------------------------------

describe('sendMessage — property: userMessage never exceeds MAX_USER_MESSAGE_LENGTH in the request', () => {
  const lengths = [0, 1, 499, 500, 501, 600, 1000, 5000];

  it.each(lengths)(
    'message length %i: sent content ≤ 500',
    async (len) => {
      let sentBody: string | undefined;
      vi.stubGlobal('fetch', (_url: string, opts: RequestInit) => {
        sentBody = opts.body as string;
        return Promise.resolve(new Response('', { status: 500 }));
      });

      const clock = new FakeClock();
      await sendMessage({ ...baseParams, userMessage: 'x'.repeat(len) }, clock);

      const body = JSON.parse(sentBody!);
      const lastUser = [...body.messages].reverse().find(
        (m: { role: string }) => m.role === 'user',
      );
      expect(lastUser.content.length).toBeLessThanOrEqual(MAX_USER_MESSAGE_LENGTH);
    },
  );
});

// ---------------------------------------------------------------------------
// sendMessage — result type invariant
// ---------------------------------------------------------------------------

describe('sendMessage — property: all paths return a typed SpoonyApiResult', () => {
  const clock = new FakeClock();

  it('success path returns { success: true, content: string }', async () => {
    vi.stubGlobal('fetch', successFetch('response text'));
    const result = await sendMessage(baseParams, clock);
    expect(result.success).toBe(true);
    if (result.success) expect(typeof result.content).toBe('string');
  });

  it.each([401, 429, 500, 502, 503])(
    'HTTP %i returns { success: false, error: SpoonyErrorType }',
    async (status) => {
      vi.stubGlobal('fetch', statusFetch(status));
      const result = await sendMessage(baseParams, clock);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(Object.values(SpoonyErrorType)).toContain(result.error);
      }
      vi.unstubAllGlobals();
    },
  );

  it('network failure returns { success: false, error: NETWORK_ERROR }', async () => {
    vi.stubGlobal('fetch', () => Promise.reject(new Error('net down')));
    const result = await sendMessage(baseParams, clock);
    expect(result).toEqual({ success: false, error: SpoonyErrorType.NETWORK_ERROR });
  });
});

// ---------------------------------------------------------------------------
// sendMessage — history size invariant
// ---------------------------------------------------------------------------

describe('sendMessage — property: arbitrary history size does not affect truncation or result type', () => {
  const historySizes = [0, 1, 5, 20, 100];

  it.each(historySizes)(
    'history of %i messages: result is a valid SpoonyApiResult',
    async (n) => {
      vi.stubGlobal('fetch', successFetch(`reply for history-${n}`));
      const clock = new FakeClock();
      const result = await sendMessage(
        { ...baseParams, history: makeHistory(n) },
        clock,
      );
      expect(typeof result.success).toBe('boolean');
      if (result.success) {
        expect(typeof result.content).toBe('string');
      } else {
        expect(Object.values(SpoonyErrorType)).toContain(result.error);
      }
    },
  );

  it.each(historySizes)(
    'history of %i messages: sent user message still respects truncation',
    async (n) => {
      let sentBody: string | undefined;
      vi.stubGlobal('fetch', (_url: string, opts: RequestInit) => {
        sentBody = opts.body as string;
        return statusFetch(500)();
      });
      const clock = new FakeClock();
      const longMsg = 'y'.repeat(600);
      await sendMessage(
        { ...baseParams, history: makeHistory(n), userMessage: longMsg },
        clock,
      );
      const body = JSON.parse(sentBody!);
      const lastUser = [...body.messages].reverse().find(
        (m: { role: string }) => m.role === 'user',
      );
      expect(lastUser.content.length).toBeLessThanOrEqual(MAX_USER_MESSAGE_LENGTH);
    },
  );
});
