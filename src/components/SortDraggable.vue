<template>
  <div class="sortContainer">
    <p>sort</p>

    <draggable
      :list="list"
      :disabled="!enabled"
      item-key="name"
      v-bind="dragOptions"
      class="dropArea"
    >

      <template #item="{ element }">
        <div class="sortable">
          {{ element.name }}
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'

const enabled = ref(true)
const list = ref([
  { name: 'a', id: 0 },
  { name: 'b', id: 1 },
  { name: 'c', id: 2 },
  { name: 'd', id: 3 }
])
const dragOptions = ref({
  ghostClass: 'ghost',
  dragClass: 'drag',
  forceFallback: true,
  fallbackClass: 'dragged-item',
  animation: 500
})
</script>

<style>
.dragged-item {
  opacity: 0 !important;
}
.isSelected {
  opacity: 1 !important;
}
.ghost {
  scale: 1.1;
}
.sortContainer {
  width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.sortContainer p {
  text-align: center;
}
.sortable {
  justify-content: center;
  align-items: center;
  display: inline-flex;
  background: #141E30;
  border: solid 2px white;
  height: 90px;
  width: 100%;
  margin: 5px 0;
  color: white;
  user-select: none;
  cursor: default;
}
</style>
