import type { SlideInterface } from '../../slide/slideInterface';
import { SaveData } from './saveData';
import { SaveDataDispatcher } from './slideDispatcher2';
import { Json } from './saveFile';
import { dispatch2 } from '../../quiz/stateActionDispatcher';
import { explanation } from '../../slide/explanation';

export function getCurrentSlideExplanation(): string {
  const slide = _getCurrentSlide();
  slide.res = SaveData.getResults(slide);
  return explanation(slide);
}

function _getCurrentSlide(): SlideInterface {
  const ss = new SaveDataDispatcher(Json.get(), SaveData.get());
  return dispatch2(ss, false);
}
