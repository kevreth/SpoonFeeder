<template>
  <div>
    <q-icon name="check" class="q-mr-sm" color="green" size="sm" />
    <span>{{ $t('savedCourse.saved') }} {{ savedCourse }}</span>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    savedCourse: {
      required: true,
    }
  })
</script>