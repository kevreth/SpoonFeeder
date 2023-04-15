import { expect, it } from 'vitest';
import { MaxWidth } from '../../../main/slidetype/strategies/setWidthsStrategy/maxWidth';
it('getIdsAsArray', () => {
  const arr = MaxWidth.getIdsAsArray(3, 'btn');
  expect(arr.length).toEqual(3);
  expect(arr[1]).toEqual('btn1');
});
it('getNumberedElementsAsList', () => {
  expect(0).toEqual(0);
});
it('getMaxWidth', () => {
  expect(0).toEqual(0);
});
it('setWidths', () => {
  expect(0).toEqual(0);
});
