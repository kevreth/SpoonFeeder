<template>
  <!-- <div class="fullscreen row justify-evenly items-center" > -->
    <div class="overlayColor">
      <q-icon
        round
        class="closeBtn text-red overlayColor"
        max-size="2em"
        name="close"
      />
    </div>
<!-- </div> -->
</template>

<style>
  .closeBtn {
  /* position:absolute;  */
  /* background: blue;
  position: fixed;
  top: 10%;
  right: 10%; */
  cursor:pointer; 
}
.overlayColor {
  position: inline-block;
  /* background-color: #3a3a3a; */
  /* opacity: 0.6; */
  /* width: 70%; */
  /* bottom: 10%;  */
  /* left: 20%; */
  /* border-radius: 20px; */
  /* top: -25px; */
  /* margin-left: 20px; */
}
</style>