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

const PITCH_LINE_WIDTH = 4;

export default {
  // Gets us the provider property from the parent <my-canvas> component.
  name: "ISClock",
  inject: ['provider'],
  setMouseEventDone: false,
  points: [],


  computed: {
    ipcs: {
      get() {
        return this.$store.state.ipcs.ipcs
      },
      set(value) {
        this.$store.commit('ipcs/update', value);
      }
    },
    pcs: {
      get() {
        return this.$store.state.ipcs.pcs
      },
      set(value) {
        this.$store.commit('ipcs/changepcs', value);
      }
    },
    iroot: {
      get() {
        return this.$store.state.ipcs.ipcs.iroot
      },
      set(value) {
        this.$store.commit('ipcs/setIRoot', value);
      }
    },

    cardinal() {
      return this.$store.getters.pcsCard
    }
    // https://vuex.vuejs.org/fr/guide/state.html

  },

  methods: {
    getSelected(e) {
      const ctx = this.provider.context;
      let canvas = ctx.canvas;
      let rect = canvas.getBoundingClientRect();
      let x1 = e.clientX - rect.left;
      let y1 = Math.round(e.clientY - rect.top);
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
      return this.ipcs.pcs[i] == 1;
    },

    setIRoot(index) {
      this.iroot = index;
      this.$root.$emit('onsetpcs');
      // console.log("set iroot : " + index);
    },

    mousemove(e) {
      // https://developer.mozilla.org/fr/docs/Web/API/MouseEvent
      let index = this.getSelected(e);
      if (index >= 0) {
        console.log('mouse move : index/pitch selected = ' + index)
      }
    },
    mouseup(e) {
      let index = this.getSelected(e);

      //TODO for smartphone ????

      // https://stackoverflow.com/questions/2405771/is-right-click-a-javascript-event
      let isRightMB;
      e = e || window.event;

      if ("which" in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = e.which == 3;
      else if ("button" in e)  // IE, Opera 
        isRightMB = e.button == 2;

      // right click ?
      if (isRightMB) {
        e.stopPropagation();// preventDefault();
        if (index != this.iroot) {
          this.setIRoot(index);
        }
        return false;
      }

      if (index >= 0 && index != this.iroot) {
        console.log("mouse up : " + index);
        this.$set(this.ipcs.pcs, index, (this.ipcs.pcs[index] === 1) ? 0 : 1);

        // musaic canvas no reactive... so send event
        this.$root.$emit('onsetpcs');
      }
    },

    drawCirclePitch(ctx, index, radius, lineWidth) {
      let grad;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      // console.log("index : " + index + " selected : " + this.isSelected(index));
      let color = (this.isSelected(index)) ? (index == this.iroot) ? 'red' : 'yellow' : 'white'
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
        ctx.fillText(index.toString(), -.4, 1)
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
        this.drawCirclePitch(ctx, index, radiusPitch, PITCH_LINE_WIDTH);
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

    drawClock(ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      let ox = ctx.canvas.width / 2;
      let oy = ctx.canvas.height / 2;
      let radius = Math.round((ctx.canvas.clientWidth / 2) * .8);
      this.computePitchesRegionSelected(ctx.canvas, ctx, ox, oy, radius);
      this.drawPolygon(ctx);
      ctx.save();
      ctx.translate(ox, oy);
      this.drawPitches(ctx, radius);
      ctx.translate(-ox, -oy);
      ctx.restore();
    }
  },
  // eslint-disable-next-line 
  render() {
    if (!this.provider.context) return;
    if (!this.$options.setMouseEventDone) {
      this.provider.elt.addEventListener('mouseup', this.mouseup);
      this.provider.elt.addEventListener('mousedown', this.mousedown);
      window.oncontextmenu = function () {
        return false;     // cancel default menu right click
      }
      this.$options.setMouseEventDone = true;
    }
    const ctx = this.provider.context;
    this.drawClock(ctx);
  }
};
</script>

<style>
#ccanvas {
  background-color: white;
}
</style>