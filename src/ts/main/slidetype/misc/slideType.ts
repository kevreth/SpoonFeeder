import type { AdocVisitorInterface, SlideInterface } from '../index';
export interface SlideType {
  setProperties(props: SlideInterface): void;
  accept(visitor: AdocVisitorInterface): void;
}
