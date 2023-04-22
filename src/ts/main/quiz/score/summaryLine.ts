import { percentCorrect } from '../mediator';

export interface ISummaryLine {
  name: string;
  score: number;
  complete: number;
  pctCorrect: string;
  count: number;
  pctComplete: string;
  children?: Array<ISummaryLine>;
  add( child: ISummaryLine ): void;
  calculate(): void;
}
export class SummaryLine implements ISummaryLine {
  name = '';
  score = 0;
  complete = 0;
  pctCorrect = '';
  count = 0;
  pctComplete = '';
  children?: ISummaryLine[] = new Array<SummaryLine>();
  add( child: ISummaryLine ): void {
    this.score += child.score;
    this.complete += child.complete;
    this.count += child.count;
    this.calculate();
    this.children?.push( child );
  }
  calculate(): void {
    this.pctComplete = percentCorrect( this.complete, this.count ) + '%';
    this.pctCorrect = percentCorrect( this.score, this.complete ) + '%';
  }
}
