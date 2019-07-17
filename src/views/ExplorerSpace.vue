<!--
  - Copyright (c) 2019. Olivier Capuozzo
  -->

<template>
  <div class="board-explorer">
    <MovableClock :size="120"></MovableClock>
  </div>
</template>
<script>
  import MovableClock from "../components/MovableClock";

  export default {
    components: {
      MovableClock,
    }
  }
</script>

<style scoped>
.board-explorer {
  background-color: white;
  height: 100%;
  width: 100%;
  border: 1px solid red;
  position: relative;
}
</style>
