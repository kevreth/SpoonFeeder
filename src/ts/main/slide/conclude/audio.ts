import { MUTE } from '../../dataaccess/mediator';

const audio = new Audio();
const INCORRECT = '/resources/audio/incorrect.mp3';
const CORRECT = INCORRECT.replace('in', '');

export function playAudio(correct: boolean) {
  if (MUTE.is()) return;
  audio.src = INCORRECT;
  if (correct) audio.src = CORRECT;
  audio.play();
}

export const muteAudio = () => {
  audio.muted = true;
  MUTE.clear();
};
export const playBack = () => {
  audio.muted = false;
};
