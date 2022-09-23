import { SlideInterface } from './slide';

// export type SlideType = /*ccq |*/ mc | gap | info | select | vocab | imap | sort;
export interface GetScore {
  get score(): number;
  addToScore(value: number): void;
  get questions(): number;
  addToQuestions(value:number): void;
}
export abstract class Division implements GetScore {
  name = '';

  private _score = 0;
  private _questions = 0;
  public get questions(): number {
    return this._questions;
  }
  public addToQuestions(value:number): void {
    this._questions += value;
  }
  public addToScore(score:number): void {
    this._score += score;
  }
  public get score(): number {
    return this._score;
  }
}
export class Course extends Division {
  units: Array<Unit> = [];
}
export class Unit extends Division {
  lessons: Array<Lesson> = [];
}
export class Lesson extends Division {
  modules: Array<Module> = [];
}
export class Module extends Division {
  inst: Array<SlideInterface> = [];
  exercises: Array<SlideInterface> = [];
}
// export abstract class Slides {
//   slides: Array<SlideType> = [];
// }
// //this is not the format in the course file,
// //where info is just a string.
// export interface info extends slide {
//   txt: string;
//   // constructor() {
//   //   super();
//   //   this.type = 'info';
//   // }
// }
// export class ccq extends slide {
//   txt: string;
//   o: Array<string> = [];
//   ans: string;
// }
