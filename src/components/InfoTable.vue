<template>
  <transition 
    enter-active-class="animated slideInDown"
    leave-active-class="animated slideOutUp"
    :duration="1000">
    <q-overlay class="infoOverlay column">
      <template #body>
        <div class="iconContainer fixed-center bg-primary" @keydown.esc="closeInfo" tabindex="0">
          <h5>Navigations:</h5>
          <p class="iconContent">
            COR: number correct <br>
            COM: number completed <br>
            TOT: number available <br>
            SCO: score; COR/COM * 100% <br>
            CPL: completion: COM/TOT * 100%
          </p>
  
          <ExitBtn @click="closeInfo" color="secondary" />
        </div>
      </template>
    </q-overlay>
  </transition>
</template>

<script setup>
import ExitBtn from './ExitBtn.vue';

const emit = defineEmits(['closeInfo'])
function closeInfo() {
  emit('closeInfo')
}

</script>

<style>
.infoOverlay {
  display: block;
}
.iconContainer {
  border-radius: 20px;
  width: 70%;
  box-sizing: border-box;
}
.iconContainer h5 {
  padding: 0px;
  margin: 5px 0 0 0;
  letter-spacing: 1px;
  font-size: 18px;
}
p.iconContent {
  text-align: left;
  padding: 0 0 0 25px;
  font-size: 14px;
  line-height: 2em;
}
</style>

