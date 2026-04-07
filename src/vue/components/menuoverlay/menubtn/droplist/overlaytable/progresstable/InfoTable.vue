<template>
  <transition :name="isEnable ? 'transitions' : ''" :duration="1000">
    <q-dialog
      v-model="showOverlay"
      class="infoOverlay column"
      :class="{ transition: isEnable }"
    >
      <!-- <template #body> -->
      <div
        class="iconContainer fixed-center"
        @keydown.esc="closeInfo"
        tabindex="0"
      >
        <div class="corner-tl"></div>
        <div class="corner-tr"></div>
        <div class="corner-bl"></div>
        <div class="corner-br"></div>

        <div class="info-title">Navigations</div>

        <div class="stat-row">
          <div class="stat-left">
            <span class="stat-abbr">COR</span>
            <span class="stat-desc">number correct</span>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat-left">
            <span class="stat-abbr">COM</span>
            <span class="stat-desc">number completed</span>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat-left">
            <span class="stat-abbr">TOT</span>
            <span class="stat-desc">number available</span>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat-left">
            <span class="stat-abbr">SCO</span>
            <span class="stat-desc">score - COR/COM</span>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat-left">
            <span class="stat-abbr">CPL</span>
            <span class="stat-desc">completion - COM/TOT</span>
          </div>
        </div>

        <ExitBtn class="exitInfo" @click="closeInfo" color="secondary" />
      </div>
      <!-- </template> -->
    </q-dialog>
  </transition>
</template>

<script setup lang="ts">
import ExitBtn from '../../../../../common/ExitBtn.vue';
import { ref } from 'vue';

defineProps({
  isEnable: {
    type: Boolean,
    default: true,
  },
});

const showOverlay = ref(true);
const emit = defineEmits(['closeInfo']);
function closeInfo() {
  emit('closeInfo');
  showOverlay.value = false;
}
</script>

<style>
.infoOverlay {
  display: block;
}
.iconContainer {
  border-radius: 10px;
  width: 70%;
  box-sizing: border-box;
  background: rgba(8, 12, 28, 0.95) !important;
  border: none;
  padding: 20px;
}
.iconContainer .corner-tl,
.iconContainer .corner-tr,
.iconContainer .corner-bl,
.iconContainer .corner-br {
  position: absolute;
  width: 16px;
  height: 16px;
  border-color: #00e5ff;
  border-style: solid;
  z-index: 2;
}
.iconContainer .corner-tl {
  top: 2px;
  left: 2px;
  border-width: 2px 0 0 2px;
}
.iconContainer .corner-tr {
  top: 2px;
  right: 2px;
  border-width: 2px 2px 0 0;
}
.iconContainer .corner-bl {
  bottom: 2px;
  left: 2px;
  border-width: 0 0 2px 2px;
}
.iconContainer .corner-br {
  bottom: 2px;
  right: 2px;
  border-width: 0 2px 2px 0;
}
.info-title {
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  padding-bottom: 10px;
  margin-bottom: 14px;
  border-bottom: 1px solid rgba(0, 229, 255, 0.25);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.stat-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.stat-row:last-of-type {
  border-bottom: none;
}
.stat-left {
  display: flex;
  align-items: baseline;
  gap: 16px;
}
.stat-abbr {
  font-size: 13px;
  font-weight: 600;
  color: #00e5ff;
  min-width: 36px;
  font-family: monospace;
}
.stat-desc {
  font-size: 11px;
}
.iconContainer .exitInfo {
  background: transparent !important;
  border: 1.5px solid rgba(0, 229, 255, 0.5) !important;
  color: #00e5ff !important;
  border-radius: 6px !important;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: block;
  margin: 16px auto 0;
}
@media (min-width: 768px) {
  .iconContainer {
    width: 30%;
  }

  .stat-abbr,
  .stat-desc,
  .info-title {
    font-size: unset;
  }
}
</style>
