<template>
  <p v-if="message" class="sf-feedback" :class="`sf-feedback--${state}`" data-cy="feedback-statement">
    {{ message }}
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    state: 'idle' | 'correct' | 'incorrect';
    intensity?: 'low' | 'medium' | 'high';
  }>(),
  { intensity: 'medium' }
);

const POSITIVE = ['Correct!', 'Nicely done!', 'Exactly right!', 'You got it!', 'Spot on!'];
const ENCOURAGING = [
  'Not quite — take another look.',
  'Close! Review the explanation.',
  "That's okay, keep going.",
  'Good try — check the answer.',
];

function pick(messages: string[]): string {
  return messages[Math.floor(Math.random() * messages.length)] as string;
}

// `intensity` is accepted as skinning groundwork (PRD-001); only 'medium' tone
// is implemented for now, so it does not yet alter the message set.
const message = computed(() => {
  void props.intensity;
  if (props.state === 'correct') return pick(POSITIVE);
  if (props.state === 'incorrect') return pick(ENCOURAGING);
  return '';
});
</script>

<style scoped>
.sf-feedback {
  font-weight: bold;
  margin: var(--sf-gap-answer) 0;
  transition: color var(--sf-transition-feedback);
}
.sf-feedback--correct {
  color: var(--sf-color-correct);
}
.sf-feedback--incorrect {
  color: var(--sf-color-incorrect);
}
</style>
