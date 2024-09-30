<template>
  <q-icon name="info" class="explainIcon" />
</template>

<style>
.explainIcon {
  position: fixed;
  /* top: 30px; */
  /* right: 15vw; */
  cursor: pointer;
  /* font-size: 2.5vw; */

  top: 29px;
  right: 26vw;
  font-size: 5.5vw;
}
@media (min-width: 768px) {
  .explainIcon {
    /* font-size: 1.5vw;
    right: 13vw; */
    /* top: 50px; */
    top: 30px;
    right: 12vw;
    font-size: 2vw;
  }
}
.explainIcon:hover {
  transform: scale(1.4);
}
</style>
