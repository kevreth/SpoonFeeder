<template>
  <transition :name="isEnable ? 'transitions' : ''" :duration="1000">
    <q-overlay class="infoOverlay column" :class="{ transition: isEnable }">
      <template #body>
        <div
          class="iconContainer fixed-center bg-primary"
          @keydown.esc="closeInfo"
          tabindex="0"
        >
          <h5>{{ $t('infoTable.title') }}:</h5>
          <p class="iconContent">
            {{ $t('infoTable.cor') }} <br />
            {{ $t('infoTable.com') }} <br />
            {{ $t('infoTable.tot') }} <br />
            {{ $t('infoTable.sco') }} <br />
            {{ $t('infoTable.cpl') }}
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
    default: true,
  },
});

const emit = defineEmits(['closeInfo']);
function closeInfo() {
  emit('closeInfo');
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
  background: rgba(0, 0, 0, 1);
  border: 1px solid #00bfff;
  padding: 10px;
}
.iconContainer h5 {
  padding: 0px;
  margin: 15px;
  letter-spacing: 1px;
  font-size: 0.6em;
  font-weight: bold;
}
p.iconContent {
  text-align: left;
  padding: 0 0 0 25px;
  margin-bottom: 0;
  font-size: 0.6em;
  line-height: 2;
}
@media (min-width: 768px) {
  .iconContainer h5 {
    font-size: 1.3vw;
  }
  p.iconContent {
    font-size: 1.2vw;
  }
  .iconContainer {
    width: 30%;
  }
  .iconContainer h5 {
    font-size: 1vw;
  }
  p.iconContent {
    font-size: 1vw;
  }
}
</style>
