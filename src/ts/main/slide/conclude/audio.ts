import { WebStorageFlag } from '../../dataaccess/persistence/webPersistence';

export class AudioPlayer {
  private readonly INCORRECT: string = '/resources/audio/incorrect.mp3';
  private readonly CORRECT: string = this.INCORRECT.replace('in', '');
  constructor(public audio: HTMLAudioElement, public mute: WebStorageFlag) {}
  public playAudio(correct: boolean): void {
    if (this.mute.is()) return;
    this.audio.src = this.INCORRECT;
    if (correct) this.audio.src = this.CORRECT;
    this.audio.play();
  }
  public muteAudio(): void {
    this.audio.muted = true;
    this.mute.clear();
  }
  public playBack(): void {
    this.audio.muted = false;
  }
}
