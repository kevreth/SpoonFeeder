<template>
  <q-icon name="info" class="explainIcon" />
</template>

<style>
.explainIcon {
  position: fixed;
  cursor: pointer;
  top: 29px;
  right: 26vw;
  font-size: 5.5vw;
  z-index: -1;
}
@media (min-width: 768px) {
  .explainIcon {
    top: 30px;
    right: 12vw;
    font-size: 2vw;
  }
}
.explainIcon:hover {
  transform: scale(1.4);
}
</style>
