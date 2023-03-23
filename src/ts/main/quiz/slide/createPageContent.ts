import { append, empty } from '../../utilities';
import { postRender } from './postRender';
//small file but broken out to solve circular dependencies
export function createPageContent(html: string, doc: Document): void {
  const element = doc.getElementById('continueBtn') as HTMLElement | null;
  if (element != null) {
    element.remove(); // Removes the div with the 'div-02' id
  }
  const icon = doc.getElementById('icon') as HTMLElement | null;
  if (icon != null) {
    icon.remove();
  }
  empty('#content');
  append('#content', html);
  postRender(document);
}
