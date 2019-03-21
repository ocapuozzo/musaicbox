<template>
  <div class_="container bg-white">
    <div class="row mr-1">
      <div class="p-2 shadow mb-5 bg-white rounded col" style="max-width:300px;">
        <h4 class="text-center title-detail pb-2">Musaic</h4>
        <div class="container ml-3">
          <Musaic
            style="width: 220px; height: 350px;"
            _pcs="[1,0,0,1,0,0,0,1,0,0,0,0]"            
          ></Musaic>
        </div>
      </div>
      <div class="p-2 ml-2 shadow mb-5 bg-white rounded col" style="max-width:300px;min-width:300px;">
        <h4 class="text-center title-detail pb-2">iPCS</h4>
        <div class="container">
          <div class="row">
            <div class="col-sm text-left">
              <WrapCanvas id="ccanvas" style="width: 250px; height: 250px;">
                <ISClock color="white"></ISClock>
              </WrapCanvas>
              <p>
                PCS :
                <span class="analyse-pcs">{{ pcsstr }}</span> &nbsp;
                Card :
                <span class="analyse-pcs">#{{ pcsCard }}</span>
              </p>
              <MusicNotation :_ipcs="ipcs"  /> 
              <!-- ClockBis style="width: 200px; height: 200px;"></ClockBis -->
            </div>
          </div>
        </div>
      </div>

      <div class="p-2 ml-2 shadow mb-5 bg-white rounded col" style="min-width:350px;">
        <h4 class="text-center title-detail pb-2">Analysis</h4>
        <div class="container">
          <div class="row">
            <div class="col-sm text-left">
              <p>
                Binary :
                <span class="analyse-pcs">{{ pcs }}</span>
              </p>
              <p>
                Interval Vector :
                <span class="analyse-pcs">{{ iv }}</span>
              </p>
              <p>
                CyclicPF :
                <span class="analyse-pcs">{{ cyclicPF.pcsStr }}</span>
              </p>
              <p>
                Forte :
                <span class="analyse-pcs">{{ fortenum }}</span>
              </p>
              <p>
                (debug) iPCS :
                <span class="analyse-pcs">{{ ipcs }}</span>
              </p>
              <div class="footer-copyright">
                <span class="id-pcs">Id : {{ id }}</span>
              </div>
            </div>
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

import { mapGetters, mapState } from 'vuex'

export default {
  name: "home",

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
    MusicNotation
  }
};
</script>

<style scoped>
h3 {
  text-align: left;
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
</style>
