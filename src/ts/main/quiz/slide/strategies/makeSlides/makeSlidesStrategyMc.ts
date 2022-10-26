import { Slide } from '../../../../../main/quiz/slide';
import {
  isEqual,
  isRandom,
  removeListener,
  shuffle,
} from '../../../../utilities';
import { showButton } from '../../../makeSlides';
import { SaveData } from '../../../slide/saveData';
import { createPageContent } from '../../createPageContent';
import type { SetValues } from '../../SetValues';
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
  let idx = 0;
  if ((idx = Slide.getSlideSavedIndex(saves, txt)) > -1) {
    //slide was previously saved, so we display results
    const result = saves[idx].result as string;
    const optionCtr = options.findIndex((x) => isEqual(x, result as string));
    decorateOptionButton(setValues, doc, optionCtr);
    showButton(doc, txt);
  } else {
    options.forEach((option, optionCtr) => {
      addBehavior(doc, option, options.length, optionCtr, setValues, txt);
    });
  }
}
function addBehavior(
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
  decorateOptionButton(setValues, doc, optionCtr);
  showButton(doc, txt);
}
function decorateOptionButton(
  setValues: SetValues,
  doc: Document,
  optionCtr: number
) {
  const result = setValues.result();
  const optionButton = doc.getElementById('btn' + optionCtr) as HTMLElement;
  const audio = new Audio();

  let color = 'red';
  audio.src = '/src/audio/incorrect.mp3';
  
  if (result) {
    color = 'green';
    audio.src = '/src/audio/correct.mp3';
  }
  audio.play();
  optionButton.style.backgroundColor = color;
}
