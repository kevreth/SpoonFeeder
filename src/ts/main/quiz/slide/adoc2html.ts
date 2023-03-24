import Handlebars from 'handlebars';
import downdoc from 'downdoc';
import {marked} from 'marked';
export const RANDOM = 'bnGUn33pN22T$A8$*6pQquvHs5eE#34GrUtB%$jQFDmQQVbXS';
// Problems solved:
// 1) Asciidoctor.js will not run in Vue environment.
// 2) downdoc transforms asciidoctor to Markdown but
// marked, the markdown transformer, transforms every
// special character it sees to character references
// 3) #2 ruins Mustache templates
// To solve this we
// 1) pull out every Handlebars template and store them in
// an array with the transformed string in the first position
// 2) transform asciidoctor to markdown via downdoc
// 3) transform markdown to HTML via marked
// 4) restore the stored Handlebars templates
// 5_ process the Handlebars templates
export function adoc2html(str: string): string {
  const arr = replaceMustache(str);
  let txt = arr.shift() as string;
  txt = adoc2markdown(txt as string);
  txt = markdown2html(txt);
  txt = restoreMustache(arr, txt);
  //consider adding a beautification step
  txt = processMustache(txt);
  return txt;
}

export function processMustache(txt: string) {
  register();
  const template = Handlebars.compile(txt);
  txt = template({});
  return txt;
}
export function restoreMustache(arr: string[], txt: string) {
  arr.forEach((item) => {
    txt = txt.replace(RANDOM, item);
  });
  return txt;
}
//The first element is the string with replaced text.
//The remainder are the replacements in order.
export function replaceMustache(str: string): string[] {
  const replacedStrings = [];
  const outputString = str.replace(/{{{[\s\S]*?}}}/g, (match) => {
    replacedStrings.push(match);
    return RANDOM;
  });
  replacedStrings.unshift(outputString);
  return replacedStrings;
}
export function register() {
  Handlebars.registerHelper('table', function (aString) {
    return `<div id="table0"></div><script>$('#table0').load("src/courses/test/${aString}.html")</script>`;
  });
  Handlebars.registerHelper('svg', function (aString) {
    return `<img src="src/courses/test/${aString}.svg" class="mcButton" width = "100" height="auto"/>`;
  });
}
export function adoc2markdown(text: string): string {
  return downdoc(text);
}
export function markdown2html(text: string): string {
  return marked(text);
}
