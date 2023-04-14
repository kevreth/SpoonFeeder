export interface SlideStateActions<T> {
  init(): T;
  read(): T;
  responded(): T;
  graded(): T;
  continued(): T;
}
export enum SlideState {
  INIT,
  READ,
  RESPONDED,
  GRADED,
  CONTINUED,
}
export function dispatch<T>(actions: SlideStateActions<T>, state: SlideState) {
  const actionMap: { [key in SlideState]: () => T } = {
    [SlideState.INIT]: actions.init.bind(actions),
    [SlideState.READ]: actions.read.bind(actions),
    [SlideState.RESPONDED]: actions.responded.bind(actions),
    [SlideState.GRADED]: actions.graded.bind(actions),
    [SlideState.CONTINUED]: actions.continued.bind(actions),
  };
  return actionMap[state]();
}
