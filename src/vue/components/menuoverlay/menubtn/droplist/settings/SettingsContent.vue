<template>
<div class="setting fixed-center bg-secondary">
  <h6>Settings</h6>
  <q-separator horizontal inset class="q-mx-lg bg-white"/>
  <div>
    <SwitchLang></SwitchLang>
  </div>
</div>
</template>

<script setup lang="ts">
import SwitchLang from './switchlanguages/SwitchLang.vue'
</script>

<style>
.setting {
  border-radius: 20px;
  /* width: 50%; */
  /* padding: 0 30px; */
  font-size: 2vw;
}
.setting h6 {
  padding: 0px;
  margin: 8px;
  letter-spacing: 1px;
  /* font-size: 2vw; */
}
</style>