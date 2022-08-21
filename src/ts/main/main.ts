import {slides} from './quiz';
import '../../../src/css/style1.css'
sessionStorage.clear();

import App from "../../../src/App.vue";

//===========================================================================
// un-comment for TESTING
sessionStorage.setItem("random","false");
//===========================================================================
// const file = './history.json';
const file = '../../../src/courses/english.json';
slides(file, document);
