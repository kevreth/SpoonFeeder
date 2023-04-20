import { continueButton, showExplainIcon } from '../../quiz/mediator';
import type { AnswerType } from '../../slidetype/mediator';
import type { SlideInterface } from '../slideInterface';
import { AudioPlayer } from './audio';

export function conclude(
  doc: Document,
  slide: SlideInterface,
  res: AnswerType,
  txt: string,
  audioPlayer: AudioPlayer,
  _showExplainIcon: (exp: string, doc: Document) => void,
  _continueButton: (doc: Document, txt: string) => void
) {
  slide.setRes(res);
  if (!slide.immediateConclusion) {
    const isCorrect = slide.decorate(doc);
    audioPlayer.playAudio(isCorrect);
  }
  slide.saveData();
  const done = doc.getElementById('btn');
  if (done !== null) done.remove();
  _showExplainIcon(slide.exp, doc);
  _continueButton(doc, txt);
}
export function conclude2(
  doc: Document,
  slide: SlideInterface,
  res: AnswerType,
  txt: string,
  audioPlayer: AudioPlayer
) {
  conclude(doc, slide, res, txt, audioPlayer, showExplainIcon, continueButton);
}
