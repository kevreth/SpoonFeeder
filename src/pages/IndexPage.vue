<template>
  <q-page class="row items-center justify-evenly">

  <div id="slide">
    <div id="content"></div>
  </div>

  </q-page>
</template>

<script setup>
import { slides } from '../ts/main/quiz';
import '../css/style1.css';
sessionStorage.clear();

//===========================================================================
// un-comment for TESTING
sessionStorage.setItem('random', 'false');
//===========================================================================
// const courseName = 'history';
const courseName = 'test';
slides(courseName, document);

</script>

