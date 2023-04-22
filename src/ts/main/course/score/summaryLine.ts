import { percentCorrect } from '../../quiz/mediator';
export interface ISummaryLine {
  name: string;
  score: number;
  complete: number;
  pctCorrect: string;
  count: number;
  pctComplete: string;
  children?: Array<ISummaryLine>;
  add(child: ISummaryLine): void;
  calculate: (percentCorrect2: (correctCtr: number, responseCtr: number) => string) => void;
}
export class SummaryLine implements ISummaryLine {
  name = '';
  score = 0;
  complete = 0;
  pctCorrect = '';
  count = 0;
  pctComplete = '';
  children?: ISummaryLine[] = new Array<SummaryLine>();
  add(child: ISummaryLine): void {
    this.score += child.score;
    this.complete += child.complete;
    this.count += child.count;
    this.calculate(percentCorrect);
    this.children?.push(child);
  }
  calculate(
    percentCorrect2: (correctCtr: number, responseCtr: number) => string
  ): void {
    this.pctComplete = percentCorrect2(this.complete, this.count) + '%';
    this.pctCorrect = percentCorrect2(this.score, this.complete) + '%';
  }
}
