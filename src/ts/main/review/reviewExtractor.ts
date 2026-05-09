/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Course, Division } from '../course/courseData/course';
import type { DivisionProcessor } from '../course/courseFileProcessor';
import { process } from '../course/courseFileProcessor';
import { initSlide } from '../slidetype/misc/slideFactory';
import type { SlideInterface } from '../slide/slideInterface';
import type { ReviewBoundary, ReviewType } from './reviewTypes';

interface ScopeCtx {
  unitIdx: number;
  unitName: string;
  lessonIdx?: number;
  lessonName?: string;
}

class BoundaryMapBuilder implements DivisionProcessor<void, ScopeCtx, ReviewBoundary[]> {
  private slideCount = 0;

  course_start(course: Division, retval: ReviewBoundary[]): void {
    this.slideCount++;
  }

  unit_start(child: Division, ctr: number, retval: ReviewBoundary[], parent: void): ScopeCtx {
    this.slideCount++;
    return { unitIdx: ctr, unitName: child.name };
  }

  lesson_start(child: Division, ctr: number, retval: ReviewBoundary[], parent: ScopeCtx): ScopeCtx {
    this.slideCount++;
    return { ...parent, lessonIdx: ctr, lessonName: child.name };
  }

  module_start(child: Division, ctr: number, retval: ReviewBoundary[], parent: ScopeCtx): ScopeCtx {
    this.slideCount++;
    return parent;
  }

  inst(slide: SlideInterface, ctr: number, retval: ReviewBoundary[], parent: ScopeCtx): ReviewBoundary[] {
    const s = initSlide(slide);
    this.slideCount += Array.isArray(s) ? s.length : 1;
    return retval;
  }

  exercises(slide: SlideInterface, ctr: number, retval: ReviewBoundary[], parent: ScopeCtx): ReviewBoundary[] {
    const s = initSlide(slide);
    this.slideCount += Array.isArray(s) ? s.length : 1;
    return retval;
  }

  module_end(child: ScopeCtx, retval: ReviewBoundary[], parent: ScopeCtx): void {}

  lesson_end(ctx: ScopeCtx, retval: ReviewBoundary[], parent: ScopeCtx): void {
    retval.push({
      slideIndex: this.slideCount,
      scopeKey: `u${ctx.unitIdx}_l${ctx.lessonIdx ?? 0}`,
      scopeType: 'lesson',
      unitIndex: ctx.unitIdx,
      unitName: ctx.unitName,
      lessonIndex: ctx.lessonIdx,
      lessonName: ctx.lessonName,
    });
  }

  unit_end(ctx: ScopeCtx, retval: ReviewBoundary[], parent: void): void {
    retval.push({
      slideIndex: this.slideCount,
      scopeKey: `u${ctx.unitIdx}`,
      scopeType: 'unit',
      unitIndex: ctx.unitIdx,
      unitName: ctx.unitName,
    });
  }

  course_end(course: void, retval: ReviewBoundary[]): void {
    retval.push({
      slideIndex: this.slideCount,
      scopeKey: 'course',
      scopeType: 'course',
      unitIndex: 0,
      unitName: '',
    });
  }
}

export function buildBoundaryMap(course: Course): ReviewBoundary[] {
  return process(course, new BoundaryMapBuilder(), []);
}

interface PoolCtx {
  unitIdx: number;
  lessonIdx: number;
}

class PoolExtractor implements DivisionProcessor<void, PoolCtx, SlideInterface[]> {
  private collecting = true;

  constructor(
    private boundary: ReviewBoundary,
    private reviewType: ReviewType,
  ) {}

  private shouldCollect(ctx: PoolCtx): boolean {
    if (!this.collecting) return false;
    if (this.boundary.scopeType === 'course') return true;
    if (this.reviewType === 'cumulative') return true;
    if (this.boundary.scopeType === 'lesson') {
      return (
        ctx.unitIdx === this.boundary.unitIndex &&
        ctx.lessonIdx === (this.boundary.lessonIndex ?? 0)
      );
    }
    // focused unit
    return ctx.unitIdx === this.boundary.unitIndex;
  }

  course_start(course: Division, retval: SlideInterface[]): void {}

  unit_start(child: Division, ctr: number, retval: SlideInterface[], parent: void): PoolCtx {
    return { unitIdx: ctr, lessonIdx: -1 };
  }

  lesson_start(child: Division, ctr: number, retval: SlideInterface[], parent: PoolCtx): PoolCtx {
    return { unitIdx: parent.unitIdx, lessonIdx: ctr };
  }

  module_start(child: Division, ctr: number, retval: SlideInterface[], parent: PoolCtx): PoolCtx {
    return parent;
  }

  inst(slide: SlideInterface, ctr: number, retval: SlideInterface[], parent: PoolCtx): SlideInterface[] {
    return retval;
  }

  exercises(slide: SlideInterface, ctr: number, retval: SlideInterface[], parent: PoolCtx): SlideInterface[] {
    if (this.shouldCollect(parent)) retval.push(slide);
    return retval;
  }

  module_end(child: PoolCtx, retval: SlideInterface[], parent: PoolCtx): void {}

  lesson_end(ctx: PoolCtx, retval: SlideInterface[], parent: PoolCtx): void {
    if (
      this.boundary.scopeType === 'lesson' &&
      ctx.unitIdx === this.boundary.unitIndex &&
      ctx.lessonIdx === (this.boundary.lessonIndex ?? 0)
    ) {
      this.collecting = false;
    }
  }

  unit_end(ctx: PoolCtx, retval: SlideInterface[], parent: void): void {
    if (ctx.unitIdx === this.boundary.unitIndex) {
      this.collecting = false;
    }
  }

  course_end(course: void, retval: SlideInterface[]): void {}
}

export function extractPool(
  course: Course,
  boundary: ReviewBoundary,
  reviewType: ReviewType,
): SlideInterface[] {
  return process(course, new PoolExtractor(boundary, reviewType), []);
}

export function hasReviewableExercises(pool: SlideInterface[]): boolean {
  return pool.some(
    (s) =>
      s.type === 'mc' ||
      s.type === 'ma' ||
      s.type === 'gap' ||
      s.type === 'sort' ||
      s.type === 'bool' ||
      s.type === 'select' ||
      (s.type === 'vocab' && s.list && Object.keys(s.list as object).length >= 4),
  );
}

export function countReviewableExercises(
  course: Course,
  boundary: ReviewBoundary,
  reviewType: ReviewType,
): number {
  const pool = extractPool(course, boundary, reviewType);
  let count = 0;
  for (const slide of pool) {
    if (slide.type === 'vocab') {
      const listSize = Object.keys(slide.list as object).length;
      if (listSize >= 4) count += Math.ceil(listSize / 5);
    } else if (
      slide.type === 'mc' ||
      slide.type === 'ma' ||
      slide.type === 'gap' ||
      slide.type === 'sort' ||
      slide.type === 'bool' ||
      slide.type === 'select'
    ) {
      count++;
    }
  }
  return count;
}
