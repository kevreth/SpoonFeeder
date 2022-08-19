import { expect, it } from 'vitest'
import {Select} from '../../main/slideType/select';
const options = ["opt1","opt2","opt3"];
const instructions = "instructions";
it('createHtml', () => {
	const result = new Select().createHtml(instructions, options);
	expect(result).not.toBeNull();
	expect(result).toContain("instructions");
	expect(result).toContain("w3");
});