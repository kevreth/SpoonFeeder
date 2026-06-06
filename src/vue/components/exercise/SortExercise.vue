<template>
  <div ref="rootEl" class="sf-sort" data-cy="sort-exercise">
    <p v-if="slide.txt" class="sf-sort-prompt" v-html="slide.txt"></p>

    <VueDraggable
      v-model="items"
      :animation="200"
      :disabled="answered"
      class="sf-sort-list"
      :class="{ 'sf-sort-list--answered': answered }"
      ghost-class="sf-sort-ghost"
      chosen-class="sf-sort-dragging"
    >
      <div
        v-for="item in items"
        :key="item.id"
        class="sf-sort-item"
        :style="itemWidth ? { width: itemWidth } : undefined"
        :data-cy="`sort-item-${item.id}`"
      >
        <span class="sf-sort-handle" aria-hidden="true">
          <span></span><span></span><span></span>
        </span>
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
import { ref, computed, onMounted, nextTick } from 'vue';
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
// Initialize synchronously so VueDraggable mounts with items already populated.
const items = ref<Item[]>(answersArr.value.map((text, id) => ({ id, text })));
const answered = ref(false);
const correct = ref(false);
const rootEl = ref<HTMLElement | null>(null);
const itemWidth = ref<string | null>(null);

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

onMounted(async () => {
  if (props.restored && Array.isArray(props.slide.res) && (props.slide.res as string[]).length > 0) {
    const res = props.slide.res as string[];
    items.value = res.map((text) => ({ id: answersArr.value.indexOf(text), text }));
    correct.value = evaluateAnswer(props.slide, props.slide.res as AnswerType);
    answered.value = true;
  }
  await nextTick();
  if (rootEl.value) {
    const els = Array.from(rootEl.value.querySelectorAll<HTMLElement>('.sf-sort-item'));
    if (els.length > 0) {
      const maxW = Math.max(...els.map((el) => el.offsetWidth));
      if (maxW > 0) itemWidth.value = `${maxW}px`;
    }
  }
});
</script>

<style scoped>
.sf-sort {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sf-gap-answer);
  color: var(--sf-color-on-surface);
}
.sf-sort-list {
  display: flex;
  flex-direction: column;
  gap: var(--sf-gap-answer);
}
.sf-sort-list--answered {
  pointer-events: none;
}
.sf-sort-item {
  position: relative;
  background: var(--sf-color-surface-raised);
  border: 1px solid var(--sf-color-primary);
  border-radius: var(--sf-radius-button);
  padding: 0 12px 0 36px;
  min-height: var(--sf-min-touch);
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: grab;
  box-sizing: border-box;
}
.sf-sort-list--answered .sf-sort-item {
  cursor: default;
  padding-left: 12px;
}
.sf-sort-handle {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.sf-sort-handle span {
  display: block;
  width: 16px;
  height: 2px;
  background: rgba(0, 191, 255, 0.5);
  border-radius: 2px;
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
}
</style>
