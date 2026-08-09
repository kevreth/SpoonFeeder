import type { SlideInterface } from '../../../slide/slideInterface';
import { Slide } from '../../../slide/slide';
import type { AdocVisitorInterface } from '../../misc/adocVisitor';
import { AdocVisitor } from '../../misc/adocVisitor';
import type { SlideType } from '../../misc/slideType';
// Bowtie: one condition (center, single choice from `o`), two actions
// (left branch, choose 2 from `bowtieActions`), two monitors (right branch,
// choose 2 from `bowtieMonitors`) — all answered on one screen and scored
// together. Encoded as a fixed 5-slot array so the existing
// Evaluate.GAP/Result.CORRELATED pairing (N independent per-position
// judgments) applies unchanged; each branch pair is sorted so unordered
// picks still compare correctly.
export function buildBowtieAnswer(
  condition: string,
  actions: string[],
  monitors: string[],
): string[] {
  return [condition, ...[...actions].sort(), ...[...monitors].sort()];
}
export class Bowtie extends Slide implements SlideType {
  setProperties(props: SlideInterface): void {
    ({
      txt: this.txt,
      o: this.o,
      bowtieActions: this.bowtieActions,
      bowtieMonitors: this.bowtieMonitors,
      isExercise: this.isExercise,
    } = props);
    const authoredAns = props.ans as string[];
    this.ans = buildBowtieAnswer(
      authoredAns[0] as string,
      [authoredAns[1] as string, authoredAns[2] as string],
      [authoredAns[3] as string, authoredAns[4] as string],
    );
    this.accept(new AdocVisitor());
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitBowtie(this);
  }
  getAnswerCount(): number {
    return this.ans.length;
  }
}
