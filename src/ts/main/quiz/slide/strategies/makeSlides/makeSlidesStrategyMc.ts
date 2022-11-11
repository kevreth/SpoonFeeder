import {
  isEqual,
  isRandom,
  removeListener,
  shuffle,
} from '../../../../utilities';
import { showButton } from '../../../makeSlides';
import { SaveData } from '../../../slide/saveData';
import { playAudio } from '../../audio';
import { createPageContent } from '../../createPageContent';
import type { SetValues } from '../../setValues';
import type { CreateHtmlTypeMc } from '../createHtmlStrategy';
import type { SetWidthTypeSimple } from '../setWidthsStrategy';
const { get: getSavedDataArray } = SaveData;
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
  const saves = getSavedDataArray();
  const idx = 0;
  // if ((idx = Slide.getSlideSavedIndex(saves, txt)) > -1) {
  //   //slide was previously saved, so we display results
  //   conclude(saves, idx, options, setValues, doc, txt);
  // } else {
  options.forEach((option, optionCtr) => {
    addEventListener(doc, option, options.length, optionCtr, setValues, txt);
  });
  // }
}
function conclude(
  saves: SaveData[],
  idx: number,
  options: string[],
  setValues: SetValues,
  doc: Document,
  txt: string
) {
  const result = saves[idx].result as string;
  const optionCtr = options.findIndex((x) => isEqual(x, result as string));
  mark(setValues, doc, optionCtr);
  showButton(doc, txt);
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
    optionButtonEventListener(length, doc, setValues, option, optionCtr, txt);
  });
}
function optionButtonEventListener(
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
  mark(setValues, doc, optionCtr);
  showButton(doc, txt);
}
function mark(setValues: SetValues, doc: Document, optionCtr: number) {
  const optionButton = doc.getElementById('btn' + optionCtr) as HTMLElement;

  //icCorrect
  const isCorrect = setValues.result() as boolean;
  const color = isCorrect ? 'green' : 'red';
  optionButton.style.backgroundColor = color;
  /////
  playAudio(isCorrect as boolean);
}
