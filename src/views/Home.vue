<template>
  <div class_="container bg-white">
    <div class="row mr-1">
      <div class="p-2 shadow mb-5 bg-white rounded col" style="max-width:300px;">
        <h5 class="text-center title-detail pb-2">Musaic</h5>
        <div class="container ml-4">
          <Musaic style="width: 200px; height: 350px;" _pcs="[1,0,0,1,0,0,0,1,0,0,0,0]"></Musaic>
        </div>
      </div>
      <div
          class="p-2 ml-2 shadow mb-5 bg-white rounded col"
          style="max-width:280px;min-width:280px;"
      >
        <h5 class="text-center title-detail pb-2">iPCS</h5>
        <div class="container">
          <div class="row">
            <div class="col-sm text-left">
              <WrapCanvas id="ccanvas" class="clockpcs ml-3" style="width: 200px; height: 200px;">
                <ISClock color="white"></ISClock>
              </WrapCanvas>
              <MusicNotation :_ipcs="ipcs" class="ml-2"/>
              <RotateIPcs/>
            </div>
          </div>
        </div>
      </div>

      <div class="p-2 ml-2 shadow mb-5 bg-white rounded col" style="min-width:350px;">
        <h5 class="text-center title-detail pb-2">Analysis</h5>
        <div class="container" style="height:70%">
          <div class="row">
            <div class="col-sm text-left">
              <p>
                PCS :
                <span class="analyse-pcs">{{ pcsstr }}</span> &nbsp;
                Card :
                <span class="analyse-pcs">#{{ pcsCard }}</span>
              </p>
              <!-- <p>
                Binary :
                <span class="analyse-pcs">{{ pcs }}</span>
              </p>-->
              <p>
                Interval Vector :
                <span class="analyse-pcs">{{ iv }}</span>
              </p>
              <p>
                Forte :
                <span class="analyse-pcs">{{ fortenum }}</span>
              </p>
              <fieldset class="representation-border">
                <legend class="representation-border">Fecundity</legend>
                <p>
                  #Modes :
                  <span class="analyse-pcs">{{ ipcs.cardOrbitMode() }}</span>
                </p>
                <p>
                  #OrbitCyclic :
                  <span class="analyse-pcs">{{ ipcs.cardOrbitCyclic() }}</span>
                </p>
                <p>
                  #OrbitDihedral :
                  <span class="analyse-pcs">TODO</span>
                </p>
                <p>
                  #OrbitAffine :
                  <span class="analyse-pcs">TODO</span>
                </p>
                <p>
                  #OrbitMusaic :
                  <span class="analyse-pcs">TODO</span>
                </p>
              </fieldset>
              <fieldset class="representation-border">
                <legend class="representation-border">Prime Form</legend>
                <p>
                  Modal :
                  <span class="analyse-pcs" v-html="modalPF"></span>
                </p>
                <p>
                  Cyclic :
                  <span class="analyse-pcs">{{ cyclicPF.pcsStr }}</span>
                </p>
                <p>
                  Dihedral :
                  <span class="analyse-pcs">{{ ipcs.dihedralPrimeForm().pcsStr }}</span>
                </p>
                <p>
                  Affine :
                  <span class="analyse-pcs">{{ ipcs.affinePrimeForm().pcsStr }}</span>
                </p>
                <p>
                  Musaic :
                  <span class="analyse-pcs">{{ ipcs.musaicPrimeForm().pcsStr }}</span>
                </p>
              </fieldset>
            </div>
          </div>
          <div class="p-3">
            <p>
              (debug) iPCS :
              <span class="analyse-pcs">{{ ipcs }}</span> ~
              <span class="id-pcs">id : {{ id }}</span> ~ <span class="id-pcs">pid : {{ ipcs.pid() }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Musaic from "@/components/Musaic.vue";
  import ISClock from "@/components/ISClock.vue";
  import WrapCanvas from "@/components/WrapCanvas.vue";
  import MusicNotation from "@/components/MusicNotation.vue";
  import RotateIPcs from "@/components/RotateIPcs.vue";

  import {mapGetters, mapState} from 'vuex'

  export default {
    name: "home",
    mounted() {
      // see manifest.json
      let q = this.$route.query.load
      console.log(q)
    },
    computed: {
      pcs: {
        get() {
          return this.$store.state.ipcs.ipcs.pcs
        },
        set(value) {
          this.$store.commit('ipcs/changepcs', value);
        }
      },
      ipcs: {
        get() {
          return this.$store.state.ipcs.ipcs
        },
        set(value) {
          this.$store.commit('ipcs/update', value);
        }
      },
      modalPF: {
        get() {
          let mpf = this.ipcs.modalPrimeForm()
          return mpf.pcsStr + "<span style='font-variant-position: sub;'>" + mpf.iroot + "</span>"
        }
      },
      ...mapGetters('ipcs', {
        pcsCard: 'pcsCard',
        'iv': 'iv',
        'id': 'id',
        'cyclicPF': 'cyclicPF',
        'pcsstr': 'pcsstr',
        'fortenum': 'fortenum'
      }),

    },
    components: {
      Musaic,
      WrapCanvas,
      ISClock,
      MusicNotation,
      RotateIPcs
    }
  };
</script>

<style scoped>
  h3 {
    text-align: left;
  }

  h5 {
    font-size: 1.1rem;
  }

  .title-detail {
    border-bottom-style: solid;
    border-width: 1px;
    border-bottom-color: lightgray;
  }

  .analyse-pcs {
    text-decoration-color: brown;
    font-size: 1rem;
    background-color: blanchedalmond;
  }

  .id-pcs {
    text-decoration-color: brown;
    background-color: blanchedalmond;
    font-size: 0.7rem;
  }

  .clockpcs_ {
    width: 80%;
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

</style>
