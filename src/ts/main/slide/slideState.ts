interface SlideStateActions<T> {
  init(): T;
  read(): T;
  responded(): T;
  graded(): T;
  continued(): T;
}
enum SlideState {
  INIT,
  READ,
  RESPONDED,
  GRADED,
  CONTINUED,
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function dispatch<T>(actions: SlideStateActions<T>, state: SlideState) {
  const actionMap: { [key in SlideState]: () => T } = {
    [SlideState.INIT]: actions.init.bind(actions),
    [SlideState.READ]: actions.read.bind(actions),
    [SlideState.RESPONDED]: actions.responded.bind(actions),
    [SlideState.GRADED]: actions.graded.bind(actions),
    [SlideState.CONTINUED]: actions.continued.bind(actions),
  };
  return actionMap[state]();
}
