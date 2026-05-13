type PreAdvanceHook = (nextSlideIndex: number) => Promise<void>;

let _hook: PreAdvanceHook | null = null;

export function setPreAdvanceHook(fn: PreAdvanceHook | null): void {
  _hook = fn;
}

export async function firePreAdvanceHook(nextSlideIndex: number): Promise<void> {
  await _hook?.(nextSlideIndex);
}
