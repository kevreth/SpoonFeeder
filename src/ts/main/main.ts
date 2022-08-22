import {slides} from './quiz';
import '../../../src/css/style1.css'
sessionStorage.clear();

//===========================================================================
// un-comment for TESTING
sessionStorage.setItem("random","false");
//===========================================================================
// const file = './history.json';
const file = '../../../src/courses/english.json';
slides(file, document);

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "../../../src/App.vue";

// import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

