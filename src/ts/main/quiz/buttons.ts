import { fireShowContinueHook } from './continueBridge';

export function makeButton(id: string, clazz: string, content: string): string {
  return `<button id="${id}" class="${clazz}" type="button">${content}</button>`;
}

export function doneButton() {
  return makeButton('btn', 'done', 'done');
}

export function continueButton(_doc: Document, txt: string): void {
  fireShowContinueHook(txt);
}
