<template>
  <q-dialog v-model="props.modelValue" :z-index="3" @click.stop="">
    <!-- <template #body> -->
    <div
      id="langOptions"
      class="lang-dialog-box fixed-center"
    >
      <div class="corner-tl"></div>
      <div class="corner-tr"></div>
      <div class="corner-bl"></div>
      <div class="corner-br"></div>
      <div class="lang-title">{{ $t('settingsContent.language') }}</div>
      <q-separator horizontal class="q-mx-sm bg-white" />
      <q-list style="min-width: 100px">
        <q-item
          v-model="locale"
          @click="locale = language.value"
          clickable
          v-close-popup
          v-for="language in languages"
          :key="language.value"
          :class="{ active: locale === language.value }"
          style="position: relative; z-index: 1"
        >
          <q-item-section>{{ language.label }}</q-item-section>
          <span v-if="locale === language.value" class="lang-check">✓</span>
        </q-item>
      </q-list>
      <ExitBtn @click="closeDialog" />
    </div>
    <!-- </template> -->
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import ExitBtn from '../../../../../common/ExitBtn.vue';

const i18n = useI18n();
const locale = ref(i18n.locale.value);

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const languages = [
  { value: 'en-US', label: 'English' },
  { value: 'zh-CN', label: '中文' },
];

watch(locale, (newLocale: string) => {
  localStorage.setItem('locale', newLocale);
  i18n.locale.value = newLocale;
});

function closeDialog() {
  emit('update:modelValue', false);
}
</script>

<style>
.lang-dialog-box {
  background: rgba(8, 12, 28, 0.95) !important;
  border-radius: 10px !important;
  padding: 20px 18px 16px;
  min-width: 200px;
}
.lang-title {
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  padding-bottom: 10px;
  margin-bottom: 12px;
  border-bottom: 1px solid rgba(0, 229, 255, 0.25);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.lang-dialog-box .q-separator { display: none; }
.lang-dialog-box .q-item {
  border-radius: 7px;
  margin-bottom: 6px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
  border: 1px solid transparent;
}
.lang-dialog-box .q-item.active {
  background: rgba(0, 229, 255, 0.08) !important;
  border-color: rgba(0, 229, 255, 0.25);
  color: #00e5ff;
}
.lang-check {
  font-size: 12px;
  color: #00e5ff;
  margin-left: auto;
}
.lang-dialog-box .corner-tl,
.lang-dialog-box .corner-tr,
.lang-dialog-box .corner-bl,
.lang-dialog-box .corner-br {
  position: absolute;
  width: 16px;
  height: 16px;
  border-color: #00e5ff;
  border-style: solid;
  z-index: 2;
}
.lang-dialog-box .corner-tl { top: 2px; left: 2px; border-width: 2px 0 0 2px; }
.lang-dialog-box .corner-tr { top: 2px; right: 2px; border-width: 2px 2px 0 0; }
.lang-dialog-box .corner-bl { bottom: 2px; left: 2px; border-width: 0 0 2px 2px; }
.lang-dialog-box .corner-br { bottom: 2px; right: 2px; border-width: 0 2px 2px 0; }
.lang-dialog-box .q-btn {
  background: transparent !important;
  border: 1.5px solid rgba(0, 229, 255, 0.5) !important;
  color: #00e5ff !important;
  border-radius: 6px !important;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: block;
  margin: 8px auto 0;
}
</style>
