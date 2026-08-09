import type { Component } from 'vue';
import ChoiceExercise from './ChoiceExercise.vue';
import InfoExercise from './InfoExercise.vue';
import SelectExercise from './SelectExercise.vue';
import GapExercise from './GapExercise.vue';
import SortExercise from './SortExercise.vue';
import ImapExercise from './ImapExercise.vue';
import BinsExercise from './BinsExercise.vue';
import ClozeTextExercise from './ClozeTextExercise.vue';
import ClozeTableExercise from './ClozeTableExercise.vue';
import MatrixSingleExercise from './MatrixSingleExercise.vue';
import MatrixMultiExercise from './MatrixMultiExercise.vue';
import BowtieLayout from './BowtieLayout.vue';

/**
 * Slide-type → Vue exercise component. Shared by the main quiz path
 * (`IndexPage.vue`) and the review path (`ReviewSession.vue`) so both render
 * exercises through the same components (PRD-001, PRD-003). `vocab` is absent
 * because vocab slides are flattened to `mc` children before rendering.
 */
export const EXERCISE_COMPONENTS: Record<string, Component> = {
  mc: ChoiceExercise,
  bool: ChoiceExercise,
  ma: ChoiceExercise,
  ema: ChoiceExercise,
  info: InfoExercise,
  select: SelectExercise,
  gap: GapExercise,
  sort: SortExercise,
  imap: ImapExercise,
  bins: BinsExercise,
  'cloze-text': ClozeTextExercise,
  'cloze-table': ClozeTableExercise,
  'matrix-single': MatrixSingleExercise,
  'matrix-multi': MatrixMultiExercise,
  bowtie: BowtieLayout,
};
