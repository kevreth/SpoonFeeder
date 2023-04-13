import {Score} from '../ts/main/quiz/score';
import { CourseFile } from '../ts/main/datalayer/courseData/courseFile';
import { muteAudio, playBack } from '../ts/main/slide/conclude/audio';
import {SaveData} from '../ts/main/datalayer/saveData/saveData';
import { switchCourse } from '../ts/main/quiz/quiz';
import { loadCourseListing } from '../ts/main/datalayer/courseData/loadCourse';
import {createValidHtmlId } from '../ts/main/quiz/utilities';
import { getCourseName, setCourseListing } from '../ts/main/datalayer/webstorage/webStorage';
import { getCourseData } from '../ts/main/datalayer/courseData/courseData';

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
