<template>
  <!-- <div class="overlay">
    <a href="#" @click="closeOverlay" class="closeOverlay">X</a>
  </div> -->
<div>
  <q-btn class="overlay z-top">
    <q-icon
      name="close"
      color="negative"
      style="position:absolute; top:0; right:0"
      class="q-mr-xs q-mt-xs q-p-none"
      size="42px"
      @click="closeOverlay" 
    />
  </q-btn>
  <StartOver />

</div>
  
  <!-- <q-btn class="overlay z-top">
    <q-btn
      text-color="negative"
      style="position:absolute;top:0;right:0"
      @click="closeOverlay"
      flat
      class="closeOverlay q-mr-xs q-mt-xs q-p-none"
      size="36px"
      expand-icon="0"
      icon="close"/>
  </q-btn> -->

</template>

<script>
import StartOver from '../components/StartOver.vue';

export default {
  name: 'HamburgerOverlay',
  components: { StartOver },
  emits: ['close'],
  methods: {
    closeOverlay() {
      this.$emit('close');
    },
  },
};
</script>

<style>
.overlay {
  position: fixed;
  width: 70%;
  height: 70%;
  top: 17%;
  right: 15%;
  margin: 5px;
  background: #3a3a3a;
  opacity: 0.5;
  border-radius: 20px;
  box-shadow: 2px 5px 10px rgba(241, 225, 225, 0.3);
}
/* .blury {
  filter: blur(10px);
}
a {
  text-decoration: none;
}
.closeOverlay {
  color: rgb(253, 78, 78);
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 8px;
  margin: 5px 10px 0 0;
  transition: 0.3s;
  font-size: 56px;
}
.overlay a:hover,
.overlay a:focus {
  color: red;
} */
q-btn:hover {
  display:block;
}
</style>
