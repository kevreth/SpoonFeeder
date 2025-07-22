<!-- eslint-disable vue/no-parsing-error -->
<template>
  <q-btn
    id="btn_exit"
    :label="$t('exitBtn.exit')"
    class="q-mb-sm q-mr-xs highlight-btn"
    style="font-weight: bold"
  />
</template>

<style>
.highlight-btn {
  /* background-color: #0078d4; */
  border: none;
  padding: 10px 20px;
  /* color: white; */
  text-transform: uppercase;
  box-shadow: 0 0 5px #0ff;
  cursor: pointer;
  transition: all 0.3s ease;
}
.highlight-btn:hover {
  background-color: #005fa3 !important;
}
</style>
