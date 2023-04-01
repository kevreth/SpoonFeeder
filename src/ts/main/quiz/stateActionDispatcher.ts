import { Json } from './datalayer/globals';
import { SaveData } from './datalayer/saveData';
import { SlideSaveMethods } from './datalayer/slideSave';
import { SlideInterface } from './slideInterface';

export interface StateActions<T> {
  begin(): T;
  current(): T;
  decorate(): T;
  next(): T;
  end(): T;
}
export enum RefreshState {
  BEGIN,
  CURRENT,
  DECORATE,
  NEXT,
  END
}
export function dispatch2<T>(actions: StateActions<T>, advance: boolean): T {
  const slides = Json.get();
  const saves = SaveData.get();
  const state = getRefreshState(slides, saves, advance);
  const retval: T = dispatch(actions, state);
  return retval;
}
export function dispatch<T>(actions: StateActions<T>, state: RefreshState): T {
  let retval: T;
  switch (state) {
    case RefreshState.BEGIN:
      retval = actions.begin();
      break;
    case RefreshState.CURRENT:
      retval = actions.current();
      break;
    case RefreshState.DECORATE:
      retval = actions.decorate();
      break;
    case RefreshState.NEXT:
      retval = actions.next();
      break;
    case RefreshState.END:
      retval = actions.end();
      break;
  }
  return retval;
}
export function getRefreshState(slides: SlideInterface[], saves: SaveData[], advance: boolean): RefreshState {
  let retval = RefreshState.DECORATE;
  if(saves === undefined || saves.length === 0)
    retval = RefreshState.BEGIN;
  else {
    const save = new SlideSaveMethods().getLastSave(saves) as SaveData;
    if(save.cont && (slides.length === saves.length))
      retval = RefreshState.END;
    else if (save.cont && advance)
      retval = RefreshState.NEXT;
    else if (save.cont)
      retval = RefreshState.CURRENT;
  }
  return retval;
}
