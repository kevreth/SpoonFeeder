import {Select} from '../../main/slideType/select';
const options = ["opt1","opt2","opt3"];
const instructions = "instructions";
test('createHtml', () => {
	const result = new Select().createHtml(instructions, options);
	expect(result).not.toBeNull();
	expect(result).toContain("instructions");
	expect(result).toContain("w3");
});