import $ from 'jquery';
import * as yaml from 'js-yaml';
import _ from 'lodash';
import type { Course } from './quiz/course';
export function getYaml(filename: string, f: (data: Course) => void) {
  fetch(filename)
    .then((res) => res.blob())
    .then((blob) => blob.text())
    .then((yamlAsString) => {
      const yml = yaml.load(yamlAsString) as Course;
      f(yml);
    })
    .catch((err) => console.log('yaml err:', err));
}
export function makeButton(id: string, clazz: string, content: string): string {
  return `<button id="${id}" class="${clazz}" type="button">${content}</button>`;
}
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
function checkSessionStorageFlag(key: string): boolean {
  const val = localStorage.getItem(key);
  //assume key not existing is false
  let retval = false;
  if (val === 'true') retval = true;
  return retval;
}
function setSessionStorageFlag(key: string) {
  localStorage.setItem(key, 'true');
}
function clearSessionStorageFlag(key: string) {
  localStorage.setItem(key, 'false');
}
export function setMute() {
  setSessionStorageFlag('mute');
}
export function clearMute() {
  clearSessionStorageFlag('mute');
}
export function setRandom() {
  setSessionStorageFlag('random');
}
export function clearRandom() {
  clearSessionStorageFlag('random');
}
export function isMute(): boolean {
  return checkSessionStorageFlag('mute');
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
// ================================ Date ======================================
export function convertTwoDigits(dateItem: number) {
  return dateItem.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}
export function createTimeStamp(d: Date) {
  const str =
    d.getUTCFullYear().toString() +
    convertTwoDigits(d.getUTCMonth()) +
    convertTwoDigits(d.getUTCDate()) +
    convertTwoDigits(d.getUTCHours()) +
    convertTwoDigits(d.getUTCMinutes()) +
    convertTwoDigits(d.getUTCSeconds());
  return str;
}
export function timestampNow() {
  return createTimeStamp(new Date(Date.now()));
}
// =========================== Lodash wrappers ================================
export function random(min: number, max: number): number {
  return _.random(min, max);
}
export function isEqual<T>(obj1: T, obj2: T): boolean {
  return _.isEqual(obj1, obj2);
}
export function difference<T>(arrA: Array<T>, arrB: Array<T>): Array<T> {
  return _.difference(arrA, arrB);
}
export function intersection<T>(arrA: Array<T>, arrB: Array<T>): Array<T> {
  return _.intersection(arrA, arrB);
}
export function shuffle<T>(data: Array<T>): Array<T> {
  return _.shuffle(data);
}
export function escape(data: string): string {
  return _.escape(data);
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
