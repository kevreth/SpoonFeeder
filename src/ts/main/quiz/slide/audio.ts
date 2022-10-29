const audio = new Audio();
export const getWrongAudio = () => {
  audio.src = '/resources/audio/incorrect.mp3';
};
export const getCorrectAudio = () => {
  audio.src = '/resources/audio/correct.mp3';
};
export const playAudio = () => {
  audio.play();
};
