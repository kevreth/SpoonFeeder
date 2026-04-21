export function createHtmlImap(inst: string, img: string): string {
  return `${inst}<div style="height: 16px;"></div><div id="imagemap" data-src="${img}"></div>`;
}
export type CreateHtmlTypeImap = (inst: string, img: string) => string;
