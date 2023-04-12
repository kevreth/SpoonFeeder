import { Bool } from './slideType/bool/slideTypeBool';
import { Gap } from './slideType/gap/slideTypeGap';
import { Imap } from './slideType/imap/slideTypeImap';
import { Info } from './slideType/info/slideTypeInfo';
import { Ma } from './slideType/ma/slideTypeMa';
import { Mc } from './slideType/mc/slideTypeMc';
import { Select } from './slideType/select/slideTypeSelect';
import { Sort } from './slideType/sort/slideTypeSort';
import { Vocab } from './slideType/vocab/slideTypeVocab';
import type { SlideInterface } from '../slideInterface';
import { BoolFactory, BOOL } from './slideType/bool/BoolFactory';
import { ImapFactory, IMAP } from './slideType/imap/ImapFactory';
import { InfoFactory, INFO } from './slideType/info/InfoFactory';
import { MaFactory, MA } from './slideType/ma/MaFactory';
import { McFactory, MC } from './slideType/mc/McFactory';
import { SelectFactory, SELECT } from './slideType/select/SelectFactory';
import { SortFactory, SORT } from './slideType/sort/SortFactory';
import { VocabFactory, VOCAB } from './slideType/vocab/VocabFactory';
import { GapFactory, GAP } from './slideType/gap/GapFactory';
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
export { BOOL };
export { GAP };
export { IMAP };
export { INFO };
export { MA };
export { MC };
export { SELECT };
export { SORT };
export { VOCAB };
