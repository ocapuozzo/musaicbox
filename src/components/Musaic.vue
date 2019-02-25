<template>
  <div>
    <div>
      <canvas ref="mcanvas" id="mcanvas" style="border:1px solid #BBB;"></canvas>
    </div>
    <div class="extra content text-center aligned">
      <img id="m11" ref="m11" src="img/m11.png" class="actionable img-fluid" width="70">
      <img id="m5" ref="m5" src="img/m5.png" class="actionable img-fluid" width="70">
      <img id="m7" ref="m7" src="img/m7.png" class="actionable img-fluid" width="70">
    </div>
    <!-- p>{{pcs}}</p -->
  </div>
</template>

<script>

export default {
  name: "Musaic",
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
      }
    },
    ipcs: {
      get() {        
        return this.$store.state.ipcs
      },
      set(value) {
        this.$store.commit('ipcs/update', value);
      }
    },

  },
  mounted() {

    // define event on root, which call by ISClock component
    // (canvas non reactive with vuex...)
    this.$root.$on('onsetpcs', () => { 
      console.log('event onsetpcs');
      this.forceCanvasUpdate();
    });

    // console.log(this.$refs['mcanvas']);
    let canvas = this.$refs.mcanvas;

    this.addOpTransfOnClickListeners();
    this.$el.addEventListener("animationend", this.listenerEndAnim);

    // We can't access the rendering context until the canvas is mounted to the DOM.
    canvas.width = canvas.parentElement.clientWidth
    canvas.height = canvas.parentElement.clientWidth; //Height;
    canvas.addEventListener('mousedown', this.mousedown);
    if (this._pcs) {
      this.pcs = JSON.parse(this._pcs);
    } else {
      this.pcs = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
    this.CEL_WIDTH = canvas.width / (this.pcs.length + 1);
    this.transformsPcsAndDrawsMusaic(1);    
  },

  methods: {
    forceCanvasUpdate() {
      this.transformsPcsAndDrawsMusaic(1);
    },
    mousedown(e) {
      let mcanvas = this.$refs.mcanvas;
      let rect = mcanvas.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;

      // from matrix coord to indice linear
      let indice = ((5 * Math.floor(x / this.CEL_WIDTH))
        + (Math.floor(y / this.CEL_WIDTH)) + this.ipcs.iroot) % this.pcs.length;

      // musaic invariant : pitch zero is always to 1
      // why ? for Bijective morphism (polymorphism) 
      // between algebra and geometry
      if (indice != this.ipcs.iroot) {
        this.$set(this.pcs, indice, (this.pcs[indice] == 1) ? 0 : 1);       
        this.transformsPcsAndDrawsMusaic(1);    
      }
    },

   
    /**
     * After geometrical transformation, set pcs transformation
     * (algebric) and draw its musaic representation (geometric)
     * so, no change visualy if ok !
     */
    transformsPcsAndDrawsMusaic(operation) {
      // get canvas direct from DOM
      let canvas = document.getElementById("mcanvas");
      if (!canvas.getContext) return;

      canvas.width = canvas.parentElement.clientWidth
      canvas.height = canvas.parentElement.clientWidth;

      // Algebraic transformation
      //console.log("before op : " + this.pcs);
      if (operation > 1) {
         this.$store.commit('ipcs/mult', operation);
      }

      let n = this.pcs.length;

      let ctx = canvas.getContext("2d");

      ctx.strokeStyle = "black";

      let CEL_WIDTH = canvas.width / (n + 1);

      // Draws musaic
      // loop n+1 for exact correlation between geometry ops and algebra ops
      // display *iroot centred* for bijection geometry <-> algebra
      // Example. 
      //   ipcs : ({0, 3, 6, 9}, iroot=0) 
      //   ipcs : ({1, 4, 7, 10}, iroot=1)  
      // are same IS, are same Musaic representation 
      for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= n; j++) {
          if (this.ipcs.pcs[(i + this.ipcs.iroot + j * 5) % n] == 1) {
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(j * CEL_WIDTH, i * CEL_WIDTH, CEL_WIDTH, CEL_WIDTH);
            ctx.strokeRect(j * CEL_WIDTH, i * CEL_WIDTH, CEL_WIDTH, CEL_WIDTH);
          } else {
            ctx.fillStyle = "white";
            ctx.fillRect(j * CEL_WIDTH, i * CEL_WIDTH, CEL_WIDTH, CEL_WIDTH);
            ctx.strokeRect(j * CEL_WIDTH, i * CEL_WIDTH, CEL_WIDTH, CEL_WIDTH);
          }
        }
      }
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
      let $m = this.$refs["mcanvas"];
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
      let opTransf;

      switch (event.target.className) {
        case "rotateM11":
          opTransf = 11;
          break;
        case "rotateM5":
          opTransf = 5;
          break;
        case "rotateM7":
          opTransf = 7;
          break;
        default:
          // no transformation = id operation
          opTransf = 1;//this.opId;
      }
      // The geometric transformation is finished and we have determined
      // the algebraic transformation operation (opTransformation) that exactly
      // matches the geometrical transformation.
      //
      // Now we perform the algebraic operation to replace the
      // transformed musaic with its transform (and delete its
      // class css from the past operation)
      this.transformsPcsAndDrawsMusaic(opTransf);
      // send to listeners new pcs (or not...)
      //this.$emit('onpcs', this.pcs);
      // clear css class
      this.clearRotateClasses();
      this.enabledButtons();
    },

    /**
     * return true is a cursor is on "wait" (m11 ou m5 or m7)
     */
    isCursorWait() {
      return this.$refs["m11"].style.cursor == "wait";
    },
  }
};

</script>

<style scoped>
.actionable {
  cursor: pointer;
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
