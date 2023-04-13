export function createHtmlImap(inst: string, img: string): string {
  return `${inst}<br><div id="imagemap" data-src="${img}"></div>`;
}
export type CreateHtmlTypeImap = (inst: string, img: string) => string;
