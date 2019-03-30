<template>
  <div class="text-center">
    <div id="paper"></div>
  </div>
</template>

<script>
import abcjs from "abcjs";
const lettersNotation = ['C', '^C', 'D', '^D', 'E', 'F', '^F', 'G', '^G', 'A', '^A', 'B'];

export default {
  name: "MusicNotation",

  mounted() {
    this.refresh();
    this.$root.$on('onsetpcs', () => {
      this.refresh();
    })
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
    tune: function () {
      if (!this.ipcs) return;

      let suffix = 'X:1\nL: 1/4\n';
      let notes = '';
      let chord = '[ ';

      let n = this.ipcs.pcs.length;

      for (let i = this.ipcs.iroot; i < n + this.ipcs.iroot; i++) {
        if (this.ipcs.pcs[i % n] === 1) {
          let note = lettersNotation[i % n];
          if ((i % n === 3) && (this.ipcs.pcs[(i + 1) % n] !== 1)) {
            note = '_E';
          }
          if ((i % n === 10) && (this.ipcs.pcs[(i + 1) % n] !== 1)) {
            note = '_B';
          }
          notes = notes + note + " ";
          chord = chord + note;
        }
      }
      chord = ''; // (this.ipcs.cardinal() < 5) ? chord + ' ]  \n' : ''
      return suffix + notes + chord; //'C4 ^E4 G4 [C4E4G4]\n';
    }
  },
  methods: {
    refresh() {
      // console.log(this.tune);
      // https://configurator.abcjs.net/visual/
      abcjs.renderAbc("paper", this.tune,
        {
          scale:.9, 
          staffwidth:210, 
          paddingleft: 1
        });
    },
  }
}
</script>

<style scoped>

</style>
