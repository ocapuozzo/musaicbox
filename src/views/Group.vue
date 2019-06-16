<template>
  <div class="group-action">
    <h2>Group & group action explorer </h2>
    <div class="d-flex flex-row">
      <div class="input-group group-dim ">
        <div class="input-group-prepend ">
          <label class="input-group-text " for="inputGroupSelect01"> N </label>
        </div>
        <select class="custom-select " id="inputGroupSelect01" @change="onChangeN($event)" v-model="n">
          <option v-for="index in [3,4,5,6,7,8,9,10,11]" :key="index">
            {{index}}
          </option>
          <option value="12" selected>12</option>
        </select>
      </div>
      <div class="pl-2">
        <fieldset class="representation-border ">
          <legend class="representation-border">Generator group operations</legend>
          <fieldset class="representation-border ">
            <legend class="representation-border">Multiplication</legend>
            <div v-for="(generator, index) in primesWithN" :key="index" class="form-check form-check-inline">
              <input v-if="generator ===1" class="form-check-input" type="checkbox" v-model="opMultChoices"
                     :value="generator" disabled>
              <input v-else class="form-check-input" type="checkbox" v-model="opMultChoices" :value="generator"
                     @change="buildAllOperationsOfGroup(opMultChoices)">
              <label class="form-check-label">M{{generator}}</label>
            </div>
          </fieldset>
          <fieldset class="representation-border ">
            <legend class="representation-border">Translation</legend>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" v-model="opTransChoices" :value="0" disabled>
              <label class="form-check-label">T0</label>
            </div>
            <div v-for="(t, index) in Math.ceil(n/2)" :key="index" class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" v-model="opTransChoices" :value="t"
                     @change="buildAllOperationsOfGroup(opTransChoices)">
              <label class="form-check-label">T{{t}}</label>
            </div>
          </fieldset>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="opComplement" :value="false"
                   @change="buildAllOperationsOfGroup(opComplement)">
            <label class="form-check-label">Complement</label>
          </div>
        </fieldset>
      </div>
      <div class="pl-2">

      </div>
    </div>

    <div class="p-2">
      <fieldset class="representation-border p-2">
        <legend class="representation-border">Group operations ({{ groupOperations.length }})</legend>
        <div v-for="(operation, index) in groupOperations" :key="index" class="form-check form-check-inline">
          <div class="operation">{{operation}}</div>
        </div>
      </fieldset>
    </div>
    <div class="p-2">
      <fieldset class="representation-border p-2">
        <legend class="representation-border">Orbits results</legend>
        <div><span>ops Multiplication selected : {{ opMultChoices }}</span></div>
        <div><span>ops Transposition selected : {{ opTransChoices }}</span></div>
        <div><span>ops Complement : {{ opComplement }}</span></div>
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
  import Group from "../models/Group";
  import MusaicPcsOperation from "../models/MusaicPcsOperation";

  export default {
    data() {
      return {
        n: 12,
        primesWithN: [1, 5, 7, 11],
        opMultChoices: [1],
        opTransChoices: [0],
        opComplement: false,
        // array with neutral operation
        groupOperations: [new MusaicPcsOperation(this.n, 1, 0)]
      }
    },
    methods: {
      onChangeN(event) {
        // console.log(event.target.value) == this.n (v-model)
        this.primesWithN = Group.phiEulerElements(this.n);
        this.opMultChoices = [1];
        this.opTransChoices = [0];
        this.groupOperations = [];
        this.buildAllOperationsOfGroup();
      },
      /**
       * Get all operations group from user choices
       * @param source type of choice (multiplication, translation or complement)
       */
      buildAllOperationsOfGroup(source) {
        this.groupOperations = [];
        this.groupOperations = Group.operationsGroupGenerator(this.buildOperationsFromUI());
      },
      /**
       * Get generated operations of group, as selected by user
       * @return {Array} array of MusaicPcsOperation
       */
      buildOperationsFromUI() {
        let someOperations = []; // [new MusaicPcsOperation(this.n, 1, 0)];
        // add neutral complemented operation if waiting
        if (this.opComplement === true) {
          someOperations.push(new MusaicPcsOperation(this.n, 1, 0, true))
        }

        for (let i = 0; i < this.opMultChoices.length; i++)
          for (let j = 0; j < this.opTransChoices.length; j++) {
            someOperations.push(new MusaicPcsOperation(this.n, this.opMultChoices[i], this.opTransChoices[j]))
          }
        return someOperations
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
  .operation {
    display: inline-flex;
    background-color: #6d7fcc;
    min-width: 5rem;
    margin-bottom: 2px;
    margin-left: 1px;
    padding-left: 2px;
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
