// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import downdoc from 'downdoc';
import Handlebars from 'handlebars';
import { COURSE_NAME, marked } from '../dataaccess/mediator';
// Asciidoctor.js will not run in Vue environment so we
// use DOWNDOC to transform to MARKDOWN and then MARKED
// to transform to HTML.
// After that, we use HANDLEBARS to import the code to display
// external files (svg and html).
export function adoc2html(str: string): string {
  if (typeof str === 'undefined') return '';
  const course = COURSE_NAME.get();
  // console.log(str)
  // let txt = str.replace('image::',`image::src/courses/${course}/`);
  // console.log(txt)  
  let txt = adoc2markdown(str as string);
  console.log(txt) 
  txt = markdown2html(txt);
  //consider adding a beautification step
  console.log(txt)
  txt = txt.replace('img src=\"',`img height = 300 
  src="src/courses/${course}/`);
  console.log(txt)  
  txt = insertHandlebars(txt);
  txt = processHandlebars(txt);
  return txt;
}
export function adoc2markdown(text: string): string {
  return downdoc(text);
}
export function markdown2html(text: string): string {
  //marked(text) places text inside <p> tags which
  //is usually not wanted but marked.parseInline(text)
  //doesn't work with multi-line strings (undocumented).
  if (text.includes('\n')) return marked(text);
  else return marked.parseInline(text);
}
export function processHandlebars(txt: string) {
  register(COURSE_NAME.get() as string);
  const template = Handlebars.compile(txt);
  txt = template({});
  return txt;
}
function register(course: string) {
  Handlebars.registerHelper('html', registerTable(course));
  Handlebars.registerHelper('svg', registerSvg(course));
}
function registerTable(course: string): Handlebars.HelperDelegate {
  return function (filename) {
    return htmlString(course, filename);
  };
}
function registerSvg(course: string): Handlebars.HelperDelegate {
  return function (filename) {
    return svgString(course, filename);
  };
}
function htmlString(course: string, filename: string): string {
  return `<div id="html0"></div><script>$('#html0').load("src/courses/${course}/${filename}.html")</script>`;
}
function svgString(course: string, filename: string): string {
  return `<img src="src/courses/${course}/${filename}.svg" class="mcButton" width = "100" height="auto"/>`;
}
const KEYS = ['svg', 'html'];
export function insertHandlebars(str: string) {
  const regex = /(\w+)=([A-Za-z0-9_.]+)/g;
  let match;
  while ((match = regex.exec(str))) {
    const key = match[1];
    const includes = KEYS.includes(key);
    if (includes) {
      const value = match[2];
      const find = `${key}=${value}`;
      const replace = `{{{${key} '${value}'}}}`;
      str = str.replace(find, replace);
    }
  }
  return str;
}
