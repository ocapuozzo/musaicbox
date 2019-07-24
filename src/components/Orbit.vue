<template>
  <fieldset class="representation-border p-2 text-center">
    <legend class="representation-border">
      {{orbitsGroup.stabilizerName}} ({{orbitsGroup.orbits.length}})&nbsp;
      <button v-if="orbitsGroup.orbits[0].getPcsMin().n === 12" type="button" @click="changeViewIPcs" class="toggle"
              aria-pressed="false">
        {{textButtonViewMusaicClock}}
      </button>
    </legend>
    <div class="d-inline-block text-center" v-for="(orbit) in orbitsGroup.orbits" :key="orbit.getPcsMin().id">

      <Musaic v-if="!viewClock"
              :_ipcs="{strPcs:orbit.getPcsMin().pcsStr, n:orbit.getPcsMin().n}" class="clock-pcs m-1">
      </Musaic>

      <Clock v-if="viewClock"
             :_ipcs="{strPcs:orbit.getPcsMin().pcsStr, n:orbit.getPcsMin().n}" class="clock-pcs m-1">
      </Clock>

      <p class="text-center label-ipcs">#{{orbit.ipcsset.length}}</p>
    </div>
  </fieldset>
</template>

<script>
  import Clock from "../components/Clock";
  import Musaic from "../components/Musaic";

  export default {
    name: "Orbit",
    props: {
      orbitsGroup: null,
    },
    data() {
      return {
        viewClock: true,
        textButtonViewMusaicClock : "View Musaic"
      }
    },
    mounted() {
    },
    computed: {},
    methods: {
      changeViewIPcs(elt) {
        this.viewClock = !this.viewClock;
        this.textButtonViewMusaicClock = this.viewClock  ? "View Musaic" : "View Clock"
      }
    },
    components: {
      Clock,
      Musaic
    }
  }
</script>

<style scoped>

  .clock-pcs {
    width: 50px;
    height: 50px;
    min-width: 40px;
    min-height: 40px;
  }

  .label-ipcs {
    font-size: 0.7em !important;
  }

  fieldset.representation-border {
    display: inline;
    border: 1px groove #ddd !important;
    padding: 0 1.4em 0.5em 1em !important;
    margin: 0 1em 1.5em 0 !important;
    -webkit-box-shadow: 0px 0px 0px 0px #000;
    box-shadow: 0px 0px 0px 0px #000;
  }

  legend.representation-border {
    font-size: 1em !important;
    font-weight: bold !important;
    font-style: italic;
    text-align: left !important;
    width: auto;
    padding: 0 10px;
    border-bottom: none;
  }

  .toggle {
    font-size: 0.5rem !important;
    border: 1px groove #ddd !important;
    border-radius: 50%;
  }

  button:focus {
    outline: none;
  }

</style>
