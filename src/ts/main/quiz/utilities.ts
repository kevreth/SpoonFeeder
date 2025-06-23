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
