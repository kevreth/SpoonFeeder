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
  right: 15vw;
  cursor: pointer;
  font-size: 3vw;
}
@media screen and (min-width: 1200px) {
  .explainIcon {
    font-size: 2vw;
    right: 8vw;
  }
}
.explainIcon:hover {
  transform: scale(1.4);
} 
</style>