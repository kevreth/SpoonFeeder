const downdoc = require('downdoc')
// const options = {
//   from: 'asciidoc',
//   to: 'markdown',
// };
export async function convert(text: string): Promise<string> {
    try{
      return await downdoc(text/*, options*/);
    }
    catch(error: unknown)  {
      console.error(error);
    };
    return '';
}
