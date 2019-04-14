<template>
  <div class="panel-navigate">

    <span v-on:click="module(2, $event)">
      <img
          src="img/t-.png"
          title="modulate"
          alt="modulate"
          class="actionable rotate-left img-fluid"
          width="33"
          height="41">
      <span>&nbsp;M&nbsp;</span>
      <span v-on:click="module(1, $event)">
        <img
            src="img/t+.png"
            title="modulate"
            alt="modulate"
            class="actionable rotate-right img-fluid"
            width="33"
            height="41"
        >
        </span>
    </span>

    <span v-on:click="transpose(-1, $event)">
      <img
          src="img/t-.png"
          title="transpose"
          alt="transpose"
          class="actionable rotate-left img-fluid"
          width="33"
          height="41">
      <span>&nbsp;T&nbsp;</span>
      <span v-on:click="transpose(1, $event)">
        <img
            src="img/t+.png"
            title="transpose"
            alt="transpose"
            class="actionable rotate-right img-fluid"
            width="33"
            height="41"
        >
      </span>
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

  .rotate-left:hover {
    animation-duration: 0.3s;
    animation-name: anim-left;
    transform:  rotate(-25deg);
  }

  .rotate-right:hover {
    animation-duration: 0.3s;
    animation-name: anim-right;
    transform:  rotate(25deg);
  }

  @keyframes anim-right {
    0% {
      transform: scale(.9) ;
    }
    50% {
      transform: scale(.95) rotate(5deg);
    }
  }

  @keyframes anim-left {
    0% {
      transform: scale(.9) ;
    }
    50% {
      transform: scale(.95) rotate(-5deg);
    }
  }


</style>
