<template>
  <q-card class="bg-secondary">
    <InfoIcon
      id="infoIcon"
      @click="handleInfoOverlay"
      @keydown.esc="infoOverlay = false"
      tabindex="0"
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
        <td
          class="nameWrap text-left"
          style="white-space: normal; word-wrap: break-word"
          data-th="Name"
        >
          <div
            class="nameContainer"
            v-bind:style="props.setPadding(props.item)"
            :class="props.iconName(props.item) != 'done' ? 'q-pl-lg' : ''"
          >
            <q-btn
              class="expandIcon"
              @click="props.toggle(props.item)"
              v-if="props.iconName(props.item) != 'done'"
              :icon="props.iconName(props.item)"
              flat
              dense
            >
            </q-btn>
            <span
              class="name q-ml-sm title-vertical"
              :class="myClass(props.item.pctCorrect, props.item.pctComplete)"
              >{{ props.item.name }}</span
            >

            <img
              class="award-icon"
              v-if="props.item.pctCorrect === 100 + '%'"
              name="award"
              src="../../../../../../../courses/test/award.svg"
              width="20"
            />
          </div>
        </td>
        <td class="score text-right">{{ props.item.score }}</td>
        <td class="complete text-right complete">{{ props.item.complete }}</td>
        <td class="pctCorrect text-right pctScore">
          {{ props.item.pctCorrect }}
        </td>
        <td class="count text-right">{{ props.item.count }}</td>
        <td class="pctComplete text-right pctComplete">
          {{ props.item.pctComplete }}
        </td>
        <td class="summary text-left">
          <a v-bind:href="props.item.summary">
            <SummaryIcon id="summaryIcon" @click="summaryOverlay = true" />
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
import { Score, CourseFile } from '../../../../../../mediator';
import SummaryIcon from './SummaryIcon.vue';
import SummaryTable from './SummaryTable.vue';
import InfoIcon from './InfoIcon.vue';
import InfoTable from './InfoTable.vue';
import { useI18n } from 'vue-i18n';

defineProps({
  isEnable: {
    type: Boolean,
    default: true,
  },
});

const summaryOverlay = ref(false);
const infoOverlay = ref(false);
const { t } = useI18n();
const _columns = [
  {
    name: 'name',
    label: t('tableColumns.name'),
    align: 'left',
    field: 'name',
    sortable: false,
  },
  {
    name: 'score',
    label: t('tableColumns.score'),
    sortable: false,
    field: 'score',
    align: 'right',
  },
  {
    name: 'complete',
    label: t('tableColumns.complete'),
    sortable: false,
    field: 'complete',
    align: 'right',
  },
  {
    name: 'pctCorrect',
    label: t('tableColumns.pctCorrect'),
    sortable: false,
    field: 'pctCorrect',
    align: 'right',
  },
  {
    name: 'count',
    label: t('tableColumns.count'),
    sortable: false,
    field: 'count',
    align: 'right',
  },
  {
    name: 'pctComplete',
    label: t('tableColumns.pctComplete'),
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
  infoOverlay.value = !infoOverlay.value;
}

function myClass(pctCorrect: string, pctComplete: string) {
  if (pctComplete < 100 + '%') {
    return 'text-white';
  }
  if (pctCorrect === 100 + '%') {
    return 'text-green';
  } else if (pctCorrect >= 90 + '%') {
    return 'text-green';
  } else if (pctCorrect >= 80 + '%') {
    return 'text-blue-3';
  } else {
    return 'text-red-6';
  }
}
</script>

<style>
button.expandIcon {
  margin: 0;
  padding: 0;
}
/* make the header sticky */
.progressTable .q-table {
  background-color: rgba(28, 28, 60, 0.9);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}
.progressTable .q-markup-table {
  overflow: clip;
}
.progressTable thead tr th {
  position: sticky;
  z-index: 1;
}
.progressTable {
  max-width: 100vw;
  display: block ruby;
}
.progressTable thead tr:first-child th {
  top: 0;
  font-size: 2vw;
}
.progressTable tbody td {
  font-size: 1.9vw;
}
.q-btn .progressTable {
  font-weight: 350;
}
@media screen and (min-width: 1000px) {
  .progressTable thead tr:first-child th,
  .progressTable .q-table tbody td {
    font-size: 1.1vw !important;
  }
  .progressTable .q-table {
    line-height: 2vw;
  }
  .q-btn .progressTable {
    font-weight: 150;
  }
}
.progressTable tbody {
  display: contents;
}
.award-icon {
  position: relative;
  top: 5px;
  left: 5px;
}
</style>
