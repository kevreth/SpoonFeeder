import { last } from 'lodash';
import type { SlideInterface } from './index';
import { SaveData } from '../dataaccess/saveData/saveData';

export interface StateActions<T> {
  begin(): T;
  current(): T;
  decorate(): T;
  next(): T;
  end(): T;
}

export type QuizState = 'BEGIN' | 'CURRENT' | 'DECORATE' | 'NEXT' | 'END';

/**
 * Pure dispatch: computes QuizState from pre-loaded slides and saves, then
 * delegates to the appropriate action. No internal storage reads.
 */
export function dispatch2<T>(
  actions: StateActions<T>,
  slides: SlideInterface[],
  saves: SaveData[],
  advance: boolean
): T {
  const state = getQuizState(slides, saves, advance);
  return dispatchToAction(actions, state);
}

function dispatchToAction<T>(actions: StateActions<T>, state: QuizState): T {
  const actionMap: Record<QuizState, () => T> = {
    BEGIN: actions.begin.bind(actions),
    CURRENT: actions.current.bind(actions),
    DECORATE: actions.decorate.bind(actions),
    NEXT: actions.next.bind(actions),
    END: actions.end.bind(actions),
  };
  return actionMap[state]();
}

export function getQuizState(
  slides: SlideInterface[],
  saves: SaveData[],
  advance: boolean
): QuizState {
  if (saves === undefined || saves.length === 0) return 'BEGIN';
  const save = last(saves) as SaveData;
  if (save.cont && slides.length === saves.length) return 'END';
  if (save.cont && advance) return 'NEXT';
  if (save.cont) return 'CURRENT';
  return 'DECORATE';
}
