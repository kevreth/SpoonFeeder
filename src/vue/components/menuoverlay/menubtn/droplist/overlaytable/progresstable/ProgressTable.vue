<template>
  <q-card class="bg-secondary">
    <!-- <InfoIcon
      id="infoIcon"
      @click="handleInfoOverlay"
      @keydown.esc="infoOverlay = false"
      tabindex="0"
    /> -->
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
      :default-expand-all="default_expand_all = true"
    >
      <template v-slot:body="props">
        <td
          class="nameWrap text-left"
          style="white-space: normal; word-wrap: break-word"
          data-th="Name"
        >
          <div
            class="nameContainer"
            :style="setPadding(props.item)"
            :class="props.iconName(props.item) != 'done' ? 'q-pl-lg' : ''"
          >
            <q-btn
              no-caps
              no-ripple
              padding="none"
              class="no-border no-outline expandIcon"
              style="background: none; box-shadow: none"
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
              :style="{
                marginLeft:
                  props.iconName(props.item) != 'done'
                    ? '0.75rem'
                    : 'calc(0.75rem + 5px)',
              }"
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
import { ref, CSSProperties } from 'vue';
import { Score, CourseFile } from '../../../../../../mediator';
import SummaryIcon from './SummaryIcon.vue';
import SummaryTable from './SummaryTable.vue';
// import InfoIcon from './InfoIcon.vue';
import InfoTable from './InfoTable.vue';
import { useI18n } from 'vue-i18n';

defineProps({
  isEnable: {
    type: Boolean,
    default: true,
  },
});

// Overwrite left padding in q-hierachy table
interface Item {
  level?: number;
}
function setPadding(item: Item): CSSProperties {
  const level = item.level ?? 0;
  const basePadding = 8;
  return {
    paddingLeft: `${level * basePadding}px`,
  };
}

const summaryOverlay = ref(false);
const infoOverlay = ref(false);
const { t } = useI18n();
const columns = [
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
    align: 'center',
  },
  {
    name: 'complete',
    label: t('tableColumns.complete'),
    sortable: false,
    field: 'complete',
    align: 'center',
  },
  {
    name: 'pctCorrect',
    label: t('tableColumns.pctCorrect'),
    sortable: false,
    field: 'pctCorrect',
    align: 'center',
  },
  {
    name: 'count',
    label: t('tableColumns.count'),
    sortable: false,
    field: 'count',
    align: 'center',
  },
  {
    name: 'pctComplete',
    label: t('tableColumns.pctComplete'),
    sortable: false,
    field: 'pctComplete',
    align: 'center',
  },
  {
    name: 'summary',
    label: 'ⓘ',
    sortable: false,
    field: 'summary',
    align: 'center',
  },
];

const course = CourseFile.get();
let summary = Score.summary(course);
// const columns = ref(_columns);
const data = ref(summary);
const classes = ref('bg-secondary');
const dark = ref(true);

// function handleInfoOverlay() {
//   infoOverlay.value = !infoOverlay.value;
// }

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
    return 'text-red';
  }
}
</script>

<style>
button.expandIcon {
  margin: 0;
  padding: 0;
}

.progressTable .q-markup-table {
  overflow: clip;
}

/* .progressTable thead tr th {
  background-color: var(
    --q-primary
  );
  position: sticky;
  z-index: 1;
} */

/* web */
/* .nameContainer {
  max-width: 170px;
} */
.q-table--dense .q-table th:first-child,
.q-table--dense .q-table td:first-child {
  padding-left: 0px;
  /* max-width: 160px; */
  width: 50%;
  /* max-width: none; */
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
  /* white-space: nowrap; */
}

/* .q-table th:first-child {
  width: 150px;
}
.q-table th {
  width: 50px;
} */
.q-table--dense .q-table th,
.q-table--dense .q-table td {
  /* padding: 2px 4px; */
  padding: 2px;
}
.q-table thead tr,
.q-table tbody td {
  text-align: center;
}
.q-table--dense .q-table th:last-child,
.q-table--dense .q-table td:last-child {
  padding-right: 0px;
}
.q-table--dense .q-table th:last-child {
  font-size: 14px;
  font-weight: 700;
}
.q-table th {
  font-size: 10px;
}
/* .q-table--horizontal-separator thead th,
.q-table--horizontal-separator tbody tr td,
.q-table--cell-separator thead th,
.q-table--cell-separator tbody tr:not(:last-child) > td {
  border-width: 0.5px;
} */

.progressTable .q-btn .q-icon,
.q-btn .q-spinner {
  font-size: unset;
}
.progressTable .q-table--no-wrap th,
.progressTable .q-table--no-wrap td {
  white-space: normal;
  /* word-break: break-word; */
}
/* .q-table__card {
  border-radius: unset;
} */

.progressTable {
  display: block ruby;
}
.progressTable thead tr:first-child th {
  top: 0;
  /* font-size: 2.5vw; */
}
.progressTable td:first-child {
  padding-left: 0;
}
/* .progressTable tbody td { */
/* font-size: 2.9vw; */
/* line-height: normal; */
/* } */
/* .q-btn .progressTable {
  font-weight: 350;
} */
.progressTable tbody {
  display: contents;
}
.award-icon {
  position: relative;
  top: 5px;
  left: 5px;
}

.bg-secondary {
  background: linear-gradient(145deg, #172a3f, #15192d) !important;
  margin: 0 5px;
  border-radius: 10px;
}

@media (min-width: 768px) {
  /* .progressTable thead tr:first-child th,
  .progressTable .q-table tbody td {
    font-size: 1.1vw !important;
  } */
  .q-table--dense .q-table th:first-child,
  .q-table--dense .q-table td:first-child {
    padding-left: 16px;
    max-width: 100%;
  }

  .progressTable .q-table--no-wrap th,
  .progressTable .q-table--no-wrap td {
    white-space: unset;
    word-break: unset;
  }
  .q-table--dense .q-table th,
  .q-table--dense .q-table td {
    /* padding: 2px 4px; */
    padding: 4px 8px;
  }
  .q-table--dense .q-table th:last-child,
  .q-table--dense .q-table td:last-child {
    padding-right: 16px;
  }

  .progressTable .q-table {
    line-height: 2vw;
  }
  .q-btn .progressTable {
    font-weight: 150;
  }
  /* .progressTable tbody td {
    font-size: 1.9vw;
  } */
  /* .progressTable thead tr:first-child th {
    font-size: 2vw;
  } */
  .progressTable {
    max-width: 100vw;
  }
}
</style>
