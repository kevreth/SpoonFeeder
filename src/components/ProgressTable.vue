<template>
  <q-card class="bg-secondary">
    <InfoIcon 
      @click="handleInfoOverlay" 
      @keydown.esc="infoOverlay = false" tabindex="0"
    />
    <InfoTable
      v-model="infoOverlay"
      @closeInfo="infoOverlay = false"
    />

    <q-hierarchy
      class="progressTable"
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
            <span class="q-ml-sm title-vertical" :class="myClass(props.item.pctCorrect, props.item.pctComplete)">{{props.item.name}}</span>

            <img v-if="props.item.pctCorrect === 100+'%'" name="award" class="award-icon" src="../courses/test/award.svg" width="20"/>
          </div>
        </td>
        <td class="text-right">{{props.item.score}}</td>
        <td class="text-right complete">{{props.item.complete}}</td>
        <td class="text-right pctScore">{{props.item.pctCorrect}}</td>
        <td class="text-right">{{props.item.count}}</td>
        <td class="text-right pctComplete">{{props.item.pctComplete}}</td>
        <td class="text-left">
          <a v-bind:href="props.item.summary">
            <SummaryIcon
              @click="summaryOverlay = true"
              />    
            <SummaryTable
              v-model="summaryOverlay"
              @closeSummary="summaryOverlay = false"
              />
          </a>
        </td>
      </template>
    </q-hierarchy>
  </q-card>
</template>

<script setup>
import { ref } from 'vue';
import {Score} from '../ts/main/quiz/score';
import {CourseFile} from '../ts/main/globals'
import SummaryIcon from './SummaryIcon.vue'
import SummaryTable from './SummaryTable.vue';
import InfoIcon from './InfoIcon.vue';
import InfoTable from './InfoTable.vue';

const summaryOverlay = ref(false);
const infoOverlay = ref(false);

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

function handleInfoOverlay() {
  infoOverlay.value = !infoOverlay.value
}

function myClass (pctCorrect, pctComplete) {
  if(pctComplete < 100 + '%') {
    return 'text-white';
  }
  if(pctCorrect === 100 + '%') {
    return 'text-green';
  } else if (pctCorrect >= 90 + '%') {
    return 'text-green';
  } else if(pctCorrect >=80 + '%') {
    return 'text-blue-3';
  } else {
    return 'text-red-6';
  }
}
</script>

<style>
.progressTable tbody {
  display:contents;
}
.progressTable {
  display: inline-block;
  max-height: 100vh;
  overflow: auto;
  --scrollbarBG: #cfd8dc;
  --thumbBG: #686a6c;
  border-radius: 20px;
  margin: 0;
}
.progressTable {
  scrollbar-color: var(--thumbBG) var(--scrollbarBG);
}
.progressTable::-webkit-scrollbar-track {
  background: var(--scrollbarBG);
}
.progressTable::-webkit-scrollbar-thumb {
  background-color: var(--thumbBG);
}
.award-icon {
  position: relative;
  top: 5px;
  left: 5px;
}
</style>
