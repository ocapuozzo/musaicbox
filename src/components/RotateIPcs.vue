<template>
  <div class="panel-navigate">
    <span v-on:click="module(2, $event)" class="actionable">
      -M
      <span>&nbsp;</span>
      <span v-on:click="module(1, $event)" class="actionable">M+</span>
    </span>
    
    <span v-on:click="transpose(-1, $event)" class="actionable">
      -T
      <span>&nbsp;</span>
      <span v-on:click="transpose(1, $event)" class="actionable"> T+</span>
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
      this.$store.commit('ipcs/transpose', t);
      this.$root.$emit('onsetpcs');      
    },
    module(direction, e) {
      e.stopPropagation();
      this.$store.commit('ipcs/modulate', direction);
      this.$root.$emit('onsetpcs');      
    }
  }
}
</script>

<style scoped>
.panel-navigate {
  display: flex;
  justify-content: space-between;
}
.actionable {
  cursor: pointer;
}

</style>
