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
  maxWidthStrategy(options.length, 'btn', doc);
  options.forEach((option, optionCtr) => {
    addEventListener(doc, option, options.length, optionCtr, setValues, txt);
  });
}
function addEventListener(
  doc: Document,
  option: string,
  length: number,
  optionCtr: number,
  setValues: SetValues,
  txt: string
): void {
  const element = doc.getElementById('btn' + optionCtr) as HTMLElement;
  element.addEventListener('click', () => {
    conclude(length, doc, setValues, option, optionCtr, txt);
  });
}
function conclude(
  length: number,
  doc: Document,
  setValues: SetValues,
  option: string,
  optionCtr: number,
  txt: string
) {
  for (let i = 0; i < length; i++)
    removeListener(doc.getElementById('btn' + i) as HTMLElement);
  setValues.setRes(option);
  setValues.saveData();
  const isCorrect = setValues.result() as boolean;
  mark(isCorrect, optionCtr, doc);
  playAudio(isCorrect);
  showButton(doc, txt);
}
function mark(isCorrect: boolean, optionCtr: number, doc: Document) {
  const optionButton = doc.getElementById('btn' + optionCtr) as HTMLElement;
  const color = isCorrect ? 'green' : 'red';
  optionButton.style.backgroundColor = color;
}
