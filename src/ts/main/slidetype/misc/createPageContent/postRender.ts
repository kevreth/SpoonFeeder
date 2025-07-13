import hljs from 'highlight.js';
import {
  browserAdaptor,
  CHTML,
  mathjax,
  RegisterHTMLHandler,
  TeX,
} from '../../mediator';
RegisterHTMLHandler(browserAdaptor());
export function postRender(doc: Document) {
  if (!doc) {
    console.error('[postRender] doc is undefined. Skipping MathJax rendering.');
    return;
  }
  try {
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
  } catch (err) {
    console.error('[postRender] MathJax rendering error:', err);
  }
}
