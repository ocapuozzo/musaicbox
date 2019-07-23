<!--
  - Copyright (c) 2019. Olivier Capuozzo
  -->

<template>
  <vue-draggable-resizable :w="ww" :h="ww" @dragging="onDrag"
                           @resizing="onResize" 
                           :parent="false" 
                           :on-drag-start="onDragStartCallback" 
                           :handles="['tl','tr','br','bl']"
                           :lock-aspect-ratio="true"
                           :grid="[10,10]" class-name-active="my-active-class" class-name="my-class"
  >
    <Clock ref="aClock"></Clock>
    <!--    <p>Hello! I'm a flexible component. You can drag me around and you can resize me.<br>-->
    <!--      X: {{ x }} / Y: {{ y }} - Width: {{ wsize }} / Height: {{ height }}</p>-->
  </vue-draggable-resizable>
</template>

<script>
  import Clock from './Clock'

  export default {
    name: "MovableClock",
    props: {
      size: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        width: 100,
        height: 0,
        x: 0,
        y: 0,
      }
    },
    mounted() {
      if (this.size) {
        this.width = Number(this.size)
      }
    },
    computed: {
      ww() {
        return Number(this.width)
      }
    },
    methods: {
      onResize: function (x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        // console.log("width : " + this.width)
        // check new dimension
        this.$refs.aClock.draw()
      },
      onDrag: function (x, y) {
        this.x = x
        this.y = y
      },
      onDragStartCallback(ev){
        return true
      }
    },
    components: {
      Clock
    }
  }
</script>

<style>

  .my-class {
    -webkit-transition: background-color 200ms linear;
    -moz-transition: background-color 200ms linear;
    transition: background-color 200ms linear;
  }

  .my-active-class {
    border: 1px solid black;
    -webkit-box-shadow: 5px 5px 2px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 5px 5px 2px 0px rgba(0,0,0,0.75);
    box-shadow: 5px 5px 2px 0px rgba(0,0,0,0.75);
  }
</style>
