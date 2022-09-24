import { makeButton, removeListener, isRandom, shuffle, getNumberedElementsAsList, getMaxWidth, setWidths, getIdsAsArray } from '../../../utilities';
import { showButton } from '../../makeSlides';
import { makeRow } from '../../evaluate';
import { Evaluation } from '../../evaluate';
import { Slide } from '../../slide';
import { Result } from '../../slide/result';
export class Mc extends Slide<string> {
  constructor() {
    super('mc');
  }
  o: string[] = [];
  resultType = Result.SIMPLE;
  processJson(json: Mc): void {
    ({
      txt: this.txt,
      o: this.o,
      ans: this.ans,
      isExercise: this.isExercise,
    } = json);
    this.ans = this.o[0];
  }
  makeSlides(doc: Document): void {
    const shuffleFlag = this.isExercise && isRandom();
    let options = this.o;
    if (shuffleFlag) options = shuffle(options);
    const html = this.createHtml(this.txt, options);
    this.createPageContent(html, doc);
    this.createHtml(this.txt, options);
    options.forEach((option, optionCtr) => {
      this.addBehavior(doc, option, options.length, optionCtr);
    });
    this.setWidths(options.length,'btn', doc);
  }
  public setWidths(num:number, str:string, doc: Document): void {
    const ids:Array<string> = getIdsAsArray(num,str);
    const elements:Array<HTMLElement> = getNumberedElementsAsList(ids,doc);
    const maxWidth = getMaxWidth(elements);
    setWidths(ids, doc, maxWidth);
  }
  addBehavior(
    doc: Document,
    option: string,
    length: number,
    optionCtr: number
  ): void {
    const element = doc.getElementById('btn' + optionCtr) as HTMLElement;
    element.addEventListener('click', () => {
      for (let i = 0; i < length; i++)
        removeListener(doc.getElementById('btn' + i) as HTMLElement);
      const optionButton = doc.getElementById('btn' + optionCtr) as HTMLElement;
      let color = 'red';
      this.res = option;
      if (this.result()) color = 'green';
      optionButton.style.backgroundColor = color;
      this.res = option;
      this.saveData();
      showButton(doc);
    });
  }
  public createHtml(question: string, options: string[]): string {
    const accum = new Array<string>(
      `\n${question}<span style="display: block; margin-bottom: .5em;"></span>\n`
    );
    options.forEach((option, i) => {
      accum.push(makeButton('btn' + i, 'questionBtn', option) + '<br/>\n');
    });
    return accum.join('\n');
  }
  public evaluate(): Evaluation {
    let correctCtr = 0;
    const text = makeRow(this.txt, this.res, this.ans);
    if (this.result()) correctCtr++;
    return new Evaluation(1, correctCtr, text);
  }
}

