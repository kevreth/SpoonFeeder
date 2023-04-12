import {Score} from '../ts/main/quiz/score';
import {CourseFile} from '../ts/main/quiz/datalayer/globals'
import { muteAudio, playBack } from '../ts/main/quiz/slide/conclude/audio';
import {SaveData} from '../ts/main/quiz/datalayer/saveData';
import { loadCourseListing, switchCourse } from '../ts/main/quiz';
import {getCourseName, setCourseListing,createValidHtmlId } from '../ts/main/utilities';
import { getCourseData } from '../ts/main/courseData';

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
