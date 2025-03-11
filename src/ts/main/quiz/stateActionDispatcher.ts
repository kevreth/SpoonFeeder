import { last } from '../mediator';
import type { SlideInterface } from './mediator';
import { Json, SaveData } from './mediator';

export interface StateActions<T> {
  begin(): T;
  current(): T;
  decorate(): T;
  next(): T;
  end(): T;
}
enum RefreshState {
  BEGIN,
  CURRENT,
  DECORATE,
  NEXT,
  END,
}
export function dispatch2<T>(actions: StateActions<T>, advance: boolean): T {
  const slides = Json.get();
  const saves = SaveData.get();
  const state = getRefreshState(slides, saves, advance);
  const retval: T = dispatch(actions, state);
  return retval;
}
function dispatch<T>(actions: StateActions<T>, state: RefreshState) {
  const actionMap: { [key in RefreshState]: () => T } = {
    [RefreshState.BEGIN]: actions.begin.bind(actions),
    [RefreshState.CURRENT]: actions.current.bind(actions),
    [RefreshState.DECORATE]: actions.decorate.bind(actions),
    [RefreshState.NEXT]: actions.next.bind(actions),
    [RefreshState.END]: actions.end.bind(actions),
  };
  return actionMap[state]();
}
function getRefreshState(
  slides: SlideInterface[],
  saves: SaveData[],
  advance: boolean
): RefreshState {
  let retval = RefreshState.DECORATE;
  if (saves === undefined || saves.length === 0) retval = RefreshState.BEGIN;
  else {
    const save = last(saves) as SaveData;
    if (save.cont && slides.length === saves.length) retval = RefreshState.END;
    else if (save.cont && advance) retval = RefreshState.NEXT;
    else if (save.cont) retval = RefreshState.CURRENT;
  }
  return retval;
}
