<template>
  <div>
    <q-icon name="check" class="q-mr-sm" color="green" size="sm" />
    <span>Saved: {{ savedCourse }}</span>
  </div>
</template>

<script setup>
  defineProps({
    savedCourse: {
      required: true,
    }
  })

</script>