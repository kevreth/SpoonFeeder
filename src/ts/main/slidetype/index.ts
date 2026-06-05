//slidetype mediator
export {
  CHTML,
  RegisterHTMLHandler,
  TeX,
  browserAdaptor,
  isEqual,
  mathjax,
  shuffle,
} from '../index';
export {
  Evaluation,
  RANDOM,
  Slide,
  adoc2html,
  makeRow,
} from '../slide/index';
export type {
  AnswerType,
  ResultReturnType,
  ResultType,
  SlideInterface,
} from '../slide/index';
export { AdocVisitor } from './misc/adocVisitor';
export type { AdocVisitorInterface } from './misc/adocVisitor';
export { postRender } from './misc/createPageContent/postRender';
export { CORRECT, INCORRECT } from './misc/markupColors';
export { initSlide } from './misc/slideFactory';
export type { SlideType } from './misc/slideType';
export type { EvaluateType } from './strategies/evaluateStrategy';
export { MaxWidth } from './strategies/setWidthsStrategy/maxWidth';
export { SetWidths } from './strategies/setWidthsStrategy/setWidthsStrategy';
export { BOOL, BoolFactory } from './types/bool/factoryBool';
export { Bool } from './types/bool/slideTypeBool';
export { GAP, GapFactory } from './types/gap/factoryGap';
export { Gap } from './types/gap/slideTypeGap';
export { IMAP, ImapFactory } from './types/imap/factoryImap';
export { Imap } from './types/imap/slideTypeImap';
export { INFO, InfoFactory } from './types/info/factoryInfo';
export { Info } from './types/info/slideTypeInfo';
export { MaFactory } from './types/ma/factoryMa';
export { Ma } from './types/ma/slideTypeMa';
export { MC, McFactory } from './types/mc/factoryMc';
export { Mc } from './types/mc/slideTypeMc';
export { SELECT, SelectFactory } from './types/select/factorySelect';
export { Select } from './types/select/slideTypeSelect';
export { SORT, SortFactory } from './types/sort/factorySort';
export { Sort } from './types/sort/slideTypeSort';
export { VOCAB, VocabFactory } from './types/vocab/factoryVocab';
export { Vocab } from './types/vocab/slideTypeVocab';
