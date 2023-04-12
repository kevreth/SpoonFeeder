import { SlideInterface } from '../../slideInterface';

export interface SlideType {
  processJson(json: SlideInterface): void;
  decorate(doc: Document): boolean;
}
