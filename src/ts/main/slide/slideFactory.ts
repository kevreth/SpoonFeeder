import type { SlideInterface } from './slideInterface';
import { BoolFactory } from './slideType/bool/BoolFactory';
import { ImapFactory } from './slideType/imap/factoryImap';
import { InfoFactory } from './slideType/info/factoryInfo';
import { MaFactory } from './slideType/ma/factoryMa';
import { McFactory } from './slideType/mc/factoryMc';
import { SelectFactory } from './slideType/select/factorySelect';
import { SortFactory } from './slideType/sort/factorySort';
import { VocabFactory } from './slideType/vocab/factoryVocab';
import { GapFactory } from './slideType/gap/factoryGap';
const values = [
  new BoolFactory(),
  new GapFactory(),
  new ImapFactory(),
  new InfoFactory(),
  new MaFactory(),
  new McFactory(),
  new SelectFactory(),
  new SortFactory(),
  new VocabFactory(),
];
export function getInstance(type: string): SlideInterface {
  let retval = new InfoFactory().instance();
  values.forEach((value) => {
    if (type == value.type) {
      retval = value.instance();
    }
  });
  return retval;
}
export function initSlide(exercise: SlideInterface) {
  const type = exercise.type;
  const slide = getInstance(type);
  slide.processJson(exercise);
  const slides = slide.getSlideSet();
  if (slides.length > 0) return slides;
  return slide;
}

