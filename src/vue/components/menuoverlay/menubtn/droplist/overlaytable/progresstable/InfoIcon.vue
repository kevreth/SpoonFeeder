<template>
  <q-icon
    name="info"
    size="medium"
    class="infoIcon"
  /> 
</template>

<style>
.infoIcon {
  position: fixed;
  margin-left: auto;
  top: 5vw;
  width: 20px;
  right: 0;
  padding-right: 16px;
  z-index: 2;
  cursor: pointer;
}
@media screen and (min-width: 1200px) {
  .infoIcon {
    top: 3vw;
  }
}
</style>