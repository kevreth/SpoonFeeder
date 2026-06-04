export { loadCourseListing } from '../ts/main/course/courseData/loadCourse';
export { CourseFile } from '../ts/main/course/index';
export { COURSE_NAME, SaveData, TRANSITION, getCourseListing, setCourseListing } from '../ts/main/dataaccess/index';
export { Score, switchCourse, Json, MUTE, evaluate, showSlides } from '../ts/main/quiz/index';
export { evaluateAnswer } from '../ts/main/quiz/evaluateAnswer';
export { hideExplainIcon } from '../ts/main/quiz/index';
export { postRender } from '../ts/main/slidetype/index';
export { AudioPlayer } from '../ts/main/slide/index';
export { getCourseData } from './composables/courseData';
export {
  buildBoundaryMap,
  extractPool,
  hasReviewableExercises,
  countReviewableExercises,
  sampleExercises,
  appendReviewRecord,
  clearDraftState,
  setPreAdvanceHook,
  firePreAdvanceHook,
  ReviewSessionController,
  getReviewRecords,
  getMostRecentRecord,
  getHighestReachedIndex,
  setHighestReachedIndex,
} from '../ts/main/review/index';
export type { AnswerType, SlideInterface } from '../ts/main/quiz/index';
export type {
  ReviewBoundary,
  ReviewRecord,
  ReviewType,
  SlideResult,
  ScopeType,
} from '../ts/main/review/index';

