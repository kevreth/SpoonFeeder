import type { SlideInterface } from '../slide/mediator';

export function showExplainIcon(slide: SlideInterface, doc: Document) {
  if (slide.exp !== undefined && slide.exp !== '' && slide.exp) {
    setExplainIconVisibility(doc, Visibility.VISIBLE);
  }
}
export function hideExplainIcon(doc: Document) {
  setExplainIconVisibility(doc, Visibility.HIDDEN);
}
export enum Visibility {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
}
function setExplainIconVisibility(doc: Document, visibility: Visibility) {
  const explain = doc.getElementById('explainIcon') as HTMLElement;
  explain.style.visibility = visibility;
}
