<!--
  - Copyright (c) 2019. Olivier Capuozzo
  -->

<template>
  <div class="musaic">
    <canvas ref="canvas" class="roundedImageBorder roundedImageShadow"></canvas>
  </div>
</template>

<script>
  /**
   * Musaic component for display without user interaction (as ISMusaic)
   * TODO from duplicate code ISMusaic ... :(   to refactor
   */

  import IPcs from "../models/IPcs";

  export default {
    name: "Musaic",
    n: 0,
  //  ctx : null,
    props: {
      _ipcs: Object,
      pc_color_1: {
        type: String,
        default: function () {
          return "black"
        },
      },
      pc_color_0: {
        type: String,
        default: function () {
          return "white"
        },
      },
    },
    data() {
      return {
        ipcs: new IPcs({strPcs: "[0,4,7]", n: 12}),
        CEL_WIDTH: 10 // initial value
      }
    },
    computed: {},
    methods: {
      draw() {
        let n = this.n
        let ctx = this.ctx

        let CEL_WIDTH = (this.$refs['canvas'].width -2) / (n + 1);

        // Draws musaic
        // loop n+1 for exact correlation between geometry ops and algebra ops
        // display *iPivot centered* for bijective relation geometry <-> algebra
        // Example.
        //   ipcs : ({0, 3, 6, 9}, iPivot=0)
        //   ipcs : ({1, 4, 7, 10}, iPivot=1)
        // are same IS, are same Musaic representation
        ctx.save();
        ctx.beginPath()
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        for (let i = 0; i <= n; i++) {
          for (let j = 0; j <= n; j++) {
            if (this.ipcs.pcs[(i + this.ipcs.iPivot + j * 5) % n] === 1) {
              ctx.fillStyle =  "black" // this.pc_color_1;
              ctx.strokeRect(1 + j * CEL_WIDTH, 1 + i * CEL_WIDTH, CEL_WIDTH, CEL_WIDTH);
              ctx.fillRect(1 + j * CEL_WIDTH, 1 + i * CEL_WIDTH, CEL_WIDTH, CEL_WIDTH);

            } else {
              ctx.fillStyle = "white" // this.pc_color_0;
              ctx.strokeRect(1 + j * CEL_WIDTH, 1 + i * CEL_WIDTH, CEL_WIDTH, CEL_WIDTH);
              ctx.fillRect(1 + j * CEL_WIDTH, 1 + i * CEL_WIDTH, CEL_WIDTH, CEL_WIDTH);
            }
          }
        }
        ctx.strokeRect(0, 0, this.$refs['canvas'].width-1,this.$refs['canvas'].width -1);
        this.CEL_WIDTH = CEL_WIDTH;
        ctx.restore();
      },
    },
    mounted() {
      this.ctx = this.$refs['canvas'].getContext('2d')

      // Resize the canvas to fit its parent's width.
      // Normally you'd use a more flexible resize system.
      let len = Math.min(this.$refs['canvas'].clientWidth, this.$refs['canvas'].clientHeight)
      this.$refs['canvas'].width = len
      this.$refs['canvas'].height = len

      if (this._ipcs) {
        this.ipcs = new IPcs({strPcs: this._ipcs.strPcs, n: this._ipcs.n})
      } else {
        this.ipcs = new IPcs({strPcs: "[1, 5, 6]", n: 7})
      }
      this.n = this.ipcs.pcs.length
    },
    watch: {
      ipcs: function (val, oldVal) {
        this.draw()
      }
    }
  }
</script>

<style scoped>
  .musaic {
    display: inline-flex;
    text-align: center;
  }

  .roundedImage, .roundedImageShadow, .roundedImageBorder{
    overflow:hidden;
    -webkit-border-radius:50px;
    -moz-border-radius: 50%;
    /* border-radius:50px; */
  }
  .roundedImageShadow{
    -moz-box-shadow: 0px 0px 2px #343434;
    -webkit-box-shadow: 0px 0px 2px #343434;
    -o-box-shadow: 0px 0px 2px #343434;
    box-shadow: 0px 0px 2px #343434;
  }
  .roundedImageBorder{
    border: 1px solid #000000; /*6699;*/
  }
</style>