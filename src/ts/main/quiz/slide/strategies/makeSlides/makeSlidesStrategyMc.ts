import { isRandom, removeListener, shuffle } from '../../../../utilities';
import { showButton } from '../../../makeSlides';
import { playAudio } from '../../audio';
import { createPageContent } from '../../createPageContent';
import type { SetValues } from '../../setValues';
import type { CreateHtmlTypeMc } from '../createHtmlStrategy';
import type { SetWidthTypeSimple } from '../setWidthsStrategy';
export function makeSlidesStrategyMc(
  txt: string,
  options: string[],
  isExercise: boolean,
  createHtml: CreateHtmlTypeMc,
  maxWidthStrategy: SetWidthTypeSimple,
  doc: Document,
  setValues: SetValues
) {
  const shuffleFlag = isExercise && isRandom();
  if (shuffleFlag) options = shuffle(options);
  const html = createHtml(txt, options);
  createPageContent(html, doc);
  const numOptions = options.length;
  maxWidthStrategy(numOptions, 'btn', doc);
  options.forEach((option, optionCtr) => {
    addEventListener(doc, option, numOptions, optionCtr, setValues, txt);
  });
}
function addEventListener(
  doc: Document,
  option: string,
  numOptions: number,
  optionCtr: number,
  setValues: SetValues,
  txt: string
): void {
  const element = doc.getElementById('btn' + optionCtr) as HTMLElement;
  element.addEventListener('click', () => {
    conclude(numOptions, doc, setValues, option, optionCtr, txt);
  });
}
function conclude(
  numOptions: number,
  doc: Document,
  setValues: SetValues,
  option: string,
  optionCtr: number,
  txt: string
) {
  setValues.setRes(option);
  setValues.saveData();
  const isCorrect = decorate(numOptions, doc, setValues, optionCtr);
  playAudio(isCorrect);
  showButton(doc, txt);
}
function decorate(
  numOptions: number,
  doc: Document,
  setValues: SetValues,
  optionCtr: number
) {
  for (let i = 0; i < numOptions; i++)
    removeListener(doc.getElementById('btn' + i) as HTMLElement);
  const isCorrect = setValues.result() as boolean;
  mark(isCorrect, optionCtr, doc);
  return isCorrect;
}

function mark(isCorrect: boolean, optionCtr: number, doc: Document) {
  const optionButton = doc.getElementById('btn' + optionCtr) as HTMLElement;
  const color = isCorrect ? 'green' : 'red';
  optionButton.style.backgroundColor = color;
}
