import { CORRECT, INCORRECT } from '../../../markupColors';
import { isRandom, removeListener, shuffle } from '../../../utilities';
import type { AdocVisitorInterface } from '../../datalayer/adocVisitor';
import { AdocVisitor } from '../../datalayer/adocVisitor';
import { Slide } from '../../slide';
import { SlideInterface } from '../../slideInterface';
import type { MakeSlidesTypeMc } from '../strategies/makeSlidesStrategy/makeSlidesStrategy';
import { SetWidths } from '../strategies/setWidthsStrategy';
import { MarkTypeMa, SlideType } from './slideType';
export class Ma extends Slide implements SlideType  {
  o: string[] = [];
  numans = 0;
  answers: string[] = [];
  res: string[] = [];
  processJson(json: SlideInterface): void {
    const json1 = json as Ma
    ({
      txt: this.txt,
      o: this.o,
      exp: this.exp,
      ref: this.ref,
      isExercise: this.isExercise,
      numans: this.numans,
    } = json1);
    this.accept(new AdocVisitor());
    for (let i = 0; i < this.numans; i++) {
      this.answers.push(this.o[i]);
    }
    this.ans = this.answers.sort();
    const shuffleFlag = this.isExercise && isRandom();
    if (shuffleFlag) this.o = shuffle(this.o);
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitMa(this);
  }
  makeSlides(doc: Document): void {
    const createHtml = this.createHtml;
    const maxWidthStrategy = SetWidths.SIMPLE;
    const txt = this.txt;
    const options = this.o;
    const makeSlidesStrategy = this.makeSlidesStrategy as MakeSlidesTypeMc;
    makeSlidesStrategy(
      txt,
      options,
      createHtml,
      maxWidthStrategy,
      doc,
      this
    );
  }
  decorate(doc: Document) {
    const options = this.o;
    for (let i = 0; i < options.length; i++) {
      removeListener(doc.getElementById('btn' + i) as HTMLElement);
      const option = options[i];
      let isKey = false;
      let selected = false;
      if (this.answers.includes(option)) isKey = true;
      if (this.res.includes(option)) selected = true;
      const btn = doc.getElementById('btn' + i) as HTMLElement;
      this.mark(isKey, selected, btn);
    }
    return this.result() as boolean;
  }
  mark: MarkTypeMa = (isKey, selected, btn) => {
    btn.style.border = 'none';
    if (isKey && selected) btn.style.backgroundColor = CORRECT;
    else if (!isKey && selected) btn.style.backgroundColor = INCORRECT;
    else if (isKey && !selected) btn.style.border = `1px solid ${INCORRECT}`;
  }
}
