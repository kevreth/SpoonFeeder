import type {SlideInterface} from '../slide';
import {Mc} from './slideType/mc';
import {Gap} from './slideType/gap';
import { Bool } from './slideType/bool';
import {Imap} from './slideType/imap';
import {Info} from './slideType/info';
import {Select} from './slideType/select';
import {Sort} from './slideType/sort';
import {Vocab} from './slideType/vocab';
import { MakeSlides } from './strategies/makeSlides';
import { Evaluate } from './strategies/evaluate';
import { Result } from './strategies/result';
export class SlideFactory {
  static readonly BOOL = new SlideFactory('bool');
  static readonly GAP = new SlideFactory('gap');
  static readonly IMAP = new SlideFactory('imap');
  static readonly INFO = new SlideFactory('info');
  static readonly MC = new SlideFactory('mc');
  static readonly SELECT = new SlideFactory('select');
  static readonly SORT = new SlideFactory('sort');
  static readonly VOCAB = new SlideFactory('vocab');
  static get values(): SlideFactory[] {
    return [
      this.BOOL,
      this.GAP,
      this.IMAP,
      this.INFO,
      this.MC,
      this.SELECT,
      this.SORT,
      this.VOCAB
    ];
  }
  private constructor(public readonly name: string) {
    this.name=name;
  }
  public static instance(instanceType:string): SlideInterface|undefined {
    for(let i=0; i< SlideFactory.values.length; i++) {
      const type = SlideFactory.values[i].name;
      if(type===instanceType) {
        switch(SlideFactory.values[i]) {
          case SlideFactory.BOOL: return new Bool();
          case SlideFactory.GAP: return new Gap(type, MakeSlides.GAP, Evaluate.GAP, Result.CORRELATED);
          case SlideFactory.IMAP: return new Imap(type, MakeSlides.IMAP, Evaluate.SIMPLE, Result.SIMPLE);
          case SlideFactory.INFO: return new Info();
          case SlideFactory.MC: return new Mc();
          case SlideFactory.SELECT: return new Select(type, MakeSlides.SELECT, Evaluate.SIMPLE,Result.LIST);
          case SlideFactory.SORT: return new Sort(type, MakeSlides.SORT, Evaluate.SIMPLE,Result.LIST);
          case SlideFactory.VOCAB: return new Vocab();
        }
      }
    }
  }
}
export function getInstance(instanceType:string):SlideInterface|undefined {
  return SlideFactory.instance(instanceType);
}
