<template>
  <q-icon name="info" size="medium" class="infoIcon" />
</template>

<style>
.infoIcon {
  position: fixed;
  margin-left: auto;
  top: 10vw;
  padding-right: 9px;
  width: 20px;
  right: 0;
  z-index: 1;
  cursor: pointer;
}
@media (min-width: 768px) {
  .infoIcon {
    top: 2.5em;
    padding-right: 16px;
  }
}
</style>
