import { describe, it, expect } from 'vitest';
import { Course, Unit, Lesson, Module } from '../../main/course/courseData/course';
import { buildBoundaryMap, extractPool, hasReviewableExercises, countReviewableExercises } from '../../main/review/reviewExtractor';
import type { SlideInterface } from '../../main/slide/slideInterface';

function makeSlide(type: string, txt: string, extras: Partial<SlideInterface> = {}): SlideInterface {
  return { type, txt, isExercise: true, list: {}, set: [], o: [], ans: '', res: '', cont: false, exp: '', ref: '', inst: '', img: '', numans: 0, immediateConclusion: false, ...extras } as unknown as SlideInterface;
}

function makeVocabSlide(entries: Record<string, string>): SlideInterface {
  return makeSlide('vocab', '', { list: entries } as Partial<SlideInterface>);
}

function buildCourse(
  units: Array<{
    name: string;
    lessons: Array<{
      name: string;
      modules: Array<{ name: string; inst?: SlideInterface[]; exercises: SlideInterface[] }>;
    }>;
  }>,
): Course {
  const course = new Course();
  course.name = 'test course';
  course.units = units.map(({ name, lessons }) => {
    const unit = new Unit();
    unit.name = name;
    unit.lessons = lessons.map(({ name: lname, modules }) => {
      const lesson = new Lesson();
      lesson.name = lname;
      lesson.modules = modules.map(({ name: mname, inst = [], exercises }) => {
        const mod = new Module();
        mod.name = mname;
        mod.inst = inst;
        mod.exercises = exercises;
        return mod;
      });
      return lesson;
    });
    return unit;
  });
  return course;
}

describe('buildBoundaryMap', () => {
  it('returns one lesson + one unit + one course entry for a single-lesson course', () => {
    const course = buildCourse([
      {
        name: 'u1',
        lessons: [
          {
            name: 'l1',
            modules: [{ name: 'm1', exercises: [makeSlide('mc', 'q1'), makeSlide('mc', 'q2')] }],
          },
        ],
      },
    ]);

    const map = buildBoundaryMap(course);
    expect(map).toHaveLength(3);

    const lesson = map.find((b) => b.scopeType === 'lesson');
    const unit = map.find((b) => b.scopeType === 'unit');
    const course_ = map.find((b) => b.scopeType === 'course');

    expect(lesson).toBeDefined();
    expect(unit).toBeDefined();
    expect(course_).toBeDefined();

    expect(lesson!.scopeKey).toBe('u0_l0');
    expect(unit!.scopeKey).toBe('u0');
    expect(course_!.scopeKey).toBe('course');

    // Slide count:
    // 1 course title + 1 unit title + 1 lesson title + 1 module title + 2 exercise slides = 6
    expect(lesson!.slideIndex).toBe(6);
    expect(unit!.slideIndex).toBe(6);
    expect(course_!.slideIndex).toBe(6);
  });

  it('lesson boundary for lesson 1 is before lesson 2 title slide', () => {
    const course = buildCourse([
      {
        name: 'u1',
        lessons: [
          {
            name: 'l1',
            modules: [{ name: 'm1', exercises: [makeSlide('mc', 'q1')] }],
          },
          {
            name: 'l2',
            modules: [{ name: 'm2', exercises: [makeSlide('mc', 'q2')] }],
          },
        ],
      },
    ]);

    const map = buildBoundaryMap(course);
    const l1Boundary = map.find((b) => b.scopeType === 'lesson' && b.lessonIndex === 0);
    const l2Boundary = map.find((b) => b.scopeType === 'lesson' && b.lessonIndex === 1);

    expect(l1Boundary).toBeDefined();
    expect(l2Boundary).toBeDefined();

    // l1 boundary = slideIndex of lesson 2 title slide
    // = 1 course + 1 unit + 1 lesson1 + 1 mod1 + 1 exercise = 5 → l1 boundary at 5
    expect(l1Boundary!.slideIndex).toBe(5);

    // l2 boundary = after lesson 2 title + mod2 title + 1 exercise = 5 + 1(l2 title) + 1(mod2) + 1(q2) = 8
    expect(l2Boundary!.slideIndex).toBe(8);
  });

  it('includes correct unit and lesson metadata', () => {
    const course = buildCourse([
      {
        name: 'Intro',
        lessons: [
          {
            name: 'Getting started',
            modules: [{ name: 'm1', exercises: [makeSlide('mc', 'q1')] }],
          },
        ],
      },
    ]);

    const map = buildBoundaryMap(course);
    const lesson = map.find((b) => b.scopeType === 'lesson')!;
    expect(lesson.unitIndex).toBe(0);
    expect(lesson.unitName).toBe('Intro');
    expect(lesson.lessonIndex).toBe(0);
    expect(lesson.lessonName).toBe('Getting started');
  });

  it('inst slides count toward slide index', () => {
    const course = buildCourse([
      {
        name: 'u1',
        lessons: [
          {
            name: 'l1',
            modules: [
              {
                name: 'm1',
                inst: [makeSlide('info', 'slide A'), makeSlide('info', 'slide B')],
                exercises: [makeSlide('mc', 'q1')],
              },
            ],
          },
        ],
      },
    ]);

    const map = buildBoundaryMap(course);
    const lesson = map.find((b) => b.scopeType === 'lesson')!;
    // 1 course + 1 unit + 1 lesson + 1 module + 2 inst + 1 exercise = 7
    expect(lesson.slideIndex).toBe(7);
  });

  it('vocab slides are counted by their expansion size', () => {
    // 5-entry vocab expands to 5 MC slides in the main course
    const vocab = makeVocabSlide({ a: 'A', b: 'B', c: 'C', d: 'D', e: 'E' });
    const course = buildCourse([
      {
        name: 'u1',
        lessons: [
          {
            name: 'l1',
            modules: [{ name: 'm1', exercises: [vocab] }],
          },
        ],
      },
    ]);

    const map = buildBoundaryMap(course);
    const lesson = map.find((b) => b.scopeType === 'lesson')!;
    // 1 course + 1 unit + 1 lesson + 1 module + 5 vocab-expanded = 9
    expect(lesson.slideIndex).toBe(9);
  });
});

describe('extractPool', () => {
  it('focused lesson scope returns only exercises from that lesson', () => {
    const q1 = makeSlide('mc', 'q1-l1');
    const q2 = makeSlide('mc', 'q2-l2');
    const course = buildCourse([
      {
        name: 'u1',
        lessons: [
          { name: 'l1', modules: [{ name: 'm1', exercises: [q1] }] },
          { name: 'l2', modules: [{ name: 'm2', exercises: [q2] }] },
        ],
      },
    ]);

    const boundary = buildBoundaryMap(course).find(
      (b) => b.scopeType === 'lesson' && b.lessonIndex === 0,
    )!;
    const pool = extractPool(course, boundary, 'focused');
    expect(pool).toHaveLength(1);
    expect(pool[0].txt).toBe('q1-l1');
  });

  it('cumulative lesson scope returns exercises from all lessons up to target', () => {
    const q1 = makeSlide('mc', 'q1');
    const q2 = makeSlide('mc', 'q2');
    const q3 = makeSlide('mc', 'q3');
    const course = buildCourse([
      {
        name: 'u1',
        lessons: [
          { name: 'l1', modules: [{ name: 'm1', exercises: [q1] }] },
          { name: 'l2', modules: [{ name: 'm2', exercises: [q2] }] },
          { name: 'l3', modules: [{ name: 'm3', exercises: [q3] }] },
        ],
      },
    ]);

    const boundary = buildBoundaryMap(course).find(
      (b) => b.scopeType === 'lesson' && b.lessonIndex === 1,
    )!;
    const pool = extractPool(course, boundary, 'cumulative');
    expect(pool).toHaveLength(2); // q1 and q2, not q3
    expect(pool.map((s) => s.txt)).toContain('q1');
    expect(pool.map((s) => s.txt)).toContain('q2');
    expect(pool.map((s) => s.txt)).not.toContain('q3');
  });

  it('focused unit scope returns all exercises from that unit', () => {
    const q1 = makeSlide('mc', 'q1-u1');
    const q2 = makeSlide('mc', 'q2-u1');
    const q3 = makeSlide('mc', 'q3-u2');
    const course = buildCourse([
      {
        name: 'u1',
        lessons: [
          { name: 'l1', modules: [{ name: 'm1', exercises: [q1] }] },
          { name: 'l2', modules: [{ name: 'm2', exercises: [q2] }] },
        ],
      },
      {
        name: 'u2',
        lessons: [{ name: 'l1', modules: [{ name: 'm1', exercises: [q3] }] }],
      },
    ]);

    const boundary = buildBoundaryMap(course).find(
      (b) => b.scopeType === 'unit' && b.unitIndex === 0,
    )!;
    const pool = extractPool(course, boundary, 'focused');
    expect(pool).toHaveLength(2);
    expect(pool.map((s) => s.txt)).toContain('q1-u1');
    expect(pool.map((s) => s.txt)).toContain('q2-u1');
    expect(pool.map((s) => s.txt)).not.toContain('q3-u2');
  });

  it('course scope returns all exercises', () => {
    const q1 = makeSlide('mc', 'q1');
    const q2 = makeSlide('mc', 'q2');
    const course = buildCourse([
      {
        name: 'u1',
        lessons: [
          { name: 'l1', modules: [{ name: 'm1', exercises: [q1] }] },
          { name: 'l2', modules: [{ name: 'm2', exercises: [q2] }] },
        ],
      },
    ]);

    const boundary = buildBoundaryMap(course).find((b) => b.scopeType === 'course')!;
    const pool = extractPool(course, boundary, 'focused');
    expect(pool).toHaveLength(2);
  });

  it('does not include inst slides in the pool', () => {
    const instSlide = makeSlide('info', 'inst-slide');
    const exercise = makeSlide('mc', 'exercise');
    const course = buildCourse([
      {
        name: 'u1',
        lessons: [
          { name: 'l1', modules: [{ name: 'm1', inst: [instSlide], exercises: [exercise] }] },
        ],
      },
    ]);

    const boundary = buildBoundaryMap(course).find((b) => b.scopeType === 'lesson')!;
    const pool = extractPool(course, boundary, 'focused');
    expect(pool).toHaveLength(1);
    expect(pool[0].txt).toBe('exercise');
  });
});

describe('hasReviewableExercises', () => {
  it('returns true when pool has mc slides', () => {
    expect(hasReviewableExercises([makeSlide('mc', 'q')])).toBe(true);
  });

  it('returns false when pool contains only imap and info', () => {
    expect(
      hasReviewableExercises([makeSlide('imap', 'q'), makeSlide('info', 'i')]),
    ).toBe(false);
  });

  it('returns true for vocab with >= 4 entries', () => {
    expect(
      hasReviewableExercises([makeVocabSlide({ a: '1', b: '2', c: '3', d: '4' })]),
    ).toBe(true);
  });

  it('returns false for vocab with < 4 entries', () => {
    expect(hasReviewableExercises([makeVocabSlide({ a: '1', b: '2', c: '3' })])).toBe(false);
  });
});

describe('countReviewableExercises', () => {
  it('counts each mc slide as 1', () => {
    const course = buildCourse([
      {
        name: 'u1',
        lessons: [
          {
            name: 'l1',
            modules: [
              { name: 'm1', exercises: [makeSlide('mc', 'q1'), makeSlide('mc', 'q2')] },
            ],
          },
        ],
      },
    ]);
    const boundary = buildBoundaryMap(course).find((b) => b.scopeType === 'lesson')!;
    expect(countReviewableExercises(course, boundary, 'focused')).toBe(2);
  });

  it('converts vocab with 5 entries to 1 review question (ceil(5/5)=1)', () => {
    const vocab = makeVocabSlide({ a: 'A', b: 'B', c: 'C', d: 'D', e: 'E' });
    const course = buildCourse([
      {
        name: 'u1',
        lessons: [{ name: 'l1', modules: [{ name: 'm1', exercises: [vocab] }] }],
      },
    ]);
    const boundary = buildBoundaryMap(course).find((b) => b.scopeType === 'lesson')!;
    expect(countReviewableExercises(course, boundary, 'focused')).toBe(1);
  });

  it('converts vocab with 10 entries to 2 review questions (ceil(10/5)=2)', () => {
    const vocab = makeVocabSlide(
      Object.fromEntries([...'abcdefghij'].map((c) => [c, c.toUpperCase()])),
    );
    const course = buildCourse([
      {
        name: 'u1',
        lessons: [{ name: 'l1', modules: [{ name: 'm1', exercises: [vocab] }] }],
      },
    ]);
    const boundary = buildBoundaryMap(course).find((b) => b.scopeType === 'lesson')!;
    expect(countReviewableExercises(course, boundary, 'focused')).toBe(2);
  });

  it('skips imap exercises', () => {
    const course = buildCourse([
      {
        name: 'u1',
        lessons: [
          {
            name: 'l1',
            modules: [{ name: 'm1', exercises: [makeSlide('imap', 'q'), makeSlide('mc', 'q2')] }],
          },
        ],
      },
    ]);
    const boundary = buildBoundaryMap(course).find((b) => b.scopeType === 'lesson')!;
    expect(countReviewableExercises(course, boundary, 'focused')).toBe(1);
  });
});
