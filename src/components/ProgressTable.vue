<template>
  <q-hierarchy
    class="hierarchy"
    dense
    :columns="columns"
    :data="data"
    :classes="classes"
    :dark="dark"
    :default-expand-all="(default_expand_all = true)"
  >
  </q-hierarchy>
</template>

<script setup>
import { ref } from 'vue';
import {Score} from '../ts/main/quiz/score';
import {CourseFile} from '../ts/main/globals'

const _columns = [
    {
      name: 'name',
      label: 'Name',
      align: 'left',
      field: 'name',
      sortable: false,
    },
    {
      name: 'score',
      label: 'COR',
      sortable: false,
      field: 'score',
      align: 'right',
    },
    {
      name: 'complete',
      label: 'COM',
      sortable: false,
      field: 'complete',
      align: 'right',
    },
    {
      name: 'pctCorrect',
      label: 'SCO',
      sortable: false,
      field: 'pctCorrect',
      align: 'right',
    },
    {
      name: 'count',
      label: 'TOT',
      sortable: false,
      field: 'count',
      align: 'right',
    },
    {
      name: 'pctComplete',
      label: 'CPL',
      sortable: false,
      field: 'pctComplete',
      align: 'right',
    },
    {
      name: 'summary',
      label: '',
      sortable: false,
      field: 'summary',
      align: 'right',
    },
  ];

const course = CourseFile.get();
let summary = Score.summary(course);
const columns = ref(_columns);
const data = ref(summary);
const classes = ref('bg-secondary');
const dark = ref(true);

</script>

<style>
.hierarchy {
  display: inline-block;
  max-height: 100vh;
  overflow: auto;
  --scrollbarBG: #cfd8dc;
  --thumbBG: #686a6c;
  border-radius: 20px;
  margin: 0;
}
.hierarchy {
  scrollbar-color: var(--thumbBG) var(--scrollbarBG);
}
.hierarchy::-webkit-scrollbar-track {
  background: var(--scrollbarBG);
}
.hierarchy::-webkit-scrollbar-thumb {
  background-color: var(--thumbBG);
}
</style>
