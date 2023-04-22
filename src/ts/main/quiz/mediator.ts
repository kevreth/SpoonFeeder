//quiz mediator
export {
  COURSE_NAME,
  Json,
  MUTE,
  PREFIX_COURSE_FILE,
  RANDOM,
  SaveData,
  adoc2html,
  clearSessionStorage,
  loadCourse
} from '../course/mediator';
export type { Division } from '../course/mediator';
export { Score } from '../course/score/score';
export { ScoreProcessor } from '../course/score/scoreProcessor';
export { SummaryLine } from '../course/score/summaryLine';
export type { ISummaryLine } from '../course/score/summaryLine';
export { difference, intersection, marked, shuffle } from '../mediator';
export { explanation } from '../slide/explanation';
export type { AnswerType, SlideInterface } from '../slide/mediator';
export { INFO, initSlide } from '../slidetype/mediator';
export type { } from '../slidetype/misc/adocVisitor';
export {
  continueButton,
  doneButton,
  makeButton,
  startOverButton
} from './buttons';
export { Evaluation, evaluate, makeRow, percentCorrect } from './evaluate';
export { hideExplainIcon, showExplainIcon } from './explainIcon';
export { switchCourse } from './quiz';
export { fillMatchingSlide, showSlides } from './slideDispatcher';
export { dispatch2 } from './stateActionDispatcher';
export type { StateActions } from './stateActionDispatcher';
export { getChildIds, remove, removeListener } from './utilities';

