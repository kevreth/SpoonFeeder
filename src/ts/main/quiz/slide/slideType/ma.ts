import { removeListener } from '../../../utilities';
import {INDETERMINANT, CORRECT, INCORRECT} from '../../../MarkupColors';
import { Slide } from '../../slide';
import type { MakeSlidesTypeMc } from '../strategies/makeSlidesStrategy';
import { SetWidths } from '../strategies/setWidthsStrategy';
import { isRandom, shuffle } from '../../../utilities';
import { AdocVisitor, AdocVisitorInterface } from '../adocVisitor';
export class Ma extends Slide {
  o: string[] = [];
  numans = 0;
  answers:string[] = [];
  processJson(json: Ma): void {
    ({
      txt: this.txt,
      o: this.o,
      exp: this.exp,
      ref: this.ref,
      isExercise: this.isExercise,
      numans: this.numans} = json);
    this.accept(new AdocVisitor())
    for(let i=0; i<this.numans; i++) {
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
    const isExercise = this.isExercise;
    const createHtml = this.createHtml;
    const maxWidthStrategy = SetWidths.SIMPLE;
    const txt = this.txt;
    const options = this.o;
    const makeSlidesStrategy = this.makeSlidesStrategy as MakeSlidesTypeMc;
    makeSlidesStrategy(
      txt,
      options,
      isExercise,
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
      if (this.answers.includes(option))
        isKey = true;
        const btn = doc.getElementById('btn' + i) as HTMLElement;
      this.mark(isKey, btn);
    }
    return this.result() as boolean;
  }
  mark(isKey: boolean, btn:HTMLElement) {
    let selected = false;
    btn.style.border = 'none';
    if(btn.style.backgroundColor === INDETERMINANT) selected = true;
    if(isKey && selected) btn.style.backgroundColor = CORRECT;
    else if(!isKey && selected) btn.style.backgroundColor = INCORRECT;
    else if(isKey && !selected) btn.style.border = `1px solid ${INCORRECT}`
  }
}
