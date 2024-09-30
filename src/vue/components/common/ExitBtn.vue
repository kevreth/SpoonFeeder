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
  background-color: #0078d4;
  border: none;
  padding: 10px 20px;
  color: white;
  text-transform: uppercase;
  box-shadow: 0 0 5px #00ffea;
  cursor: pointer;
  transition: all 0.3s ease;

  /* background: linear-gradient(145deg, #ff470f, #ff6b3d);
  border: none;
  box-shadow: 0 4px #ff3300;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: linear-gradient(145deg, #ff3d00, #ff5436);
    box-shadow: 0 6px #cc2900;
    transform: translateY(-2px);
  }*/
}
.hightlight-btn:hover {
  background-color: #005fa3 !important;
}
</style>
