  //not in use yet; used to calculate scores for divisions
  // getScore(): number {
  //   const result = this.result();
  //   let count = 0;
  //   if(Array.isArray(result))
  //     count = result.filter(value => value === true).length;
  //   else
  //     count = result ? 1 : 0;
  //   return count;
  // }
    // public addToScore(score:number): void {
  //   this._score += score;
  // }
  // public get score(): number {
  //   return this._score;
  // }
    // get questions(): number;
  // get score(): number;
  //reset in every child class
  // private _score = 0;
  // private _questions = 0;
  // public get questions(): number {
  //   return this._questions;
  // }
  // public addToQuestions(value:number): void {
  //   this._questions += value;

import { Globals } from '../globals';
import { Course } from './course';

  // }
  export class Score {
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
    summary(course: Course):Array<string> {
      const lines = new Array<string>();
      course.units.forEach((unit) => {
        unit.lessons.forEach((lesson) => {
          lesson.modules.forEach((module) => {
            module.exercises.forEach((exercise) => {
              const txt = exercise.txt;
              const slide = Globals.JSON.getSlideByTxt((txt as string));
              const answer = slide?.result();
              let count = 0;
              if(Array.isArray(answer))
                count = answer.filter(value => value === true).length;
              else
                count = answer ? 1 : 0;
                console.log(count);
              // module.addToScore(count);
              // lesson.addToScore(count);
              // unit.addToScore(count);
              // course.addToScore(count);
            }); //exercise
          }); //lesson
        }); //unit
      }); //course
      return lines;
    }
}
  export interface GetScore {
    get score(): number;
    addToScore(value: number): void;
    get questions(): number;
    addToQuestions(value:number): void;
  }
