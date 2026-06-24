<template>
  <div class="sf-choice" data-cy="choice-exercise">
    <div class="sf-question" v-html="slide.txt"></div>

    <div class="sf-options">
      <q-btn
        v-for="(opt, i) in displayOptions"
        :key="i"
        class="sf-option"
        :class="`sf-option--${optionState(i)}`"
        :data-cy="`option-${i}`"
        no-caps
        unelevated
        :align="opt.type === 'image' ? 'center' : 'left'"
        :disable="answered && !multiple"
        @click="onOption(i)"
      >
        <img
          v-if="opt.type === 'image'"
          :src="opt.src"
          :alt="opt.label"
          class="sf-option-img"
        />
        <span v-else>{{ opt.label }}</span>
      </q-btn>
    </div>

    <q-btn
      v-if="multiple"
      class="sf-done"
      :class="{ 'sf-done--hidden': answered }"
      data-cy="done"
      no-caps
      :label="'Done'"
      @click="onDone"
    />

    <ContinueButton :visible="answered" @click="emit('continue')" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { isEqual } from 'lodash';
import ContinueButton from './ContinueButton.vue';
import { processOptions } from '../../../ts/utils/processOptions';
import { evaluateAnswer, postRender } from '../../mediator';
import type { SlideInterface, AnswerType } from '../../mediator';

const props = withDefaults(
  defineProps<{
    slide: SlideInterface;
    multiple: boolean;
    restored?: boolean;
  }>(),
  { restored: false },
);

const emit = defineEmits<{
  answer: [payload: { selected: AnswerType; correct: boolean }];
  continue: [];
}>();

// Original option strings (used for the answer value — ans compares against
// these). Display options are derived for rendering only.
const options = computed<string[]>(() => (props.slide.o ?? []) as string[]);
const displayOptions = computed(() => processOptions(options.value));

const answered = ref(false);
const correct = ref(false);
const selected = ref<Set<number>>(new Set());

function isKeyOption(opt: string): boolean {
  const ans = props.slide.ans;
  return Array.isArray(ans) ? (ans as unknown[]).includes(opt) : ans === opt;
}

// Per-option visual state. Mirrors the legacy decorate(): the chosen option is
// green/red, correct answers are revealed green, the rest dim.
function optionState(
  i: number,
): 'idle' | 'selected' | 'correct' | 'incorrect' | 'dimmed' {
  if (!answered.value) {
    return props.multiple && selected.value.has(i) ? 'selected' : 'idle';
  }
  const key = isKeyOption(options.value[i] as string);
  const sel = selected.value.has(i);
  if (key) return 'correct';
  if (sel) return 'incorrect';
  return 'dimmed';
}

function finalize(selection: AnswerType, indices: Set<number>): void {
  selected.value = indices;
  correct.value = evaluateAnswer(props.slide, selection);
  answered.value = true;
  emit('answer', { selected: selection, correct: correct.value });
}

function onOption(i: number): void {
  if (answered.value) return;
  if (props.multiple) {
    const next = new Set(selected.value);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    selected.value = next;
    return;
  }
  finalize(options.value[i] as AnswerType, new Set([i]));
}

function onDone(): void {
  if (answered.value) return;
  const chosen = [...selected.value]
    .map((i) => options.value[i] as string)
    .sort();
  finalize(chosen as AnswerType, new Set(selected.value));
}

// Restore the answered state after a reload mid-slide (DECORATE path).
function restore(): void {
  const res = props.slide.res;
  const isEmpty =
    res == null || res === '' || (Array.isArray(res) && res.length === 0);
  if (!isEmpty) {
    const chosen = Array.isArray(res) ? (res as string[]) : [res as string];
    const indices = new Set<number>();
    options.value.forEach((opt, i) => {
      if (chosen.some((c) => isEqual(c, opt))) indices.add(i);
    });
    selected.value = indices;
    correct.value = evaluateAnswer(props.slide, res as AnswerType);
    answered.value = true;
  }
}

onMounted(() => {
  if (props.restored) restore();
  postRender(document);
});
</script>

<style scoped>
.sf-choice {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--sf-gap-answer);
}
.sf-question {
  color: var(--sf-color-on-surface);
  /* margin-bottom: var(--sf-gap-answer); */
}
.sf-options {
  display: inline-flex;
  flex-direction: column;
  gap: var(--sf-gap-answer);
  align-self: center;
}
.sf-option {
  min-height: var(--sf-min-touch);
  border-radius: var(--sf-radius-button);
  background: var(--sf-color-surface-raised);
  color: var(--sf-color-on-surface);
  border: 1px solid var(--sf-color-primary);
  transition:
    background-color var(--sf-transition-feedback),
    opacity var(--sf-transition-feedback);
}
.sf-option-img {
  max-height: 120px;
  max-width: 100%;
}
.sf-option--selected {
  background: var(--sf-color-primary);
  color: var(--sf-color-surface);
  border-color: var(--sf-color-primary);
}
.sf-option--correct {
  background: var(--sf-color-correct);
  color: #fff;
  border-color: var(--sf-color-correct);
}
.sf-option--incorrect {
  background: var(--sf-color-incorrect);
  color: #fff;
  border-color: var(--sf-color-incorrect);
}
.sf-option--dimmed {
  opacity: 0.5;
}
.sf-done {
  background: var(--sf-color-primary);
  color: var(--sf-color-surface);
  border-radius: var(--sf-radius-button);
  min-height: var(--sf-min-touch);
  font-weight: bold;
}
.sf-done--hidden {
  visibility: hidden;
  pointer-events: none;
}
</style>
