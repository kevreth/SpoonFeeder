<template>
  <q-overlay v-model="settingOverlay" :z-index="5000" @click.stop="">
    <template #body>
      <q-menu class="langOptions">
        <q-list style="min-width: 100px">
          <q-item v-model="locale" @click="locale=language.value" clickable v-close-popup v-for="language in languages" :key="language.value" style="position: relative; z-index: 1;">
            <q-item-section>{{ language.label}}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </template>
  </q-overlay>
</template>