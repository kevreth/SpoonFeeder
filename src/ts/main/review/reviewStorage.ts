import { localAsync, appRegistry } from '../infrastructure/storage/storageInit';
import { registerReviewSchemas } from '../infrastructure/storage/schemas/spoonfeederSchemas';
import type { ReviewRecord, ReviewDraftState } from './reviewTypes';

function ensureReviewRegistered(courseName: string): void {
  if (appRegistry.getSchema(`reviews_${courseName}`) === undefined) {
    registerReviewSchemas(appRegistry, courseName);
  }
}

export async function appendReviewRecord(
  record: ReviewRecord,
  courseName: string,
): Promise<void> {
  ensureReviewRegistered(courseName);
  const key = `reviews_${courseName}`;
  const existing = (await localAsync.get<ReviewRecord[]>(key)) ?? [];
  await localAsync.set(key, [...existing, record]);
}

export async function getReviewRecords(courseName: string): Promise<ReviewRecord[]> {
  ensureReviewRegistered(courseName);
  return (await localAsync.get<ReviewRecord[]>(`reviews_${courseName}`)) ?? [];
}

export async function getMostRecentRecord(
  scopeKey: string,
  courseName: string,
): Promise<ReviewRecord | undefined> {
  const all = await getReviewRecords(courseName);
  const forScope = all.filter((r) => r.scopeKey === scopeKey);
  return forScope.length > 0 ? forScope[forScope.length - 1] : undefined;
}

export async function saveDraftState(
  draft: ReviewDraftState,
  courseName: string,
): Promise<void> {
  ensureReviewRegistered(courseName);
  await localAsync.set(`review_draft_${courseName}`, draft);
}

export async function getDraftState(
  courseName: string,
): Promise<ReviewDraftState | undefined> {
  ensureReviewRegistered(courseName);
  return localAsync.get<ReviewDraftState>(`review_draft_${courseName}`);
}

export async function clearDraftState(courseName: string): Promise<void> {
  ensureReviewRegistered(courseName);
  await localAsync.remove(`review_draft_${courseName}`);
}
