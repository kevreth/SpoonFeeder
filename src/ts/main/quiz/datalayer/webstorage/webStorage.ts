function checkSessionStorageFlag(key: string): boolean {
  const val = sessionStorage.getItem(key);
  //assume key not existing is false
  let retval = false;
  if (val === 'true')
    retval = true;
  return retval;
}
export function setCourseListing(value: Array<string>) {
  const str = JSON.stringify(value);
  sessionStorage.setItem('courses', str);
}
export function getCourseListing() {
  const json = sessionStorage.getItem('courses') as string;
  const str = JSON.parse(json);
  return str;
}
export function setLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}
export function getLocalStorage(key: string) {
  return localStorage.getItem(key) as string;
}
export function setCourseName(value: string) {
  setLocalStorage('courseName', value);
}
export function getCourseName() {
  return localStorage.getItem('courseName') as string;
}
function setSessionStorageFlag(key: string) {
  sessionStorage.setItem(key, 'true');
}
function clearSessionStorageFlag(key: string) {
  sessionStorage.setItem(key, 'false');
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
