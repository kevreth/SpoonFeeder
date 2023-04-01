import { showButton } from '../buttons';
import type { SlideInterface } from '../slideInterface';
import { playAudio } from './audio';
import type { AnswerType } from './strategies/resultStrategy';

export function conclude(
  doc: Document,
  slide: SlideInterface,
  res: AnswerType,
  txt: string
) {
  slide.setRes(res);
  if(slide.type !== 'info') {
    const isCorrect = slide.decorate(doc);
    playAudio(isCorrect);
  }
  slide.saveData();
  showButton(doc, txt);
}
