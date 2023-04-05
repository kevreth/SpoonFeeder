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
sessionStorage.setItem('random', 'false');
//===========================================================================
// const courseName = 'aws';
// const courseName = 'aws-review';
// const courseName = 'android';
// const courseName = 'docker';
// const courseName = 'express';
const courseName = 'history';
// const courseName = 'javascript';
// const courseName = 'kafka';
// const courseName = 'kotlin';
// const courseName = 'kubernetes';
// const courseName = 'history';
// const courseName = 'node';
// const courseName = 'quasar';
// const courseName = 'react';
// const courseName = 'spring';
// const courseName = 'typescript';
// const courseName = 'vue';
// const courseName = 'test';
Quiz.slides(courseName, document);
</script>
