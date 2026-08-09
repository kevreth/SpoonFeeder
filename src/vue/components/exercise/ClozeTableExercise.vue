<template>
  <div class="sf-cloze-table" data-cy="cloze-table-exercise">
    <div class="sf-question" v-html="slide.txt"></div>
    <table class="sf-cloze-grid">
      <tbody>
        <tr v-for="(label, j) in rows" :key="j">
          <td v-html="label"></td>
          <td>
            <span
              class="sf-cloze-dd"
              :class="
                answered
                  ? `sf-cloze-dd--${corr[j] ? 'correct' : 'incorrect'}`
                  : ''
              "
              :data-cy="`dropdown-${j}`"
              @click="toggleOpen(j)"
            >
              <span class="sf-cloze-dd-label">{{
                selections[j] ?? 'Select'
              }}</span>
              <span class="sf-cloze-dd-chevron">&#9662;</span>
              <span v-if="answered && !corr[j]" class="sf-cloze-dd-reveal"
                >&rarr; {{ ans[j] }}</span
              >
              <ul v-if="openIndex === j" class="sf-cloze-dd-menu">
                <li
                  v-for="(opt, k) in choices[j]"
                  :key="k"
                  :data-cy="`dropdown-${j}-option-${k}`"
                  @click.stop="choose(j, opt)"
                >
                  {{ opt }}
                </li>
              </ul>
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <ContinueButton :visible="answered" @click="emit('continue')" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { isEqual } from 'lodash';
import ContinueButton from './ContinueButton.vue';
import { evaluateAnswer } from '../../mediator';
import type { SlideInterface, AnswerType } from '../../mediator';

interface ClozeSlide extends SlideInterface {
  choices: string[][];
}

const props = withDefaults(
  defineProps<{ slide: SlideInterface; restored?: boolean }>(),
  { restored: false },
);

const emit = defineEmits<{
  answer: [payload: { selected: AnswerType; correct: boolean }];
  continue: [];
}>();

const rows = computed<string[]>(() => (props.slide.o ?? []) as string[]);
const choices = computed<string[][]>(() => (props.slide as ClozeSlide).choices ?? []);
const ans = computed<string[]>(() => (props.slide.ans as string[]) ?? []);

const openIndex = ref<number | null>(null);
const selections = ref<(string | null)[]>([]);
const answered = ref(false);
const correct = ref(false);
const corr = ref<boolean[]>([]);

function init(): void {
  selections.value = rows.value.map(() => null);
}
// Initialize synchronously (not in onMounted) — the template's first render
// happens before onMounted fires, and it indexes into this array using a
// length already available from props (rows).
init();

function toggleOpen(j: number): void {
  if (answered.value) return;
  openIndex.value = openIndex.value === j ? null : j;
}

function choose(j: number, opt: string): void {
  if (answered.value) return;
  selections.value[j] = opt;
  openIndex.value = null;
}

function finalize(): void {
  const res = selections.value as string[];
  correct.value = evaluateAnswer(props.slide, res as AnswerType);
  corr.value = ans.value.map((a, i) => isEqual(a, res[i]));
  answered.value = true;
  emit('answer', { selected: res as AnswerType, correct: correct.value });
}

watch(
  selections,
  () => {
    if (
      !answered.value &&
      selections.value.length > 0 &&
      selections.value.every((s) => s !== null)
    ) {
      finalize();
    }
  },
  { deep: true },
);

function restore(): void {
  const res = props.slide.res;
  if (Array.isArray(res) && res.length > 0) {
    selections.value = [...(res as string[])];
    correct.value = evaluateAnswer(props.slide, res as AnswerType);
    corr.value = ans.value.map((a, i) => isEqual(a, (res as string[])[i]));
    answered.value = true;
  }
}

onMounted(() => {
  if (props.restored) restore();
});
</script>

<style scoped>
.sf-cloze-table {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--sf-gap-answer);
  color: var(--sf-color-on-surface);
}
.sf-cloze-grid {
  width: 100%;
  border-collapse: collapse;
}
.sf-cloze-grid td {
  border: 1px solid var(--sf-color-token-border);
  padding: 8px;
  vertical-align: middle;
}
.sf-cloze-dd {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: 1.5px dashed var(--sf-color-token-border);
  border-radius: var(--sf-radius-token);
  padding: 2px 8px;
  cursor: pointer;
}
.sf-cloze-dd--correct {
  border-color: var(--sf-color-correct);
  border-style: solid;
}
.sf-cloze-dd--incorrect {
  border-color: var(--sf-color-incorrect);
  border-style: solid;
}
.sf-cloze-dd-reveal {
  font-size: 0.85em;
  opacity: 0.8;
}
.sf-cloze-dd-menu {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 10;
  list-style: none;
  margin: 4px 0 0;
  padding: 4px 0;
  min-width: 100%;
  max-width: min(240px, 80vw);
  background: var(--sf-color-surface-raised);
  border: 1px solid var(--sf-color-primary);
  border-radius: var(--sf-radius-token);
  white-space: normal;
}
.sf-cloze-dd-menu li {
  padding: 6px 10px;
  cursor: pointer;
}
.sf-cloze-dd-menu li:hover {
  background: var(--sf-color-primary);
  color: var(--sf-color-surface);
}
</style>
