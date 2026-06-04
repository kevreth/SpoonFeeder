<template>
  <div class="sf-info" data-cy="info-exercise">
    <q-card class="sf-info-card" flat>
      <q-card-section ref="contentEl" v-html="slide.txt"></q-card-section>
    </q-card>
    <ContinueButton :visible="true" @click="emit('continue')" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ContinueButton from './ContinueButton.vue';
import { postRender } from '../../mediator';
import type { SlideInterface, AnswerType } from '../../mediator';

const props = withDefaults(
  defineProps<{
    slide: SlideInterface;
    restored?: boolean;
  }>(),
  { restored: false }
);

const emit = defineEmits<{
  answer: [payload: { selected: AnswerType; correct: boolean }];
  continue: [];
}>();

const contentEl = ref<{ $el: HTMLElement } | null>(null);

// `v-html` does not execute embedded script tags. Course-content directives
// like `html=<file>` expand to a div plus an inline jQuery `$(...).load(...)`
// script (global jQuery, course content — see adoc2html / PRD-002). Re-create
// each embedded script element so it runs, matching the legacy jQuery-append
// behaviour.
function runEmbeddedScripts(root: HTMLElement): void {
  root.querySelectorAll('script').forEach((old) => {
    const script = document.createElement('script');
    for (const attr of Array.from(old.attributes)) script.setAttribute(attr.name, attr.value);
    script.textContent = old.textContent;
    old.replaceWith(script);
  });
}

onMounted(() => {
  const root = contentEl.value?.$el;
  if (root) runEmbeddedScripts(root);
  postRender(document);
  // Info slides require no answer (immediateConclusion). Emit on mount so the
  // host records the save (cont=false) exactly as the legacy conclude path did.
  // Audio is suppressed in the host for immediateConclusion slides.
  if (!props.restored) emit('answer', { selected: '' as AnswerType, correct: true });
});
</script>

<style scoped>
.sf-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--sf-gap-answer);
}
.sf-info-card {
  background: var(--sf-color-surface);
  color: var(--sf-color-on-surface);
  padding: var(--sf-gap-answer);
}
</style>
