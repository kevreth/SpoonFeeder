import { postRender } from './postRender';
import { append, empty } from '../../../index';
import { fireHideContinueHook } from '../../../quiz/continueBridge';
//small file but broken out to solve circular dependencies
export function createPageContent(html: string): void {
  fireHideContinueHook();
  empty('#content');
  append('#content', html);
  postRender(document);
}
