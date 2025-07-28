<!-- <template>
  <div>
    <q-icon name="gamepad" class="q-mr-sm" color="green" size="sm" />
    <span>{{ $t('savedCourse.saved') }} {{ savedCourse }}</span>
  </div>
</template> -->

<template>
  <div>
    <q-icon name="gamepad" class="q-mr-sm" color="green" size="sm" />
    <span>
      {{ $t('savedCourse.saved') }}
      <template v-if="savedCourse">{{ savedCourse }}</template>
      <em style="font-weight: 100" v-else> {{ $t('savedCourse.none') }}</em>
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  savedCourse: {
    required: true,
  },
});
</script>
