<template>
  <q-page class="row items-center justify-evenly">
    <div id="slide">
      <div id="content"></div>
    </div>
  </q-page>
</template>

<script setup>
import { Quiz } from '../ts/main/quiz';
import '../css/style1.css';
import '../css/quasar.css'
sessionStorage.clear();

//===========================================================================
// un-comment for TESTING
sessionStorage.setItem('random', 'true');
//===========================================================================
// const courseName = 'history';
// const courseName = 'history';
// const courseName = 'history';
// const courseName = 'history';
// const courseName = 'history';
// const courseName = 'history';
// const courseName = 'history';
// const courseName = 'history';
// const courseName = 'history';
// const courseName = 'aws-review';
const courseName = 'test';
Quiz.slides(courseName, document);
</script>
