(function(t){function e(e){for(var i,a,r=e[0],c=e[1],l=e[2],u=0,h=[];u<r.length;u++)a=r[u],n[a]&&h.push(n[a][0]),n[a]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);p&&p(e);while(h.length)h.shift()();return o.push.apply(o,l||[]),s()}function s(){for(var t,e=0;e<o.length;e++){for(var s=o[e],i=!0,a=1;a<s.length;a++){var c=s[a];0!==n[c]&&(i=!1)}i&&(o.splice(e--,1),t=r(r.s=s[0]))}return t}var i={},n={app:0},o=[];function a(t){return r.p+"js/"+({about:"about"}[t]||t)+"."+{about:"847cb46f"}[t]+".js"}function r(e){if(i[e])return i[e].exports;var s=i[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.e=function(t){var e=[],s=n[t];if(0!==s)if(s)e.push(s[2]);else{var i=new Promise(function(e,i){s=n[t]=[e,i]});e.push(s[2]=i);var o,c=document.createElement("script");c.charset="utf-8",c.timeout=120,r.nc&&c.setAttribute("nonce",r.nc),c.src=a(t),o=function(e){c.onerror=c.onload=null,clearTimeout(l);var s=n[t];if(0!==s){if(s){var i=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src,a=new Error("Loading chunk "+t+" failed.\n("+i+": "+o+")");a.type=i,a.request=o,s[1](a)}n[t]=void 0}};var l=setTimeout(function(){o({type:"timeout",target:c})},12e4);c.onerror=c.onload=o,document.head.appendChild(c)}return Promise.all(e)},r.m=t,r.c=i,r.d=function(t,e,s){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(s,i,function(e){return t[e]}.bind(null,i));return s},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/musaicbox/",r.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=e,c=c.slice();for(var u=0;u<c.length;u++)e(c[u]);var p=l;o.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"0261":function(t,e,s){"use strict";var i=s("bc2d"),n=s.n(i);n.a},"034f":function(t,e,s){"use strict";var i=s("64a9"),n=s.n(i);n.a},"3ce1":function(t,e,s){"use strict";var i=s("b6b4"),n=s.n(i);n.a},"56d7":function(t,e,s){"use strict";s.r(e);s("cadf"),s("551c"),s("f751"),s("097d");var i,n,o=s("2b0e"),a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper",attrs:{id:"app"}},[s("nav",{attrs:{id:"sidebar"}},[s("div",{staticClass:"sidebar-header"},[s("h3",[s("router-link",{attrs:{to:"/"}},[t._v("MusaicBox")])],1)]),s("ul",{staticClass:"list-unstyled components"},[s("li",{staticClass:"active"},[s("router-link",{attrs:{to:"/"}},[t._v("Interactive")])],1),s("li",[s("a",{staticClass:"dropdown-toggle",attrs:{href:"#homeSubmenu","data-toggle":"collapse","aria-expanded":"false"}},[t._v("Predefined")]),s("ul",{staticClass:"collapse list-unstyled",attrs:{id:"homeSubmenu"}},[s("li",[s("router-link",{attrs:{to:"#"}},[t._v("Chords")])],1),s("li",[s("router-link",{attrs:{to:"#"}},[t._v("Scales")])],1),t._m(0)])]),s("li",[s("router-link",{attrs:{to:"/about"}},[t._v("About")])],1)]),t._m(1)]),s("div",{attrs:{id:"content"}},[t._m(2),s("router-view")],1)])},r=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",[s("a",{staticClass:"dropdown-toggle",attrs:{href:"#pageSubmenu","data-toggle":"collapse","aria-expanded":"false"}},[t._v("Others")]),s("ul",{staticClass:"collapse list-unstyled",attrs:{id:"pageSubmenu"}},[s("li",[s("a",{attrs:{href:"#"}},[t._v("Page 1")])]),s("li",[s("a",{attrs:{href:"#"}},[t._v("Page 2")])]),s("li",[s("a",{attrs:{href:"#"}},[t._v("Page 3")])])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",{staticClass:"list-unstyled CTAs"},[s("li",[s("a",{staticClass:"download",attrs:{href:"#"}},[t._v("other")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("nav",{staticClass:"navbar navbar-expand-lg navbar-light bg-light"},[s("div",{staticClass:"container-fluid"},[s("button",{staticClass:"navbar-btn",attrs:{type:"button",id:"sidebarCollapse"}},[s("span"),s("span"),s("span")]),s("button",{staticClass:"btn btn-dark d-inline-block d-lg-none ml-auto",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"}},[s("i",{staticClass:"fas fa-align-justify"})]),s("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarSupportedContent"}},[s("ul",{staticClass:"nav navbar-nav ml-auto"},[s("li",{staticClass:"nav-item active"},[s("a",{staticClass:"nav-link",attrs:{href:"http://88musaics.org"}},[s("span",{staticStyle:{"font-style":"italic","font-size":"small"}},[t._v("from 88musaics.org")])])])])])])])}],c=s("1157"),l=s.n(c),u=l.a,p={mounted:function(){u(document).ready(function(){u("#sidebarCollapse").on("click",function(){u("#sidebar").toggleClass("active"),u(this).toggleClass("active")})})}},h=p,d=(s("034f"),s("2877")),f=Object(d["a"])(h,a,r,!1,null,null,null),m=f.exports,v=s("8c4f"),g=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{class_:"container bg-white"}},[s("div",{staticClass:"row mr-1"},[s("div",{staticClass:"p-2 shadow mb-5 bg-white rounded col",staticStyle:{"max-width":"300px"}},[s("h5",{staticClass:"text-center title-detail pb-2"},[t._v("Musaic")]),s("div",{staticClass:"container ml-4"},[s("Musaic",{staticStyle:{width:"200px",height:"350px"},attrs:{_pcs:"[1,0,0,1,0,0,0,1,0,0,0,0]"}})],1)]),s("div",{staticClass:"p-2 ml-2 shadow mb-5 bg-white rounded col",staticStyle:{"max-width":"280px","min-width":"280px"}},[s("h5",{staticClass:"text-center title-detail pb-2"},[t._v("iPCS")]),s("div",{staticClass:"container "},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-sm text-left"},[s("WrapCanvas",{staticClass:"clockpcs ml-3",staticStyle:{width:"200px",height:"200px"},attrs:{id:"ccanvas"}},[s("ISClock",{attrs:{color:"white"}})],1),s("MusicNotation",{staticClass:"ml-2",attrs:{_ipcs:t.ipcs}}),s("RotateIPcs")],1)])])]),s("div",{staticClass:"p-2 ml-2 shadow mb-5 bg-white rounded col",staticStyle:{"min-width":"350px"}},[s("h5",{staticClass:"text-center title-detail pb-2"},[t._v("Analysis")]),s("div",{staticClass:"container",staticStyle:{height:"70%"}},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-sm text-left"},[s("p",[t._v("\n              PCS :\n              "),s("span",{staticClass:"analyse-pcs"},[t._v(t._s(t.pcsstr))]),t._v("  \n              Card :\n              "),s("span",{staticClass:"analyse-pcs"},[t._v("#"+t._s(t.pcsCard))])]),s("p",[t._v("\n              Interval Vector :\n              "),s("span",{staticClass:"analyse-pcs"},[t._v(t._s(t.iv))])]),s("p",[t._v("\n              CyclicPF :\n              "),s("span",{staticClass:"analyse-pcs"},[t._v(t._s(t.cyclicPF.pcsStr))])]),s("p",[t._v("\n              Forte :\n              "),s("span",{staticClass:"analyse-pcs"},[t._v(t._s(t.fortenum))])])])])]),s("div",{staticClass:"p-3"},[s("p",[t._v("\n          (debug) iPCS :\n          "),s("span",{staticClass:"analyse-pcs"},[t._v(t._s(t.ipcs))]),t._v(" ~\n          "),s("span",{staticClass:"id-pcs"},[t._v("Id : "+t._s(t.id))])])])])])])},b=[],C=s("cebc"),y=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",[s("canvas",{ref:"mcanvas",staticStyle:{border:"1px solid #BBB"},attrs:{id:"mcanvas"}})]),s("div",{staticClass:"extra content text-center aligned"},[s("img",{ref:"m11",staticClass:"actionable img-fluid",attrs:{id:"m11",src:"img/m11.png",title:"m11",width:"60"}}),s("img",{ref:"m5",staticClass:"actionable img-fluid",attrs:{id:"m5",src:"img/m5.png",title:"m5",width:"60"}}),s("img",{ref:"m7",staticClass:"actionable img-fluid",attrs:{id:"m7",src:"img/m7.png",title:"m7",width:"60"}})]),s("div",{staticClass:"extra content text-center aligned"},[s("span",{staticClass:"actionable",on:{click:t.complement}},[s("img",{staticClass:"actionable img-fluid",attrs:{src:"img/cplt.png",title:"complement",width:"40"}})])])])},w=[],_={name:"Musaic",props:{_pcs:String},data:function(){return{CEL_WIDTH:10}},computed:{pcs:{get:function(){return this.$store.state.ipcs.pcs},set:function(t){this.$store.commit("ipcs/changepcs",t),this.forceCanvasUpdate()}},ipcs:{get:function(){return this.$store.state.ipcs.ipcs},set:function(t){this.$store.commit("ipcs/update",t)}}},mounted:function(){var t=this;this.$root.$on("onsetpcs",function(){t.forceCanvasUpdate()});var e=this.$refs.mcanvas;this.addOpTransfOnClickListeners(),this.$el.addEventListener("animationend",this.listenerEndAnim),e.width=e.parentElement.clientWidth,e.height=e.parentElement.clientWidth,e.addEventListener("mousedown",this.mousedown),this.CEL_WIDTH=e.width/13,this._pcs?this.pcs=JSON.parse(this._pcs):this.pcs=[1,0,0,0,0,0,0,0,0,0,0,0]},methods:{forceCanvasUpdate:function(){this.transformsPcsAndDrawsMusaic(1)},complement:function(){this.ipcs=this.ipcs.complement(),this.$root.$emit("onsetpcs")},mousedown:function(t){var e=this.$refs.mcanvas,s=e.getBoundingClientRect(),i=t.clientX-s.left,n=t.clientY-s.top,o=(5*Math.floor(i/this.CEL_WIDTH)+Math.floor(n/this.CEL_WIDTH)+this.ipcs.iroot)%this.ipcs.pcs.length;o!==this.ipcs.iroot&&this.ipcs.cardinal()<this.ipcs.pcs.length-1&&(this.$store.commit("ipcs/toggleindexpcs",o),this.forceCanvasUpdate(),this.$root.$emit("onsetpcs"))},transformsPcsAndDrawsMusaic:function(t){var e=document.getElementById("mcanvas");if(e.getContext){e.width=e.parentElement.clientWidth,e.height=e.width,t>1&&this.$store.commit("ipcs/mult",t);var s=this.ipcs.pcs.length,i=e.getContext("2d");i.strokeStyle="black";for(var n=e.width/(s+1),o=0;o<=s;o++)for(var a=0;a<=s;a++)1===this.ipcs.pcs[(o+this.ipcs.iroot+5*a)%s]?(i.fillStyle="rgb(0, 0, 0)",i.fillRect(a*n,o*n,n,n),i.strokeRect(a*n,o*n,n,n)):(i.fillStyle="white",i.fillRect(a*n,o*n,n,n),i.strokeRect(a*n,o*n,n,n));this.CEL_WIDTH=n}},addOpTransfOnClickListeners:function(){var t=this.$refs["mcanvas"],e=this;document.getElementById("m11").onclick=function(){e.isCursorWait()||(e.disableButtons(),t.classList.add("rotateM11"))},document.getElementById("m5").onclick=function(){e.isCursorWait()||(e.disableButtons(),t.classList.add("rotateM5"))},document.getElementById("m7").onclick=function(){e.isCursorWait()||(e.disableButtons(),t.classList.add("rotateM7"))}},clearRotateClasses:function(){var t=this.$refs["mcanvas"];t.classList.contains("rotateM11")&&t.classList.remove("rotateM11"),t.classList.contains("rotateM5")&&t.classList.remove("rotateM5"),t.classList.contains("rotateM7")&&t.classList.remove("rotateM7")},disableButtons:function(){this.$refs["m11"].disabled=!0,this.$refs["m5"].disabled=!0,this.$refs["m7"].disabled=!0,this.$refs["m11"].style.cursor="wait",this.$refs["m5"].style.cursor="wait",this.$refs["m7"].style.cursor="wait"},enabledButtons:function(){this.$refs["m11"].style.cursor="pointer",this.$refs["m5"].style.cursor="pointer",this.$refs["m7"].style.cursor="pointer",this.$refs["m11"].disabled=!1,this.$refs["m5"].disabled=!1,this.$refs["m7"].disabled=!1},listenerEndAnim:function(t){var e;switch(t.target.className){case"rotateM11":e=11;break;case"rotateM5":e=5;break;case"rotateM7":e=7;break;default:e=1}this.transformsPcsAndDrawsMusaic(e),this.$root.$emit("onsetpcs"),this.clearRotateClasses(),this.enabledButtons()},isCursorWait:function(){return"wait"===this.$refs["m11"].style.cursor}}},$=_,k=(s("9600"),Object(d["a"])($,y,w,!1,null,"a58b9d64",null)),x=k.exports,S=(s("6b54"),s("6c7b"),s("d225")),M=s("b0b4"),P=function(){function t(e,s,i,n){Object(S["a"])(this,t),this.x=e,this.y=s,this.w=i,this.h=n}return Object(M["a"])(t,[{key:"contains",value:function(t,e){return t>=this.x-this.w/2&&t<=this.x+this.w/2&&e>=this.y-this.h/2&&e<=this.y+this.h/2}},{key:"draw",value:function(t){t.beginPath(),t.fillRect(this.x-this.w/2,this.y-this.h/2,this.w,this.h),t.stroke()}},{key:"toString",value:function(){return"{"+this.x+","+this.y+","+this.w+","+this.h+"}"}}]),t}(),O=4,Z={name:"ISClock",inject:["provider"],dateMouseDone:null,points:[],touchendOk:!1,computed:{ipcs:{get:function(){return this.$store.state.ipcs.ipcs},set:function(t){this.$store.commit("ipcs/update",t)}},pcs:{get:function(){return this.$store.state.ipcs.pcs},set:function(t){this.$store.commit("ipcs/changepcs",t)}},iroot:{get:function(){return this.$store.state.ipcs.ipcs.iroot},set:function(t){this.$store.commit("ipcs/setIRoot",t)}},cardinal:function(){return this.$store.getters.pcsCard}},methods:{getSelected:function(t){var e,s,i=this.provider.context,n=i.canvas,o=n.getBoundingClientRect();t.changedTouches?(e=t.changedTouches[0].clientX-o.left,s=Math.round(t.changedTouches[0].clientY-o.top)):(e=t.clientX-o.left,s=Math.round(t.clientY-o.top));for(var a=-1,r=0;r<this.$options.points.length;r++)if(this.$options.points[r].contains(e,s)){a=r;break}return a},isSelected:function(t){return 1==this.ipcs.pcs[t]},setIRoot:function(t){this.iroot=t,this.$root.$emit("onsetpcs")},touchstart:function(t){t&&t.preventDefault(),this.$options.dateMouseDone=new Date},touchend:function(t){if(t){t.preventDefault();var e=this.getSelected(t);if(e<0)return this.$options.dateMouseDone=null,!1;var s=new Date-this.$options.dateMouseDone>=500;this.$options.dateMouseDone=null,e!==this.iroot&&(this.touchendOk=!0,s?this._setIndexToOneOrIRoot(e):this.$store.commit("ipcs/toggleindexpcs",e))}},mousemove:function(t){var e=this.getSelected(t);e>=0&&console.log("mouse move : index/pitch selected = "+e)},mousedown:function(t){this.$options.dateMouseDone=new Date},mouseup:function(t){var e,s=this.getSelected(t);if(s<0||this.touchendOk)return this.touchendOk=!1,!1;t.preventDefault(),t=t||window.event,"which"in t?e=3==t.which:"button"in t&&(e=2==t.button);var i=new Date-this.$options.dateMouseDone>=1e3;if(e||i)return s!=this.iroot&&this._setIndexToOneOrIRoot(s),this.$options.dateMouseDone=null,!1;if(s>=0&&s!==this.iroot){if(0===this.ipcs.pcs[s]&&this.ipcs.cardinal()===this.ipcs.pcs.length-1)return;this.$store.commit("ipcs/toggleindexpcs",s)}},_setIndexToOneOrIRoot:function(t){0===this.ipcs.pcs[t]?this.$store.commit("ipcs/toggleindexpcs",t):this.setIRoot(t)},drawCirclePitch:function(t,e,s,i){var n;t.beginPath(),t.arc(0,0,s,0,2*Math.PI);var o=this.isSelected(e)?e==this.iroot?"red":"yellow":"white";t.fillStyle=o,t.fill(),n=t.createRadialGradient(0,0,.8*s,0,0,1.2*s),n.addColorStop(0,"#333"),n.addColorStop(.5,"white"),n.addColorStop(1,"#333"),t.strokeStyle=n,t.lineWidth=i,t.stroke(),t.beginPath(),t.fillStyle="#333",t.fill(),e<10?t.fillText(e.toString(),-.1,1):t.fillText(e.toString(),-.4,1)},drawPitches:function(t,e){var s;t.font=.1*e+"px arial",t.textBaseline="middle",t.textAlign="center";for(var i=Math.round(e/9),n=0;n<12;n++)s=n*Math.PI/6,t.rotate(s),t.translate(0,-e),t.rotate(-s),this.drawCirclePitch(t,n,i,O),t.rotate(s),t.translate(0,e),t.rotate(-s)},drawPolygon:function(t){var e=this.$options.points,s=!0;t.save(),t.fillStyle="black",t.beginPath();for(var i=0;i<this.ipcs.pcs.length;i++)1===this.ipcs.pcs[i]&&s?(s=!1,t.moveTo(e[i].x,e[i].y)):1===this.ipcs.pcs[i]&&t.lineTo(e[i].x,e[i].y);t.closePath(),t.stroke(),t.restore()},computePitchesRegionSelected:function(t,e,s,i,n){for(var o,a,r=Math.round(n/11),c=3*Math.PI/2,l=0;l<12;l++)o=2*r+Math.round(s+Math.cos(c)*n),a=2*r+Math.round(i+Math.sin(c)*n),this.$options.points[l]=new P(o-2*r,a-2*r,3*r,3*r),c+=Math.PI/6},drawClock:function(t){t.clearRect(0,0,t.canvas.width,t.canvas.height);var e=t.canvas.width/2,s=t.canvas.height/2,i=Math.round(t.canvas.clientWidth/2*.8);this.computePitchesRegionSelected(t.canvas,t,e,s,i),this.drawPolygon(t),t.save(),t.translate(e,s),this.drawPitches(t,i),t.translate(-e,-s),t.restore()}},render:function(){if(this.provider.context){this.$options.setMouseEventDone||(this.provider.elt.addEventListener("mouseup",this.mouseup),this.provider.elt.addEventListener("mousedown",this.mousedown),this.provider.elt.addEventListener("touchstart",this.touchstart,!1),this.provider.elt.addEventListener("touchend",this.touchend,!1),this.provider.elt.addEventListener("contextmenu",this.mouseup),this.$options.setMouseEventDone=!0);var t=this.provider.context;this.drawClock(t)}}},E=Z,I=(s("3ce1"),Object(d["a"])(E,i,n,!1,null,null,null)),T=I.exports,D=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"my-canvas-wrapper text-center"},[s("canvas",{ref:"my-canvas"}),t._t("default")],2)},L=[],j={name:"WrapCanvas",data:function(){return{provider:{context:null,elt:null}}},provide:function(){return{provider:this.provider}},mounted:function(){this.provider.context=this.$refs["my-canvas"].getContext("2d"),this.provider.elt=this.$refs["my-canvas"],this.$refs["my-canvas"].width=this.$refs["my-canvas"].parentElement.clientWidth,this.$refs["my-canvas"].height=this.$refs["my-canvas"].parentElement.clientHeight}},R=j,A=Object(d["a"])(R,D,L,!1,null,null,null),B=A.exports,F=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},W=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"text-center"},[s("div",{attrs:{id:"paper"}})])}],N=s("ee1c"),U=s.n(N),H=["C","^C","D","^D","E","F","^F","G","^G","A","^A","B"],X={name:"MusicNotation",mounted:function(){var t=this;this.refresh(),this.$root.$on("onsetpcs",function(){t.refresh()})},computed:{ipcs:{get:function(){return this.$store.state.ipcs.ipcs},set:function(t){this.$store.commit("ipcs/update",t)}},tune:function(){if(this.ipcs){for(var t="X:1\nL: 1/4\nK:C\n",e="",s="[ ",i=this.ipcs.pcs.length,n=this.ipcs.iroot;n<i+this.ipcs.iroot;n++)if(1===this.ipcs.pcs[n%i]){var o=H[n%i];n%i===3&&1!==this.ipcs.pcs[(n+1)%i]&&(o="_E"),n%i===10&&1!==this.ipcs.pcs[(n+1)%i]&&(o="_B"),n%i<this.ipcs.iroot&&(o+="'"),e=e+o+" ",s+=o}return s="",t+e+s}}},methods:{refresh:function(){U.a.renderAbc("paper",this.tune,{scale:.9,staffwidth:210,paddingleft:1})}}},q=X,G=Object(d["a"])(q,F,W,!1,null,"89960174",null),J=G.exports,V=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"panel-navigate"},[s("span",{staticClass:"actionable",on:{click:function(e){return t.module(2,e)}}},[s("img",{staticClass:"actionable img-fluid",attrs:{src:"img/t-.png",title:"complement",width:"33",height:"41"}}),s("span",[t._v(" M ")]),s("span",{staticClass:"actionable",on:{click:function(e){return t.module(1,e)}}},[s("img",{staticClass:"actionable img-fluid",attrs:{src:"img/t+.png",title:"complement",width:"33",height:"41"}})])]),s("span",{staticClass:"actionable",on:{click:function(e){return t.transpose(-1,e)}}},[s("img",{staticClass:"actionable img-fluid",attrs:{src:"img/t-.png",title:"complement",width:"33",height:"41"}}),s("span",[t._v(" T ")]),s("span",{staticClass:"actionable",on:{click:function(e){return t.transpose(1,e)}}},[s("img",{staticClass:"actionable img-fluid",attrs:{src:"img/t+.png",title:"complement",width:"33",height:"41"}})])])])},Y=[],z={name:"RotateIPcs",mounted:function(){},computed:{ipcs:{get:function(){return this.$store.state.ipcs.ipcs},set:function(t){this.$store.commit("ipcs/update",t)}}},methods:{transpose:function(t,e){e.stopPropagation(),this.$store.commit("ipcs/transpose",t),this.$root.$emit("onsetpcs")},module:function(t,e){e.stopPropagation(),this.$store.commit("ipcs/modulate",t),this.$root.$emit("onsetpcs")}}},K=z,Q=(s("0261"),Object(d["a"])(K,V,Y,!1,null,"2b918392",null)),tt=Q.exports,et=s("2f62"),st={name:"home",computed:Object(C["a"])({pcs:{get:function(){return this.$store.state.ipcs.ipcs.pcs},set:function(t){this.$store.commit("ipcs/changepcs",t)}},ipcs:{get:function(){return this.$store.state.ipcs.ipcs},set:function(t){this.$store.commit("ipcs/update",t)}}},Object(et["b"])("ipcs",{pcsCard:"pcsCard",iv:"iv",id:"id",cyclicPF:"cyclicPF",pcsstr:"pcsstr",fortenum:"fortenum"})),components:{Musaic:x,WrapCanvas:B,ISClock:T,MusicNotation:J,RotateIPcs:tt}},it=st,nt=(s("e48e"),Object(d["a"])(it,g,b,!1,null,"1bbcd9e6",null)),ot=nt.exports;o["a"].use(v["a"]);var at=new v["a"]({mode:"history",base:"/musaicbox/",routes:[{path:"/",name:"home",component:ot},{path:"/about",name:"about",component:function(){return s.e("about").then(s.bind(null,"f820"))}}]}),rt=s("9483");Object(rt["a"])("".concat("/musaicbox/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}});s("4989"),s("ab8b"),s("bfe7");var ct=s("f499"),lt=s.n(ct),ut=(s("c5f6"),s("28a5"),s("2d7d")),pt=s.n(ut),ht=new pt.a;ht.set("[0,1,2]","3-1"),ht.set("[0,1,3]","3-2"),ht.set("[0,1,4]","3-3"),ht.set("[0,1,5]","3-4"),ht.set("[0,1,6]","3-5"),ht.set("[0,2,4]","3-6"),ht.set("[0,2,5]","3-7"),ht.set("[0,2,6]","3-8"),ht.set("[0,2,7]","3-9"),ht.set("[0,3,6]","3-10"),ht.set("[0,3,7]","3-11"),ht.set("[0,4,8]","3-12"),ht.set("[0,1,2,3]","4-1"),ht.set("[0,1,2,4]","4-2"),ht.set("[0,1,2,5]","4-4"),ht.set("[0,1,2,6]","4-5"),ht.set("[0,1,2,7]","4-6"),ht.set("[0,1,3,4]","4-3"),ht.set("[0,1,3,5]","4-11"),ht.set("[0,1,3,6]","4-13"),ht.set("[0,1,3,7]","4-Z29"),ht.set("[0,1,4,5]","4-7"),ht.set("[0,1,4,6]","4-Z15"),ht.set("[0,1,4,7]","4-18"),ht.set("[0,1,4,8]","4-19"),ht.set("[0,1,5,6]","4-8"),ht.set("[0,1,5,7]","4-16"),ht.set("[0,1,5,8]","4-20"),ht.set("[0,1,6,7]","4-9"),ht.set("[0,2,3,5]","4-10"),ht.set("[0,2,3,6]","4-12"),ht.set("[0,2,3,7]","4-14"),ht.set("[0,2,4,6]","4-21"),ht.set("[0,2,4,7]","4-22"),ht.set("[0,2,4,8]","4-24"),ht.set("[0,2,5,7]","4-23"),ht.set("[0,2,5,8]","4-27"),ht.set("[0,2,6,8]","4-25"),ht.set("[0,3,4,7]","4-17"),ht.set("[0,3,5,8]","4-26"),ht.set("[0,3,6,9]","4-28"),ht.set("[0,1,2,3,4]","5-1"),ht.set("[0,1,2,3,5]","5-2"),ht.set("[0,1,2,3,6]","5-4"),ht.set("[0,1,2,3,7]","5-5"),ht.set("[0,1,2,4,5]","5-3"),ht.set("[0,1,2,4,6]","5-9"),ht.set("[0,1,2,4,7]","5-Z36"),ht.set("[0,1,2,4,8]","5-13"),ht.set("[0,1,2,5,6]","5-6"),ht.set("[0,1,2,5,7]","5-14"),ht.set("[0,1,2,5,8]","5-Z38"),ht.set("[0,1,2,6,7]","5-7"),ht.set("[0,1,2,6,8]","5-15"),ht.set("[0,1,3,4,6]","5-10"),ht.set("[0,1,3,4,7]","5-16"),ht.set("[0,1,3,4,8]","5-Z17"),ht.set("[0,1,3,5,6]","5-Z12"),ht.set("[0,1,3,5,7]","5-24"),ht.set("[0,1,3,5,8]","5-27"),ht.set("[0,1,3,6,7]","5-19"),ht.set("[0,1,3,6,8]","5-29"),ht.set("[0,1,3,6,9]","5-31"),ht.set("[0,1,4,5,7]","5-Z18"),ht.set("[0,1,4,5,8]","5-21"),ht.set("[0,1,4,6,8]","5-30"),ht.set("[0,1,4,6,9]","5-32"),ht.set("[0,1,4,7,8]","5-22"),ht.set("[0,1,5,6,8]","5-20"),ht.set("[0,2,3,4,6]","5-8"),ht.set("[0,2,3,4,7]","5-11"),ht.set("[0,2,3,5,7]","5-23"),ht.set("[0,2,3,5,8]","5-25"),ht.set("[0,2,3,6,8]","5-28"),ht.set("[0,2,4,5,8]","5-26"),ht.set("[0,2,4,6,8]","5-33"),ht.set("[0,2,4,6,9]","5-34"),ht.set("[0,2,4,7,9]","5-35"),ht.set("[0,3,4,5,8]","5-Z37"),ht.set("[0,1,2,3,4,5]","6-1"),ht.set("[0,1,2,3,4,6]","6-2"),ht.set("[0,1,2,3,4,7]","6-Z36"),ht.set("[0,1,2,3,4,8]","6-Z37"),ht.set("[0,1,2,3,5,7]","6-9"),ht.set("[0,1,2,3,5,8]","6-Z40"),ht.set("[0,1,2,3,6,7]","6-5"),ht.set("[0,1,2,3,6,8]","6-Z41"),ht.set("[0,1,2,3,6,9]","6-Z42"),ht.set("[0,1,2,3,7,8]","6-Z38"),ht.set("[0,1,2,4,5,8]","6-15"),ht.set("[0,1,2,4,6,8]","6-22"),ht.set("[0,1,2,4,6,9]","6-Z46"),ht.set("[0,1,2,4,7,8]","6-Z17"),ht.set("[0,1,2,4,7,9]","6-Z47"),ht.set("[0,1,2,5,6,9]","6-Z44"),ht.set("[0,1,2,5,7,8]","6-18"),ht.set("[0,1,2,5,7,9]","6-Z48"),ht.set("[0,1,2,6,7,8]","6-7"),ht.set("[0,1,3,4,5,7]","6-Z10"),ht.set("[0,1,3,4,5,8]","6-14"),ht.set("[0,1,3,4,6,9]","6-27"),ht.set("[0,1,3,4,7,9]","6-Z49"),ht.set("[0,1,3,5,7,9]","6-34"),ht.set("[0,1,4,5,7,9]","6-31"),ht.set("[0,1,3,6,7,9]","6-30"),ht.set("[0,2,3,6,7,9]","6-Z29"),ht.set("[0,1,4,5,6,8]","6-16"),ht.set("[0,1,4,5,8,9]","6-20"),ht.set("[0,2,3,4,5,7]","6-8"),ht.set("[0,2,3,4,6,8]","6-21"),ht.set("[0,2,3,4,6,9]","6-Z45"),ht.set("[0,2,3,5,7,9]","6-33"),ht.set("[0,2,4,5,7,9]","6-32"),ht.set("[0,2,4,6,8,10]","6-35"),ht.set("[0,1,2,3,5,6]","6-Z3"),ht.set("[0,1,2,4,5,6]","6-Z4"),ht.set("[0,1,2,4,5,7]","6-Z11"),ht.set("[0,1,2,4,6,7]","6-Z12"),ht.set("[0,1,3,4,6,7]","6-Z13"),ht.set("[0,1,2,5,6,7]","6-Z6"),ht.set("[0,1,3,4,6,8]","6-Z24"),ht.set("[0,1,2,5,6,8]","6-Z43"),ht.set("[0,1,3,5,6,8]","6-Z25"),ht.set("[0,1,3,4,7,8]","6-Z19"),ht.set("[0,1,3,5,7,8]","6-Z26"),ht.set("[0,2,3,4,5,8]","6-Z39"),ht.set("[0,1,3,5,6,9]","6-Z28"),ht.set("[0,1,4,6,7,9]","6-Z50"),ht.set("[0,2,3,5,6,8]","6-Z23"),ht.set("[0,1,2,3,4,5,6,7,8]","9-1"),ht.set("[0,1,2,3,4,5,6,7,9]","9-2"),ht.set("[0,1,2,3,4,5,6,8,9]","9-3"),ht.set("[0,1,2,3,4,5,7,8,9]","9-4"),ht.set("[0,1,2,3,4,6,7,8,9]","9-5"),ht.set("[0,1,2,3,4,5,6,8,10]","9-6"),ht.set("[0,1,2,3,4,5,7,8,10]","9-7"),ht.set("[0,1,2,3,4,6,7,8,10]","9-8"),ht.set("[0,1,2,3,5,6,7,8,10]","9-9"),ht.set("[0,1,2,3,4,6,7,9,10]","9-10"),ht.set("[0,1,2,3,5,6,7,9,10]","9-11"),ht.set("[0,1,2,4,5,6,8,9,10]","9-12"),ht.set("[0,1,2,3,4,5,6,7]","8-1"),ht.set("[0,1,2,3,4,5,6,8]","8-2"),ht.set("[0,1,2,3,4,5,7,8]","8-4"),ht.set("[0,1,2,3,4,6,7,8]","8-5"),ht.set("[0,1,2,3,5,6,7,8]","8-6"),ht.set("[0,1,2,3,4,5,6,9]","8-3"),ht.set("[0,1,2,3,4,5,7,9]","8-11"),ht.set("[0,1,2,3,4,6,7,9]","8-13"),ht.set("[0,1,2,3,5,6,7,9]","8-Z29"),ht.set("[0,1,2,3,4,5,8,9]","8-7"),ht.set("[0,1,2,3,4,6,8,9]","8-Z15"),ht.set("[0,1,2,3,5,6,8,9]","8-18"),ht.set("[0,1,2,4,5,6,8,9]","8-19"),ht.set("[0,1,2,3,4,7,8,9]","8-8"),ht.set("[0,1,2,3,5,7,8,9]","8-16"),ht.set("[0,1,2,4,5,7,8,9]","8-20"),ht.set("[0,1,2,3,6,7,8,9]","8-9"),ht.set("[0,2,3,4,5,6,7,9]","8-10"),ht.set("[0,1,3,4,5,6,7,9]","8-12"),ht.set("[0,1,2,4,5,6,7,9]","8-14"),ht.set("[0,1,2,3,4,6,8,10]","8-21"),ht.set("[0,1,2,3,5,6,8,10]","8-22"),ht.set("[0,1,2,4,5,6,8,10]","8-24"),ht.set("[0,1,2,3,5,7,8,10]","8-23"),ht.set("[0,1,2,4,5,7,8,10]","8-27"),ht.set("[0,1,2,4,6,7,8,10]","8-25"),ht.set("[0,1,3,4,5,6,8,9]","8-17"),ht.set("[0,1,3,4,5,7,8,10]","8-26"),ht.set("[0,1,3,4,6,7,9,10]","8-28"),ht.set("[0,1,2,3,4,5,6]","7-1"),ht.set("[0,1,2,3,4,5,7]","7-2"),ht.set("[0,1,2,3,4,6,7]","7-4"),ht.set("[0,1,2,3,5,6,7]","7-5"),ht.set("[0,1,2,3,4,5,8]","7-3"),ht.set("[0,1,2,3,4,6,8]","7-9"),ht.set("[0,1,2,3,5,6,8]","7-Z36"),ht.set("[0,1,2,4,5,6,8]","7-13"),ht.set("[0,1,2,3,4,7,8]","7-6"),ht.set("[0,1,2,3,5,7,8]","7-14"),ht.set("[0,1,2,4,5,7,8]","7-Z38"),ht.set("[0,1,2,3,6,7,8]","7-7"),ht.set("[0,1,2,4,6,7,8]","7-15"),ht.set("[0,1,2,3,4,6,9]","7-10"),ht.set("[0,1,2,3,5,6,9]","7-16"),ht.set("[0,1,2,4,5,6,9]","7-Z17"),ht.set("[0,1,2,3,4,7,9]","7-Z12"),ht.set("[0,1,2,3,5,7,9]","7-24"),ht.set("[0,1,2,4,5,7,9]","7-27"),ht.set("[0,1,2,3,6,7,9]","7-19"),ht.set("[0,1,2,4,6,7,9]","7-29"),ht.set("[0,1,3,4,6,7,9]","7-31"),ht.set("[0,1,2,3,6,7,10]","7-Z18"),ht.set("[0,1,2,4,5,8,9]","7-21"),ht.set("[0,1,2,4,6,8,9]","7-30"),ht.set("[0,1,3,4,6,8,9]","7-32"),ht.set("[0,1,3,4,7,8,9]","7-22"),ht.set("[0,1,2,5,6,7,9]","7-20"),ht.set("[0,2,3,4,5,6,8]","7-8"),ht.set("[0,1,3,4,5,6,8]","7-11"),ht.set("[0,2,3,4,5,7,9]","7-23"),ht.set("[0,2,3,4,6,7,9]","7-25"),ht.set("[0,1,3,5,6,7,9]","7-28"),ht.set("[0,1,3,4,5,7,9]","7-26"),ht.set("[0,1,3,5,7,9,11]","7-33"),ht.set("[0,1,3,5,7,9,10]","7-34"),ht.set("[0,1,3,5,6,8,10]","7-35"),ht.set("[0,1,3,4,5,7,8]","7-Z37");var dt=function(t){return ht.get(t)},ft=1,mt=2,vt=function(t,e){return e- -1*t%e},gt=function(){function t(e,s){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;Object(S["a"])(this,t),this.pcs="string"===typeof e?this._fromStringTobinArray(e):e,this.iroot=s,this.prev_ipcs_cplt=i||null}return Object(M["a"])(t,[{key:"_fromStringTobinArray",value:function(t){var e=new Array(12).fill(0);("["===t[0]&&"]"===t[t.length-1]||"{"===t[0]&&"}"===t[t.length-1])&&(t=t.substring(1,t.length-1));for(var s=t.split(","),i=0;i<s.length;i++)e[Number(s[i])]=1;return e}},{key:"id",value:function(){return t.id(this.pcs)}},{key:"cyclicPrimeForm",value:function(){for(var e=this.pcs.length,s=this.pcs.slice(),i=s,n=t.id(this.pcs),o=0;o<e-1;o++){s=t.getPermute(1,1,0,s);var a=t.id(s);n>a&&(n=a,i=s)}return new t(i,this.iroot)}},{key:"dihedralPrimeForm",value:function(){var t=this.cyclicPrimeForm(),e=t.affineOp(11,0).cyclicPrimeForm();return t.id()<e.id()?t:e}},{key:"affineOp",value:function(e,s){return new t(t.getPermute(e,s,this.iroot,this.pcs),(this.pcs.length+this.iroot+s)%this.pcs.length)}},{key:"transpose",value:function(t){return this.affineOp(1,t)}},{key:"modulate",value:function(e){var s=this.iroot;if(e===t.NEXT_MODULATION){for(var i=this.pcs.length,n=this.iroot+1;n<i+this.iroot;n++)if(1===this.pcs[n%i]){s=n%i;break}}else if(e===t.PREV_MODULATION){var o=this.pcs.length,a=this.iroot-1;for(a<0&&(a=vt(a,o));a!==this.iroot;){if(1===this.pcs[a%o]){s=a%o;break}a--,a<0&&(a=vt(a,o))}}return new t(this.pcs.slice(),s)}},{key:"getForteNum",value:function(){var t=this.cyclicPrimeForm(),e=dt(t.pcsStr);if(e)return e;var s=t.dihedralPrimeForm();return dt(s.pcsStr)}},{key:"setIroot",value:function(t){this.iroot=t,this.pcs[t]=1}},{key:"iv",value:function(){for(var t=this.pcs.length,e=new Array(t/2+t%2),s=t/2,i=0,n=0;n<s;n++){e[n]=0,i++;for(var o=0;o<t;o++)1===this.pcs[o]&&1===this.pcs[(o+i)%t]&&(e[n]=e[n]+1)}return e[e.length-1]/=2,e}},{key:"cardinal",value:function(){return this.pcs.filter(function(t){return 1===t}).length}},{key:"complement",value:function(){if(this.prev_ipcs_cplt)return this.prev_ipcs_cplt;for(var e=this.pcs.map(function(t){return 1===t?0:1}),s=void 0,i=e.length,n=this.iroot+1;n<this.iroot+i;n++)if(1===e[n%i]){s=n%i;break}if(void 0===s)throw new Error("Complement : Cannot initialize iroot !!!");return new t(e,s,this)}},{key:"toString",value:function(){return lt()(this.pcs)+", iroot : "+lt()(this.iroot)+(this.prev_ipcs_cplt?", (cplt)":"")}},{key:"equals",value:function(e){return e instanceof t&&(this.pcs.every(function(t,s){return t===e.pcs[s]})&&this.iroot===e.iroot)}},{key:"pcsStr",get:function(){for(var t="",e=0;e<this.pcs.length;e++){var s=this.pcs[e];s&&(t=t?t+","+e.toString():e.toString())}return"["+t+"]"}}],[{key:"id",value:function(t){for(var e=t.length,s=0,i=1,n=0,o=0;o<e;o++)s+=t[o]*i,i*=2,1===t[o]&&n++;return s+n*(1<<e)}},{key:"getPermute",value:function(t,e,s,i){var n,o=i.slice(),a=i.length;e<0&&(e=vt(e,a));for(var r=0;r<a;r++)n=(r*t-(t-1)*s-e)%a,o[r]=i[(n+a)%a];return o}},{key:"NEXT_MODULATION",get:function(){return ft}},{key:"PREV_MODULATION",get:function(){return mt}}]),t}(),bt={ipcs:new gt("0,4,7",0)},Ct={pcsCard:function(t){return t.ipcs.cardinal()},iv:function(t){return t.ipcs.iv()},id:function(t){return t.ipcs.id()},pcsstr:function(t){return t.ipcs.pcsStr},cyclicPF:function(t){return t.ipcs.cyclicPrimeForm()},fortenum:function(t,e){return t.ipcs.getForteNum()},pcs:function(t){return t.ipcs.pcs},ipcs:function(t){return t.ipcs}},yt={},wt={update:function(t,e){t.ipcs=e},changepcs:function(t,e){t.ipcs.pcs=e},toggleindexpcs:function(t,e){t.ipcs.pcs=t.ipcs.pcs.map(function(t,s){return s===e?1===t?0:1:t})},changevalueatindex:function(t,e){t.ipcs.pcs=t.ipcs.pcs.map(function(t,s){return s===e.index?e.value:t})},setIRoot:function(t,e){t.ipcs.setIroot(e)},transpose:function(t,e){t.ipcs=t.ipcs.transpose(e)},modulate:function(t,e){t.ipcs=t.ipcs.modulate(e)},mult:function(t,e){t.ipcs=t.ipcs.affineOp(e,0)}},_t={namespaced:!0,state:bt,getters:Ct,actions:yt,mutations:wt};o["a"].use(et["a"]);var $t=new et["a"].Store({modules:{ipcs:_t}}),kt=s("ecee"),xt=s("c074"),St=s("ad3d");kt["c"].add(xt["c"],xt["a"],xt["d"]),kt["c"].add(xt["b"]),o["a"].component("font-awesome-icon",St["a"]),o["a"].config.productionTip=!1,new o["a"]({router:at,store:$t,render:function(t){return t(m)}}).$mount("#app")},"64a9":function(t,e,s){},"655b":function(t,e,s){},9600:function(t,e,s){"use strict";var i=s("655b"),n=s.n(i);n.a},"9bcc":function(t,e,s){},b6b4:function(t,e,s){},bc2d:function(t,e,s){},bfe7:function(t,e,s){},e48e:function(t,e,s){"use strict";var i=s("9bcc"),n=s.n(i);n.a}});
//# sourceMappingURL=app.bfc5f822.js.map