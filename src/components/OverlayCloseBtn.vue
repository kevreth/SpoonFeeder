<template>
  <div class="fullscreen row justify-evenly items-center" >
    <div class="overlayColor">
      <q-icon
        class="closeBtn z-top text-red"
        size="2em"
        name="close"
      />
    </div>
</div>
</template>

<style>
  .closeBtn {
  position:absolute; 
  top:0; 
  right:0; 
  cursor:pointer;
}
.overlayColor {
  position: fixed;
  background-color: #3a3a3a;
  opacity: 0.6;
  width: 70%;
  top: 10%;
  bottom: 10%; 
  left: 15%;
  border-radius: 20px;
}
</style>