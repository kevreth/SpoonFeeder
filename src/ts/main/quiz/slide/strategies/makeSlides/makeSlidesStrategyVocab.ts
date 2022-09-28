import { SetWidthTypeSimple } from '../setWidths';
import { SetValues, createPageContent } from '../../../slide';
import { removeListener, isRandom, shuffle } from '../../../../utilities';
import { CreateHtmlTypeMc } from '../createHtml';
import { MakeSlides } from '../../../makeSlides';
const { continueButton, showButton } = MakeSlides;
export const CHOICES = 4;
export type vocabTuplesType = [
  txt: string,
  ans: string,
  options: Array<string>
][];
export function makeSlidesStrategyVocab(map: Map<string, string>, res: string[], createHtml: CreateHtmlTypeMc, maxWidthStrategy: SetWidthTypeSimple, doc: Document, setValues: SetValues<string[]>): void {
  const vocabTuples = generateQuestions(map);
  const html_list = createHtmlLoop(vocabTuples, createHtml);
  paging(doc, html_list, vocabTuples, 0, maxWidthStrategy, res, setValues);
}
function paging(
  doc: Document,
  html_list: string[],
  vocabTuples: vocabTuplesType,
  questionCtr: number,
  maxWidthStrategy: SetWidthTypeSimple,
  res: string[],
  setValues: SetValues<string[]>
): void {
  createPageContent(html_list[questionCtr], doc);
  const tuple = vocabTuples[questionCtr];
  const options = tuple[2];
  options.forEach((option, j) => {
    const buttonId = 'btn' + j.toString();
    const button = doc.getElementById(buttonId) as HTMLElement;
    button.addEventListener('click', () => {
      const answer = tuple[1];
      res.push(option);
      let color = 'red';
      if (option === answer)
        color = 'green';
      button.style.backgroundColor = color;
      for (let i = 0; i < options.length; i++) {
        const button = doc.getElementById('btn' + i) as HTMLElement;
        removeListener(button);
      }
      if (questionCtr + 1 < html_list.length) {
        const element = continueButton(doc) as HTMLElement;
        addContinueEventListener(
          element,
          doc,
          html_list,
          vocabTuples,
          questionCtr,
          maxWidthStrategy,
          res,
          setValues
        );
      } else {
        setValues.saveData();
        showButton(doc);
      }
    });
  });
  maxWidthStrategy(options.length, 'btn', doc);
}
function addContinueEventListener(
  element: HTMLElement,
  doc: Document,
  html_list: string[],
  vocabTuples: vocabTuplesType,
  questionCtr: number,
  maxWidthStrategy: SetWidthTypeSimple,
  res: string[],
  setValues: SetValues<string[]>
): void {
  element.addEventListener('click', (): void => {
    paging(doc, html_list, vocabTuples, questionCtr + 1, maxWidthStrategy, res, setValues);
  });
}
function createHtmlLoop(vocabTuples: vocabTuplesType, createHtml: CreateHtmlTypeMc): string[] {
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
    if (!options.includes(key))
      options[0] = key;
    if (isRandom())
      options = shuffle(options);
    const quest = map.get(key) as string;
    vocabTuples.push([quest, key, options]);
  }
  return vocabTuples;
}
