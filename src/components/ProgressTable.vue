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
    <template v-slot:body="props">
      <td class="text-left" data-th="Name">
        <div v-bind:style="props.setPadding(props.item)"
              :class="props.iconName(props.item)!='done'?'q-pl-lg':''">
          <q-btn @click="props.toggle(props.item)" v-if="props.iconName(props.item)!='done'"
                  :icon="props.iconName(props.item)" flat
                  dense>
          </q-btn>
          <span class="q-ml-sm">{{props.item.name}}</span>
        </div>
      </td>
      <td class="text-right">{{props.item.score}}</td>
      <td class="text-right">{{props.item.complete}}</td>
      <td class="text-right">{{props.item.pctCorrect}}</td>
      <td class="text-right">{{props.item.count}}</td>
      <td class="text-right">{{props.item.pctComplete}}</td>
      <td class="text-left">
        <a v-bind:href="props.item.summary">
          <q-icon class="summary" name="summarize" />       
        </a>
      </td>
    </template>
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
td a {
  color: white;
  text-decoration: none
}
td a:hover {
  color: #ddd;
}
</style>
