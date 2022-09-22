import { expect, it } from 'vitest'
import {Imap} from '../../main/quiz/slide/slideType/imap';
it('createHtml', () => {
	const result = new Imap().createHtml('', '');
	expect(result).not.toBeNull();
});
