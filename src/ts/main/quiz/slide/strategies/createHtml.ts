type GapType = (remaining: string, fills: string, gaps: string) => string;
type ImapType = (inst: string, img: string) => string;
export class CreateHtml {
  static readonly GAP: GapType = function(remaining, fills, gaps): string {
    const html = `\n<div id="fills">${fills}\n</div>` +
      `\n<div id="gaps">${gaps}\n</div>` +
      `\n<div id="remaining">${remaining}</div>` +
      '\n<div id="response"></div>';
    return html;
  }
  static readonly IMAP: ImapType = function(inst: string, img: string): string {
    return `${inst}<br><div id="imagemap" data-src="${img}"></div>`;
  }
}
