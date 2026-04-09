<template>
  <q-card class="bg-transparent">
    <div class="course-header">
      <div class="course-header-row">
        <div class="progress-bar-wrap" style="flex: 1">
          <div
            class="progress-bar-fill"
            :style="{ width: overallPctComplete + '%' }"
          ></div>
        </div>
        <span class="progress-bar-label">{{ overallPctComplete }}%</span>
      </div>
    </div>
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
      :default-expand-all="true"
    >
      <template v-slot:header="hProps">
        <th
          v-for="col in hProps.columns"
          :key="col.name"
          :class="col.name === 'summary' ? 'text-left' : 'text-' + col.align"
        >
          <InfoIcon
            v-if="col.name === 'summary'"
            id="infoIcon"
            @click="handleInfoOverlay"
            @keydown.esc="infoOverlay = false"
            tabindex="0"
          />
          <template v-else>{{ col.label }}</template>
        </th>
      </template>
      <template v-slot:body="props">
        <td
          class="nameWrap text-left"
          :class="rowClass(props.item)"
          style="white-space: normal; word-wrap: break-word"
          data-th="Name"
        >
          <div
            class="nameContainer"
            :style="{ paddingLeft: getLevel(props.item) * 8 + 'px' }"
            :class="props.iconName(props.item) != 'done' ? 'q-pl-lg' : ''"
          >
            <q-btn
              class="expandIcon"
              @click="props.toggle(props.item)"
              v-if="props.iconName(props.item) != 'done'"
              flat
              dense
            >
              <span>{{
                props.iconName(props.item) === 'remove' ? '–' : '+'
              }}</span>
            </q-btn>
            <span
              class="name q-ml-sm title-vertical"
              :class="levelNameClass(props.item)"
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
        <td
          class="score text-right"
          :class="rowClass(props.item)"
          :style="{ color: scoreStyle(props.item.pctCorrect) }"
        >
          {{ props.item.score }}
        </td>
        <td
          class="complete text-right"
          :class="rowClass(props.item)"
          :style="{ color: scoreStyle(props.item.pctComplete) }"
        >
          {{ props.item.complete }}
        </td>
        <td
          class="pctCorrect text-right pctScore"
          :class="rowClass(props.item)"
          :style="{ color: scoreStyle(props.item.pctCorrect) }"
        >
          {{ props.item.pctCorrect }}
        </td>
        <td class="count text-right" :class="rowClass(props.item)">
          {{ props.item.count }}
        </td>
        <td
          class="pctComplete text-right"
          :class="rowClass(props.item)"
          :style="{ color: scoreStyle(props.item.pctComplete) }"
        >
          {{ props.item.pctComplete }}
        </td>
        <td class="summary text-left" :class="rowClass(props.item)">
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
import { ref, computed } from 'vue';
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

const overallPctComplete = computed(() => {
  const items = data.value as any[];
  if (!items?.length) return 0;
  const sum = items.reduce(
    (acc: number, item: any) => acc + (parseInt(item.pctCorrect) || 0),
    0,
  );
  return Math.round(sum / items.length);
});

function handleInfoOverlay() {
  infoOverlay.value = !infoOverlay.value;
}

function getLevel(item: any): number {
  return item._level ?? item.level ?? item.depth ?? 0;
}

function rowClass(item: any): string {
  const level = getLevel(item);
  if (level === 0) return 'row-course';
  if (level === 1) return 'row-unit';
  if (level === 2) return 'row-lesson';
  return 'row-slide';
}

function levelNameClass(item: any): string {
  const level = getLevel(item);
  if (level === 0) return 'name-course';
  if (level === 1) return 'name-unit';
  if (level === 2) return 'name-lesson';
  return 'name-slide';
}

function scoreStyle(pctStr: string): string {
  const val = parseInt(pctStr) || 0;
  if (val === 100) return '#2ecc9a';
  if (val >= 1) return '#e0a020';
  return '';
}
</script>

<style>
.bg-transparent {
  background: transparent !important;
}
button.expandIcon {
  margin: 0;
  padding: 0;
}
.progressTable .q-markup-table {
  overflow: clip;
}
/* Table background + border */
.progressTable .q-table {
  /* background: rgba(10, 15, 25, 0.96); */
  background: rgba(5, 10, 18, 0.95);
}
/* Header row */
.progressTable thead tr th {
  background: rgba(0, 191, 255, 0.06);
  color: #00bfff99;
  position: sticky;
  z-index: 1;
  font-size: 11px;
  letter-spacing: 1px;
  padding: 3px 2px;
  white-space: nowrap;
}
.progressTable {
  max-width: 100vw;
  width: 100%;
  display: block ruby;
  background: rgba(10, 15, 25, 0.96);
  overflow-x: auto;
}
.progressTable thead tr:first-child th {
  top: 0;
}
.progressTable tbody td {
  font-size: 9px;
  line-height: normal;
  padding: 1px 2px;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.05);
  color: #ccc;
  white-space: nowrap;
}
.progressTable tbody tr:hover td {
  background: rgba(0, 191, 255, 0.04);
}
.progressTable tbody {
  display: contents;
}
.nameContainer {
  display: flex;
  align-items: center;
}
.award-icon {
  margin-left: 4px;
  vertical-align: middle;
}

/* Row level styles */
.name-course,
td.row-course {
  color: #00bfff !important;
}
.name-course {
  font-weight: 500;
  font-size: 12px;
}
.name-unit,
td.row-unit {
  color: #e0e0e0 !important;
}
.name-unit {
  font-size: 10px;
}
td.row-lesson {
  padding-left: 20px;
}
/* .name-lesson,
td.row-lesson {
  color: #aaa !important;
} */
.name-lesson {
  font-size: 11px;
}
td.row-slide {
  padding-left: 28px;
}
.name-slide {
  font-size: 9px;
  color: #7f91a3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Course header */
.course-header-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.course-header {
  padding: 8px 12px 6px;
  border-bottom: 1px solid #1a2e45;
  max-width: 100vw;
  box-sizing: border-box;
  width: 100%;
  background: rgba(5, 10, 18, 0.95);
}
.progress-bar-wrap {
  background: #1a2e45;
  border-radius: 4px;
  height: 8px;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  background: #1d9e75;
  border-radius: 4px;
  transition: width 0.3s ease;
}
.progress-bar-label {
  flex-shrink: 0;
  width: 32px;
  text-align: right;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  line-height: 1;
}

@media (min-width: 768px) {
  .progressTable thead tr th {
    padding: 6px 8px;
  }
  .progressTable tbody td {
    font-size: 12px;
  }
  .progressTable {
    max-width: 100vw;
  }
  .name-course {
    font-size: 14px;
  }
  .name-unit {
    font-size: 12px;
  }
  .name-lesson {
    font-size: 14px;
  }
  .name-slide {
    font-size: 12px;
  }
}
</style>
