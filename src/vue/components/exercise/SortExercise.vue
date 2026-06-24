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
        v-for="(item, i) in items"
        :key="item.id"
        class="sf-sort-item"
        :class="answered ? (item.id === i ? 'sf-sort-item--correct' : 'sf-sort-item--incorrect') : ''"
        :style="itemWidth ? { width: itemWidth } : undefined"
        :data-cy="`sort-item-${item.id}`"
      >
        {{ item.text }}
      </div>
    </VueDraggable>

    <q-btn
      class="sf-done"
      :class="{ 'sf-done--hidden': answered }"
      data-cy="done"
      no-caps
      label="Done"
      @click="onDone"
    />

    <ContinueButton :visible="answered" @click="emit('continue')" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import ContinueButton from './ContinueButton.vue';
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
  background: var(--sf-color-surface-raised);
  border: 1px solid var(--sf-color-primary);
  border-radius: var(--sf-radius-button);
  padding: 0 12px;
  min-height: var(--sf-min-touch);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: grab;
  box-sizing: border-box;
}
.sf-sort-list--answered .sf-sort-item {
  cursor: default;
}
.sf-sort-item--correct {
  border-color: var(--sf-color-correct);
}
.sf-sort-item--incorrect {
  border-color: var(--sf-color-incorrect);
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
.sf-done--hidden {
  visibility: hidden;
  pointer-events: none;
}
</style>
