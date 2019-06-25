<!--
  - Copyright (c) 2019. Olivier Capuozzo
  -->

<template>
  <div class="hello">
    <h3>(404) Page Not Found</h3>
    <router-link :to="{name: 'home'}">Go to home</router-link>
    <h3> </h3>
  </div>
</template>

<script>
  export default {};
</script>

<style scoped>
  
 h3 {
   margin-bottom: 2rem;
 }
</style>