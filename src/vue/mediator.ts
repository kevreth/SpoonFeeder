import {Score} from '../ts/main/quiz/score';
import { CourseFile } from '../ts/main/quiz/datalayer/courseData/courseFile';
import { muteAudio, playBack } from '../ts/main/quiz/slide/conclude/audio';
import {SaveData} from '../ts/main/quiz/datalayer/saveData/saveData';
import { switchCourse } from '../ts/main/quiz';
import { loadCourseListing } from '../ts/main/quiz/datalayer/courseData/loadCourse';
import {createValidHtmlId } from '../ts/main/utilities';
import { getCourseName, setCourseListing } from '../ts/main/quiz/datalayer/webstorage/webStorage';
import { getCourseData } from '../ts/main/quiz/datalayer/courseData/courseData';

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
