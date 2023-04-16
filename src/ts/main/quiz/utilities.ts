import $ from 'jquery';
export function removeListener(element: Node): void {
  const elClone = element.cloneNode(true) as Node;
  const parent = element.parentNode as Node;
  parent.replaceChild(elClone, element);
  element.addEventListener(
    'click',
    (event) => event.stopImmediatePropagation(),
    true
  );
}
export function getChildIds(doc: Document, parent: string): Array<string> {
  const predicate = '#' + parent + ' [id]';
  const list: NodeListOf<Element> = doc.querySelectorAll(predicate);
  return Array.from(list).map(({ id }) => id);
}
export function remove<T>(arr: Array<T>, item: T) {
  return arr.filter((value) => value !== item);
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
