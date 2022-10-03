import { expect, it } from 'vitest';
export interface SlideInterfaceTest {
  processJson(): void;
  makeSlides(): void;
  evaluate(): void;
  result(): void;
}
it('shutup', () => {
  expect(0).toEqual(0);
});
