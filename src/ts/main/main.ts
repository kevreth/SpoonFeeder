import {slides} from './quiz';
sessionStorage.clear();
//===========================================================================
// un-comment for TESTING
sessionStorage.setItem("random","false");
//===========================================================================
// const file = './history.json';
const file = './english.json';
slides(file, document);