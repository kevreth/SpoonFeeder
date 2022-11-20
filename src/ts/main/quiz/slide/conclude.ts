import { showButton } from '../makeSlides';
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
  slide.saveData();
  const isCorrect = slide.decorate(doc);
  playAudio(isCorrect);
  showButton(doc, txt);
}
