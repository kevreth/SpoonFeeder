import {
  getSessionStorage,
  setSessionStorage
} from '../persistence/webPersistence';
import { COURSE_NAME, MUTE, RANDOM } from './webStorageVariable';
export function setCourseListing(value: Array<string>) {
  const str = JSON.stringify(value);
  setSessionStorage('courses', str);
}
export function getCourseListing() {
  const json = getSessionStorage('courses') as string;
  const str = JSON.parse(json);
  return str;
}
export function setCourseName( value: string ) {
  COURSE_NAME.set( value );
}
export function getCourseName() {
  return COURSE_NAME.get( );
}
export function setMute() {
  MUTE.set();
}
export function clearMute() {
  MUTE.clear();
}
export function isMute(): boolean {
  return MUTE.is();
}
export function setRandom() {
  RANDOM.set();
}
export function clearRandom() {
  RANDOM.clear();
}
export function isRandom(): boolean {
  return RANDOM.is();
}
