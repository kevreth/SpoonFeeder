<template>
  <q-card class="bg-secondary">
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
        <td class="text-right pctScore">{{props.item.pctCorrect}}</td>
        <td class="text-right pctComplete">{{props.item.pctComplete}}</td>
      </template>
    </q-hierarchy>
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
let summary = Score.summary(course);
const columns = ref(_columns);
const data = ref(summary);
const classes = ref('bg-secondary');
const dark = ref(true);


function myClass (pctCorrect, pctComplete) {
  if(pctComplete < 100 + '%') {
    return 'text-white';
  }
  if(pctCorrect === 100 + '%') {
    return 'text-green';
  } else if (pctCorrect >= 90 + '%') {
    return 'text-green';
  } else if(pctCorrect >=80 + '%') {
    return 'text-blue';
  } else {
    return 'text-red-7';
  }
}
</script>
