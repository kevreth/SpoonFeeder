import {slides} from './quiz';
import '../../../src/css/style1.css'
sessionStorage.clear();

import { createApp } from "vue";
import App from "../../App.vue";
import router from '@/router';

const app = createApp(App).use(router);
app.mount("#app");

//===========================================================================
// un-comment for TESTING
sessionStorage.setItem("random","false");
//===========================================================================
// const courseName = 'history';
const courseName = 'test';
slides(courseName, document);
