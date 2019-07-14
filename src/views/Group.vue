<template>
  <div class="group-action">
    <h2>Group & group action explorer <span v-show="waitingCompute" class="btn status">
      <span class="spinner-border spinner-border-sm status" role="status" aria-hidden="true"></span>
      Working... </span></h2>
    <div class="d-flex flex-row">
      <div class="input-group group-dim ">
        <div class="input-group-prepend ">
          <label class="input-group-text " for="inputGroupSelect01"> N </label>
        </div>
        <select class="custom-select " id="inputGroupSelect01" @change="onChangeN()" v-model="n">
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
                     @change="buildAllOperationsOfGroup()">
              <label class="form-check-label">M{{generator}}</label>
            </div>
          </fieldset>
          <fieldset class="representation-border ">
            <legend class="representation-border">Transposition</legend>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" v-model="opTransChoices" :value="0" disabled>
              <label class="form-check-label">T0</label>
            </div>
            <div v-if="opComplement || opTransChoices.find(op => op===1)" class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" v-model="opTransChoices" :value="1"
                     :disabled="opComplement" @change="buildAllOperationsOfGroup()">
              <label class="form-check-label">T1</label>
            </div>
            <div v-else v-for="(t, index) in Math.ceil(n/2)" :key="index" class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" v-model="opTransChoices" :value="t"
                     @change="buildAllOperationsOfGroup()">
              <label class="form-check-label">T{{t}}</label>
            </div>
          </fieldset>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="opComplement" :value="false"
                   @change="buildAllOperationsOfGroup()">
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
          <!--          <div class="operation">{{operation}}</div>-->
          <div class="form-check operation">
<!--            <input class="form-check-input" type="checkbox" @change="checkComplementedOp" :value="false">-->
            <label class="form-check-label">{{operation}}</label>
          </div>
        </div>
      </fieldset>
    </div>
    <div class="p-2">
      <button type="button" class="btn btn-primary m-2"
              @click="showOrbits('MotifStabilizer')" :disabled="opTranspositionChoicesHasAtLeastOneValuePrimeWithN() ? false : true" >
        Show orbits ({{this.preReactOrbits.length}}) by IS-Motif stabilizers <span v-if="actionOfGroup"> ({{actionOfGroup.orbitsSortedByMotifStabilizers.length}})</span>
      </button>
      <button type="button" class="btn btn-primary" @click="showOrbits('Stabilizer')">
        Show orbits ({{this.preReactOrbits.length}}) decomposed by stabilizers
        <span v-if="actionOfGroup"> ({{actionOfGroup.orbitsSortedByStabilizers.length}}) for {{actionOfGroup.cardinalOfOrbitStabilized()}} fixed sets</span>
      </button>
    </div>

    <div class="p-2">
      <fieldset class="representation-border p-2 ">
        <legend class="representation-border">Orbits results 
           <span v-if="actionOfGroup">{{this.preReactOrbits.length}} {{showOrbitBy}} </span> 
           <span v-else>(no computed)</span></legend>
           <Orbit v-for="(orbitsGroup) in orbitsPartitions" :key="orbitsGroup.hashcode" :orbitsGroup="orbitsGroup"> </Orbit>
      </fieldset>
    </div>

    <div class="p-2">
      <fieldset class="representation-border p-2 ">
        <legend class="representation-border">Debug </legend>
        <div><span>ops Multiplication selected : {{ opMultChoices }}</span></div>
        <div><span>ops Transposition selected : {{ opTransChoices }}</span></div>
        <div><span>ops Complement : {{ opComplement }}</span></div>
        <div><span>cardinal powerset : <span v-if="actionOfGroup"> {{actionOfGroup.powerset.size}}</span></span></div>
        <div><span>nb Orbits : {{ preReactOrbits.length}} </span></div>
        <div><span>nb Stabilizers is-motif classes : <span v-if="actionOfGroup"> ({{actionOfGroup.orbitsSortedByMotifStabilizers.length}})</span></span></div>
        <div><span>nb Stabilizers classes : <span v-if="actionOfGroup"> ({{actionOfGroup.orbitsSortedByStabilizers.length}})</span></span></div>
      </fieldset>
    </div>
  </div>
</template>

<script>
  import Clock from "../components/Clock";
  import Orbit from "../components/Orbit";
  import Group from "../models/Group";
  import MusaicPcsOperation from "../models/MusaicPcsOperation";
  import MusaicActionGroup from "../models/MusaicActionGroup";

  export default {
    data() {
      return {
        n: 12,
        primesWithN: [1, 5, 7, 11],
        opMultChoices: [1],
        opTransChoices: [0],
        opComplement: false,
        // array with neutral operation
        groupOperations: [new MusaicPcsOperation(this.n, 1, 0)],
        actionOfGroup: null,
        orbitsPartitions: [],
        preReactOrbits: [],
        waitingCompute: false,
        stabilizers: [],
        showOrbitBy : "", // for UI
        debug : false
      }
    },
    mounted() {
      //this.onChangeN()
    },
    methods: {
      doubleRaf(callback) {
        requestAnimationFrame(() => {
          requestAnimationFrame(callback)
        })
      },
      checkComplementedOp() {
        if (this.opComplement && !this.opTransChoices.find(t => t === 1)) {
          this.opTransChoices.push(1)
        }
      },
      onChangeN() {
        this.primesWithN = Group.phiEulerElements(this.n);
        this.opMultChoices = [1];
        this.opTransChoices = [0, 1];
        this.actionOfGroup = null;
        this.ororbitsPartitions = []
        this.preReactOrbits = []
        this.stabilizers = []
        this.buildAllOperationsOfGroup();
      },
      /**
       * Get all operations group from user choices
       *
       */
      buildAllOperationsOfGroup() {
        if (this.waitingCompute) return

        this.waitingCompute = true
        // see https://github.com/vuejs/vue/issues/9200
        this.doubleRaf(() => {
          let local_groupOperations = Group.buildOperationsGroupByCaylayTable(this.getGeneratedSetOperationsFromUI());
          let start = 0
          if (this.debug) {
            start = new Date().getTime();
          }
          let local_group = new MusaicActionGroup({n: this.n, someMusaicOperations: local_groupOperations});
          if (this.debug) {
            let end = new Date().getTime()
            let diff = end - start;
            console.log("duration : " + String(diff / 1000) + " secondes")
          }
          this.groupOperations = local_groupOperations;
          this.actionOfGroup = local_group
          this.preReactOrbits = this.actionOfGroup.orbits
          this.orbitsPartitions = []
          this.stabilizers = []
          this.$nextTick(() => {
            this.waitingCompute = false
          })
        });
        //
      },
      showOrbits(byWhatStabilizer = "MotifStabilizer") {
        if (! this.actionOfGroup) {
          this.buildAllOperationsOfGroup()
        } else {
          this.waitingCompute = true
          // see https://github.com/vuejs/vue/issues/9200
          this.doubleRaf(() => {
            //this.stabilizers = this.actionOfGroup.stabilizers
            //this.fixedPcsInPrimeForms = this.actionOfGroup.stabilizers.fixedPcsInPrimeForm()
            if (byWhatStabilizer === "MotifStabilizer") {
              this.orbitsPartitions = this.actionOfGroup.orbitsSortedByMotifStabilizers
              this.showOrbitBy = "by motif stabilizer"
            } else { //if (byWhichStabilizer === "Stabilizer")
              this.orbitsPartitions = this.actionOfGroup.orbitsSortedByStabilizers
              this.showOrbitBy = "by stabilizer"
            }
            this.$nextTick(() => this.waitingCompute = false)
          })
        }
      },
      /**
       * @return {boolean} true iif one value of opTransChoices is prime with n
       */
      opTranspositionChoicesHasAtLeastOneValuePrimeWithN(){        
        return this.opTransChoices.some(t => (t===1) ||  (t > 0) && (this.n % t) !== 0) 
      },
      /**
       * Get generated set operations of group, as selected by user
       * @return {Array} array of MusaicPcsOperation
       */
      getGeneratedSetOperationsFromUI() {
        let someOperations = [];

        // add complemented operation to neutral op if complement operation is selected
        if (this.opComplement === true) {
          someOperations.push(new MusaicPcsOperation(this.n, 1, 0, true))
          this.opTransChoices = [0, 1]
        }
        // include neutral operation (constant pre-selected in UI)
        for (let i = 0; i < this.opMultChoices.length; i++)
          for (let j = 0; j < this.opTransChoices.length; j++) {
            someOperations.push(new MusaicPcsOperation(this.n, this.opMultChoices[i], this.opTransChoices[j]))
          }
        return someOperations
      }
    },
    components: {
      /*Clock,*/ Orbit
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

  .status {
    font-size: 0.5em !important;
    font-weight: bold !important;
    font-style: italic;
    text-align: left !important;
    width: auto;
    height: 1.5rem;
    padding: 0 10px;
    border-bottom: none;
    color: red;
  }

  .label-ipcs {
    font-size: 0.7em !important;
  }

</style>
