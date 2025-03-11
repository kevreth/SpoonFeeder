import { append, empty, postRender } from '../../mediator';
//small file but broken out to solve circular dependencies
export function createPageContent(html: string, doc: Document): void {
  const element = doc.getElementById('continueBtn') as HTMLElement | null;
  if (element != null) element.remove(); // Removes the div with the 'div-02' id
  empty('#content');
  append('#content', html);
  postRender(document);
}
