import {slides} from './quiz';
import '../../../src/css/style1.css'
sessionStorage.clear();

import { createApp } from "vue";
import App from "../../App.vue";

const app = createApp(App);
app.mount("#app");

//===========================================================================
// un-comment for TESTING
sessionStorage.setItem("random","false");
//===========================================================================
// const file = '../../../src/courses/history/history.json';
const file = '../../../src/courses/english/english.json';
slides(file, document);


