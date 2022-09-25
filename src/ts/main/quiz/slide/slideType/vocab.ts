import { Evaluation } from '../../evaluate';
import { SetWidths, SetWidthTypeSimple } from '../strategies/setWidths';
import { Slide } from '../../slide';
import { continueButton, showButton } from '../../makeSlides';
import { removeListener, isRandom, shuffle, shuffleMap } from '../../../utilities';
import { Result } from '../strategies/result';
import { CreateHtml, McType } from '../strategies/createHtml';
import { Evaluate } from '../strategies/evaluate';
const CHOICES = 4;
export type vocabTuplesType = [
  txt: string,
  ans: string,
  options: Array<string>
][];
export class Vocab extends Slide<Array<string>> {
  constructor() {
    super('vocab');
  }
  list = new Map<string,string>();
  res = new Array<string>();
  resultType = Result.CORRELATED;
  maxWidthStrategy = SetWidths.SIMPLE;
  createHtml = CreateHtml.MC;
  evaluateStrategy = Evaluate.VOCAB;
  processJson(json: Vocab): void {
    this.list = new Map(Object.entries(json.list));
    this.ans = Array.from(this.list.keys());
    this.isExercise = json.isExercise;
  }
  makeSlides(doc: Document): void {
    if (isRandom()) this.list = shuffleMap(this.list);
    this.proc(this.list, doc, this.maxWidthStrategy);
  }
  //Pass in doc only for unit testing
  proc(map: Map<string, string>, doc: Document, maxWidthStrategy: SetWidthTypeSimple): void {
    const vocabTuples = generateQuestions(map);
    const html_list = createHtmlLoop(vocabTuples, this.createHtml);
    this.paging(doc, html_list, vocabTuples, 0, maxWidthStrategy);
  }
  paging(
    doc: Document,
    html_list: string[],
    vocabTuples: vocabTuplesType,
    questionCtr: number,
    maxWidthStrategy: SetWidthTypeSimple
  ): void {
    this.createPageContent(html_list[questionCtr], doc);
    const tuple = vocabTuples[questionCtr];
    const options = tuple[2];
    options.forEach((option, j) => {
      const buttonId = 'btn' + j.toString();
      const button = doc.getElementById(buttonId) as HTMLElement;
      button.addEventListener('click', () => {
        const answer = tuple[1];
        this.res.push(option);
        let color = 'red';
        if (option === answer) color = 'green';
        button.style.backgroundColor = color;
        for (let i = 0; i < options.length; i++) {
          const button = doc.getElementById('btn' + i) as HTMLElement;
          removeListener(button);
        }
        if (questionCtr + 1 < html_list.length) {
          const element = continueButton(doc) as HTMLElement;
          this.addContinueEventListener(
            element,
            doc,
            html_list,
            vocabTuples,
            questionCtr,
            maxWidthStrategy
          );
        } else {
          this.saveData();
          showButton(doc);
        }
      });
    });
    maxWidthStrategy(options.length,'btn', doc);
  }
  addContinueEventListener(
    element: HTMLElement,
    doc: Document,
    html_list: string[],
    vocabTuples: vocabTuplesType,
    questionCtr: number,
    maxWidthStrategy: SetWidthTypeSimple
  ): void {
    element.addEventListener('click', (): void => {
      this.paging(doc, html_list, vocabTuples, questionCtr + 1, maxWidthStrategy);
    });
  }
  evaluate(): Evaluation {
    const txt = Array.from(this.list.values());
    const res = this.res;
    const ans = this.ans;
    const result = this.result();
    return this.evaluateStrategy(txt, ans, res, result);
  }
}
function createHtmlLoop(vocabTuples: vocabTuplesType, createHtml: McType): string[] {
  const retval: string[] = [];
  for (const tuple of vocabTuples) {
    const question = tuple[0];
    const options = tuple[2];
    const html = createHtml(question, options);
    retval.push(html);
  }
  return retval;
}
function generateQuestions(map: Map<string, string>): vocabTuplesType {
  const keys = Array.from(map.keys());
  const vocabTuples: vocabTuplesType = [];
  for (const key of keys) {
    let options = keys.slice(0, CHOICES);
    //if correct answer is not in "options",
    //replace the first entry with it.
    if (!options.includes(key)) options[0] = key;
    if (isRandom()) options = shuffle(options);
    const quest = map.get(key) as string;
    vocabTuples.push([quest, key, options]);
  }
  return vocabTuples;
}
