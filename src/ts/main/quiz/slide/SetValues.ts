import type { SaveData } from './saveData';
import type { ResultReturnType } from './strategies/resultStrategy';
//Encapsulates certain methods in slides so they can be passed as parameters
//to children of slides without keeping "this" context.
export class SetValues<T> {
  constructor(
    public readonly saveData: () => void,
    public readonly result: () => ResultReturnType,
    public readonly setRes: (res: T) => void,
    public readonly slideSavedIndex: (datat: SaveData[]) => number
  ) {}
}
