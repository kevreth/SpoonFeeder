<template>
  <q-icon
    name="info"
    class="explainIcon"
  /> 
</template>

<style>
.explainIcon {
  position: fixed;
  top: 30px;
  right: 17vw;
  cursor: pointer;
  font-size: 3vw;
}
@media screen and (min-width: 1200px) {
  .explainIcon {
    font-size: 2vw;
    right: 12vw;
  }
}
.explainIcon:hover {
  transform: scale(1.4);
} 
</style>