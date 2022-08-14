import {Mc} from '../../main/slideType/mc';
const options = ["opt1","opt2","opt3"];
const question = "question";
test('createHtml', () => {
	const result = new Mc().createHtml(question, options);
	expect(result).not.toBeNull();
	expect(result).toContain("btn2");
});