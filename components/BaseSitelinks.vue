<template>
  <ul class="site-links">
    <li>
      <nuxt-link to="/about">About</nuxt-link>
    </li>
    <li>
      <a href="https://github.com/sdras/recipe-box" target="_blank">Repo</a>
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style scoped>
a,
a:visited,
a:active {
  text-decoration: none;
  color: white;
}

ul.site-links {
  float: right;
  padding-left: 0;
}

.site-links li {
  display: inline-block;
  padding-right: 15px;
}

.site-links li:last-child {
  padding-right: 5px;
}
</style>
