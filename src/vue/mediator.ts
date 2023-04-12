import {Score} from '../ts/main/quiz/score';
import {CourseFile} from '../ts/main/quiz/datalayer/globals'
import { muteAudio, playBack } from '../ts/main/quiz/slide/audio';
import {SaveData} from '../ts/main/quiz/datalayer/saveData';
import { loadCourseListing, switchCourse } from '../ts/main/quiz';
import {getCourseName, setCourseListing,getCourseData, createValidHtmlId } from '../ts/main/utilities';

export {
  Score,
  CourseFile,
  muteAudio,
  playBack,
  SaveData,
  loadCourseListing,
  switchCourse,
  getCourseName,
  setCourseListing,
  getCourseData,
  createValidHtmlId
};