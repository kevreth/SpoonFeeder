export function createHtml(remaining: string, fills: string, gaps: string): string {
  const html = `\n<div id="fills">${fills}\n</div>` +
    `\n<div id="gaps">${gaps}\n</div>` +
    `\n<div id="remaining">${remaining}</div>` +
    '\n<div id="response"></div>';
  return html;
}
