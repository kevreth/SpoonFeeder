import { localSync, sessionSync } from '../../infrastructure/storage/storageInit';
import type { MuteFlag } from '../../slide/conclude/audio';

// Session-scoped boolean flags
export const RANDOM = {
  is: () => sessionSync.get<string>('random') === 'true',
  set: () => sessionSync.set('random', 'true'),
  clear: () => sessionSync.set('random', 'false'),
  remove: () => sessionSync.remove('random'),
} as const;

export const TRANSITION = {
  is: () => sessionSync.get<string>('transition') === 'true',
  set: () => sessionSync.set('transition', 'true'),
  clear: () => sessionSync.set('transition', 'false'),
  remove: () => sessionSync.remove('transition'),
} as const;

export const MUTE: MuteFlag & { remove(): void } = {
  is: () => sessionSync.get<string>('mute') === 'true',
  set: () => sessionSync.set('mute', 'true'),
  clear: () => sessionSync.set('mute', 'false'),
  remove: () => sessionSync.remove('mute'),
};

// Persistent course name
export const COURSE_NAME = {
  get: () => localSync.get<string>('courseName') ?? null,
  set: (val: string) => localSync.set('courseName', val),
  remove: () => localSync.remove('courseName'),
} as const;

// Session-scoped course listing
export function setCourseListing(value: Array<string>): void {
  sessionSync.set('courses', value);
}

export function clearCourseListing(): void {
  sessionSync.remove('courses');
}

export function getCourseListing(): Array<string> {
  return sessionSync.get<Array<string>>('courses') ?? [];
}

export function clearSessionStorage(): void {
  sessionSync.clear();
}
