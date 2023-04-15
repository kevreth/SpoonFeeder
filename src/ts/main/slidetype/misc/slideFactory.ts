import type { SlideInterface } from '../../slide/slideInterface';
import { BoolFactory } from '../types/bool/factoryBool';
import { GapFactory } from '../types/gap/factoryGap';
import { ImapFactory } from '../types/imap/factoryImap';
import { InfoFactory } from '../types/info/factoryInfo';
import { MaFactory } from '../types/ma/factoryMa';
import { McFactory } from '../types/mc/factoryMc';
import { SelectFactory } from '../types/select/factorySelect';
import { SortFactory } from '../types/sort/factorySort';
import { VocabFactory } from '../types/vocab/factoryVocab';
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
