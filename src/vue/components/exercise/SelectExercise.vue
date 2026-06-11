<template>
  <div class="sf-select" data-cy="select-exercise">
    <p v-if="slide.inst" class="sf-select-inst" v-html="slide.inst"></p>

    <div class="sf-select-text">
      <span
        v-for="(word, i) in words"
        :key="i"
        class="sf-word"
        :class="wordClass(i + 1)"
        :data-cy="`word-${i + 1}`"
        @click="onWord(i + 1)"
        >{{ word }}</span
      >
    </div>

    <q-btn
      v-if="!answered"
      class="sf-done"
      data-cy="done"
      no-caps
      label="Done"
      @click="onDone"
    />

    <FeedbackStatement :state="feedbackState" />

    <ContinueButton :visible="answered" @click="emit('continue')" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ContinueButton from './ContinueButton.vue';
import FeedbackStatement from './FeedbackStatement.vue';
import { evaluateAnswer } from '../../mediator';
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

// Words are split on spaces and numbered 1-based (matching the legacy `wN`
// ids and the 1-based indices stored in `ans`/`res`).
const words = computed<string[]>(() => (props.slide.txt ?? '').split(' '));

const answered = ref(false);
const correct = ref(false);
const selected = ref<Set<number>>(new Set());

const feedbackState = computed<'idle' | 'correct' | 'incorrect'>(() =>
  answered.value ? (correct.value ? 'correct' : 'incorrect') : 'idle'
);

function ansIndices(): number[] {
  return (props.slide.ans as number[]) ?? [];
}

function wordClass(n: number): string {
  if (!answered.value) return selected.value.has(n) ? 'sf-word--selected' : '';
  const inAns = ansIndices().includes(n);
  const inRes = selected.value.has(n);
  if (inAns && inRes) return 'sf-word--correct';
  if (!inAns && inRes) return 'sf-word--incorrect';
  if (inAns && !inRes) return 'sf-word--missed';
  return '';
}

function onWord(n: number): void {
  if (answered.value) return;
  const next = new Set(selected.value);
  if (next.has(n)) next.delete(n);
  else next.add(n);
  selected.value = next;
}

function onDone(): void {
  if (answered.value) return;
  const res = [...selected.value].sort((a, b) => a - b);
  correct.value = evaluateAnswer(props.slide, res as AnswerType);
  answered.value = true;
  emit('answer', { selected: res as AnswerType, correct: correct.value });
}

function restore(): void {
  const res = props.slide.res;
  if (Array.isArray(res) && res.length > 0) {
    selected.value = new Set(res as number[]);
    correct.value = evaluateAnswer(props.slide, res as AnswerType);
    answered.value = true;
  }
}

onMounted(() => {
  if (props.restored) restore();
});
</script>

<style scoped>
.sf-select {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--sf-gap-answer);
  color: var(--sf-color-on-surface);
}
.sf-select-inst {
  font-weight: bold;
}
.sf-select-text {
  line-height: 2;
}
.sf-word {
  cursor: pointer;
  padding: 0 2px;
  margin-right: 3px;
  border-radius: 4px;
}
.sf-word--selected {
  background: var(--sf-color-primary);
  color: var(--sf-color-surface);
}
.sf-word--correct {
  text-decoration: underline;
  text-decoration-color: var(--sf-color-correct);
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}
.sf-word--incorrect {
  text-decoration: line-through;
  text-decoration-color: var(--sf-color-incorrect);
  text-decoration-thickness: 2px;
}
.sf-word--missed {
  text-decoration: underline;
  text-decoration-color: var(--sf-color-correct);
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}
.sf-done {
  background: var(--sf-color-primary);
  color: var(--sf-color-surface);
  border-radius: var(--sf-radius-button);
  min-height: var(--sf-min-touch);
  font-weight: bold;
  align-self: center;
}
</style>
