import {
  PREFIX_COURSE_FILE,
  loadFile,
} from '../../ts/main/course/courseData/loadCourse';
import {
  COURSE_NAME,
  getCourseListing,
  setCourseListing,
} from '../../ts/main/dataaccess/mediator';
import { remove } from '../../ts/main/quiz/mediator';
//Vue interface to Course data.
export class CourseData {
  public courseName: string;
  public availableCourses: string[] = [];
  constructor() {
    const course = COURSE_NAME.get();
    const list = getCourseListing();
    if (course === null || course === undefined) this.courseName = '';
    else this.courseName = course;
    if (list !== null && list !== undefined)
      this.availableCourses = remove(list, course) as string[];
    else {
      const filename = PREFIX_COURSE_FILE + '/listing.yml';
      loadFile(filename, (listing: Array<string>) => {
        this.availableCourses = listing;
        setCourseListing(listing);
      });
    }
  }
}
// export function getCourseData() {
//   return new CourseData();
// }

function loadFileAsync(file: string): Promise<string[]> {
  return new Promise((resolve) => {
    loadFile(file, (data: string[]) => resolve(data));
  });
}

export async function getCourseData(): Promise<CourseData> {
  const courseData = new CourseData();
  const list = getCourseListing();
  if (list !== null && list !== undefined) {
    courseData.availableCourses = remove(list, courseData.courseName);
  } else {
    const filename = PREFIX_COURSE_FILE + '/listing.yml';
    const listing = await loadFileAsync(filename);
    courseData.availableCourses = listing;
    setCourseListing(listing);
  }
  return courseData;
}
