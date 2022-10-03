import { expect, it } from 'vitest';
export interface SlideInterfaceTest {
  processJson(): void;
  makeSlides(): void;
  evaluate(): void;
  result(): void;
  // setResults(): void;
}
it('shutup', () => {
  expect(0).toEqual(0);
});
