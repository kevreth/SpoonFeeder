export function showExplainIcon(exp: string, doc: Document) {
  if (exp !== undefined && exp !== '' && exp) {
    setExplainIconVisibility(doc, Visibility.VISIBLE);
  }
}
export function hideExplainIcon(doc: Document) {
  setExplainIconVisibility(doc, Visibility.HIDDEN);
}
enum Visibility {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
}
function setExplainIconVisibility(doc: Document, visibility: Visibility) {
  const explain = doc.getElementById('explainIcon') as HTMLElement;
  explain.style.visibility = visibility;
}
