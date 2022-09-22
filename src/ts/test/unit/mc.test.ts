import {Mc} from '../../main/quiz/slide/slideType/mc';
import { expect, it } from 'vitest'
const options = ['opt1','opt2','opt3'];
const question = 'question';
it('createHtml', () => {
	const result = new Mc().createHtml(question, options);
	expect(result).not.toBeNull();
	expect(result).toContain('btn2');
});
