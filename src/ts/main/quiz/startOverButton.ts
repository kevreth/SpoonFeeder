import reloadPage from '../../../vue/composables/startOver';
export function startOverButton(doc: Document) {
  const startOverText = makeButton('startOver', 'startOver', 'Start Over');
  doc.body.insertAdjacentHTML('beforeend', startOverText);
  const startOver = doc.getElementById('startOver') as HTMLElement;
  startOver.addEventListener('click', () => reloadPage());
}
function makeButton(id: string, clazz: string, content: string): string {
  return `<button id="${id}" class="${clazz}" type="button">${content}</button>`;
}
