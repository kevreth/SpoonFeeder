import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getCurrentSlideExplanation } from '../../main/dataaccess/saveData/currentSlide';
import { Json } from '../../main/dataaccess/saveData/saveFile';
import { COURSE_NAME } from '../../main/dataaccess/webstorage/webStorage';
import { SaveData } from '../../main/dataaccess/saveData/saveData';
import type { SlideInterface } from '../../main/slide/slideInterface';

function makeSlide(txt: string, exp = '', ans = ''): SlideInterface {
  return {
    txt,
    exp,
    ans,
    ref: '',
    res: '',
    cont: false,
    isExercise: false,
  } as unknown as SlideInterface;
}

const SLIDE1_TXT = 'What is 2+2?';
const SLIDE1_EXP = 'Because arithmetic.';
const SLIDE2_TXT = 'What is the capital of France?';

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  COURSE_NAME.set('test');
  Json.set([
    makeSlide(SLIDE1_TXT, SLIDE1_EXP, '4'),
    makeSlide(SLIDE2_TXT, 'Paris is the capital.', 'Paris'),
  ]);
});

afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

describe('getCurrentSlideExplanation', () => {
  it('includes the slide txt in the returned HTML', async () => {
    await SaveData.set(SLIDE1_TXT, 'my answer', false);
    const html = await getCurrentSlideExplanation();
    expect(html).toContain(SLIDE1_TXT);
  });

  it('includes the explanation text for the current slide', async () => {
    await SaveData.set(SLIDE1_TXT, 'my answer', false);
    const html = await getCurrentSlideExplanation();
    expect(html).toContain(SLIDE1_EXP);
  });

  it('reflects the DECORATE state (last answered, not yet continued)', async () => {
    // Saves q1 with cont=false — dispatch2(advance=false) returns DECORATE → q1
    await SaveData.set(SLIDE1_TXT, 'four', false);
    const html = await getCurrentSlideExplanation();
    expect(html).toContain(SLIDE1_TXT);
    expect(html).not.toContain(SLIDE2_TXT);
  });

  it('includes the user response in the returned HTML', async () => {
    await SaveData.set(SLIDE1_TXT, 'my-unique-response-value', false);
    const html = await getCurrentSlideExplanation();
    expect(html).toContain('my-unique-response-value');
  });
});
