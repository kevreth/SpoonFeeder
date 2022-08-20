import { expect, it } from 'vitest'
import {Sort} from '../../main/slideType/sort';
const inst = "instructions";
const ans = ['alpha','bravo','charlie','delta'];
// const object = {
// 	"type":"sort",
// 	"inst":"sort",
// 	"ans":["a","b","c","d"]
// }
it('createHtml', () => {
	const result = new Sort().createHtml(inst,ans);
	expect(result).not.toBeNull();
});