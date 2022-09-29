import { removeListener, isRandom, shuffle } from '../../../../utilities';
import type { SetWidthTypeSimple } from '../setWidths';
import { MakeSlides } from '../../../makeSlides';
import { SetValues, Slide } from '../../../slide';
import type { CreateHtmlTypeMc } from '../createHtml';
const { createPageContent } = Slide;
const { showButton } = MakeSlides;

export function makeSlidesStrategyMc(
  txt: string,
  options: string[],
  isExercise: boolean,
  createHtml: CreateHtmlTypeMc,
  maxWidthStrategy: SetWidthTypeSimple,
  doc: Document,
  setValues: SetValues<string>
) {
  const shuffleFlag = isExercise && isRandom();
  if (shuffleFlag) options = shuffle(options);
  const html = createHtml(txt, options);
  createPageContent(html, doc);
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
    optionButtonEventListener(length, doc, setValues, option, optionCtr);
  });
}
function optionButtonEventListener(
  length: number,
  doc: Document,
  setValues: SetValues<string>,
  option: string,
  optionCtr: number
) {
  for (let i = 0; i < length; i++)
    removeListener(doc.getElementById('btn' + i) as HTMLElement);
  setValues.setRes(option);
  setValues.saveData();
  decorateOptionButton(setValues, doc, optionCtr);
  showButton(doc);
}
function decorateOptionButton(
  setValues: SetValues<string>,
  doc: Document,
  optionCtr: number
) {
  const result = setValues.result();
  const optionButton = doc.getElementById('btn' + optionCtr) as HTMLElement;
  let color = 'red';
  if (result) color = 'green';
  optionButton.style.backgroundColor = color;
}
