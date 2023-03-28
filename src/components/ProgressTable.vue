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
      class="progressTable center"
      dense
      flat
      :columns="columns"
      :data="data"
      :classes="classes"
      :dark="dark"
      :default-expand-all="(default_expand_all = true)"
    >
      <template v-slot:body="props">
        <td class="text-left" style="white-space: normal; word-wrap: break-word;" data-th="Name">
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

// const course = CourseFile.get();
// const courseLine = Score.summary(course);
// const courseLines = new Array<ISummaryLine>();
// courseLines.push(courseLine);

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
/* make the icon "-" in the table smaller */
.q-btn .q-icon {
  font-size: none;
}
/* make the header sticky */
.q-markup-table {
  overflow: clip
}
.progressTable thead tr th{
  background: #37363e;
  position: sticky;
  z-index: 1;
}
.q-table {
  margin-top: -18px;
}
.progressTable thead tr:first-child th {
  top: 0;
}
.progressTable .q-table td:first-child {
  padding-left: 8px;
}
.q-table td {
  padding-top: 2px;
  padding-bottom: 2px;
}
.progressTable tbody {
  display:contents;
}
.award-icon {
  position: relative;
  top: 5px;
  left: 5px;
}
</style>
