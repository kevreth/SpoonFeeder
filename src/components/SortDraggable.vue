<template>
  <div class="sortContainer">
    <p>sort</p>     

    <draggable
      :list="list"
      :disabled="!enabled"
      item-key="name"
      class="list-group"
      ghost-class="ghost"
      :animation="100"
    >
      <template #item="{ element }">
        <li>
          <div class="list-group-item">
            {{ element.name }}
          </div>
        </li>
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
</script>

<style>
.list-group-item, .ghost {
  justify-content: center;
  align-items: center;
  display: inline-flex;
  background: #141E30;
  border: solid 2px white;
}
.ghost > div {
  visibility:hidden;
}
.sortContainer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.list-group {
  width: 500px;
  display: inline-block;
}
.list-group-item {  
  cursor: move;
  height: 90px;
  width: 500px;
  margin: 8px;
  color: white;
}
li {
  list-style: none;
}
</style>
