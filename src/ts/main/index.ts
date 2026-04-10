export { difference, intersection, isEqual, last, shuffle } from 'lodash';
export { marked } from 'marked';
export { browserAdaptor } from 'mathjax-full/js/adaptors/browserAdaptor';
export { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html';
export { TeX } from 'mathjax-full/js/input/tex';
export { mathjax } from 'mathjax-full/js/mathjax';
export { CHTML } from 'mathjax-full/js/output/chtml';
export { polyfill } from 'mobile-drag-drop';
export { scrollBehaviourDragImageTranslateOverride } from 'mobile-drag-drop/scroll-behaviour';
import $ from 'jquery';
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
