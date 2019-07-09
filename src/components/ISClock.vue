<template>
  <div class="is-clock" ref="containercanvas">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>

  /* eslint-disable no-console */

  import ClockDrawing from "../models/ClockDrawing"

  export default {
    name: "ISClock",
    dateMouseDone: null,
    touchendOk: false,
    data() {
      return {
        clockDrawing: null
      }
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
      pcs: {
        get() {
          return this.$store.state.ipcs.pcs
        },
        set(value) {
          this.$store.commit('ipcs/changepcs', value);
        }
      },
      iPivot: {
        get() {
          return this.$store.state.ipcs.ipcs.iPivot
        },
        set(value) {
          this.$store.commit('ipcs/setiPivot', value);
        }
      },

      cardinal() {
        return this.$store.getters.pcsCard
      }

    },

    methods: {
      // check if object must be build, and update
      checkClockDrawing() {
        if (!this.clockDrawing) {
          this.clockDrawing = new ClockDrawing(
            {
              ipcs: this.ipcs,
              ctx: this.ctx,
              width: this.ctx.canvas.clientWidth,
              height: this.ctx.canvas.clientWidth,

            })
        }
      },
      getSelected(e) {
        // const ctx = this.provider.context;
        let canvas = this.ctx.canvas;
        let rect = canvas.getBoundingClientRect();
        let x1;
        let y1;
        // https://developer.mozilla.org/en-US/docs/Web/API/Touch/clientX
        if (e.changedTouches) {
          x1 = e.changedTouches[0].clientX - rect.left;
          y1 = Math.round(e.changedTouches[0].clientY - rect.top);
        } else {
          x1 = e.clientX - rect.left;
          y1 = Math.round(e.clientY - rect.top);
        }
        this.checkClockDrawing()
        return this.clockDrawing.getIndexPitchFromXY(x1, y1)
      },

      isSelected(i) {
        return this.ipcs.pcs[i] === 1;
      },

      setiPivot(index) {
        this.iPivot = index;
        this.drawClock(this.ctx)
        this.$root.$emit('onsetpcs');
        // console.log("set iPivot : " + index);
      },
      touchstart(e) {
        if (e) {
          e.preventDefault();
        }
        this.$options.dateMouseDone = new Date()
      },
      touchend(e) {
        if (!e) {
          return
        }
        e.preventDefault();

        let index = this.getSelected(e);

        if (index < 0) {
          this.$options.dateMouseDone = null
          return false;
        }

        let longClick = (new Date() - this.$options.dateMouseDone) >= 500

        this.$options.dateMouseDone = null

        if (index !== this.iPivot) {
          this.touchendOk = true
          if (longClick) {
            this._setIndexToOneOriPivot(index)
          } else {
            this.$store.commit("ipcs/toggleindexpcs", index);
            this.$root.$emit('onsetpcs');
          }
        }
      },
      mousemove(e) {
        // https://developer.mozilla.org/fr/docs/Web/API/MouseEvent
        let index = this.getSelected(e);
        if (index >= 0) {
          this.$el.style.cursor = 'pointer'
          // console.log('mouse move : index/pitch selected = ' + index)
        } else {
          this.$el.style.cursor = 'default'
        }
      },
      mousedown(e) {
        this.$options.dateMouseDone = new Date()
      },
      mouseup(e) {
        let index = this.getSelected(e);
        if (index < 0 || this.touchendOk) {
          this.touchendOk = false
          return false;
        }

        e.preventDefault();

        // https://stackoverflow.com/questions/2405771/is-right-click-a-javascript-event
        let isRightMB;
        e = e || window.event;

        if ("which" in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
          isRightMB = e.which === 3;
        else if ("button" in e)  // IE, Opera
          isRightMB = e.button === 2;

        // long click ? (if down is 1 second or more)
        let longClick = (new Date() - this.$options.dateMouseDone) >= 1000

        // right click and long click => change iPivot
        if (isRightMB || longClick) {
          // console.log("index :" + index + " this.iPivot :" +this.iPivot)
          if (index !== this.iPivot) {
            this._setIndexToOneOriPivot(index)
          }
          this.$options.dateMouseDone = null
          return false;
        }
        // accept unset iPivot when cardinal == 1 only
        if (index >= 0 && (index !== this.iPivot || this.ipcs.cardinal() === 1)) {
          this.$store.commit("ipcs/toggleindexpcs", index);
          this.$root.$emit('onsetpcs');
        }
      },

      _setIndexToOneOriPivot(index) {
        if (this.ipcs.pcs[index] === 0) {
          // set this.ipcs.pcs[index] to 1 (new array)
          this.$store.commit("ipcs/toggleindexpcs", index);
        } else {
          this.setiPivot(index);
        }
        this.$root.$emit('onsetpcs');
      },

      drawClock() {
        this.checkClockDrawing()
        this.clockDrawing.draw(this.ipcs)
      }
    },

    watch: {
      ipcs: function (val, oldVal) {
        //  console.log("this.drawClock();")
        this.drawClock();
      }
    },
    created() {

    },
    mounted() {
      this.ctx = this.$refs['canvas'].getContext('2d')
      let containercanvas = this.$refs.containercanvas
      //containercanvas.addEventListener("animationend", this.listenerEndAnim);
      // autres events
      this.$el.addEventListener('mouseup', this.mouseup);
      this.$el.addEventListener('mousedown', this.mousedown);
      this.$el.addEventListener('mousemove', this.mousemove);
      this.$el.addEventListener('touchstart', this.touchstart, false);
      this.$el.addEventListener('touchend', this.touchend, false);
      // right click => selected index
      this.$el.addEventListener('contextmenu', this.mouseup);

      // Resize the canvas to fit its parent's width.
      // Normally you'd use a more flexible resize system.
      let len = Math.min(containercanvas.clientWidth, containercanvas.clientHeight)
      this.$refs['canvas'].width = len
      this.$refs['canvas'].height = len
      this.n = this.ipcs.pcs.length
      this.drawClock()
    }
  }
</script>

<style>
 .is-clock  {
    background-color: white;
  }
</style>