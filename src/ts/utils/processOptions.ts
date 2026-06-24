/**
 * Normalises raw option strings (from `SlideInterface.o`) into structured
 * answer options for Vue rendering. Replaces the legacy approach of detecting
 * `<img` substrings and injecting raw HTML into buttons (see PRD-001).
 *
 * An option is either plain text or an `<img src="...">` tag. Image options are
 * parsed into `{ type: 'image', src, label }`, where `label` is derived from the
 * file name stem (used for alt text / accessibility).
 */
export type AnswerOption =
  | { type: 'text'; label: string }
  | { type: 'image'; label: string; src: string };

const IMG_SRC = /<img[^>]*\ssrc\s*=\s*["']([^"']+)["'][^>]*>/i;

/** Derive a human label from an image src: strip directory and extension. */
export function labelFromSrc(src: string): string {
  const fileName = src.split(/[\\/]/).pop() ?? src;
  const stem = fileName.replace(/\.[^.]+$/, '');
  return stem;
}

export function processOptions(options: string[]): AnswerOption[] {
  return options.map((option) => {
    const match = IMG_SRC.exec(option);
    if (match) {
      const src = match[1] as string;
      return { type: 'image', src, label: labelFromSrc(src) };
    }
    return { type: 'text', label: option };
  });
}
