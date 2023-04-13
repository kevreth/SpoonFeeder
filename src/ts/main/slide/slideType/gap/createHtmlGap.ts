export function createHtmlGap(remaining: string, fills: string, gaps: string) {
  const html = `\n<div id="fills">${fills}\n</div>` +
    `\n<div id="gaps">${gaps}\n</div>` +
    `\n<div id="remaining">${remaining}</div>` +
    '\n<div id="response"></div>';
  return html;
}
