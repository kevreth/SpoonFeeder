<template>
  <div id="savedCourse" class="savedCourse">
    <q-icon name="check" class="q-mr-sm" color="green" size="sm" />
    <span>Saved: {{ savedCourse }}</span>
  </div>
</template>

<script setup>
  const props = defineProps({
    savedCourse: {
      type: String,
      required: true,
    }
  })

</script>