<template>
  <div class="sf-matrix" data-cy="matrix-multi-exercise">
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
              @click="toggle(r, c)"
            >
              <span
                class="sf-check"
                :class="{
                  'sf-check--on': selections[r]!.has(c),
                  'sf-check--correct': answered && cellCorrect(r, c) && selections[r]!.has(c),
                  'sf-check--incorrect':
                    answered && !cellCorrect(r, c) && selections[r]!.has(c),
                }"
              ></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <q-btn
      v-if="!answered"
      class="sf-done"
      data-cy="done"
      no-caps
      label="Done"
      @click="finalize"
    />

    <ContinueButton :visible="answered" @click="emit('continue')" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ContinueButton from './ContinueButton.vue';
import { evaluateAnswer, canonicalizeColumns } from '../../mediator';
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
// ans/res rows are canonical comma-joined column NAMES (not indices) — see
// canonicalizeColumns — so the summary/review row stays readable.
const ansRows = computed<string[]>(() => (props.slide.ans as string[]) ?? []);
const ansSets = computed<Set<string>[]>(() =>
  ansRows.value.map((row) => new Set(row === '' ? [] : row.split(','))),
);

const selections = ref<Set<number>[]>([]);
const answered = ref(false);
const correct = ref(false);
const corr = ref<boolean[]>([]);

function init(): void {
  selections.value = rows.value.map(() => new Set<number>());
}
// Initialize synchronously (not in onMounted) — the template's first render
// happens before onMounted fires, and it indexes into this array using a
// length already available from props (rows).
init();

function toggle(r: number, c: number): void {
  if (answered.value) return;
  const set = selections.value[r]!;
  if (set.has(c)) set.delete(c);
  else set.add(c);
}

function cellCorrect(r: number, c: number): boolean {
  return ansSets.value[r]!.has(cols.value[c] as string) === selections.value[r]!.has(c);
}

function finalize(): void {
  if (answered.value) return;
  const res = selections.value.map((set) =>
    canonicalizeColumns([...set].map((c) => cols.value[c] as string)),
  );
  correct.value = evaluateAnswer(props.slide, res as AnswerType);
  corr.value = res.map((r, i) => r === ansRows.value[i]);
  answered.value = true;
  emit('answer', { selected: res as AnswerType, correct: correct.value });
}

function restore(): void {
  const res = props.slide.res;
  if (Array.isArray(res) && res.length > 0) {
    const rowsRes = res as string[];
    selections.value = rowsRes.map(
      (row) =>
        new Set(
          row === ''
            ? []
            : row
                .split(',')
                .map((name) => cols.value.indexOf(name))
                .filter((i) => i >= 0),
        ),
    );
    correct.value = evaluateAnswer(props.slide, res as AnswerType);
    corr.value = rowsRes.map((r, i) => r === ansRows.value[i]);
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
.sf-check {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  border: 1.5px solid var(--sf-color-token-border);
}
.sf-check--on {
  background: var(--sf-color-primary);
  border-color: var(--sf-color-primary);
}
.sf-check--correct {
  background: var(--sf-color-correct);
  border-color: var(--sf-color-correct);
}
.sf-check--incorrect {
  background: var(--sf-color-incorrect);
  border-color: var(--sf-color-incorrect);
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
