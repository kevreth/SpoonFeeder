import { isRandom } from '../../../datalayer/mediator';
import { removeListener, shuffle } from '../../../quiz/utilities';
import { Slide } from '../../../slide/mediator';
import type { SlideInterface } from '../../../slide/slideInterface';
import type { AdocVisitorInterface } from '../../misc/adocVisitor';
import { AdocVisitor } from '../../misc/adocVisitor';
import { CORRECT, INCORRECT } from '../../misc/markupColors';
import type { MarkTypeMa, SlideType } from '../../misc/slideType';
import type { AnswerType } from '../../strategies/resultStrategy';
import { SetWidths } from '../../strategies/setWidthsStrategy/setWidthsStrategy';
export class Ma extends Slide implements SlideType {
  setProperties(props: SlideInterface): void {
    ({
      txt: this.txt,
      o: this.o,
      exp: this.exp,
      ref: this.ref,
      isExercise: this.isExercise,
      numans: this.numans,
    } = props);
    this.accept(new AdocVisitor());
    const answers: string[] = [];
    const numans = this.numans as number;
    const o = this.o as string[];
    for (let i = 0; i < numans; i++) {
      answers.push(o[i]);
    }
    this.ans = answers.sort() as AnswerType;
    this.o = o;
    this.numans = numans;
    const shuffleFlag = this.isExercise && isRandom();
    if (shuffleFlag) this.o = shuffle(o);
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitMa(this);
  }
  makeSlides(doc: Document): void {
    const createHtml = this.createHtml;
    const maxWidthStrategy = SetWidths.SIMPLE;
    const txt = this.txt;
    const options = this.o;
    const makeSlidesStrategy = this.makeSlidesStrategy;
    makeSlidesStrategy(
      txt,
      options as AnswerType,
      createHtml,
      maxWidthStrategy,
      doc,
      this
    );
  }
  decorate(doc: Document) {
    const options = this.o as AnswerType;
    for (let i = 0; i < options.length; i++) {
      removeListener(doc.getElementById('btn' + i) as HTMLElement);
      const option = options[i];
      let isKey = false;
      let selected = false;
      if (this.ans.includes(option)) isKey = true;
      if ((this.res as AnswerType).includes(option)) selected = true;
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
  };
}
