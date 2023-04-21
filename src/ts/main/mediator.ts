export {
  difference,
  escape,
  intersection,
  isEqual,
  last,
  random,
  shuffle
} from 'lodash';
export { marked } from 'marked';
export { browserAdaptor } from 'mathjax-full/ts/adaptors/browserAdaptor';
export { RegisterHTMLHandler } from 'mathjax-full/ts/handlers/html';
export { TeX } from 'mathjax-full/ts/input/tex';
export { mathjax } from 'mathjax-full/ts/mathjax';
export { CHTML } from 'mathjax-full/ts/output/chtml';
export { polyfill } from 'mobile-drag-drop';
export { scrollBehaviourDragImageTranslateOverride } from 'mobile-drag-drop/scroll-behaviour';
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
