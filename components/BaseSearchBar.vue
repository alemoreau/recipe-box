<template>
  <div
    class="bar"
    :style="
      `background: ${bkColor}; margin-top: ${modifiedMargin ? '-40px' : '0'};`
    "
  >
    <label for="searchbar"
      >Rechercher<span class="hide-mobile"> une recette</span></label
    >
    <base-search-input />
  </div>
</template>

<script>
export default {
  props: {
    bkColor: {
      type: String,
      default: "white"
    },
    modifiedMargin: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped>
.bar {
  max-width: 1100px;
  padding: 30px 50px;
  display: table;
  margin: 0 auto;
  z-index: 100;
  position: relative;
  box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.1);
  display: flex;
}

label {
  margin-right: 20px;
  font-family: "Quarto A", "Quarto B";
  font-size: 21px;
  font-style: normal;
  font-weight: 400;
}

@media only screen and (max-width: 750px) {
  .hide-mobile {
    display: none;
  }
}
</style>
