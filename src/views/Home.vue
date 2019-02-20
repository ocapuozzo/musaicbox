<template>
  <div class_="container bg-white">
    <div class="row mr-1">
      <div class="p-2 col" style="max-width:300px;">
        <h3>Musaic</h3>
        <Musaic
          class="shadow p-3 mb-5 bg-white rounded"
          style="width: 250px; height: 350px;"
          _pcs="[1,0,0,1,0,0,0,1,0,0,0,0]"
          v-on:onpcs="onPcsChange"
        ></Musaic>
        <!-- p>{{ pcs }}</p -->
      </div>
      <div class="p-2 shadow mb-5 bg-white rounded col" style="min-width:350px;">
        <h4 class="text-center title-detail pb-2">PCS nalysis</h4>
        <div class="container">
          <div class="row">
            <div class="col-sm text-left">
              <p>
                Binary :
                <span class="binary-pcs">{{ pcs }}</span>
              </p>
              <p>
                PCS :
                <span class="binary-pcs">{{ pcsstr }}</span> &nbsp;
                Card :
                <span class="binary-pcs">#{{ pcsCard }}</span>
              </p>
              <WrapCanvas id="ccanvas" style="width: 250px; height: 250px;">
                <ISClock color="white" v-on:on-change-pcs="onPcsChange"></ISClock>
              </WrapCanvas>
              <!-- ClockBis style="width: 200px; height: 200px;"></ClockBis -->
            </div>
          </div>
        </div>
      </div>

 <div class="p-2 shadow mb-5 bg-white rounded col" style="min-width:350px;">
        <h4 class="text-center title-detail pb-2">Musaic Analysis</h4>
        <div class="container">
          <div class="row">
            <div class="col-sm text-left">
              <p>
                Binary :
                <span class="binary-pcs">{{ pcs }}</span>
              </p>
              <p>
              </p>
            
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

export default {
  name: "home",

  methods: {
    onPcsChange: function (newPcs) {
      console.log("on-change-pcs :" + newPcs);
      this.pcs = newPcs;
    }
  },

  computed: {
    pcs: {
      get() {
        return this.$store.state.mypcs
      },
      set(value) {
        this.$store.dispatch('changepcs', value);
      }
    },
    pcsCard: function() {
      return  this.$store.getters.pcsCard;
    },
    pcsstr: function () {
      let res = "";
      for (let index = 0; index < this.pcs.length; index++) {
        const element = this.pcs[index];
        if (element)
          res = (res) ? res + ', ' + index.toString() : index.toString();
      }
      return '[ ' + res + ' ]';
    }
  },
  components: {
    Musaic,
    WrapCanvas,
    ISClock
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
.binary-pcs {
  text-decoration-color: brown;
  font-size: 1rem;
  background-color: blanchedalmond;
}
</style>
