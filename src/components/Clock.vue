<template>
  <div>
    <canvas
      v-on:onpcs="updateClock"
      pcs="[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]"
      mypcs="[1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]"
      id="ccanvas"
      ref="ccanvas"
      width="250"
      height="250"
      style="border:1px solid #BBB;"
    ></canvas>
    <input type="text" v-bind="pcs__">
    <p>{{ pcs }}</p>
    <p class="mt-3">Card : #{{ cardinal }}</p>
  </div>
</template>

<script>
//  https://www.w3schools.com/code/tryit.asp?filename=G162PFNP2G5Q

/* eslint-disable no-console */

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

// import { setTimeout } from 'timers';

export default {
  name: "Clock",
  points: [],
  mousedownTimeout: null,
  props: {
    
  },
  data: function () {
    return {
      pcs__: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      iRoot: 0
    }
  },
  //  directives: {
  //    test: function (canvasElement, binding) {
  //      // get canvas context
  //      //var ctx = canvasElement.getContext("2d");
  //      console.log('directive');
  //      this.drawClock();
  //    }
  //  },
  computed: {
    pcs: {
      get() {
        console.log('clock pcs get');
        return this.$store.state.mypcs
      },
      set(value) {
        this.$store.dispatch('changepcs', value);
      }
    },
    cardinal() {
      return this.$store.getters.pcsCard
    }
    // https://vuex.vuejs.org/fr/guide/state.html

  },
  mounted() {
    let canvas = this.$refs.ccanvas;//document.getElementById("ccanvas");
    canvas.addEventListener('mouseup', this.mouseup);
    canvas.addEventListener('mousedown', this.mousedown);

    // this.$el.addEventListener('dragster:leave', (e) => this.$emit('leave', e))
    this.$set(this.pcs, 0, this.pcs[0]);
    //this.pcs = this.mypcsbis;
    this.pcs__ = this.pcs;
    this.drawClock();
  },
  methods: {
    updateClock(e) {
      console.log("updateClock");
      //this.drawClock();
    },

    getSelected(e) {
      let canvas = this.$refs.ccanvas;
      let rect = canvas.getBoundingClientRect();
      let x1 = e.clientX - rect.left;
      let y1 = Math.round(e.clientY - rect.top); // bug  (get real ???)
      let index = -1;
      for (let i = 0; i < this.$options.points.length; i++) {
        if (this.$options.points[i].contains(x1, y1)) {
          index = i;
          break;
        }
      }
      return index;
    },
    isSelected(i) {
      return this.pcs[i] == 1;
    },

    mousemove(e) {
      // https://developer.mozilla.org/fr/docs/Web/API/MouseEvent
      let index = this.getSelected(e);
      if (index >= 0) {
        console.log('mouse move : index/pitch selected = ' + index)
      }
    },

    setIRoot(index) {
      this.iRoot = index;
      this.$set(this.pcs, index, 1);
      this.drawClock();  // call because not reactive on Vue 3.0 ???
      // console.log("set iRoot : " + index);
    },

    mousedown(e) {
      let index = this.getSelected(e);
      if (index >= 0) {
        let self = this;
        // a long time down => change iRoot
        this.$options.mousedownTimeout = setTimeout(function () {
          self.setIRoot(index);
        }, 500);
        // console.log("attach timeout function ");
      }
    },

    mouseup(e) {
      clearTimeout(this.$options.mousedownTimeout);
      let index = this.getSelected(e);
      // console.log("mouse up : " + index + " e x : " + x1);

      if (index >= 0 && index != this.iRoot) {
        this.$set(this.pcs, index, (this.pcs[index] == 1) ? 0 : 1);
        this.pcs = this.pcs;
        //this.drawClock();
      }
      // console.log('this.pcs : ' + JSON.stringify(this.pcs));
    },

    drawCirclePitch(ctx, index, radius, lineWidth) {
      let grad;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      // console.log("index : " + index + " selected : " + this.isSelected(index));
      let color = (this.isSelected(index)) ? (index == this.iRoot) ? 'red' : 'yellow' : 'white'
      ctx.fillStyle = color;
      ctx.fill();
      grad = ctx.createRadialGradient(0, 0, radius * 0.8, 0, 0, radius * 1.2);
      grad.addColorStop(0, '#333');
      grad.addColorStop(0.5, 'white');
      grad.addColorStop(1, '#333');
      ctx.strokeStyle = grad;
      ctx.lineWidth = lineWidth; //radius*0.1;
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle = '#333';
      ctx.fill();
      if (index < 10) {
        ctx.fillText(index.toString(), - .1, 1);
      } else {
        ctx.fillText(index.toString(), -.5, 1)
      }
    },

    drawPitches(ctx, radius) {
      let ang;
      ctx.font = radius * 0.1 + "px arial";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      let radiusPitch = Math.round(radius / 9);
      for (let index = 0; index < 12; index++) {
        ang = index * Math.PI / 6;
        // console.log(this.$options.points[index].toString());
        ctx.rotate(ang);
        ctx.translate(0, -radius);
        ctx.rotate(-ang);
        this.drawCirclePitch(ctx, index, radiusPitch, 6);
        ctx.rotate(ang);
        ctx.translate(0, radius);
        ctx.rotate(-ang);
      }
    },
    drawPolygon(ctx) {
      let points = this.$options.points;
      let firstPoint = true;
      ctx.save();
      ctx.fillStyle = 'black';
      ctx.beginPath();
      for (let i = 0; i < this.pcs.length; i++) {
        if (this.pcs[i] == 1 && firstPoint) {
          firstPoint = false;
          ctx.moveTo(points[i].x, points[i].y);
        } else if (this.pcs[i] == 1) {
          ctx.lineTo(points[i].x, points[i].y);
        }
      }
      ctx.closePath();
      ctx.stroke();
      // console.log('End drowpolygon');
      ctx.restore();
    },
    computePitchesRegionSelected(canvas, ctx, ox, oy, radius) {
      let radiusPitch = Math.round(radius / 11);
      let x;
      let y;
      let ang = 3 * Math.PI / 2;
      for (let index = 0; index < 12; index++) {
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
        ang = ang + Math.PI / 6;
      }
    },

    drawClock() {
      let canvas = document.getElementById("ccanvas");
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let ox = canvas.width / 2;
      let oy = canvas.height / 2;
      let radius = Math.round((canvas.clientWidth / 2) * .75);

      // revoir positionnement et reactive
      this.computePitchesRegionSelected(canvas, ctx, ox, oy, radius);


      this.drawPolygon(ctx);
      ctx.save();
      ctx.translate(ox, oy);
      this.drawPitches(ctx, radius);
      ctx.translate(-ox, -oy);
      ctx.restore();
    }
  },
 
};
</script>

<style>
#ccanvas {
  background-color: white;
}
</style>