import { removeListener, isRandom, shuffle } from '../../../utilities';
import { SetWidths } from '../strategies/setWidths';
import { showButton } from '../../makeSlides';
import { Evaluation } from '../../evaluate';
import { SetValues, Slide } from '../../slide';
import { Result } from '../strategies/result';
import { CreateHtml } from '../strategies/createHtml';
import { Evaluate } from '../strategies/evaluate';
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
    let options = this.o;
    const shuffleFlag = isExercise && isRandom();
    if (shuffleFlag) options = shuffle(options);
    const html = this.createHtml(this.txt, options);
    this.createPageContent(html, doc);
    options.forEach((option, optionCtr) => {
      addBehavior(doc, option, options.length, optionCtr, setValues);
    });
    this.maxWidthStrategy(options.length,'btn', doc);
  }

  public evaluate(): Evaluation {
    const txt = this.txt;
    const res = this.res;
    const ans = this.ans;
    const result = this.result();
    return this.evaluateStrategy(txt, res, ans, result);
  }
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
