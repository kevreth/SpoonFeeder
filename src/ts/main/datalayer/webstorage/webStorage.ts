import {
  getLocalStorage,
  getSessionStorage,
  setLocalStorage,
  setSessionStorage,
} from '../persistence/webPersistence';

function checkSessionStorageFlag(key: string): boolean {
  const val = getSessionStorage(key);
  //assume key not existing is false
  let retval = false;
  if (val === 'true') retval = true;
  return retval;
}
export function setCourseListing(value: Array<string>) {
  const str = JSON.stringify(value);
  setSessionStorage('courses', str);
}
export function getCourseListing() {
  const json = getSessionStorage('courses') as string;
  const str = JSON.parse(json);
  return str;
}
export function setCourseName(value: string) {
  setLocalStorage('courseName', value);
}
export function getCourseName() {
  return getLocalStorage('courseName') as string;
}
function setSessionStorageFlag(key: string) {
  setSessionStorage(key, 'true');
}
function clearSessionStorageFlag(key: string) {
  setSessionStorage(key, 'false');
}
export function setMute() {
  setSessionStorageFlag('mute');
}
export function clearMute() {
  clearSessionStorageFlag('mute');
}
export function isMute(): boolean {
  return checkSessionStorageFlag('mute');
}
export function setRandom() {
  setSessionStorageFlag('random');
}
export function clearRandom() {
  clearSessionStorageFlag('random');
}
export function isRandom(): boolean {
  return checkSessionStorageFlag('random');
}
