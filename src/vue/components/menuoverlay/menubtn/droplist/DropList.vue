<template>
  <q-menu
    fit
    id="droplist"
    class="text-white dropMenu"
    style="background: transparent"
    v-model="droplist"
  >
    <q-list
      style="min-width: 30px"
      class="dropList bg-secondary"
      @click="droplist = false"
    >
      <q-item clickable>
        <q-item-section avatar class="dropListIcon">
          <q-icon name="trending_up" />
        </q-item-section>
        <q-item-section
          @click="overlay = true"
          @keydown.esc="overlay = false"
          >{{ $t('droplist.progress') }}</q-item-section
        >
      </q-item>
      <q-item clickable>
        <q-item-section avatar class="dropListIcon">
          <q-icon name="school" />
        </q-item-section>
        <q-item-section @click="courseList = true">{{
          $t('droplist.courses')
        }}</q-item-section>
      </q-item>
      <q-item clickable>
        <!-- <q-item-section avatar class="dropListIcon">
          <q-icon name="settings" />
        </q-item-section>
        <q-item-section @click="settingOverlay = true">{{
          $t('droplist.settings')
        }}</q-item-section> -->
        <!-- <q-item-section avatar class="dropListIcon">
        </q-item-section> -->
        <SettingIcon showLabel />
        <!-- <q-item-section>{{ $t('droplist.settings') }}</q-item-section> -->
      </q-item>
      <q-item clickable>
        <q-item-section avatar class="dropListIcon">
          <q-icon name="help_outline" />
        </q-item-section>
        <q-item-section>{{ $t('droplist.help') }}</q-item-section>
      </q-item>
    </q-list>
  </q-menu>

  <OverlayTable
    :isEnable="isEnable"
    v-model="overlay"
    @handleOverlay="handleOverlay"
  />
  <CourseSelector
    :isEnable="isEnable"
    v-model="courseList"
    @closeInfo="courseList = false"
  />
  <!-- <SettingsOverlay
    v-model="settingOverlay"
    @closeInfo="settingOverlay = false"
  /> -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import OverlayTable from './overlaytable/OverlayTable.vue';
import CourseSelector from './courseselector/CourseSelector.vue';
// import SettingsOverlay from './settings/SettingsOverlay.vue';
import SettingIcon from '../../SettingIcon.vue';

// setting transition disable
const isEnable = ref(false);
// const isEnable = ref(true);

const droplist = ref(false);
const overlay = ref(false);
const courseList = ref(false);
const settingOverlay = ref(false);

// handle overlay pages
function handleOverlay() {
  overlay.value = !overlay.value;
}
</script>

<style>
.dropList {
  border-right: 1px solid #00bfff;
  padding-right: 5px;
  color: #ddd;
  font-family: 'Orbitron', sans-serif;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  font-size: 1.2em;
}
.dropListIcon {
  padding: 0 10px;
}
.dropMenu {
  /* font-size: 3.5vw; */
  font-family:
    'Segoe UI',
    'SF Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Helvetica,
    Arial,
    sans-serif;
  /* right: 15px; */
}
/* @media screen and (min-width: 1200px) {
  .dropMenu {
    font-size: 1.3vw;
  }
} */
</style>
