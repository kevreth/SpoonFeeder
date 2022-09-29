export class MaxWidth {
  public static getIdsAsArray(num: number, str: string): Array<string> {
    const ids: Array<string> = new Array<string>();
    for (let i = 0; i < num; i++) {
      ids.push(str + i);
    }
    return ids;
  }
  public static getNumberedElementsAsList(ids: Array<string>, doc: Document) {
    const elements: Array<HTMLElement> = new Array<HTMLElement>();
    ids.forEach((id) => {
      const fill = doc.getElementById(id) as HTMLElement;
      elements.push(fill);
    });
    return elements;
  }
  public static getMaxWidth(elements: HTMLElement[]) {
    let maxWidth = 0;
    elements.forEach((element) => {
      const width = element.offsetWidth;
      if (width > maxWidth) maxWidth = width;
    });
    return maxWidth;
  }
  public static setWidths(ids: string[], doc: Document, maxWidth: number) {
    ids.forEach((id) => {
      const element = doc.getElementById(id) as HTMLElement;
      element.style.width = `${maxWidth}px`;
    });
  }
}
