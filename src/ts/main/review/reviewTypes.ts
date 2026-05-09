export type ScopeType = 'lesson' | 'unit' | 'course';
export type ReviewType = 'focused' | 'cumulative';

export interface ReviewBoundary {
  slideIndex: number;
  scopeKey: string;
  scopeType: ScopeType;
  unitIndex: number;
  unitName: string;
  lessonIndex?: number;
  lessonName?: string;
}

export interface ReviewRecord {
  scopeKey: string;
  scopeType: ScopeType;
  unitIndex: number;
  unitName: string;
  lessonIndex?: number;
  lessonName?: string;
  reviewType: ReviewType;
  date: number;
  correct: number;
  total: number;
}

export interface SerializedSlide {
  sourceTxt?: string;
  vocabTerm?: string;
  vocabAns?: string;
  vocabOptions?: string[];
}

export interface SlideResult {
  slideTxt: string;
  correct: number;
  total: number;
}

export interface ReviewDraftState {
  scopeKey: string;
  scopeType: ScopeType;
  unitIndex: number;
  unitName: string;
  lessonIndex?: number;
  lessonName?: string;
  reviewType: ReviewType;
  slides: SerializedSlide[];
  currentIndex: number;
  results: SlideResult[];
}

export const SAMPLE_SIZES: Record<ScopeType, number> = {
  lesson: 5,
  unit: 10,
  course: Infinity,
};

export const REVIEWABLE_TYPES = new Set(['mc', 'ma', 'gap', 'sort', 'bool', 'select', 'vocab']);
