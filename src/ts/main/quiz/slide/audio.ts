import { isMute } from '../../../main/utilities';

const audio = new Audio();
const PATH = '/resources/audio/incorrect.mp3';
export const playWrongAudio = () => {
  audio.src = PATH;
  play();
};
export const playCorrectAudio = () => {
  audio.src = PATH.replace('in', '');
  play();
};
function play() {
  if (!isMute()) audio.play();
}
export function playAudio(correct: boolean) {
  if (correct) playCorrectAudio();
  else playWrongAudio();
}
