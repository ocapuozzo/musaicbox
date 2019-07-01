<!--
  - Copyright (c) 2019. Olivier Capuozzo
  -->

<template>
  <div class="clockpcs">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
  class Rect {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }

    contains(x, y) {
      return x >= (this.x - this.w / 2) && x <= this.x + this.w / 2 &&
        y >= this.y - this.h / 2 && y <= this.y + this.h / 2;
    }

    draw(ctx) {
      ctx.beginPath();
      //ctx.arc(this.x, this.y, this.w, 0, 2 * Math.PI);
      ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h)
      ctx.stroke();
    }

    toString() {
      return "{" + this.x + "," + this.y + "," + this.w + "," + this.h + "}";
    }
  }

  const PITCH_LINE_WIDTH = 4;

  // from  https://alligator.io/vuejs/vue-html5-canvas/

  import IPcs from "../models/IPcs";

  export default {
    name: "Clock",
    points: [],
    n : 0,
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
        ipcs: new IPcs({strPcs:"[0,4,7]", n:12})
      }
    },
    computed: {
      // ipcs: {
      //   get() {
      //     return this.$store.state.ipcs.ipcs
      //   },
      //   set(value) {
      //     this.$store.commit('ipcs/update', value);
      //   }
      // }
    },
    methods: {

      isSelected(i) {
        return this.ipcs.pcs[i] === 1;
      },
      drawCirclePitch(ctx, index, radius, lineWidth) {
        let grad;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.stroke()
        // console.log("index : " + index + " selected : " + this.isSelected(index));
        let color = (this.isSelected(index)) ? (index ===  this.ipcs.iPivot) ? this.pc_pivot_color : this.pc_color : 'white'
        ctx.fillStyle = color;
        ctx.fill();
        if (radius > 6) {
          grad = ctx.createRadialGradient(0, 0, radius * 0.8, 0, 0, radius * 1.2);
          grad.addColorStop(0, '#333');
          grad.addColorStop(0.5, 'white');
          grad.addColorStop(1, '#333');
          ctx.strokeStyle = grad;
          ctx.lineWidth = 3;//lineWidth; //radius*0.1;
          ctx.stroke();
          ctx.beginPath();
          ctx.fillStyle = '#333';
          ctx.fill();
          // console.log("radius : " + radius)
          if (index < 10) {
            ctx.fillText(index.toString(), -.1, 1);
          } else {
            ctx.fillText(index.toString(), -.4, 1)
          }
        }
      },
      drawPitches(ctx, radius) {
        let ang;
        ctx.font = radius * 0.1 + "px arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        let radiusPitch = Math.round(radius / 9);
        for (let index = 0; index < this.n; index++) {
          ang = index * Math.PI / (this.n/2);
          // console.log(this.$options.points[index].toString());
          ctx.rotate(ang);
          ctx.translate(0, -radius);
          ctx.rotate(-ang);
          this.drawCirclePitch(ctx, index, radiusPitch, PITCH_LINE_WIDTH);
          ctx.rotate(ang);
          ctx.translate(0, radius);
          ctx.rotate(-ang);
        }
      },

      draw() {
       // console.log("ipcs :" + this.ipcs)
        let ox = this.$refs['canvas'].clientWidth / 2;
        let oy = this.$refs['canvas'].clientHeight / 2;
        let radius = Math.round(ox * .8);
        this.computePitchesRegionSelected(ox, oy, radius);
        this.ctx.clearRect(0, 0, this.$refs['canvas'].clientWidth, this.$refs['canvas'].clientHeight);
        this.drawPolygon(this.ctx);
        this.ctx.save();
        this.ctx.translate(ox, oy);
        this.drawPitches(this.ctx, radius);
        this.ctx.translate(-ox, -oy);
        this.ctx.restore();
      },
      drawPolygon(ctx) {
        let points = this.$options.points;
        let firstPoint = true;
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.beginPath();
        for (let i = 0; i < this.ipcs.pcs.length; i++) {
          if (this.ipcs.pcs[i] === 1 && firstPoint) {
            firstPoint = false;
            ctx.moveTo(points[i].x, points[i].y);
          } else if (this.ipcs.pcs[i] === 1) {
            ctx.lineTo(points[i].x, points[i].y);
          }
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      },
      computePitchesRegionSelected(ox, oy, radius) {
        // console.log("this.n : " + this.n)
        // console.log("ox :" + ox + "  oy : "+oy + " radius : " + radius)
        let radiusPitch = Math.round(radius / (this.n-1));
        let x;
        let y;
        let ang = 3 * Math.PI / 2;
        for (let index = 0; index < this.n; index++) {
          x = radiusPitch * 2 + Math.round(ox + Math.cos(ang) * radius);
          y = radiusPitch * 2 + Math.round(oy + Math.sin(ang) * radius);
          // console.log("ox : " + ox +"  x:" + x + " y:" + y);
          this.$options.points[index] = new Rect(
            x - radiusPitch * 2,
            y - radiusPitch * 2,
            radiusPitch * 3, // width rectangle
            radiusPitch * 3); // square...
          //this.$options.points[index].draw(ctx);
          // console.log(this.$options.points[index].toString());
          ang = ang + 2*Math.PI / this.n;
        }
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
        this.ipcs = new IPcs({strPcs:this._ipcs.strPcs, n:this._ipcs.n})
      } else {
        this.ipcs = new IPcs({strPcs:"[1, 5, 6]", n:7})
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
  .clockpcs {
    display: inline-flex;
    text-align: center;
  }

</style>