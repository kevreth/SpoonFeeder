<template>
  <div class="sf-sort" data-cy="sort-exercise">
    <p v-if="slide.txt" class="sf-sort-prompt" v-html="slide.txt"></p>

    <VueDraggable
      v-model="items"
      :animation="200"
      :disabled="answered"
      class="sf-sort-list"
      ghost-class="sf-sort-ghost"
      chosen-class="sf-sort-dragging"
    >
      <div
        v-for="item in items"
        :key="item.id"
        class="sf-sort-item"
        :data-cy="`sort-item-${item.id}`"
      >
        {{ item.text }}
      </div>
    </VueDraggable>

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
import { VueDraggable } from 'vue-draggable-plus';
import ContinueButton from './ContinueButton.vue';
import FeedbackStatement from './FeedbackStatement.vue';
import { evaluateAnswer } from '../../mediator';
import type { SlideInterface, AnswerType } from '../../mediator';

interface Item {
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

const answersArr = computed<string[]>(() => (props.slide.ans as string[]) ?? []);
const items = ref<Item[]>([]);
const answered = ref(false);
const correct = ref(false);

const feedbackState = computed<'idle' | 'correct' | 'incorrect'>(() =>
  answered.value ? (correct.value ? 'correct' : 'incorrect') : 'idle'
);

function onDone(): void {
  if (answered.value) return;
  const res = items.value.map((i) => i.text);
  correct.value = evaluateAnswer(props.slide, res as AnswerType);
  answered.value = true;
  emit('answer', { selected: res as AnswerType, correct: correct.value });
}

onMounted(() => {
  // Stable ids by answer value so order changes are tracked by identity.
  items.value = answersArr.value.map((text, id) => ({ id, text }));
  if (props.restored && Array.isArray(props.slide.res) && (props.slide.res as string[]).length > 0) {
    const res = props.slide.res as string[];
    items.value = res.map((text) => ({ id: answersArr.value.indexOf(text), text }));
    correct.value = evaluateAnswer(props.slide, props.slide.res as AnswerType);
    answered.value = true;
  }
});
</script>

<style scoped>
.sf-sort {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--sf-gap-answer);
  color: var(--sf-color-on-surface);
}
.sf-sort-list {
  display: flex;
  flex-direction: column;
  gap: var(--sf-gap-answer);
}
.sf-sort-item {
  background: var(--sf-color-surface-raised);
  border: 1px solid var(--sf-color-primary);
  border-radius: var(--sf-radius-button);
  padding: 0 12px;
  min-height: var(--sf-min-touch);
  display: flex;
  align-items: center;
  cursor: grab;
  will-change: transform;
}
.sf-sort-dragging {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}
.sf-sort-ghost {
  opacity: 0.4;
}
.sf-done {
  background: var(--sf-color-primary);
  color: var(--sf-color-surface);
  border-radius: var(--sf-radius-button);
  min-height: var(--sf-min-touch);
  font-weight: bold;
  align-self: flex-start;
}
</style>
