import { showButton, showExplainIcon } from '../buttons';
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
