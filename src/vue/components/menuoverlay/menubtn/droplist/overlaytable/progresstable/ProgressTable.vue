<template>
  <q-card class="bg-secondary">
    <InfoIcon
      id="infoIcon"
      @click="handleInfoOverlay"
      @keydown.esc="infoOverlay = false" tabindex="0"
    />
    <InfoTable
      :isEnable="isEnable"
      id="infoTable"
      v-model="infoOverlay"
      @closeInfo="infoOverlay = false"
    />

    <q-hierarchy
      id="progress"
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
        <td id="firstCell" class="text-left" style="white-space: normal; word-wrap: break-word;" data-th="Name">
          <div
            v-bind:style="props.setPadding(props.item)"
            :class="props.iconName(props.item)!='done'?'q-pl-lg':''">
            <q-btn
              id="expandIcon"
              @click="props.toggle(props.item)"
              v-if="props.iconName(props.item)!='done'"
              :icon="props.iconName(props.item)"
              flat
              dense>
            </q-btn>
            <span id="name" class="q-ml-sm title-vertical" :class="myClass(props.item.pctCorrect, props.item.pctComplete)">{{props.item.name}}</span>

            <img id="award" v-if="props.item.pctCorrect === 100+'%'" name="award" class="award-icon" src="../../../../../../../courses/test/award.svg" width="20"/>
          </div>
        </td>
        <td id="score" class="text-right">{{props.item.score}}</td>
        <td id="complete" class="text-right complete">{{props.item.complete}}</td>
        <td id="pctCorrect" class="text-right pctScore">{{props.item.pctCorrect}}</td>
        <td id="count" class="text-right">{{props.item.count}}</td>
        <td id="pctComplete" class="text-right pctComplete">{{props.item.pctComplete}}</td>
        <td id="summary" class="text-left">
          <a v-bind:href="props.item.summary">
            <SummaryIcon
              id="summaryIcon"
              @click="summaryOverlay = true"
              />
            <SummaryTable
              :isEnable="isEnable"
              id="summaryTable"
              v-model="summaryOverlay"
              @closeSummary="summaryOverlay = false"
              />
          </a>
        </td>
      </template>
    </q-hierarchy>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {Score, CourseFile} from '../../../../../../mediator';
import SummaryIcon from './SummaryIcon.vue'
import SummaryTable from './SummaryTable.vue';
import InfoIcon from './InfoIcon.vue';
import InfoTable from './InfoTable.vue';

defineProps({
  isEnable: {
    type: Boolean,
    default: true
  }
})

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

function myClass (pctCorrect: string, pctComplete: string) {
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
/* make the header sticky */
.progressTable .q-table  {
  line-height: 2vw;
}
.progressTable .q-markup-table {
  overflow: clip
}
.progressTable thead tr th{
  background: #37363e;
  position: sticky;
  z-index: 1;
}
.progressTable {
  max-width: 85vw;
  display: block ruby;
}
.progressTable thead tr:first-child th {
  top: 0;
  font-size: 2vw;
}
.progressTable tbody td {
  font-size: 1.9vw;
}
@media screen and (min-width: 1000px) {
  .progressTable thead tr:first-child th,
  .progressTable .q-table tbody td {
  font-size: 1.1vw !important;
}
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
