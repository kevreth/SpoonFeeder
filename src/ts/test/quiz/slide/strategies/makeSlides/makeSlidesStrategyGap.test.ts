import { describe, expect, it, vi } from 'vitest';
import {
  fills,
  gaps,
  makeSlidesStrategyGap,
} from '../../../../../main/slidetype/types/gap/makeSlidesStrategyGap';
import { createHtmlGap } from '../../../../../main/slidetype/types/gap/createHtmlGap';
import { FakeClock } from '../../../../../main/infrastructure/clocks/FakeClock';
import type { SlideInterface } from '../../../../../main/slide/slideInterface';
import { JSDOM } from 'jsdom';

const question = 'text (1) text (2) text (3)';
const ans = ['ans1', 'ans2', 'ans3'];

it('fills', () => {
  const result = fills(ans);
  expect(result).not.toBeNull();
  expect(result).toContain('fill0');
  expect(result).toContain('fill2');
});
it('gaps', () => {
  const result = gaps(ans.length, question);
  expect(result).not.toBeNull();
  expect(result).toContain('(1) text');
  expect(result).toContain('(3)');
});

describe('makeSlidesStrategyGap — clock injection', () => {
  function buildDoc(ansArray: string[], txt: string): Document {
    const dom = new JSDOM('<!DOCTYPE html><body></body>');
    const doc = dom.window.document;
    const fillsHtml = fills(ansArray);
    const gapsHtml = gaps(ansArray.length, txt);
    const html = createHtmlGap(ansArray.length.toString(), fillsHtml, gapsHtml);
    doc.body.innerHTML = html;
    return doc;
  }

  function simulateDrop(
    doc: Document,
    gapIdx: number,
    fillIdx: number,
    fillText: string,
  ): void {
    const gapEl = doc.getElementById('gap' + gapIdx) as HTMLElement;
    const dt = {
      getData: (key: string) =>
        key === 'number' ? String(fillIdx) : fillText,
      dropEffect: 'move',
    };
    const event = {
      preventDefault: vi.fn(),
      target: gapEl,
      dataTransfer: dt,
    } as unknown as DragEvent;
    gapEl.ondrop!(event);
  }

  it('uses clock.setTimeout (not global setTimeout) when last fill is dropped', () => {
    const clock = new FakeClock();
    const setTimeoutSpy = vi.spyOn(clock, 'setTimeout');
    const globalSetTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');

    const slide = { conclude: vi.fn() } as unknown as SlideInterface;
    const doc = buildDoc(['a'], '(1) text');
    const maxWidth = vi.fn();

    makeSlidesStrategyGap('(1) text', ['a'], createHtmlGap, maxWidth, doc, slide, clock);

    // Drop the only fill (fill0) into gap0 — fillsRemaining becomes 0
    simulateDrop(doc, 0, 0, 'a');

    expect(setTimeoutSpy).toHaveBeenCalledOnce();
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 0);
    expect(globalSetTimeoutSpy).not.toHaveBeenCalled();

    vi.restoreAllMocks();
  });

  it('fires concludeOnce after clock.tick(0)', () => {
    const clock = new FakeClock();
    const slide = { conclude: vi.fn() } as unknown as SlideInterface;
    const doc = buildDoc(['a'], '(1) text');
    const maxWidth = vi.fn();

    makeSlidesStrategyGap('(1) text', ['a'], createHtmlGap, maxWidth, doc, slide, clock);
    simulateDrop(doc, 0, 0, 'a');

    // Timer registered but not yet fired
    expect(slide.conclude).not.toHaveBeenCalled();

    clock.tick(1);
    expect(slide.conclude).toHaveBeenCalledOnce();
  });

  it('fires concludeOnce exactly once even if drop triggers twice', () => {
    const clock = new FakeClock();
    const slide = { conclude: vi.fn() } as unknown as SlideInterface;
    const doc = buildDoc(['a', 'b'], 'fill (1) here and (2) here');
    const maxWidth = vi.fn();

    makeSlidesStrategyGap('fill (1) here and (2) here', ['a', 'b'], createHtmlGap, maxWidth, doc, slide, clock);
    simulateDrop(doc, 0, 0, 'a');
    simulateDrop(doc, 1, 1, 'b');

    clock.tick(1);
    expect(slide.conclude).toHaveBeenCalledOnce();
  });
});
// it('createHtml', () => {
// 	const result = new Gap().createHtml(ans, question);
// 	expect(result).not.toBeNull();
// 	// expect(result).toHTMLValidate();
// 	expect(result).toContain('fill0');
// 	expect(result).toContain('fill2');
// 	expect(result).toContain('ans1');
// 	expect(result).toContain('ans3');
// 	expect(result).toContain('(1) text');
// 	expect(result).toContain('(3)');
// });
