import type { SlideInterface } from '../../slide/slideInterface';
import { SaveData } from './saveData';
import { SaveDataDispatcher } from './slideDispatcher2';
import { Json } from './saveFile';
import { dispatch2 } from '../../quiz/stateActionDispatcher';
import { explanation } from '../../slide/explanation';

export async function getCurrentSlideExplanation(): Promise<string> {
  const slide = await _getCurrentSlide();
  slide.res = SaveData.getResults(slide);
  return explanation(slide);
}

async function _getCurrentSlide(): Promise<SlideInterface> {
  const slides = Json.get();
  const saves = await SaveData.get();
  const ss = new SaveDataDispatcher(slides, saves);
  return dispatch2(ss, slides, saves, false);
}
