import type { SlideInterface, StateActions } from '../../quiz/mediator';
import { fillMatchingSlide, last } from '../../quiz/mediator';
import { SaveData } from './saveData';
import { Json } from './saveFile';

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
