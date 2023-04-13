import $ from 'jquery';
import _ from 'lodash';
export const { random, isEqual, difference, intersection, shuffle, escape, last } = _;
export function removeListener(element: Node): void {
  const elClone = element.cloneNode(true) as Node;
  const parent = element.parentNode as Node;
  parent.replaceChild(elClone, element);
  element.addEventListener(
    'click',
    (event) => {
      event.stopImmediatePropagation();
    },
    true
  );
}
export function createValidHtmlId(str: string): string {
  // Remove any characters that are not alphanumeric, underscore, or hyphen
  const validCharacters = /[^\w-]/g;
  const sanitizedStr = str.replace(validCharacters, '');
  // Replace any remaining spaces with hyphens
  const hyphenatedStr = sanitizedStr.replace(/\s+/g, '-');
  // Make sure the ID starts with a letter
  const startsWithLetter = /^[A-Za-z]/;
  const finalStr = hyphenatedStr.replace(startsWithLetter, (match) =>
    match.toLowerCase()
  );
  return finalStr;
}
function checkSessionStorageFlag(key: string): boolean {
  const val = sessionStorage.getItem(key);
  //assume key not existing is false
  let retval = false;
  if (val === 'true') retval = true;
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
export function shuffleMap<K, V>(map: Map<K, V>): Map<K, V> {
  let keys = Array.from(map.keys());
  keys = shuffle(keys);
  const newmap: Map<K, V> = new Map();
  for (const key of keys) {
    const value = map.get(key) as V;
    newmap.set(key, value);
  }
  return newmap;
}
export function getChildIds(doc: Document, parent: string): Array<string> {
  const predicate = '#' + parent + ' [id]';
  const list: NodeListOf<Element> = doc.querySelectorAll(predicate);
  return Array.from(list).map(({ id }) => id);
}
export function remove<T>(arr:Array<T>, item:T) {
  return arr.filter(function(value) {
    return value !== item;
  });
}
// =========================== Jquery wrappers ================================
export function extend<T>(obj1: T, obj2: object) {
  return $.extend(obj1, obj2);
}
//Required only for JQuery load() methods in course data files, usually for tables.
export function append(elem: string, content: string) {
  $(elem).append(content);
}
export function empty(elem: string) {
  $(elem).empty();
}
