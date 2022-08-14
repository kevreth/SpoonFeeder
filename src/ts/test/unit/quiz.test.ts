import 'jest-chain';
import 'jest-extended/all';
import {Mc} from '../../main/slideType/mc';
import {processJson, percentCorrect} from '../../main/quiz';
const testjson = '[{"type":"mc","q":"a\'a","o":[{"o":"hadn\'t","a":"C "},{"o":"couldn\'t","a":"wrong"}]},{"type":"gap","text":"text (1) text (2)","ans":["ans1","ans2"]}]';
sessionStorage.setItem("random","false");
test('check for HTML encoding', () => {
    let json = processJson(JSON.parse(testjson));
    expect(json).toBeDefined()
    expect(json).not.toBeEmpty().toContainAllKeys(["0","1"]);
    expect(json[1]).toBeDefined().not.toBeEmpty();
    expect(json[0]).toBeInstanceOf(Mc);
    // expect(json[0] as Mc).o.toBe('couldn\'t');
    // expect(json[0].q).toBe('a\'a');
})
test('percentCorrect', () => {
    let actual = percentCorrect(5,8);
    expect(actual).toBe("63");
})
