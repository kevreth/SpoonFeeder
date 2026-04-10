import { last } from 'lodash';
import type { SlideInterface } from '../../slide/slideInterface';
import type { StateActions } from '../../quiz/stateActionDispatcher';
import { Json } from './saveFile';
import { SaveData } from './saveData';
import { fillMatchingSlide } from '../../quiz/slideDispatcher';

export class SaveDataDispatcher implements StateActions<SlideInterface> {
  constructor(public slides: SlideInterface[], public saves: SaveData[]) {}
  //DUPLICATE CODE: slideDispatche.getSlide()
  private getSlide(increment: number) {
    const save = last(this.saves) as SaveData;
    const idx = Json.findMatchingSlide(save.txt);
    const slide = Json.getMatchingSlide(idx + increment);
    fillMatchingSlide(slide, save);
    return slide;
  }
  begin(): SlideInterface {
    return this.slides[0];
  }
  current(): SlideInterface {
    return this.getSlide(0);
  }
  decorate(): SlideInterface {
    return this.getSlide(0);
  }
  next(): SlideInterface {
    throw new Error('Method not implemented.');
  }
  end(): SlideInterface {
    throw new Error('Method not implemented.');
  }
}
