import { isRandom, removeListener, shuffle } from '../../../../utilities';
import { showButton } from '../../../makeSlides';
import type { SlideInterface } from '../../../slideInterface';
import { playAudio } from '../../audio';
import { createPageContent } from '../../createPageContent';
import type { Mc } from '../../slideType/mc';
import type { CreateHtmlTypeMc } from '../createHtmlStrategy';
import type { SetWidthTypeSimple } from '../setWidthsStrategy';
export function makeSlidesStrategyMc(
  txt: string,
  options: string[],
  isExercise: boolean,
  createHtml: CreateHtmlTypeMc,
  maxWidthStrategy: SetWidthTypeSimple,
  doc: Document,
  setValues: SlideInterface
) {
  const shuffleFlag = isExercise && isRandom();
  if (shuffleFlag) options = shuffle(options);
  const html = createHtml(txt, options);
  createPageContent(html, doc);
  const numOptions = options.length;
  maxWidthStrategy(numOptions, 'btn', doc);
  options.forEach((option, optionCtr) => {
    addEventListener(doc, option, optionCtr, setValues, txt);
  });
}
function addEventListener(
  doc: Document,
  option: string,
  optionCtr: number,
  setValues: SlideInterface,
  txt: string
): void {
  const element = doc.getElementById('btn' + optionCtr) as HTMLElement;
  element.addEventListener('click', () => {
    conclude(doc, setValues, option, txt);
  });
}
function conclude(
  doc: Document,
  setValues: SlideInterface,
  option: string,
  txt: string
) {
  setValues.setRes(option);
  setValues.saveData();
  const isCorrect = decorate(setValues, doc);
  playAudio(isCorrect);
  showButton(doc, txt);
}
function decorate(setValues: SlideInterface, doc: Document) {
  const options = (setValues as Mc).o;
  for (let i = 0; i < options.length; i++)
    removeListener(doc.getElementById('btn' + i) as HTMLElement);
  const isCorrect = setValues.result() as boolean;
  const optionCtr = options.indexOf(setValues.getRes() as string);
  mark(isCorrect, optionCtr, doc);
  return isCorrect;
}
function mark(isCorrect: boolean, optionCtr: number, doc: Document) {
  const optionButton = doc.getElementById('btn' + optionCtr) as HTMLElement;
  const color = isCorrect ? 'green' : 'red';
  optionButton.style.backgroundColor = color;
}
