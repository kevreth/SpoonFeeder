import { showButton, showExplainIcon } from '../../quiz/mediator';
import type { AnswerType } from '../../slidetype/mediator';
import type { SlideInterface } from '../slideInterface';
import { playAudio } from './audio';

export function conclude2(
  doc: Document,
  slide: SlideInterface,
  res: AnswerType,
  txt: string
) {
  slide.setRes(res);
  if (!slide.immediateConclusion) {
    const isCorrect = slide.decorate(doc);
    playAudio(isCorrect);
  }
  slide.saveData();
  const done = doc.getElementById('btn');
  if (done !== null) done.remove();
  showExplainIcon(slide, doc);
  showButton(doc, txt);
}
