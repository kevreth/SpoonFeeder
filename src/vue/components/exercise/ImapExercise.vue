<template>
  <div class="sf-imap" data-cy="imap-exercise">
    <p v-if="slide.txt" class="sf-imap-inst" v-html="slide.txt"></p>
    <div class="sf-imap-svg">
      <div ref="container" :data-src="slide.img" data-cy="imap"></div>
    </div>
    <ContinueButton :visible="answered" @click="emit('continue')" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { SVGInjector } from '@tanem/svg-injector';
import ContinueButton from './ContinueButton.vue';
import { evaluateAnswer } from '../../mediator';
import type { SlideInterface, AnswerType } from '../../mediator';

const props = withDefaults(
  defineProps<{ slide: SlideInterface; restored?: boolean }>(),
  { restored: false }
);

const emit = defineEmits<{
  answer: [payload: { selected: AnswerType; correct: boolean }];
  continue: [];
}>();

const container = ref<HTMLElement | null>(null);
// SVGInjector replaces the target div with the injected <svg>, detaching the
// original ref. Capture the live svg from the injector callback and query it.
let svgEl: Element | null = null;
const answered = ref(false);
const correct = ref(false);
const selected = ref<string>('');

const feedbackState = computed<'idle' | 'correct' | 'incorrect'>(() =>
  answered.value ? (correct.value ? 'correct' : 'incorrect') : 'idle'
);

function shapes(): HTMLElement[] {
  return svgEl ? Array.from(svgEl.querySelectorAll<HTMLElement>('.shape')) : [];
}

// Post-answer marking mirrors the legacy decorate(): every shape loses the
// `shape` class; the chosen shape gains shape_correct / shape_incorrect.
function markShapes(): void {
  shapes().forEach((el) => {
    el.classList.remove('shape');
    if (el.id === selected.value) {
      el.classList.add(correct.value ? 'shape_correct' : 'shape_incorrect');
    }
  });
}

function onShape(id: string): void {
  if (answered.value) return;
  selected.value = id;
  correct.value = evaluateAnswer(props.slide, id as AnswerType);
  answered.value = true;
  markShapes();
  emit('answer', { selected: id as AnswerType, correct: correct.value });
}

onMounted(() => {
  if (!container.value) return;
  SVGInjector(container.value, {
    afterEach(err, svg) {
      if (err || !svg) return;
      svgEl = svg;
      shapes().forEach((el) => el.addEventListener('click', () => onShape(el.id)));
      if (props.restored) {
        const res = props.slide.res;
        if (typeof res === 'string' && res !== '') {
          selected.value = res;
          correct.value = evaluateAnswer(props.slide, res as AnswerType);
          answered.value = true;
          markShapes();
        }
      }
    },
  });
});
</script>

<style scoped>
.sf-imap {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sf-gap-answer);
  color: var(--sf-color-on-surface);
}
.sf-imap-svg :deep(svg) {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
}
.sf-imap-svg :deep(.shape) {
  cursor: pointer;
}
.sf-imap-svg :deep(.shape:hover) {
  opacity: 0.5;
}
.sf-imap-svg :deep(.shape_locked) {
  opacity: 0.5;
}
.sf-imap-svg :deep(.shape_correct) {
  fill: var(--sf-color-correct);
  opacity: 0.5;
}
.sf-imap-svg :deep(.shape_incorrect) {
  fill: var(--sf-color-incorrect);
  opacity: 0.5;
}
</style>
