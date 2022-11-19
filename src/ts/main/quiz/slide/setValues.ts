import type { SlideInterface } from '../slideInterface';
import type { AnswerType, ResultReturnType } from './strategies/resultStrategy';
//Encapsulates certain methods in slides so they can be passed as parameters
//to children of slides without keeping "this" context.
export class SetValues {
  constructor(
    public readonly saveData: () => void,
    public readonly result: () => ResultReturnType,
    public readonly getRes: () => AnswerType,
    public readonly setRes: (res: AnswerType) => void,
    public readonly setContinue: () => void,
    public readonly getSlide: () => SlideInterface
  ) {}
}
