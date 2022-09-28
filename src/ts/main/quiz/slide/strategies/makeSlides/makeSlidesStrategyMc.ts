import { removeListener, isRandom, shuffle } from '../../../../utilities';
import { SetWidthTypeSimple } from '../setWidths';
import { MakeSlides } from '../../../makeSlides';
import { SetValues, Slide } from '../../../slide';
import { CreateHtmlTypeMc } from '../createHtml';
const { createPageContent } = Slide;
const { showButton } = MakeSlides;

export function makeSlidesStrategyMc(txt: string, options: string[], isExercise: boolean, createHtml: CreateHtmlTypeMc, maxWidthStrategy: SetWidthTypeSimple, doc: Document, setValues: SetValues<string>) {
  const shuffleFlag = isExercise && isRandom();
  if (shuffleFlag)
    options = shuffle(options);
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
    for (let i = 0; i < length; i++)
      removeListener(doc.getElementById('btn' + i) as HTMLElement);
    const optionButton = doc.getElementById('btn' + optionCtr) as HTMLElement;
    let color = 'red';
    setValues.setRes(option);
    if (setValues.result())
      color = 'green';
    optionButton.style.backgroundColor = color;
    setValues.saveData();
    showButton(doc);
  });
}
