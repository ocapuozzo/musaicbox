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

      let suffix = 'X:1\nL: 1/4\nK:C\n';
      let notes = '';
      let chord = '[ ';
      
      let n = this.ipcs.pcs.length;
      const someNotes = [1,3,6,8,10]
      for (let i = this.ipcs.iPivot; i < n + this.ipcs.iPivot; i++) {
        if (this.ipcs.pcs[i % n] === 1) {
          let note = lettersNotation[i % n];
          if ( someNotes.indexOf(i % n) !== -1) {
               // change # in bemol  
               if (this.ipcs.pcs[(i + 1) % n] !== 1) {
                  note = "_" + lettersNotation[ (i+1) % n]
               }
          }
          // make notes always up 
          // http://abcnotation.com/blog/2010/01/31/how-to-understand-abc-the-basics/
          if ( (i%n) < this.ipcs.iPivot) {
             note += "'"
          }
          notes = notes + note + " ";
          chord = chord + note;
        }
      }
      chord = ""; // (this.ipcs.cardinal() < 5) ? chord + ' ]  \n' : ''
      return suffix + notes + chord; //'C4 ^E4 G4 [C4E4G4]\n';
    }
  },
  methods: {
    refresh() {
      // console.log("this.tune :" + this.tune)
      // https://configurator.abcjs.net/visual/
      abcjs.renderAbc(
        "paper",
        this.tune,
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
