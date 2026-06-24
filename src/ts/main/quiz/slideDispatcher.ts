import { last } from 'lodash';
import type { SlideInterface } from '../slide/slideInterface';
import type { StateActions } from './stateActionDispatcher';
import { Json } from '../dataaccess/saveData/saveFile';
import { SaveData } from '../dataaccess/saveData/saveData';
import { dispatch2 } from './stateActionDispatcher';
import { useSlideStore } from '../../../vue/stores/slideStore';

export async function showSlides(doc: Document): Promise<void> {
  const slides = Json.get();
  const saves = await SaveData.get();
  const ss = new SlideDispatcher(doc, saves);
  dispatch2(ss, slides, saves, true);
}

export function fillMatchingSlide(slide: SlideInterface, last: SaveData) {
  slide.cont = last.cont;
  slide.res = last.result;
}

/**
 * Drives quiz flow by pushing the active slide into the Pinia slide store
 * (ADR-019); the Vue layer renders reactively from the store. This class does
 * not touch the DOM — the legacy imperative renderer was removed in PRD-003.
 *
 * `doc` is retained on the signature for caller compatibility (callers still
 * pass it) but is unused by the store-driven flow.
 */
class SlideDispatcher implements StateActions<void> {
  constructor(
    public doc: Document,
    private saves: SaveData[]
  ) {}

  private getSlide(increment: number) {
    const save = last(this.saves) as SaveData;
    const idx = Json.findMatchingSlide(save.txt);
    const slide = Json.getMatchingSlide(idx + increment);
    fillMatchingSlide(slide, save);
    return slide;
  }

  begin(): void {
    const slide = Json.getFirstSlide();
    useSlideStore().setSlide(slide, slide.type);
  }

  current(): void {
    throw new Error('current() is unreachable from showSlides (advance=true)');
  }

  decorate(): void {
    // Reload mid-slide (answered, not yet continued): restore the answered
    // state. `restored = true` tells the component to render from slide.res.
    const slide = this.getSlide(0);
    useSlideStore().setSlide(slide, slide.type, true);
  }

  next(): void {
    const slide = this.getSlide(1);
    useSlideStore().setSlide(slide, slide.type);
  }

  end(): void {
    useSlideStore().setQuizComplete();
  }
}
