import type {
  AdocVisitorInterface,
  EvaluateType,
  Evaluation,
} from './index';
export type AnswerType = string | Array<string> | Array<number>;
// number = fractional (0..1) partial-credit score — used by extended
// (partial-credit) multiple response. See Result.PARTIAL.
export type ResultReturnType = boolean | Array<boolean> | number;
export type ResultType = (ans: AnswerType, res: AnswerType) => ResultReturnType;
export interface SlideInterface {
  txt: string;
  type: string;
  cont: boolean;
  exp: string;
  ref: string;
  isExercise: boolean;
  immediateConclusion: boolean;
  ans: AnswerType;
  res: AnswerType;
  o: string[];
  inst: string;
  img: string;
  numans: number;
  list: Map<string, string>;
  set: Array<SlideInterface>;
  // Bin/category labels for extended drag-and-drop (bins). ans/res are
  // string[] — the bin LABEL (not index) per item in `o`, in `o`'s order —
  // kept as labels rather than indices so the summary/review row (which
  // renders raw String(res)/String(ans)) stays readable.
  bins: string[];
  // Per-blank dropdown option lists for cloze (dropdown-in-text/table).
  // ans/res are string[] — one choice per blank, parallel to `choices`.
  choices: string[][];
  // Shared column headers for matrix/grid types. Rows come from `o`. For
  // matrix-single, ans/res are string[] (one correct column per row). For
  // matrix-multi, ans/res are string[] of canonical, sorted comma-joined
  // column NAME lists per row (e.g. "Cardiovascular,Renal") — names rather
  // than indices, both because AnswerType has no string[][] variant for
  // per-row multi-selection and so the summary/review row stays readable.
  cols: string[];
  // Bowtie: left/right branch option pools. Center node reuses `o`. ans/res
  // are a fixed 5-slot string[]: [condition, action1, action2, monitor1,
  // monitor2], with each branch pair canonically sorted (see
  // buildBowtieAnswer) so unordered branch picks still compare correctly
  // under Result.CORRELATED.
  bowtieActions: string[];
  bowtieMonitors: string[];
  // Linked-group (case-study/trend cluster) metadata, stamped onto each
  // expanded child slide by the course loader (see jsonProcessor.ts
  // _expandCluster) — not authored directly on ordinary slides. groupId
  // correlates sibling slides at render time; groupContext carries the
  // shared/evolving scenario text ("trending" = only re-specified when it
  // changes); groupTag is the optional CJMM step label.
  groupId: string;
  groupContext: string;
  groupTag: string;
  groupIndex: number;
  groupTotal: number;
  //currently unused, awaiting removal of adocVisitor
  applyAdoc(): void;
  evaluateStrategy: EvaluateType;
  resultType: ResultType;
  setProperties(properties: SlideInterface): void;
  accept(visitor: AdocVisitorInterface): void;
  evaluate(): Evaluation;
  setResults(res: AnswerType): void;
  result(): ResultReturnType;
  getAnswerCount(): number;
  getSlideSet(): SlideInterface[];
  setRes(res: AnswerType): void;
  getRes(): AnswerType;
  getAns(): AnswerType;
  saveData(): Promise<void>;
}
