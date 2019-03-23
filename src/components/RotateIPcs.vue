<template>
  <div class="panel-navigate">
    <span v-on:click="module(-1, $event)">
      -M
      <span>&nbsp;</span>
      <span v-on:click="module(1, $event)">M+</span>
    </span>
    
    <span v-on:click="transpose(-1, $event)">
      -T
      <span>&nbsp;</span>
      <span v-on:click="transpose(1, $event)">T+</span>
    </span>
  </div>
</template>

<script>

export default {
  name: "RotateIPcs",

  mounted() {

  },
  computed: {
    ipcs: {
      get() {
        return this.$store.state.ipcs.ipcs
      },
      set(value) {
        this.$store.commit('ipcs/update', value);
      }
    },
  },
  methods: {
    transpose(t, e) {
      e.stopPropagation();
      console.log("transpose : " + t)
    },
    module(t, e) {
      e.stopPropagation();
      console.log("module : " + t)
    }
  }
}
</script>

<style scoped>
.panel-navigate {
  display: flex;
  justify-content: space-between;
}
</style>
