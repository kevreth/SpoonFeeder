import { polyfill } from 'mobile-drag-drop';
import { Result } from '../strategies/result';
import { Slide } from '../../slide';
import { shuffle, isRandom } from '../../../utilities';
//Despite the documentation, "scroll behaviour" is required, not optional,
//for basic mobile drag-and-drop ability.
import { scrollBehaviourDragImageTranslateOverride } from 'mobile-drag-drop/scroll-behaviour';
import { SetWidths } from '../strategies/setWidths';
import { CreateHtml } from '../strategies/createHtml';
import { Evaluate } from '../strategies/evaluate';
import { MakeSlides } from '../strategies/makeSlides';
polyfill({
  dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
});
//===the main divs are
//fills: the strings to drag into the gaps
//gaps: the blanks to drag strings to
//remaining: the number of remaining gaps
//response: grading after the last drop
export class Gap extends Slide<Array<string>> {
  constructor() {
    super('gap',Evaluate.GAP);
  }
  resultType = Result.CORRELATED;
  maxWidthStrategy = SetWidths.TARGETED;
  createHtml = CreateHtml.GAP;
  makeSlidesStrategy = MakeSlides.GAP;
  processJson(json: Gap): void {
    ({ txt: this.txt, ans: this.ans, isExercise: this.isExercise } = json);
  }
  makeSlides(doc: Document): void {
    const setValues = this.getSetValues();
    const txt = this.txt;
    const maxWidthStrategy = this.maxWidthStrategy;
    const createHtml = this.createHtml;
    let ans = this.ans;
    if (isRandom()) ans = shuffle(ans);
    this.makeSlidesStrategy((txt as string), ans, createHtml, maxWidthStrategy, doc, setValues);
  }
}

