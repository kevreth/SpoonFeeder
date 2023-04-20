import { showButton, showExplainIcon } from '../../quiz/mediator';
import type { AnswerType } from '../../slidetype/mediator';
import type { SlideInterface } from '../slideInterface';
import { playAudio } from './audio';

export function conclude(
  doc: Document,
  slide: SlideInterface,
  res: AnswerType,
  txt: string,
  _playAudio: ( isCorrect: boolean ) => void,
  _showExplainIcon: (slide: SlideInterface, doc: Document) => void,
  _showButton: (doc: Document, txt: string) => void,
) {
  slide.setRes(res);
  if (!slide.immediateConclusion) {
    const isCorrect = slide.decorate(doc);
    _playAudio(isCorrect);
  }
  slide.saveData();
  const done = doc.getElementById('btn');
  if (done !== null) done.remove();
  _showExplainIcon(slide, doc);
  _showButton(doc, txt);
}
export function conclude2(
  doc: Document,
  slide: SlideInterface,
  res: AnswerType,
  txt: string) {
  conclude( doc, slide, res, txt, playAudio, showExplainIcon, showButton );
}
