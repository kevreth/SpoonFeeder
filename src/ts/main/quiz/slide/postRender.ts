import hljs from 'highlight.js';
import { browserAdaptor } from 'mathjax-full/ts/adaptors/browserAdaptor';
import { RegisterHTMLHandler } from 'mathjax-full/ts/handlers/html';
import { TeX } from 'mathjax-full/ts/input/tex';
import { mathjax } from 'mathjax-full/ts/mathjax';
import { CHTML } from 'mathjax-full/ts/output/chtml';
RegisterHTMLHandler(browserAdaptor());
export function postRender(doc: Document) {
  hljs.highlightAll();
  const html = mathjax.document(doc, {
    InputJax: new TeX({
      inlineMath: [
        ['$', '$'],
        ['\\(', '\\)'],
      ],
      packages: ['base', 'ams', 'noundefined', 'newcommand', 'boldsymbol'],
    }),
    OutputJax: new CHTML({
      //   fontURL: 'https://cdn.rawgit.com/mathjax/mathjax-v3/3.0.0-beta.1/mathjax2/css'
    }),
  });
  html.findMath().compile().getMetrics().typeset().updateDocument();
}
