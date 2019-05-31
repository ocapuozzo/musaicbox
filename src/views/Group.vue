<template>
  <div class="group-action">
    <h2>Group & group action explorer </h2>
    <div class="d-flex flex-row">
      <div class="input-group group-dim ">
        <div class="input-group-prepend ">
          <label class="input-group-text " for="inputGroupSelect01"> N </label>
        </div>
        <select class="custom-select " id="inputGroupSelect01" @change="onChangeN($event)" v-model="n">
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="12" selected>12</option>
        </select>
      </div>
      <div class="pl-2">
        <fieldset class="representation-border ">
          <legend class="representation-border">Generator group operations</legend>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
            <label class="form-check-label" for="inlineCheckbox1">1</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
            <label class="form-check-label" for="inlineCheckbox2">2</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" disabled>
            <label class="form-check-label" for="inlineCheckbox3">3 (disabled)</label>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="p-2">
      <fieldset class="representation-border p-2">
        <legend class="representation-border">Orbits results</legend>
        <clock _ipcs="[0,4,7,10]" class="m-1 clock-pcs"/>
        <clock _ipcs="[0,3,6,9]" class="m-1 clock-pcs"/>
        <clock _ipcs="[0,1,2,3]" class="m-1 clock-pcs"/>
        <clock _ipcs="[0,1,2,8]" class="m-1 clock-pcs"/>
        <clock class="m-1 clock-pcs"/>
      </fieldset>
    </div>
  </div>
</template>

<script>
  import Clock from "../components/Clock";

  export default {
    data() {
      return {
        n: 12
      }
    },
    methods: {
      onChangeN(event) {
        // console.log(event.target.value)
        console.log(this.n)
      }
    },
    components: {
      Clock
    }
  }
</script>

<style scoped>
  .group-dim {
    margin-top: 12px;
    max-width: 100px;
    max-height: 38px;
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

  .clock-pcs {
    width: 50px;
    height: 50px;
    min-width: 40px;
    min-height: 40px;
  }

</style>
