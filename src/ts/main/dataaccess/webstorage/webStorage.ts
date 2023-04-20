import {
  WebStorageFlag,
  WebStorageVariable,
} from '../persistence/webPersistence';
export const COURSES = new WebStorageVariable('courses', sessionStorage);
export const RANDOM = new WebStorageFlag('random', sessionStorage);
export const TRANSITION = new WebStorageFlag('transition', sessionStorage);
export const MUTE = new WebStorageFlag('mute', sessionStorage);
export const COURSE_NAME = new WebStorageVariable('courseName', localStorage);
export function clearSessionStorage() {
  sessionStorage.clear();
}
export function setCourseListing(value: Array<string>) {
  COURSES.set(JSON.stringify(value));
}
export function getCourseListing() {
  return JSON.parse(COURSES.get() as string);
}
export function getCourseName() {
  return COURSE_NAME.get();
}
export function isRandom(): boolean {
  return RANDOM.is();
}
export function setSaveData(courseName: string, json: string) {
  new WebStorageVariable(courseName, localStorage).set(json);
}
export function getSaveData(courseName: string) {
  return new WebStorageVariable(courseName, localStorage).get();
}
