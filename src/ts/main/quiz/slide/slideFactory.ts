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
import { BoolFactory } from './slideType/bool/BoolFactory';
import { ImapFactory } from './slideType/imap/ImapFactory';
import { InfoFactory } from './slideType/info/InfoFactory';
import { MaFactory } from './slideType/ma/MaFactory';
import { McFactory } from './slideType/mc/McFactory';
import { SelectFactory } from './slideType/select/SelectFactory';
import { SortFactory } from './slideType/sort/SortFactory';
import { VocabFactory } from './slideType/vocab/VocabFactory';
import { GapFactory } from './slideType/gap/GapFactory';
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
export const BOOL = () => new BoolFactory().instance() as Bool;
export const GAP = () => new GapFactory().instance() as Gap;
export const IMAP = () => new ImapFactory().instance() as Imap;
export const INFO = () => new InfoFactory().instance() as Info;
export const MA = () => new McFactory().instance() as Ma;
export const MC = () => new McFactory().instance() as Mc;
export const SELECT = () => new SelectFactory().instance() as Select;
export const SORT = () => new SortFactory().instance() as Sort;
export const VOCAB = () => new VocabFactory().instance() as Vocab;
