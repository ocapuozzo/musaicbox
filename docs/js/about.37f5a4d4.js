(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"044b":function(t,e,s){"use strict";var i=s("42e5"),n=s.n(i);n.a},2721:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"board-explorer"},[s("MovableClock",{attrs:{size:120}})],1)},n=[],a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("vue-draggable-resizable",{attrs:{w:t.ww,h:t.ww,parent:!1,"on-drag-start":t.onDragStartCallback,handles:["tl","tr","br","bl"],"lock-aspect-ratio":!0,grid:[10,10],"class-name-active":"my-active-class","class-name":"my-class"},on:{dragging:t.onDrag,resizing:t.onResize}},[s("Clock",{ref:"aClock"})],1)},r=[],o=(s("c5f6"),s("17e2")),c={name:"MovableClock",props:{size:{type:Number,default:50}},data:function(){return{width:50,height:50,x:0,y:0}},mounted:function(){this.size&&(this.width=Number(this.size),this.height=Number(this.size)),this.$refs.aClock.size=this.width,this.$refs.aClock.draw()},computed:{ww:function(){return Number(this.width)}},methods:{onResize:function(t,e,s,i){this.x=t,this.y=e,this.width=s,this.height=i,this.$refs.aClock.size=this.width,this.$refs.aClock.draw()},onDrag:function(t,e){this.x=t,this.y=e},onDragStartCallback:function(t){return!0}},components:{Clock:o["a"]}},l=c,u=(s("3e10"),s("2877")),h=Object(u["a"])(l,a,r,!1,null,null,null),d=h.exports,f={components:{MovableClock:d}},b=f,w=(s("044b"),Object(u["a"])(b,i,n,!1,null,"2d3246d6",null));e["default"]=w.exports},"3e10":function(t,e,s){"use strict";var i=s("81d4"),n=s.n(i);n.a},"42e5":function(t,e,s){},"81d4":function(t,e,s){}}]);
//# sourceMappingURL=about.37f5a4d4.js.map