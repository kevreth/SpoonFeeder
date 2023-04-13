import { remove } from '../../../utilities';
import { getCourseListing, getCourseName, setCourseListing } from '../webstorage/webStorage';
import { getYaml } from '../utilities/fileUtilties';
import { PREFIX_COURSE_FILE } from './loadCourse';
//Vue interface to Course data.
export class CourseData {
  public courseName: string;
  public availableCourses: string[] = []
  constructor() {
    const course = getCourseName();
    const list = getCourseListing();
    if (course === null || course === undefined)
      this.courseName = '';
    else this.courseName = course;
    if (list !== null && list !== undefined)
      this.availableCourses = remove(list, course);
    else {
      const filename = PREFIX_COURSE_FILE + '/listing.yml'
      getYaml(filename, (listing: Array<string>) => {
        this.availableCourses = listing;
        setCourseListing(listing);
      });
    }
  }
}
export function getCourseData() {
  return new CourseData();
}
