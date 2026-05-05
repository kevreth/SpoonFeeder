<template>
  <q-menu
    id="droplist"
    class="dropMenu"
    :offset="[0, 0]"
    anchor="bottom right"
    self="top right"
    v-model="droplist"
  >
    <div class="dropList" @click="droplist = false">
      <div class="dropItem" @click="overlay = true">
        <span class="dropIcon">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <polyline
              points="1,10 4,5 7,8 10,3 13,5"
              stroke="#00bfff"
              stroke-width="1.2"
              stroke-linejoin="round"
              stroke-linecap="round"
            />
          </svg>
        </span>
        <span>{{ $t('droplist.progress') }}</span>
      </div>
      <!-- Disable course selector -->
      <!-- <div class="dropItem" @click="courseList = true">
        <span class="dropIcon">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect
              x="2"
              y="2"
              width="10"
              height="10"
              rx="2"
              stroke="#00bfff"
              stroke-width="1"
            />
            <line
              x1="5"
              y1="2"
              x2="5"
              y2="12"
              stroke="#00bfff"
              stroke-width="1"
            />
          </svg>
        </span>
        <span>{{ $t('droplist.courses') }}</span>
      </div> -->
      <div class="dropDivider"></div>
      <div class="dropItem" @click="settingOverlay = true">
        <span class="dropIcon">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="2.5" stroke="#00bfff" stroke-width="1" />
            <line
              x1="7"
              y1="1"
              x2="7"
              y2="3"
              stroke="#00bfff"
              stroke-width="1"
            />
            <line
              x1="7"
              y1="11"
              x2="7"
              y2="13"
              stroke="#00bfff"
              stroke-width="1"
            />
            <line
              x1="1"
              y1="7"
              x2="3"
              y2="7"
              stroke="#00bfff"
              stroke-width="1"
            />
            <line
              x1="11"
              y1="7"
              x2="13"
              y2="7"
              stroke="#00bfff"
              stroke-width="1"
            />
          </svg>
        </span>
        <span>{{ $t('droplist.settings') }}</span>
      </div>
      <!-- Help item hidden until content is available -->
      <!-- <div class="dropItem">
        <span class="dropIcon">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="#00bfff" stroke-width="1" />
            <line
              x1="7"
              y1="6"
              x2="7"
              y2="10"
              stroke="#00bfff"
              stroke-width="1.2"
              stroke-linecap="round"
            />
            <circle cx="7" cy="4.5" r="0.6" fill="#00bfff" />
          </svg>
        </span>
        <span>{{ $t('droplist.help') }}</span>
      </div> -->
    </div>
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
  <SettingsOverlay
    v-model="settingOverlay"
    @closeInfo="settingOverlay = false"
    @keyDeleted="emit('keyDeleted')"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import OverlayTable from './overlaytable/OverlayTable.vue';
import CourseSelector from './courseselector/CourseSelector.vue';
import SettingsOverlay from './settings/SettingsOverlay.vue';

const emit = defineEmits(['keyDeleted']);
const isEnable = ref(false);
const droplist = ref(false);
const overlay = ref(false);
const courseList = ref(false);
const settingOverlay = ref(false);

function handleOverlay() {
  overlay.value = !overlay.value;
}
</script>

<style>
.dropMenu {
  background: transparent !important;
  box-shadow: none !important;
  overflow: visible !important;
  padding-right: 1px;
  min-width: 150px;
  width: fit-content !important;
}
.dropList {
  background: rgba(10, 15, 25, 0.96);
  border: 1px solid rgba(0, 229, 255, 0.15);
  border-radius: 10px;
  padding: 6px 0;
}
.dropItem {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #ccc;
  font-family:
    'Segoe UI',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  letter-spacing: 0.3px;
  transition:
    background 0.15s,
    color 0.15s;
}
.dropItem:hover {
  background: rgba(0, 191, 255, 0.06);
  color: #00bfff;
}
.dropIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  opacity: 0.7;
}
.dropItem:hover .dropIcon {
  opacity: 1;
}
.dropDivider {
  height: 0.5px;
  background: rgba(255, 255, 255, 0.08);
  margin: 4px 20px;
}
</style>
