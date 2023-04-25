<template>
  <transition
    :name="isEnable ? 'transitions' : ''"
    :duration="1000">
    <q-overlay class="infoOverlay column" :class="{'transition': isEnable}">
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

          <ExitBtn class="exitInfo" @click="closeInfo" color="secondary" />
        </div>
      </template>
    </q-overlay>
  </transition>
</template>

<script setup lang="ts">
import ExitBtn from '../../../../../common/ExitBtn.vue';

defineProps({
  isEnable: {
    type: Boolean,
    default: true
  }
})

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
  width: 50%;
  box-sizing: border-box;
}
.iconContainer h5 {
  padding: 0px;
  margin: 15px;
  letter-spacing: 1px;
  font-size: 2vw;
}
p.iconContent {
  text-align: left;
  padding: 0 0 0 25px;
  margin-bottom: 0;
  font-size: 1.9vw;
  line-height: 2em;
}
.exitInfo {
  font-size: 2vw;
}
@media screen and (min-width: 1200px) {
  .iconContainer h5
   {
    font-size: 1.3vw;
  }
  p.iconContent,
  .exitInfo {
    font-size: 1.2vw;
  }
  .iconContainer {
    width: 40%;
  }
}
</style>

