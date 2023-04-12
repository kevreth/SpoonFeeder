import { PREFIX_COURSE_FILE } from './quiz';
import { getCourseListing, getCourseName, getYaml, remove, setCourseListing } from './utilities';

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
