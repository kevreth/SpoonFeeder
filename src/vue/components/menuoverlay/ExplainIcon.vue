<template>
  <q-icon name="info" class="explainIcon" />
</template>

<style>
.explainIcon {
  position: fixed;
  top: 30px;
  right: 15vw;
  cursor: pointer;
  font-size: 2.5vw;
}
@media screen and (min-width: 1200px) {
  .explainIcon {
    font-size: 1.5vw;
    right: 13vw;
    /* top: 50px; */
  }
}
.explainIcon:hover {
  transform: scale(1.4);
}
</style>
