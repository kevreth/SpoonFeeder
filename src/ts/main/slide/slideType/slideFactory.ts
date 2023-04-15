import type { SlideInterface } from '../slideInterface';
import { BoolFactory } from './bool/factoryBool';
import { GapFactory } from './gap/factoryGap';
import { ImapFactory } from './imap/factoryImap';
import { InfoFactory } from './info/factoryInfo';
import { MaFactory } from './ma/factoryMa';
import { McFactory } from './mc/factoryMc';
import { SelectFactory } from './select/factorySelect';
import { SortFactory } from './sort/factorySort';
import { VocabFactory } from './vocab/factoryVocab';
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
  for (const value of values) {
    if ( type == value.type ) {
      retval = value.instance();
      break;
    }
  };
  return retval;
}
export function initSlide(exercise: SlideInterface) {
  const type = exercise.type;
  const slide = getInstance(type);
  slide.setProperties(exercise);
  const slides = slide.getSlideSet();
  if (slides.length > 0) return slides;
  return slide;
}
