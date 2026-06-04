import { describe, expect, it } from 'vitest';
import { processOptions, labelFromSrc, type AnswerOption } from '../../utils/processOptions';

describe('processOptions', () => {
  it('treats a plain string as a text option', () => {
    const result = processOptions(['Paris']);
    expect(result).toEqual<AnswerOption[]>([{ type: 'text', label: 'Paris' }]);
  });

  it('parses an <img> option into src + label derived from the file stem', () => {
    const result = processOptions(['<img src="img/car.svg">']);
    expect(result).toEqual<AnswerOption[]>([{ type: 'image', src: 'img/car.svg', label: 'car' }]);
  });

  it('handles single quotes and extra attributes', () => {
    const result = processOptions(["<img class='x' src='plane.png' alt='a plane' >"]);
    expect(result).toEqual<AnswerOption[]>([{ type: 'image', src: 'plane.png', label: 'plane' }]);
  });

  it('processes a mixed list preserving order', () => {
    const result = processOptions(['True', '<img src="award.svg">', 'False']);
    expect(result.map((o) => o.type)).toEqual(['text', 'image', 'text']);
  });

  it('returns an empty array for no options', () => {
    expect(processOptions([])).toEqual([]);
  });
});

describe('labelFromSrc', () => {
  it('strips directory and extension', () => {
    expect(labelFromSrc('a/b/c/bus.svg')).toBe('bus');
    expect(labelFromSrc('plane.png')).toBe('plane');
    expect(labelFromSrc('no-extension')).toBe('no-extension');
  });
});
