<template>
  <q-hierarchy
    class="hierarchy "      
    dense
    :columns="columns"
    :data="data"
    :classes="classes"
    :dark="dark" :default-expand-all="default_expand_all = true">    
  </q-hierarchy>
</template>

<script setup>
import { ref } from 'vue'

const columns = ref([
  {
    name: 'label',
    label: 'Label',
    align: 'left',
    field: 'label',
    // (optional) tell QHierarchy you want this column sortable
    sortable: true
  },
  {
    name: 'Description',
    label: 'Description',
    sortable: true,
    field: 'description',
    align: 'center'
  },
  {
    name: 'note',
    label: 'Note',
    sortable: true,
    field: 'note',
    align: 'left'
  }
])
const data = ref([
  {
    label: 'Node 1',
    description: 'Node 1 description data',
    note: 'Node 1 note',
    // id: 1,
    children: [
      {
        label: 'Node 1.1',
        description: 'Node 1.1 description',
        note: 'Node 1.1 note'
        // id: 2
      },
      {
        label: 'Node 1.2',
        description: 'Node 1.2 description',
        note: 'Node 1.2 note',
        // id: 3,
        children: [
          {
            label: 'Node 1.2.1',
            description: 'Node 1.2.1 description',
            note: 'Node 1.2.1 note'
            // id: 4
          },
          {
            label: 'Node 1.2.2',
            description: 'Node 1.2.2 description',
            note: 'Node 1.2.2 note'
            // id: 5
          }
        ]
      }
    ]
  },
  {
    label: 'Node 2',
    description: 'Node 2 description',
    note: 'Node 2 note',
    // id: 6,
    children: [
      {
        label: 'Node 2.1',
        description: 'Node 2.1 description',
        note: 'Node 2.1 note',
        // id: 7,
        children: [
          {
            label: 'Node 2.1.1',
            description: 'Node 2.1.1 description',
            note: 'Node 2.1.1 note'
            // id: 8
          },
          {
            label: 'Node 2.1.2',
            description: 'Node 2.1.2 description',
            note: 'Node 2.1.2 note'
            // id: 9
          }
        ]
      },
      {
        label: 'Node 2.2',
        description: 'Node 2.2 description',
        note: 'Node 2.2 note'
        // id: 10
      }
    ]
  }
])

const classes = ref('bg-secondary')
const dark = ref(true)

</script>

<style>
  .hierarchy {
    display: inline-block;
    max-height: 100vh; 
    overflow:auto;
    --scrollbarBG: #CFD8DC;
    --thumbBG: #686a6c;
    /* width: 85%; */
  /* height: 60%; */
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
    background-color: var(--thumbBG) ;
  }
</style>