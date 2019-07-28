<template>
  <div>
    <div ref="containercanvas">
      <canvas ref="mcanvas" id="mcanvas" class="actionable" style="border:1px solid #BBB;"></canvas>
    </div>
    <div class="extra content text-center aligned">
      <img
        id="m11"
        ref="m11"
        src="img/m11.png"
        title="m11"
        class="actionable img-fluid anim-button"
        width="60"
      >
      <img
        id="m5"
        ref="m5"
        src="img/m5.png"
        title="m5"
        class="actionable img-fluid anim-button"
        width="60"
      >
      <img
        id="m7"
        ref="m7"
        src="img/m7.png"
        title="m7"
        class="actionable img-fluid anim-button"
        width="60"
      >
    </div>
    <div class="extra content text-center aligned">
      <span v-on:click="complement" class="actionable">
        <img
          src="img/cplt.png"
          title="complement"
          class="actionable img-fluid anim-button"
          width="40"
        >
        <!-- <font-awesome-icon icon="yin-yang"  size="lg"/> -->
      </span>
      <p class="text-center mt-1">
        IS :
        <span class="analyse-pcs">{{ intervalStructFormatWithParentheses }}</span>
      </p>
    </div>
    <!-- p>{{pcs}}</p -->
  </div>
</template>

<script>

export default {
  name: "ISMusaic",
  props: {
    _pcs: String
  },
  data() {
    return {
      CEL_WIDTH: 10 // initial value
    }
  },
  computed: {
    pcs: {
      get() {
        return this.$store.state.ipcs.pcs
      },
      set(value) {
        this.$store.commit('ipcs/changepcs', value);
        this.forceCanvasUpdate();
      }
    },
    ipcs: {
      get() {
        return this.$store.state.ipcs.ipcs
      },
      set(value) {
        this.$store.commit('ipcs/update', value);
      }
    },
    intervalStructFormatWithParentheses() {
      return  "(" + this.ipcs.is.reduce(
        function(intervalStructureFormat ,i) {
          return intervalStructureFormat.length === 0
            ? "" + i
            : intervalStructureFormat + ","+i
        }
        , "")
        + ")"
    },
  },
  mounted() {

    // define event on root, which call by ISClock component
    // bidirectionnal reactive, and this !
    this.$root.$on('onsetpcs', () => {
      this.forceCanvasUpdate();
    });

    // console.log(this.$refs['mcanvas']);
    let canvas = this.$refs.mcanvas;

    this.addOpTransfOnClickListeners();

    // attach listener event animationend to canvas only, not buttons
    let containercanvas = this.$refs.containercanvas
    containercanvas.addEventListener("animationend", this.listenerEndAnim);

    // We can't access the rendering context until the canvas is mounted to the DOM.
    let size = Math.min(canvas.parentElement.clientWidth, canvas.parentElement.clientHeight)
    canvas.width = size
    canvas.height = size

    canvas.addEventListener('mousedown', this.mousedown);
    this.CEL_WIDTH = canvas.width / 13;
    if (this.ipcs) {
      this.pcs = this.ipcs.pcs
    } else  if (this._pcs) {
      this.pcs = JSON.parse(this._pcs);
    } else {
      this.pcs = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },

  methods: {
    forceCanvasUpdate() {
      this.drawsMusaic();
    },
    complement() {
      this.ipcs = this.ipcs.complement()
      this.$root.$emit('onsetpcs');
    },
    mousedown(e) {
      let mcanvas = this.$refs.mcanvas;
      let rect = mcanvas.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;

      // for compute with undefined
      let localPivot = (this.ipcs.iPivot === undefined) ? 0 : this.ipcs.iPivot

        // from matrix coord to indice linear
      let index = ((5 * Math.floor(x / this.CEL_WIDTH))
        + (Math.floor(y / this.CEL_WIDTH)) + localPivot) % this.ipcs.pcs.length;

       // keep iPivot until cardinal = 1
       if (index !== this.iPivot || this.ipcs.cardinal()===1) {
        this.$store.commit("ipcs/toggleindexpcs", index);
        this.$root.$emit('onsetpcs');
      }
    },
    /**
     * After geometrical transformation, set pcs transformation
     * (algebric) and draw its musaic representation (geometric)
     * so, no change visualy if ok !
     */
    drawsMusaic() {

      // get canvas direct from DOM
      let canvas = document.getElementById("mcanvas");
      if (!canvas.getContext) return;

      canvas.width = canvas.parentElement.clientWidth
      canvas.height = canvas.width

      let n = this.ipcs.pcs.length;

      let ctx = canvas.getContext("2d");

      ctx.strokeStyle = "black";

      let CEL_WIDTH = canvas.width / (n + 1);

      // Draws musaic
      // loop n+1 for exact correlation between geometry ops and algebra ops
      // display *iPivot centered* for bijective relation geometry <-> algebra
      // Example. 
      //   ipcs : ({0, 3, 6, 9}, iPivot=0) 
      //   ipcs : ({1, 4, 7, 10}, iPivot=1)  
      // are same IS, are same Musaic representation 
      for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= n; j++) {
          if (this.ipcs.pcs[(i + this.ipcs.iPivot + j * 5) % n] === 1) {
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.strokeRect(j * CEL_WIDTH, i * CEL_WIDTH, CEL_WIDTH, CEL_WIDTH);
            ctx.fillRect(j * CEL_WIDTH, i * CEL_WIDTH, CEL_WIDTH, CEL_WIDTH);

          } else {
            ctx.fillStyle = "white";
            ctx.strokeRect(j * CEL_WIDTH, i * CEL_WIDTH, CEL_WIDTH, CEL_WIDTH);
            ctx.fillRect(j * CEL_WIDTH, i * CEL_WIDTH, CEL_WIDTH, CEL_WIDTH);

          }
        }
      }
      ctx.strokeRect(0, 0, canvas.parentElement.clientWidth, canvas.parentElement.clientWidth);
      this.CEL_WIDTH = CEL_WIDTH;
    },

    /**
     * set listeners which set a css class for geometrical animation
     */
    addOpTransfOnClickListeners() {
      let $m = this.$refs["mcanvas"]; //document.getElementById("mcanvas");
      let self = this;
      document.getElementById("m11").onclick = function () {
        if (self.isCursorWait()) return;

        self.disableButtons();
        $m.classList.add("rotateM11");
      };

      document.getElementById("m5").onclick = function () {
        if (self.isCursorWait()) return;

        self.disableButtons();
        $m.classList.add("rotateM5");
      };

      document.getElementById("m7").onclick = function () {
        if (self.isCursorWait()) return;

        self.disableButtons();
        $m.classList.add("rotateM7");
      };
    },

    clearRotateClasses() {
      const $m = this.$refs["mcanvas"];
      if ($m.classList.contains("rotateM11")) $m.classList.remove("rotateM11");
      if ($m.classList.contains("rotateM5")) $m.classList.remove("rotateM5");
      if ($m.classList.contains("rotateM7")) $m.classList.remove("rotateM7");
    },

    disableButtons() {
      this.$refs["m11"].disabled = true;
      this.$refs["m5"].disabled = true;
      this.$refs["m7"].disabled = true;
      this.$refs["m11"].style.cursor = "wait";
      this.$refs["m5"].style.cursor = "wait";
      this.$refs["m7"].style.cursor = "wait";
    },

    enabledButtons() {
      this.$refs["m11"].style.cursor = "pointer";
      this.$refs["m5"].style.cursor = "pointer";
      this.$refs["m7"].style.cursor = "pointer";
      this.$refs["m11"].disabled = false;
      this.$refs["m5"].disabled = false;
      this.$refs["m7"].disabled = false;
    },

    /**
     * (After geometric operation) select algebraic operation and call
     *  transformsPcsAndDrawsMusaic()
     */
    listenerEndAnim(event) {
      //  console.log("event.animationName:" + event.animationName)
      let opTransf;
      if (event.target.classList.contains("rotateM11")) {
        opTransf = 11;
      } else if (event.target.classList.contains("rotateM5")) {
        opTransf = 5;
      } else if (event.target.classList.contains("rotateM7")) {
        opTransf = 7;
      } else {
        // no transformation = id operation
        opTransf = 1;//this.opId;
      }
      // send to listeners new pcs (or not...)
      // clear css class      
      this.clearRotateClasses();

      // The geometric transformation is finished and we have determined
      // the algebraic transformation operation (opTransformation) that exactly
      // matches the geometrical transformation.
      //
      // Now we perform the algebraic operation to replace the
      // transformed musaic with its transform (and delete its
      // class css from the past operation)
      this.$store.commit('ipcs/mult', opTransf);
      this.$root.$emit('onsetpcs');
      this.enabledButtons();
    },

    /**
     * return true is a cursor is on "wait" (m11 ou m5 or m7)
     */
    isCursorWait() {
      return this.$refs["m11"].style.cursor === "wait";
    },
  }
};

</script>

<style scoped>
.actionable {
  cursor: pointer;
}

.analyse-pcs {
  text-decoration-color: brown;
  font-size: 1rem;
  background-color: blanchedalmond;
}
.rotateM11 {
  animation-duration: 1.5s;
  animation-name: rotation;
}

.rotateM5 {
  animation-duration: 1.5s;
  animation-name: rotate-m5;
}

.rotateM7 {
  animation-duration: 1.5s;
  animation-name: rotate-m7;
}

.anim-button:hover {
  animation-duration: 0.5s;
  animation-name: anim-button;
}

@keyframes anim-button {
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
}

@keyframes rotate-m5 {
  from {
    transform: rotate3d(0, 0, 0, 180deg);
  }
  to {
    transform: rotate3d(1, 1, 0, 180deg);
  }
}

@keyframes rotate-m7 {
  from {
    transform: rotate3d(0, 0, 0, 180deg);
  }
  to {
    transform: rotate3d(-1, 1, 0, 180deg);
  }
}

@keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(180deg);
  }
}
</style>
