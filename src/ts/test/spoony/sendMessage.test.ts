import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FakeClock } from '../../main/infrastructure/clocks/FakeClock';
import {
  sendMessage,
  SpoonyErrorType,
} from '../../main/spoony/spoonyApi';
import type { SendMessageParams } from '../../main/spoony/spoonyApi';
import { TEST_NOW } from '../support/deterministic-setup';

const baseParams: SendMessageParams = {
  apiKey: 'test-key',
  model: 'test-model',
  context: {
    courseName: 'Test Course',
    unitName: 'Unit 1',
    lessonName: 'Lesson 1',
    moduleName: 'Module 1',
    slideText: 'slide content',
    infoSlides: [],
  },
  history: [],
  userMessage: 'Hello',
};

function makeHangingFetch(signal?: AbortSignal): Promise<Response> {
  return new Promise<Response>((_, reject) => {
    signal?.addEventListener('abort', () => {
      const err = Object.assign(new Error('The operation was aborted'), {
        name: 'AbortError',
      });
      reject(err);
    });
  });
}

describe('sendMessage — clock injection', () => {
  let clock: FakeClock;

  beforeEach(() => {
    clock = new FakeClock();
    clock.reset(TEST_NOW);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns UNAVAILABLE when clock fires the 15 s timeout', async () => {
    vi.stubGlobal('fetch', (_url: string, opts: RequestInit) =>
      makeHangingFetch(opts.signal as AbortSignal),
    );

    const resultPromise = sendMessage(baseParams, clock);
    clock.tick(15_001);
    const result = await resultPromise;

    expect(result).toEqual({ success: false, error: SpoonyErrorType.UNAVAILABLE });
  });

  it('succeeds when fetch resolves before timeout fires', async () => {
    vi.stubGlobal(
      'fetch',
      () =>
        Promise.resolve(
          new Response(
            JSON.stringify({ choices: [{ message: { content: 'ok' } }] }),
            { status: 200 },
          ),
        ),
    );

    // No clock.tick — timer never fires
    const result = await sendMessage(baseParams, clock);
    expect(result).toEqual({ success: true, content: 'ok' });
  });

  it('clears the timeout after a successful response', async () => {
    const clearSpy = vi.spyOn(clock, 'clearTimeout');
    vi.stubGlobal(
      'fetch',
      () =>
        Promise.resolve(
          new Response(
            JSON.stringify({ choices: [{ message: { content: 'hi' } }] }),
            { status: 200 },
          ),
        ),
    );

    await sendMessage(baseParams, clock);

    expect(clearSpy).toHaveBeenCalledOnce();
  });

  it('clears the timeout even after a non-abort error', async () => {
    const clearSpy = vi.spyOn(clock, 'clearTimeout');
    vi.stubGlobal('fetch', () => Promise.reject(new Error('network failure')));

    await sendMessage(baseParams, clock);

    expect(clearSpy).toHaveBeenCalledOnce();
  });

  it('returns NETWORK_ERROR for generic fetch failure', async () => {
    vi.stubGlobal('fetch', () => Promise.reject(new Error('network failure')));
    const result = await sendMessage(baseParams, clock);
    expect(result).toEqual({ success: false, error: SpoonyErrorType.NETWORK_ERROR });
  });

  it('returns INVALID_KEY for 401 response', async () => {
    vi.stubGlobal('fetch', () => Promise.resolve(new Response('', { status: 401 })));
    const result = await sendMessage(baseParams, clock);
    expect(result).toEqual({ success: false, error: SpoonyErrorType.INVALID_KEY });
  });

  it('returns RATE_LIMITED for 429 response', async () => {
    vi.stubGlobal('fetch', () => Promise.resolve(new Response('', { status: 429 })));
    const result = await sendMessage(baseParams, clock);
    expect(result).toEqual({ success: false, error: SpoonyErrorType.RATE_LIMITED });
  });

  it('truncates userMessage to 500 chars before sending', async () => {
    let sentBody: string | undefined;
    vi.stubGlobal(
      'fetch',
      (_url: string, opts: RequestInit) => {
        sentBody = opts.body as string;
        return Promise.resolve(new Response('', { status: 500 }));
      },
    );

    const longMessage = 'x'.repeat(600);
    await sendMessage({ ...baseParams, userMessage: longMessage }, clock);

    const body = JSON.parse(sentBody!);
    const lastUserMsg = body.messages.findLast(
      (m: { role: string }) => m.role === 'user',
    );
    expect(lastUserMsg.content.length).toBe(500);
  });
});

describe('sendMessage — property: all paths return SpoonyApiResult', () => {
  const clock = new FakeClock();

  it.each([200, 401, 429, 500, 503])('status %i returns a typed result', async (status) => {
    vi.stubGlobal(
      'fetch',
      () =>
        Promise.resolve(
          new Response(
            status === 200
              ? JSON.stringify({ choices: [{ message: { content: 'x' } }] })
              : '',
            { status },
          ),
        ),
    );

    const result = await sendMessage(baseParams, clock);

    expect(typeof result.success).toBe('boolean');
    if (result.success) {
      expect(typeof result.content).toBe('string');
    } else {
      expect(Object.values(SpoonyErrorType)).toContain(result.error);
    }

    vi.unstubAllGlobals();
  });
});
