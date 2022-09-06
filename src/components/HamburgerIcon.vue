<template>
    <img src="../svg/hamburger.svg" id="hamburger" class="hamburgerIcon" alt="Hamburger Icon"/>
</template>

<script></script>

<style>
.hamburgerIcon {
  border: none;
  padding: 5px 15px;
  position: fixed;
  top: 20px;
  right: 25px;
  transition: transform 0.3s ease-in-out;
  max-width: 150px;
  width: 15%;
  cursor: pointer;
}
@-moz-document url-prefix() {
  .hamburgerIcon {
    max-width: 250px;
  }
}
</style>
