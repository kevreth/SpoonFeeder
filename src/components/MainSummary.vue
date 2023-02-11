<template>
  <q-card class="bg-secondary">
    <q-table
      hide-bottom
      dense
      :columns="columns"
      :rows="data"
      :dark="dark"
      :classes="classes"
    >
      <template v-slot:body>
        <tr v-for="item in data" :key="item">
          <td data-th="Name" class="summaryTable">
            <div>
              <span class="title-vertical" :class="(item.pctCorrect, item.pctComplete)">{{item.name}}</span>
            </div>
          </td>
          <td class="text-right pctScore">{{item.pctCorrect}}</td>
          <td class="text-right pctComplete">{{item.pctComplete}}</td>     
        </tr>
      </template>
    </q-table>
  </q-card>
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
      name: 'pctCorrect',
      label: 'SCO',
      sortable: false,
      field: 'pctCorrect',
      align: 'right',
    },
    {
      name: 'pctComplete',
      label: 'CPL',
      sortable: false,
      field: 'pctComplete',
      align: 'right',
    }
  ];

const course = CourseFile.get();
if(typeof course !== "undefined") {
  const courseLines = Score.summary(course);
  const summary = Score.quickSummary(courseLines);
  const data = ref(summary);
}
const columns = ref(_columns);
const classes = ref('bg-secondary');
const dark = ref(true);


// function myClass (pctCorrect, pctComplete) {
//   if(pctComplete < 100 + '%') {
//     return 'text-white';
//   }
//   if(pctCorrect === 100 + '%') {
//     return 'text-green';
//   } else if (pctCorrect >= 90 + '%') {
//     return 'text-green';
//   } else if(pctCorrect >=80 + '%') {
//     return 'text-blue';
//   } else {
//     return 'text-red-7';
//   }
// }
</script>

<style>
.mainSummary {
  position: absolute;
  float: left;
}
</style>
