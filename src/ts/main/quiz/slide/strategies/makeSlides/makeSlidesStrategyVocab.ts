import {
  isEqual,
  isRandom,
  removeListener,
  shuffle,
  timestampNow,
} from '../../../../utilities';
import { continueButton, showButton } from '../../../makeSlides';
import type { SlideInterface } from '../../../slideInterface';
import { playAudio } from '../../audio';
import { createPageContent } from '../../createPageContent';
import { SaveData } from '../../saveData';
import type { SetValues } from '../../setValues';
import type { CreateHtmlTypeMc } from '../createHtmlStrategy';
import type { AnswerType } from '../resultStrategy';
import type { SetWidthTypeSimple } from '../setWidthsStrategy';
const { get: getSavedDataArray } = SaveData;
const { set: saveData } = SaveData;
export const CHOICES = 4;
export type vocabTuplesType = [
  txt: string,
  ans: string,
  options: Array<string>
][];
export function getMissingSlides(
  arr: Array<SaveData>,
  txtArr: string[]
): string[] {
  const retval: string[] = [];
  for (const txt of txtArr) {
    const idx = arr.findIndex((x) => isEqual(x.txt, txt as AnswerType));
    if (idx < 0) retval.push(txt as string);
  }
  return retval;
}
export function makeSlidesStrategyVocab(
  map: Map<string, string>,
  res: AnswerType,
  createHtml: CreateHtmlTypeMc,
  maxWidthStrategy: SetWidthTypeSimple,
  doc: Document,
  setValues: SetValues,
  set: SlideInterface[]
): void {
  const txtArr = Array.from(map.values());
  const savedData = getSavedDataArray();
  const missing = getMissingSlides(savedData, txtArr);
  const vocabTuples = generateQuestions(map, missing);
  const html_list = createHtmlLoop(vocabTuples, createHtml);
  paging(
    doc,
    html_list,
    vocabTuples,
    0,
    maxWidthStrategy,
    res as string[],
    setValues,
    set
  );
}
export function paging(
  doc: Document,
  html_list: string[],
  vocabTuples: vocabTuplesType,
  questionCtr: number,
  maxWidthStrategy: SetWidthTypeSimple,
  res: string[],
  setValues: SetValues,
  set: SlideInterface[]
): void {
  createPageContent(html_list[questionCtr], doc);
  const tuple = vocabTuples[questionCtr];
  const answer = tuple[1];
  const options = tuple[2];
  options.forEach((option, j) => {
    addOptionButtonEventListener(
      j,
      doc,
      answer,
      res,
      option,
      options.length,
      questionCtr,
      html_list,
      vocabTuples,
      setValues,
      maxWidthStrategy,
      set
    );
  });
  maxWidthStrategy(options.length, 'btn', doc);
}
export function addOptionButtonEventListener(
  j: number,
  doc: Document,
  answer: string,
  res: string[],
  option: string,
  numOptions: number,
  questionCtr: number,
  html_list: string[],
  vocabTuples: vocabTuplesType,
  setValues: SetValues,
  maxWidthStrategy: SetWidthTypeSimple,
  set: SlideInterface[]
) {
  const buttonId = 'btn' + j.toString();
  const button = doc.getElementById(buttonId) as HTMLElement;
  const txt = vocabTuples[questionCtr][0];
  button.addEventListener('click', () => {
    conclude(
      res,
      option,
      answer,
      button,
      numOptions,
      doc,
      questionCtr,
      html_list,
      vocabTuples,
      maxWidthStrategy,
      setValues,
      txt,
      set
    );
  });
}
function conclude(
  res: string[],
  option: string,
  answer: string,
  button: HTMLElement,
  numOptions: number,
  doc: Document,
  questionCtr: number,
  html_list: string[],
  vocabTuples: vocabTuplesType,
  maxWidthStrategy: SetWidthTypeSimple,
  setValues: SetValues,
  txt: string,
  set: SlideInterface[]
) {
  res.push(option);
  //isCorrect
  const isCorrect = isEqual(option, answer);
  const color = isCorrect ? 'green' : 'red';
  /////
  playAudio(isCorrect);

  button.style.backgroundColor = color;
  for (let i = 0; i < numOptions; i++) {
    const button = doc.getElementById('btn' + i) as HTMLElement;
    removeListener(button);
  }
  if (questionCtr + 1 < html_list.length) {
    addContinueButtonListener(
      doc,
      html_list,
      vocabTuples,
      questionCtr,
      maxWidthStrategy,
      res,
      setValues,
      set
    );
    saveData(txt, res[questionCtr], timestampNow(), true);
  } else {
    saveData(txt, res[questionCtr], timestampNow(), true);
    showButton(doc, txt);
  }
}

export function addContinueButtonListener(
  doc: Document,
  html_list: string[],
  vocabTuples: vocabTuplesType,
  questionCtr: number,
  maxWidthStrategy: SetWidthTypeSimple,
  res: string[],
  setValues: SetValues,
  set: SlideInterface[]
) {
  const element = continueButton(doc) as HTMLElement;
  element.addEventListener('click', (): void => {
    paging(
      doc,
      html_list,
      vocabTuples,
      questionCtr + 1,
      maxWidthStrategy,
      res,
      setValues,
      set
    );
  });
}
export function createHtmlLoop(
  vocabTuples: vocabTuplesType,
  createHtml: CreateHtmlTypeMc
): string[] {
  const retval: string[] = [];
  for (const tuple of vocabTuples) {
    const question = tuple[0];
    const options = tuple[2];
    const html = createHtml(question, options);
    retval.push(html);
  }
  return retval;
}
export function generateQuestions(
  map: Map<string, string>,
  missingValues: Array<string>
): vocabTuplesType {
  const missingKeys = new Array<string>();
  map.forEach((value, key) => {
    if (missingValues.includes(value)) missingKeys.push(key);
  });
  const keys = Array.from(map.keys());
  const vocabTuples: vocabTuplesType = [];
  for (const key of missingKeys) {
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
