type ShowContinueHook = (txt: string) => void;
type HideContinueHook = () => void;
type OnceClickHook = () => void;

let _showHook: ShowContinueHook | null = null;
let _hideHook: HideContinueHook | null = null;
let _onceClickHook: OnceClickHook | null = null;

export function setShowContinueHook(fn: ShowContinueHook | null): void {
  _showHook = fn;
}

export function setHideContinueHook(fn: HideContinueHook | null): void {
  _hideHook = fn;
}

export function setOnceClickHook(fn: OnceClickHook | null): void {
  _onceClickHook = fn;
}

export function fireShowContinueHook(txt: string): void {
  _showHook?.(txt);
}

export function fireHideContinueHook(): void {
  _hideHook?.();
}

/** Fires the pending one-shot click override if set, then clears it. Returns true if it fired. */
export function fireOnceClickHook(): boolean {
  if (!_onceClickHook) return false;
  const fn = _onceClickHook;
  _onceClickHook = null;
  fn();
  return true;
}
