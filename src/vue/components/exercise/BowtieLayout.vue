<template>
  <div class="sf-bowtie" data-cy="bowtie-exercise">
    <div class="sf-question" v-html="slide.txt"></div>

    <div class="sf-bowtie-center">
      <div class="sf-bowtie-title">Condition most likely</div>
      <div class="sf-bowtie-opts">
        <q-btn
          v-for="(opt, i) in conditionOptions"
          :key="i"
          class="sf-option"
          :class="conditionState(i)"
          :data-cy="`condition-${i}`"
          no-caps
          unelevated
          :disable="answered"
          @click="pickCondition(opt)"
          >{{ opt }}</q-btn
        >
      </div>
    </div>

    <div class="sf-bowtie-branches">
      <div class="sf-bowtie-branch">
        <div class="sf-bowtie-title">Actions to take &middot; select 2</div>
        <div class="sf-bowtie-opts">
          <q-btn
            v-for="(opt, i) in actionOptions"
            :key="i"
            class="sf-option"
            :class="branchState(actionsPicked, opt, 'action')"
            :data-cy="`action-${i}`"
            no-caps
            unelevated
            :disable="answered"
            @click="toggleBranch(actionsPicked, opt)"
            >{{ opt }}</q-btn
          >
        </div>
      </div>
      <div class="sf-bowtie-branch">
        <div class="sf-bowtie-title">Monitor &middot; select 2</div>
        <div class="sf-bowtie-opts">
          <q-btn
            v-for="(opt, i) in monitorOptions"
            :key="i"
            class="sf-option"
            :class="branchState(monitorsPicked, opt, 'monitor')"
            :data-cy="`monitor-${i}`"
            no-caps
            unelevated
            :disable="answered"
            @click="toggleBranch(monitorsPicked, opt)"
            >{{ opt }}</q-btn
          >
        </div>
      </div>
    </div>

    <ContinueButton :visible="answered" @click="emit('continue')" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { isEqual } from 'lodash';
import ContinueButton from './ContinueButton.vue';
import { evaluateAnswer, buildBowtieAnswer } from '../../mediator';
import type { SlideInterface, AnswerType } from '../../mediator';

interface BowtieSlide extends SlideInterface {
  bowtieActions: string[];
  bowtieMonitors: string[];
}

const props = withDefaults(
  defineProps<{ slide: SlideInterface; restored?: boolean }>(),
  { restored: false },
);

const emit = defineEmits<{
  answer: [payload: { selected: AnswerType; correct: boolean }];
  continue: [];
}>();

const BRANCH_SIZE = 2;

const conditionOptions = computed<string[]>(() => (props.slide.o ?? []) as string[]);
const actionOptions = computed<string[]>(
  () => (props.slide as BowtieSlide).bowtieActions ?? [],
);
const monitorOptions = computed<string[]>(
  () => (props.slide as BowtieSlide).bowtieMonitors ?? [],
);
// Fixed 5-slot ans: [condition, action1, action2, monitor1, monitor2].
const ans = computed<string[]>(() => (props.slide.ans as string[]) ?? []);

const condition = ref<string | null>(null);
const actionsPicked = ref<Set<string>>(new Set());
const monitorsPicked = ref<Set<string>>(new Set());
const answered = ref(false);
const correct = ref(false);
const corr = ref<boolean[]>([]);

function conditionState(i: number): string {
  const opt = conditionOptions.value[i];
  const picked = condition.value === opt;
  if (!answered.value) return picked ? 'sf-option--selected' : '';
  if (!picked) return '';
  return corr.value[0] ? 'sf-option--correct' : 'sf-option--incorrect';
}

const correctActions = computed<Set<string>>(
  () => new Set([ans.value[1], ans.value[2]]),
);
const correctMonitors = computed<Set<string>>(
  () => new Set([ans.value[3], ans.value[4]]),
);

function branchState(
  set: Set<string>,
  opt: string,
  which: 'action' | 'monitor',
): string {
  const picked = set.has(opt);
  if (!answered.value) return picked ? 'sf-option--selected' : '';
  if (!picked) return '';
  const correctSet = which === 'action' ? correctActions.value : correctMonitors.value;
  return correctSet.has(opt) ? 'sf-option--correct' : 'sf-option--incorrect';
}

function pickCondition(opt: string): void {
  if (answered.value) return;
  condition.value = condition.value === opt ? null : opt;
}

function toggleBranch(set: Set<string>, opt: string): void {
  if (answered.value) return;
  if (set.has(opt)) {
    set.delete(opt);
    return;
  }
  if (set.size >= BRANCH_SIZE) return;
  set.add(opt);
}

function ready(): boolean {
  return (
    condition.value !== null &&
    actionsPicked.value.size === BRANCH_SIZE &&
    monitorsPicked.value.size === BRANCH_SIZE
  );
}

function finalize(): void {
  const res = buildBowtieAnswer(
    condition.value as string,
    [...actionsPicked.value],
    [...monitorsPicked.value],
  );
  correct.value = evaluateAnswer(props.slide, res as AnswerType);
  corr.value = ans.value.map((a, i) => isEqual(a, res[i]));
  answered.value = true;
  emit('answer', { selected: res as AnswerType, correct: correct.value });
}

watch(
  [condition, actionsPicked, monitorsPicked],
  () => {
    if (!answered.value && ready()) finalize();
  },
  { deep: true },
);

function restore(): void {
  const res = props.slide.res;
  if (Array.isArray(res) && res.length === 5) {
    const [c, a1, a2, m1, m2] = res as string[];
    condition.value = c as string;
    actionsPicked.value = new Set([a1 as string, a2 as string]);
    monitorsPicked.value = new Set([m1 as string, m2 as string]);
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
.sf-bowtie {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--sf-gap-answer);
  color: var(--sf-color-on-surface);
}
.sf-bowtie-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.sf-bowtie-branches {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--sf-gap-answer);
}
.sf-bowtie-branch {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.sf-bowtie-title {
  font-size: 0.85em;
  text-align: center;
  opacity: 0.8;
}
.sf-bowtie-opts {
  display: flex;
  flex-direction: column;
  gap: var(--sf-gap-answer);
}
.sf-option {
  min-height: var(--sf-min-touch);
  border-radius: var(--sf-radius-button);
  background: var(--sf-color-surface-raised);
  color: var(--sf-color-on-surface);
  border: 1px solid var(--sf-color-primary);
}
.sf-option--selected {
  background: var(--sf-color-primary);
  color: var(--sf-color-surface);
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
</style>
