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
import { CreateHtml, CreateHtmlTypeIntersection } from './strategies/createHtml';
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
  private constructor(public readonly name: string) {}
  public static instance(instanceType:string): SlideInterface|undefined {
    const numTypes = SlideFactory.values.length;
    for(let i=0; i< numTypes; i++) {
      const type = SlideFactory.values[i].name;
      if(type===instanceType) {
        switch(SlideFactory.values[i]) {
          case SlideFactory.BOOL: return new Bool(type, (CreateHtml.MC as CreateHtmlTypeIntersection), MakeSlides.MC,Evaluate.SIMPLE,Result.SIMPLE);
          case SlideFactory.GAP: return new Gap(type, (CreateHtml.GAP as CreateHtmlTypeIntersection), MakeSlides.GAP, Evaluate.GAP, Result.CORRELATED);
          case SlideFactory.IMAP: return new Imap(type, (CreateHtml.IMAP as CreateHtmlTypeIntersection), MakeSlides.IMAP, Evaluate.SIMPLE, Result.SIMPLE);
          case SlideFactory.INFO: return new Info(type, (CreateHtml.INFO as CreateHtmlTypeIntersection), MakeSlides.INFO, Evaluate.DEFAULT, Result.UNSUPPORTED);
          case SlideFactory.MC: return new Mc(type, (CreateHtml.MC as CreateHtmlTypeIntersection),  MakeSlides.MC,Evaluate.SIMPLE,Result.SIMPLE);
          case SlideFactory.SELECT: return new Select(type, (CreateHtml.SELECT as CreateHtmlTypeIntersection), MakeSlides.SELECT, Evaluate.SIMPLE,Result.LIST);
          case SlideFactory.SORT: return new Sort(type, (CreateHtml.SORT as CreateHtmlTypeIntersection), MakeSlides.SORT, Evaluate.SIMPLE,Result.LIST);
          case SlideFactory.VOCAB: return new Vocab(type, (CreateHtml.MC as CreateHtmlTypeIntersection), MakeSlides.VOCAB, Evaluate.VOCAB,Result.CORRELATED);
        }
      }
    }
  }
  public static getInstance(instanceType:string):SlideInterface|undefined {
    return SlideFactory.instance(instanceType);
  }
}
