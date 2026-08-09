<template>
  <div class="sf-matrix" data-cy="matrix-single-exercise">
    <div class="sf-question" v-html="slide.txt"></div>
    <div class="sf-matrix-scroll">
      <table class="sf-matrix-grid">
        <thead>
          <tr>
            <th></th>
            <th v-for="(col, c) in cols" :key="c">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(label, r) in rows" :key="r">
            <td v-html="label"></td>
            <td
              v-for="(col, c) in cols"
              :key="c"
              class="sf-matrix-cell"
              :data-cy="`cell-${r}-${c}`"
              @click="select(r, col)"
            >
              <span
                class="sf-radio"
                :class="{
                  'sf-radio--on': selections[r] === col,
                  'sf-radio--correct': answered && corr[r] && selections[r] === col,
                  'sf-radio--incorrect':
                    answered && !corr[r] && selections[r] === col,
                  'sf-radio--reveal': answered && !corr[r] && ans[r] === col,
                }"
              ></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ContinueButton :visible="answered" @click="emit('continue')" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { isEqual } from 'lodash';
import ContinueButton from './ContinueButton.vue';
import { evaluateAnswer } from '../../mediator';
import type { SlideInterface, AnswerType } from '../../mediator';

interface MatrixSlide extends SlideInterface {
  cols: string[];
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
const cols = computed<string[]>(() => (props.slide as MatrixSlide).cols ?? []);
const ans = computed<string[]>(() => (props.slide.ans as string[]) ?? []);

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

function select(r: number, col: string): void {
  if (answered.value) return;
  selections.value[r] = col;
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
.sf-matrix {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--sf-gap-answer);
  color: var(--sf-color-on-surface);
}
.sf-matrix-scroll {
  overflow-x: auto;
}
.sf-matrix-grid {
  width: 100%;
  border-collapse: collapse;
}
.sf-matrix-grid th,
.sf-matrix-grid td {
  border: 1px solid var(--sf-color-token-border);
  padding: 8px;
  text-align: center;
  vertical-align: middle;
}
.sf-matrix-grid td:first-child {
  text-align: left;
}
.sf-matrix-cell {
  cursor: pointer;
}
.sf-radio {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1.5px solid var(--sf-color-token-border);
}
.sf-radio--on {
  background: var(--sf-color-primary);
  border-color: var(--sf-color-primary);
}
.sf-radio--correct {
  background: var(--sf-color-correct);
  border-color: var(--sf-color-correct);
}
.sf-radio--incorrect {
  background: var(--sf-color-incorrect);
  border-color: var(--sf-color-incorrect);
}
.sf-radio--reveal {
  border-color: var(--sf-color-correct);
  border-style: dashed;
}
</style>
