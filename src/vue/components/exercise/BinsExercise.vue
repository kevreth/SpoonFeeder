<template>
  <div class="sf-bins" data-cy="bins-exercise">
    <div class="sf-question" v-html="slide.txt"></div>

    <!-- Source pool — unplaced items -->
    <VueDraggable
      v-model="pool"
      :group="groupName"
      :disabled="answered"
      class="sf-bins-pool"
    >
      <span
        v-for="tok in pool"
        :key="tok.id"
        class="sf-token"
        :class="{ 'sf-token--picked': picked === tok.id }"
        :data-cy="`token-${tok.id}`"
        @click="onTokenClick(tok.id)"
        >{{ tok.text }}</span
      >
    </VueDraggable>

    <div class="sf-bins-remaining">
      Remaining: <span data-cy="remaining">{{ remaining }}</span>
    </div>

    <!-- Bins -->
    <div class="sf-bins-row">
      <div v-for="(label, b) in binLabels" :key="b" class="sf-bin-col">
        <div class="sf-bin-title">{{ label }}</div>
        <VueDraggable
          v-model="binLists[b]"
          :group="groupName"
          :disabled="answered"
          class="sf-bin"
          :data-cy="`bin-${b}`"
          @click="onBinClick(b)"
        >
          <span
            v-for="tok in binLists[b]"
            :key="tok.id"
            class="sf-token"
            :class="
              answered
                ? `sf-token--${itemCorrect[tok.id] ? 'correct' : 'incorrect'}`
                : ''
            "
            :data-cy="`token-${tok.id}`"
            @click.stop="onTokenClick(tok.id)"
            >{{ tok.text }}</span
          >
        </VueDraggable>
      </div>
    </div>

    <div
      class="sf-bins-summary"
      :class="{ 'sf-bins-summary--hidden': !answered }"
      data-cy="bins-summary"
      v-html="summaryHtml"
    ></div>

    <ContinueButton :visible="answered" @click="emit('continue')" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import ContinueButton from './ContinueButton.vue';
import { evaluateAnswer } from '../../mediator';
import type { SlideInterface, AnswerType } from '../../mediator';

interface Token {
  id: number;
  text: string;
}

const props = withDefaults(
  defineProps<{ slide: SlideInterface; restored?: boolean }>(),
  { restored: false },
);

const emit = defineEmits<{
  answer: [payload: { selected: AnswerType; correct: boolean }];
  continue: [];
}>();

const items = computed<string[]>(() => (props.slide.o ?? []) as string[]);
const binLabels = computed<string[]>(() => (props.slide.bins ?? []) as string[]);
// ans/res are the bin LABEL per item (not an index) — readable directly in
// the summary/review row (Evaluate.GAP renders raw String(res)/String(ans)).
const ans = computed<string[]>(() => (props.slide.ans as string[]) ?? []);

const groupName = 'bins';
const pool = ref<Token[]>([]);
const binLists = ref<Token[][]>([]);
const picked = ref<number | null>(null);
const answered = ref(false);
const correct = ref(false);
const itemCorrect = ref<boolean[]>([]);

function init(): void {
  pool.value = items.value.map((text, id) => ({ id, text }));
  binLists.value = binLabels.value.map(() => []);
}
// Initialize synchronously (not in onMounted) — the template's first render
// happens before onMounted fires, and it indexes into these arrays using
// lengths already available from props (items/binLabels).
init();

const remaining = computed(() => pool.value.length);

const summaryHtml = computed(() => {
  const numCorrect = itemCorrect.value.filter(Boolean).length;
  const numAns = items.value.length;
  const pct = numAns > 0 ? ((numCorrect / numAns) * 100).toFixed(0) : '0';
  return `Number correct: ${numCorrect} <br>\nNumber questions: ${numAns} <br>\n${pct}%`;
});

function currentBinOf(id: number): number | null {
  for (let b = 0; b < binLists.value.length; b++) {
    if (binLists.value[b]!.some((t) => t.id === id)) return b;
  }
  return null;
}

function onTokenClick(id: number): void {
  if (answered.value) return;
  if (pool.value.some((t) => t.id === id)) {
    picked.value = picked.value === id ? null : id;
    return;
  }
  // Token is already placed in a bin — clicking it returns it to the pool.
  const b = currentBinOf(id);
  if (b === null) return;
  const list = binLists.value[b]!;
  const idx = list.findIndex((t) => t.id === id);
  const [tok] = list.splice(idx, 1);
  pool.value.push(tok as Token);
}

function onBinClick(b: number): void {
  if (answered.value) return;
  if (picked.value === null) return;
  const idx = pool.value.findIndex((t) => t.id === picked.value);
  if (idx < 0) return;
  const [tok] = pool.value.splice(idx, 1);
  binLists.value[b]!.push(tok as Token);
  picked.value = null;
}

function computeRes(): string[] {
  const res = new Array<string>(items.value.length).fill('');
  binLists.value.forEach((list, b) => {
    list.forEach((tok) => {
      res[tok.id] = binLabels.value[b] as string;
    });
  });
  return res;
}

function finalize(): void {
  const res = computeRes();
  correct.value = evaluateAnswer(props.slide, res as AnswerType);
  itemCorrect.value = items.value.map((_, id) => ans.value[id] === res[id]);
  answered.value = true;
  emit('answer', { selected: res as AnswerType, correct: correct.value });
}

// Finalize once every item has been placed into a bin — mirrors Gap's
// auto-conclude when no tokens remain in the pool.
watch(
  pool,
  () => {
    if (!answered.value && items.value.length > 0 && pool.value.length === 0) {
      finalize();
    }
  },
  { deep: true },
);

function restore(): void {
  const res = props.slide.res;
  if (Array.isArray(res) && res.length > 0) {
    init();
    (res as string[]).forEach((binLabel, id) => {
      const binIdx = binLabels.value.indexOf(binLabel);
      if (binIdx < 0) return;
      const idx = pool.value.findIndex((t) => t.id === id);
      if (idx < 0) return;
      const [tok] = pool.value.splice(idx, 1);
      binLists.value[binIdx]!.push(tok as Token);
    });
    correct.value = evaluateAnswer(props.slide, res as AnswerType);
    itemCorrect.value = items.value.map((_, id) => ans.value[id] === (res as string[])[id]);
    answered.value = true;
  }
}

onMounted(() => {
  if (props.restored) restore();
});
</script>

<style scoped>
.sf-bins {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--sf-gap-answer);
  color: var(--sf-color-on-surface);
}
.sf-question {
  color: var(--sf-color-on-surface);
}
.sf-bins-pool {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--sf-gap-answer);
  padding: 8px;
  min-height: var(--sf-min-touch);
}
.sf-bins-remaining {
  text-align: center;
  font-size: 0.9em;
}
.sf-bins-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: var(--sf-gap-answer);
}
.sf-bin-col {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.sf-bin-title {
  font-size: 0.85em;
  text-align: center;
  opacity: 0.8;
}
.sf-bin {
  border: 1.5px dashed var(--sf-color-token-border);
  border-radius: var(--sf-radius-token);
  min-height: 96px;
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 6px;
}
.sf-token {
  display: inline-flex;
  align-items: center;
  background: var(--sf-color-token-bg);
  color: var(--sf-color-token-text);
  border: 1.5px solid var(--sf-color-token-border);
  border-radius: var(--sf-radius-token);
  padding: 2px 8px;
  cursor: grab;
}
.sf-token--picked {
  outline: 2px solid var(--sf-color-primary);
}
.sf-token--correct {
  border-color: var(--sf-color-correct);
}
.sf-token--incorrect {
  border-color: var(--sf-color-incorrect);
}
.sf-bins-summary--hidden {
  visibility: hidden;
  pointer-events: none;
}
</style>
