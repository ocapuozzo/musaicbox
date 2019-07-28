<!--
  - Copyright (c) 2019. Olivier Capuozzo
  -->

<template>
  <div class="clockpcs">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>

import ClockDrawing from "../models/ClockDrawing";
import IPcs from "../models/IPcs";

 export default {
    name: "Clock",
    clockDrawing : null,
    n: 0,
   size : 0,
    props: {
      _ipcs: Object,
      pc_color: {
        type: String,
        default: function () {
          return "black"
        },
      },
      pc_pivot_color: {
        type: String,
        default: function () {
          return "red"
        },
      },
    },
    data() {
      return {
        ipcs: new IPcs({strPcs: "[0,4,7]", n: 12})
      }
    },
    computed: {},
    methods: {
      draw() {
        let len = this.size ? this.size : Math.min(this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight)
        //  console.log("len draw: " + len)
     
        this.clockDrawing.width = len 
        this.clockDrawing.height = len
        this.$refs['canvas'].width = len
        this.$refs['canvas'].height = len
        this.clockDrawing.draw()
      }
    },
    mounted() {
      this.ctx = this.$refs['canvas'].getContext('2d')
      // let len = Math.min(this.$refs['canvas'].clientWidth, this.$refs['canvas'].clientHeight)
      let len = this.size ? this.size : Math.min(this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight)
      // console.log("len : " + len)
      this.$refs['canvas'].width = len
      this.$refs['canvas'].height = len
      if (this._ipcs) {
        this.ipcs = new IPcs({strPcs: this._ipcs.strPcs, n: this._ipcs.n})
      } else {
        this.ipcs = new IPcs({strPcs: "[1, 5, 6]", n: 7})
      }
      this.n = this.ipcs.pcs.length
      this.clockDrawing = new ClockDrawing(
        {
          ipcs: this.ipcs,
          ctx: this.ctx,
          width: len,
          height: len + (0), // square
          pc_color : "black",
          segmentsLineDash : [ [1, 2, 2, 1], [2, 3] ] // median, inter
        })
     // this.draw()
    },
    watch: {
      ipcs: function (val, oldVal) {
        this.draw()
      }
    }
  }
</script>

<style scoped>
  .clockpcs {
    display: inline-flex;
    text-align: center;
  }

</style>