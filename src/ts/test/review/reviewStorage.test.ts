import { describe, it, expect, beforeEach } from 'vitest';
import { appendReviewRecord, getReviewRecords, getMostRecentRecord, saveDraftState, getDraftState, clearDraftState } from '../../main/review/reviewStorage';
import type { ReviewRecord, ReviewDraftState } from '../../main/review/reviewTypes';

// reviewStorage imports localAsync from storageInit which uses the real localStorage.
// We can't easily swap the adapter without dependency injection.
// These tests verify the module's logic using localStorage directly (jsdom provides it).

const COURSE = 'test-course';

function makeRecord(scopeKey: string, correct = 3, total = 5): ReviewRecord {
  return {
    scopeKey,
    scopeType: 'lesson',
    unitIndex: 0,
    unitName: 'Unit 1',
    lessonIndex: 0,
    lessonName: 'Lesson 1',
    reviewType: 'focused',
    date: 1000000,
    correct,
    total,
  };
}

function makeDraft(): ReviewDraftState {
  return {
    scopeKey: 'u0_l0',
    scopeType: 'lesson',
    unitIndex: 0,
    unitName: 'Unit 1',
    lessonIndex: 0,
    lessonName: 'Lesson 1',
    reviewType: 'focused',
    slides: [{ sourceTxt: 'question 1' }],
    currentIndex: 0,
    results: [],
  };
}

describe('reviewStorage (integration via real localStorage in jsdom)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('appendReviewRecord persists and getReviewRecords retrieves', async () => {
    const record = makeRecord('u0_l0');
    await appendReviewRecord(record, COURSE);
    const all = await getReviewRecords(COURSE);
    expect(all).toHaveLength(1);
    expect(all[0].scopeKey).toBe('u0_l0');
    expect(all[0].correct).toBe(3);
  });

  it('appendReviewRecord appends (does not overwrite)', async () => {
    await appendReviewRecord(makeRecord('u0_l0', 3, 5), COURSE);
    await appendReviewRecord(makeRecord('u0_l0', 4, 5), COURSE);
    const all = await getReviewRecords(COURSE);
    expect(all).toHaveLength(2);
  });

  it('getMostRecentRecord returns the last record for a scope', async () => {
    await appendReviewRecord(makeRecord('u0_l0', 2, 5), COURSE);
    await appendReviewRecord(makeRecord('u0_l0', 5, 5), COURSE);
    await appendReviewRecord(makeRecord('u1', 1, 3), COURSE);

    const recent = await getMostRecentRecord('u0_l0', COURSE);
    expect(recent).toBeDefined();
    expect(recent!.correct).toBe(5); // second record

    const unitRecent = await getMostRecentRecord('u1', COURSE);
    expect(unitRecent!.correct).toBe(1);
  });

  it('getMostRecentRecord returns undefined for unknown scope', async () => {
    const result = await getMostRecentRecord('u99', COURSE);
    expect(result).toBeUndefined();
  });

  it('getReviewRecords returns empty array when no records exist', async () => {
    const all = await getReviewRecords(COURSE);
    expect(all).toHaveLength(0);
  });

  it('saveDraftState and getDraftState round-trip the draft', async () => {
    const draft = makeDraft();
    await saveDraftState(draft, COURSE);
    const retrieved = await getDraftState(COURSE);
    expect(retrieved).toBeDefined();
    expect(retrieved!.scopeKey).toBe('u0_l0');
    expect(retrieved!.slides).toHaveLength(1);
    expect(retrieved!.slides[0].sourceTxt).toBe('question 1');
  });

  it('clearDraftState removes the draft', async () => {
    await saveDraftState(makeDraft(), COURSE);
    await clearDraftState(COURSE);
    const retrieved = await getDraftState(COURSE);
    expect(retrieved).toBeUndefined();
  });

  it('getDraftState returns undefined when no draft exists', async () => {
    const result = await getDraftState(COURSE);
    expect(result).toBeUndefined();
  });

  it('review records for different courses are isolated', async () => {
    await appendReviewRecord(makeRecord('u0_l0'), 'course-a');
    const aRecords = await getReviewRecords('course-a');
    const bRecords = await getReviewRecords('course-b');
    expect(aRecords).toHaveLength(1);
    expect(bRecords).toHaveLength(0);
  });
});
