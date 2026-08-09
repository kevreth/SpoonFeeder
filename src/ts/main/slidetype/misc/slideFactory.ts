import type { SlideInterface } from '../../slide/index';
import { BinsFactory } from '../types/bins/factoryBins';
import { BoolFactory } from '../types/bool/factoryBool';
import { BowtieFactory } from '../types/bowtie/factoryBowtie';
import { ClozeTableFactory } from '../types/clozeTable/factoryClozeTable';
import { ClozeTextFactory } from '../types/clozeText/factoryClozeText';
import { EmaFactory } from '../types/ema/factoryEma';
import { GapFactory } from '../types/gap/factoryGap';
import { ImapFactory } from '../types/imap/factoryImap';
import { InfoFactory } from '../types/info/factoryInfo';
import { MaFactory } from '../types/ma/factoryMa';
import { MatrixMultiFactory } from '../types/matrixMulti/factoryMatrixMulti';
import { MatrixSingleFactory } from '../types/matrixSingle/factoryMatrixSingle';
import { McFactory } from '../types/mc/factoryMc';
import { SelectFactory } from '../types/select/factorySelect';
import { SortFactory } from '../types/sort/factorySort';
import { VocabFactory } from '../types/vocab/factoryVocab';
const values = [
  new BinsFactory(),
  new BoolFactory(),
  new BowtieFactory(),
  new ClozeTableFactory(),
  new ClozeTextFactory(),
  new EmaFactory(),
  new GapFactory(),
  new ImapFactory(),
  new InfoFactory(),
  new MaFactory(),
  new MatrixMultiFactory(),
  new MatrixSingleFactory(),
  new McFactory(),
  new SelectFactory(),
  new SortFactory(),
  new VocabFactory(),
];
export function getInstance(type: string): SlideInterface {
  let retval = new InfoFactory().instance();
  for (const value of values) {
    if (type == value.type) {
      retval = value.instance();
      break;
    }
  }
  return retval;
}
export function initSlide(exercise: SlideInterface) {
  const type = exercise.type;
  const slide = getInstance(type);
  slide.setProperties(exercise);
  // placeholder for removal of adocVisitor
  // slide.applyAdoc();
  const slides = slide.getSlideSet();
  if (slides.length > 0) return slides;
  return slide;
}
