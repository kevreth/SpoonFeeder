<template>
  <q-overlay class="infoOverlay column">
    <template #body>
      <div class="iconContainer bg-secondary">
        <p class="iconContent">
          COR: number correct <br>
          COM: number completed <br>
          TOT: number available <br>
          SCO: score; COR/COM * 100% <br>
          CPL: completion: COM/TOT * 100%
        </p>

        <ExitBtn @click="closeInfo" />
      </div>
    </template>
  </q-overlay>
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
p.iconContent {
  text-align: left;
  margin-top: 25px;
  padding: 15px 0 0 50px;
  font-size: 18px;
  line-height: 2em;
}
.iconContainer {
  border-radius: 20px;
}
</style>

