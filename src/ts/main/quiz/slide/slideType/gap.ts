import { polyfill } from 'mobile-drag-drop';
import { isRandom, shuffle } from '../../../utilities';
import { Slide } from '../../slide';
//Despite the documentation, "scroll behaviour" is required, not optional,
//for basic mobile drag-and-drop ability.
import { scrollBehaviourDragImageTranslateOverride } from 'mobile-drag-drop/scroll-behaviour';
import type { MakeSlidesGapType } from '../strategies/makeSlides';
import { SetWidths } from '../strategies/setWidths';
polyfill({
  dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
});
export class Gap extends Slide<Array<string>> {
  processJson(json: Gap): void {
    ({ txt: this.txt, ans: this.ans, isExercise: this.isExercise } = json);
  }
  makeSlides(doc: Document): void {
    const setValues = this.getSetValues();
    const txt = this.txt as string;
    const maxWidthStrategy = SetWidths.TARGETED;
    const createHtml = this.createHtml;
    let ans = this.ans;
    if (isRandom()) ans = shuffle(ans);
    const makeSlidesStrategy = this.makeSlidesStrategy as MakeSlidesGapType;
    makeSlidesStrategy(txt, ans, createHtml, maxWidthStrategy, doc, setValues);
  }
}
