<template>
  <div class_="container bg-white">
    <div class="row mr-1">
      <div class="p-2 col" style="max-width:300px;">
        <h3>Musaic</h3>
        <MusaicBox
          class="shadow p-3 mb-5 bg-white rounded"
          style="width: 250px; height: 350px;"
          _pcs="[1,0,0,1,0,0,0,1,0,0,0,0]"
          v-on:onpcs="onPcsChange"
        ></MusaicBox>
        <!-- p>{{ pcs }}</p -->
      </div>
      <div class="p-2 shadow mb-5 bg-white rounded col" style="min-width:350px;">
        <h4 class="text-center title-detail pb-2">Analysis</h4>
        <div class="container">
          <div class="row">
            <div class="col-sm text-left">
              <p>
                Binary :
                <span class="binary-pcs">{{ pcs }}</span>
              </p>
              <p>
                PCS :
                <span class="binary-pcs">{{ pcsstr }}</span>
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
import MusaicBox from "@/components/MusaicBox.vue";

export default {
  name: "home",
  data() {
    return { pcs: '' };
  },

  methods: {
    onPcsChange: function (newPcs) {
      this.pcs = newPcs;
    }
  },

  computed: {
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
    MusaicBox
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
