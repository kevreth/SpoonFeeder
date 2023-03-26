import { isMute } from '../../../main/utilities';

const audio = new Audio();
const INCORRECT = '/resources/audio/incorrect.mp3';
const CORRECT = INCORRECT.replace('in', '');

export function playAudio(correct: boolean) {
  if(isMute()) return;
  audio.src = INCORRECT;
  if (correct) audio.src = CORRECT;
  audio.play();
}
