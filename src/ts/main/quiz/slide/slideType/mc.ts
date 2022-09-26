import { removeListener, isRandom, shuffle } from '../../../utilities';
import { SetWidths, SetWidthTypeSimple } from '../strategies/setWidths';
import { showButton } from '../../makeSlides';
import { Evaluation } from '../../evaluate';
import { SetValues, Slide } from '../../slide';
import { Result } from '../strategies/result';
import { CreateHtml, McType } from '../strategies/createHtml';
import { Evaluate } from '../strategies/evaluate';
import { stringify } from 'querystring';
export class Mc extends Slide<string> {
  constructor() {
    super('mc');
  }
  o: string[] = [];
  resultType = Result.SIMPLE;
  maxWidthStrategy = SetWidths.SIMPLE;
  createHtml = CreateHtml.MC;
  evaluateStrategy = Evaluate.SIMPLE;
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
    const setValues = this.getSetValues();
    const isExercise = this.isExercise;
    const shuffleFlag = isExercise && isRandom();
    const createHtml = this.createHtml;
    const maxWidthStrategy = this.maxWidthStrategy;
    const txt = this.txt;
    let options = this.o;
    if (shuffleFlag) options = shuffle(options);
    makeSlides2(createHtml, txt, options, setValues, doc, maxWidthStrategy);
  }
  public evaluate(): Evaluation {
    const txt = this.txt;
    const res = this.res;
    const ans = this.ans;
    const result = this.result();
    return this.evaluateStrategy(txt, res, ans, result);
  }
}
function makeSlides2(createHtml: McType, txt: string, options: string[], setValues: SetValues<string>, doc: Document, maxWidthStrategy: SetWidthTypeSimple) {
  const html = createHtml(txt, options);
  setValues.createPageContent(html, doc);
  options.forEach((option, optionCtr) => {
    addBehavior(doc, option, options.length, optionCtr, setValues);
  });
  maxWidthStrategy(options.length, 'btn', doc);
}
function addBehavior(
  doc: Document,
  option: string,
  length: number,
  optionCtr: number,
  setValues: SetValues<string>
): void {
  const element = doc.getElementById('btn' + optionCtr) as HTMLElement;
  element.addEventListener('click', () => {
    for (let i = 0; i < length; i++)
      removeListener(doc.getElementById('btn' + i) as HTMLElement);
    const optionButton = doc.getElementById('btn' + optionCtr) as HTMLElement;
    let color = 'red';
    setValues.setRes(option);
    if (setValues.result()) color = 'green';
    optionButton.style.backgroundColor = color;
    setValues.saveData();
    showButton(doc);
  });
}
