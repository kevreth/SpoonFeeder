export function createHtmlInfo(txt: string): string {
  return `\n${txt}`;
}
export type CreateHtmlTypeInfo = (txt: string) => string;
