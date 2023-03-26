<template>
  <transition
    enter-active-class="animated slideInDown"
    leave-active-class="animated slideOutUp"
    :duration="1000">
    <q-overlay class="column">
      <template #body>
        <div class="expContainer fixed-center bg-secondary" @keydown.esc="closeInfo" tabindex="0">
          <h5>Explaination</h5>
          <p>{{content}}</p>

          <ExitBtn
            @click="closeInfo"
            color="primary"/>
        </div>
      </template>
    </q-overlay>
  </transition>
</template>

<script setup>
import { ref } from 'vue';
import ExitBtn from './ExitBtn.vue';
import {SaveData} from '../ts/main/quiz/slide/saveData';
const slide = SaveData.getCurrentSlide();
const content = ref(slide);


const emit = defineEmits(['closeInfo'])
function closeInfo() {
  emit('closeInfo')
}

</script>

<style>
.expContainer {
  border-radius: 20px;
  width: 70%;
  box-sizing: border-box;
}
.expContainer h5 {
  padding: 0px;
  margin: 5px 0 0 0;
  letter-spacing: 1px;
  font-size: 18px;
}
</style>

