<template>
  <div ref="rootEl" class="sf-gap" data-cy="gap-exercise">
    <!-- Token pool — above the sentence, matching the legacy sticky #fills layout -->
    <VueDraggable v-model="pool" :group="poolGroup" :disabled="answered" class="sf-gap-pool">
      <span
        v-for="tok in pool"
        :key="tok.id"
        class="sf-token"
        :class="{ 'sf-token--picked': picked === tok.id }"
        :style="tokenWidth ? { width: tokenWidth, justifyContent: 'center' } : undefined"
        :data-cy="`token-${tok.id}`"
        @click="onTokenClick(tok.id)"
        >{{ tok.text }}</span
      >
    </VueDraggable>

    <!-- Sentence with inline gap slots -->
    <p class="sf-gap-text">
      <template v-for="(part, j) in textParts" :key="j">
        <span v-html="part"></span>
        <VueDraggable
          v-if="j < slotLists.length"
          v-model="slotLists[j]"
          :group="slotGroup(j)"
          :disabled="answered"
          class="sf-gap-slot"
          :class="answered ? `sf-gap-slot--${corr[j] ? 'correct' : 'incorrect'}` : ''"
          :style="tokenWidth ? { minWidth: tokenWidth } : undefined"
          :data-cy="`slot-${j}`"
          @click="onSlotClick(j)"
        >
          <span
            v-for="tok in slotLists[j]"
            :key="tok.id"
            class="sf-token"
            :style="tokenWidth ? { width: tokenWidth, justifyContent: 'center' } : undefined"
            :data-cy="`token-${tok.id}`"
            >{{ tok.text }}</span
          >
        </VueDraggable>
      </template>
    </p>

    <div class="sf-gap-remaining">Remaining: <span data-cy="remaining">{{ remaining }}</span></div>
    <div v-if="answered" class="sf-gap-summary" data-cy="gap-summary" v-html="summaryHtml"></div>

    <FeedbackStatement :state="feedbackState" />
    <ContinueButton :visible="answered" @click="emit('continue')" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import { isEqual } from 'lodash';
import ContinueButton from './ContinueButton.vue';
import FeedbackStatement from './FeedbackStatement.vue';
import { evaluateAnswer } from '../../mediator';
import type { SlideInterface, AnswerType } from '../../mediator';

interface Token {
  id: number;
  text: string;
}

const props = withDefaults(
  defineProps<{ slide: SlideInterface; restored?: boolean }>(),
  { restored: false }
);

const emit = defineEmits<{
  answer: [payload: { selected: AnswerType; correct: boolean }];
  continue: [];
}>();

const answers = computed<string[]>(() => (props.slide.ans as string[]) ?? []);

// Sentence split on the (N) gap markers — one slot between each pair of parts.
const textParts = computed<string[]>(() => (props.slide.txt ?? '').split(/\(\d+\)/));

const rootEl = ref<HTMLElement | null>(null);
const tokenWidth = ref<string | null>(null);
const pool = ref<Token[]>([]);
const slotLists = ref<Token[][]>([]);
const picked = ref<number | null>(null);
const answered = ref(false);
const correct = ref(false);
const corr = ref<boolean[]>([]);

function init(): void {
  pool.value = answers.value.map((text, id) => ({ id, text }));
  slotLists.value = answers.value.map(() => []);
}

const remaining = computed(() => pool.value.length);

const feedbackState = computed<'idle' | 'correct' | 'incorrect'>(() =>
  answered.value ? (correct.value ? 'correct' : 'incorrect') : 'idle'
);

const summaryHtml = computed(() => {
  const numCorrect = corr.value.filter(Boolean).length;
  const numAns = answers.value.length;
  const pct = numAns > 0 ? ((numCorrect / numAns) * 100).toFixed(0) : '0';
  return `Number correct: ${numCorrect} <br>\nNumber questions: ${numAns} <br>\n${pct}%`;
});

// At most one token per slot; cross-list moves share the 'gap' group.
function slotGroup(j: number) {
  return { name: 'gap', put: () => slotLists.value[j]!.length < 1 };
}
const poolGroup = { name: 'gap' };

function onTokenClick(id: number): void {
  if (answered.value) return;
  // Only pool tokens are pickable (placed tokens are returned via slot click).
  if (pool.value.some((t) => t.id === id)) picked.value = picked.value === id ? null : id;
}

function onSlotClick(j: number): void {
  if (answered.value) return;
  const slot = slotLists.value[j]!;
  if (slot.length > 0) {
    // Return the slot's token to the pool.
    pool.value.push(slot.pop() as Token);
    return;
  }
  if (picked.value === null) return;
  const idx = pool.value.findIndex((t) => t.id === picked.value);
  if (idx < 0) return;
  slot.push(pool.value.splice(idx, 1)[0] as Token);
  picked.value = null;
}

function finalize(): void {
  const res = slotLists.value.map((s) => s[0]?.text ?? '');
  correct.value = evaluateAnswer(props.slide, res as AnswerType);
  corr.value = answers.value.map((a, i) => isEqual(a, res[i]));
  answered.value = true;
  emit('answer', { selected: res as AnswerType, correct: correct.value });
}

// Finalize once every slot holds a token (drag or click) — mirrors the legacy
// auto-conclude when no fills remain.
watch(
  slotLists,
  () => {
    if (!answered.value && slotLists.value.length > 0 && slotLists.value.every((s) => s.length === 1)) {
      finalize();
    }
  },
  { deep: true }
);

function restore(): void {
  const res = props.slide.res;
  if (Array.isArray(res) && res.length > 0) {
    // Reconstruct placement by matching each slot's saved text to a token.
    init();
    (res as string[]).forEach((text, j) => {
      const idx = pool.value.findIndex((t) => t.text === text);
      if (idx >= 0) slotLists.value[j]!.push(pool.value.splice(idx, 1)[0] as Token);
    });
    correct.value = evaluateAnswer(props.slide, res as AnswerType);
    corr.value = answers.value.map((a, i) => isEqual(a, (res as string[])[i]));
    answered.value = true;
  }
}

onMounted(async () => {
  init();
  if (props.restored) restore();
  await nextTick();
  if (rootEl.value) {
    const tokens = Array.from(rootEl.value.querySelectorAll<HTMLElement>('.sf-token'));
    if (tokens.length > 0) {
      const maxW = Math.max(...tokens.map((t) => t.offsetWidth));
      if (maxW > 0) tokenWidth.value = `${maxW}px`;
    }
  }
});
</script>

<style scoped>
.sf-gap {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--sf-gap-answer);
  color: var(--sf-color-on-surface);
}
.sf-gap-text {
  line-height: 2.4;
}
.sf-gap-slot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  min-height: var(--sf-min-touch);
  border: 2px dashed var(--sf-color-token-border);
  border-radius: var(--sf-radius-token);
  padding: 0 6px;
  margin: 0 4px;
  vertical-align: middle;
  cursor: pointer;
}
.sf-gap-slot--correct {
  background: var(--sf-color-correct);
  border-style: solid;
}
.sf-gap-slot--incorrect {
  background: var(--sf-color-incorrect);
  border-style: solid;
}
.sf-gap-pool {
  position: sticky;
  top: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--sf-gap-answer);
  padding: 8px;
  min-height: var(--sf-min-touch);
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
</style>
