(function(t){function e(e){for(var n,r,o=e[0],c=e[1],l=e[2],u=0,f=[];u<o.length;u++)r=o[u],a[r]&&f.push(a[r][0]),a[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);d&&d(e);while(f.length)f.shift()();return i.push.apply(i,l||[]),s()}function s(){for(var t,e=0;e<i.length;e++){for(var s=i[e],n=!0,r=1;r<s.length;r++){var c=s[r];0!==a[c]&&(n=!1)}n&&(i.splice(e--,1),t=o(o.s=s[0]))}return t}var n={},a={app:0},i=[];function r(t){return o.p+"js/"+({about:"about"}[t]||t)+"."+{about:"f621fca3"}[t]+".js"}function o(e){if(n[e])return n[e].exports;var s=n[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.e=function(t){var e=[],s=a[t];if(0!==s)if(s)e.push(s[2]);else{var n=new Promise(function(e,n){s=a[t]=[e,n]});e.push(s[2]=n);var i,c=document.createElement("script");c.charset="utf-8",c.timeout=120,o.nc&&c.setAttribute("nonce",o.nc),c.src=r(t),i=function(e){c.onerror=c.onload=null,clearTimeout(l);var s=a[t];if(0!==s){if(s){var n=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src,r=new Error("Loading chunk "+t+" failed.\n("+n+": "+i+")");r.type=n,r.request=i,s[1](r)}a[t]=void 0}};var l=setTimeout(function(){i({type:"timeout",target:c})},12e4);c.onerror=c.onload=i,document.head.appendChild(c)}return Promise.all(e)},o.m=t,o.c=n,o.d=function(t,e,s){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(s,n,function(e){return t[e]}.bind(null,n));return s},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/musaicbox/",o.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=e,c=c.slice();for(var u=0;u<c.length;u++)e(c[u]);var d=l;i.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"034f":function(t,e,s){"use strict";var n=s("64a9"),a=s.n(n);a.a},"15f6":function(t,e,s){},3241:function(t,e,s){"use strict";var n=s("15f6"),a=s.n(n);a.a},"56d7":function(t,e,s){"use strict";s.r(e);s("cadf"),s("551c"),s("f751"),s("097d");var n=s("2b0e"),a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper",attrs:{id:"app"}},[s("nav",{attrs:{id:"sidebar"}},[s("div",{staticClass:"sidebar-header"},[s("h3",[s("router-link",{attrs:{to:"/"}},[t._v("MusaicBox")])],1)]),s("ul",{staticClass:"list-unstyled components"},[s("li",{staticClass:"active"},[s("router-link",{attrs:{to:"/"}},[t._v("Interactive")])],1),s("li",[s("a",{staticClass:"dropdown-toggle",attrs:{href:"#homeSubmenu","data-toggle":"collapse","aria-expanded":"false"}},[t._v("Predefined")]),s("ul",{staticClass:"collapse list-unstyled",attrs:{id:"homeSubmenu"}},[s("li",[s("router-link",{attrs:{to:"/"}},[t._v("Chords")])],1),s("li",[s("router-link",{attrs:{to:"/about"}},[t._v("Scales")])],1),t._m(0)])]),s("li",[s("router-link",{attrs:{to:"/about"}},[t._v("About")])],1),t._m(1)]),t._m(2)]),s("div",{attrs:{id:"content"}},[t._m(3),s("router-view")],1)])},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",[s("a",{staticClass:"dropdown-toggle",attrs:{href:"#pageSubmenu","data-toggle":"collapse","aria-expanded":"false"}},[t._v("Autres entrées")]),s("ul",{staticClass:"collapse list-unstyled",attrs:{id:"pageSubmenu"}},[s("li",[s("a",{attrs:{href:"#"}},[t._v("Page 1")])]),s("li",[s("a",{attrs:{href:"#"}},[t._v("Page 2")])]),s("li",[s("a",{attrs:{href:"#"}},[t._v("Page 3")])])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",[s("a",{attrs:{href:"#"}},[t._v("Contact")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",{staticClass:"list-unstyled CTAs"},[s("li",[s("a",{staticClass:"download",attrs:{href:"#"}},[t._v("Download source")])]),s("li",[s("a",{staticClass:"article",attrs:{href:"#"}},[t._v("Back to article")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("nav",{staticClass:"navbar navbar-expand-lg navbar-light bg-light"},[s("div",{staticClass:"container-fluid"},[s("button",{staticClass:"navbar-btn",attrs:{type:"button",id:"sidebarCollapse"}},[s("span"),s("span"),s("span")]),s("button",{staticClass:"btn btn-dark d-inline-block d-lg-none ml-auto",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"}},[s("i",{staticClass:"fas fa-align-justify"})]),s("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarSupportedContent"}},[s("ul",{staticClass:"nav navbar-nav ml-auto"},[s("li",{staticClass:"nav-item active"},[s("a",{staticClass:"nav-link",attrs:{href:"http://88musaics.org"}},[s("span",{staticStyle:{"font-style":"italic","font-size":"small"}},[t._v("from 88musaics.org")])])])])])])])}],r=s("1157"),o=s.n(r),c=o.a,l={mounted:function(){c(document).ready(function(){c("#sidebarCollapse").on("click",function(){c("#sidebar").toggleClass("active"),c(this).toggleClass("active")})})}},u=l,d=(s("034f"),s("2877")),f=Object(d["a"])(u,a,i,!1,null,null,null),p=f.exports,h=s("8c4f"),m=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home d-flex bd-highlight"},[s("div",{staticClass:"m-r-5 p-2 w-60 bd-highlight"},[s("h3",[t._v("Musaic")]),s("MusaicBox",{staticClass:"shadow p-3 mb-5 bg-white rounded",staticStyle:{width:"300px",height:"380px"},attrs:{_pcs:"[1,0,0,1,0,0,0,1,0,0,0,0]"},on:{onpcs:t.onPcsChange}}),s("p",[t._v(t._s(t.pcs))])],1),s("div",{staticClass:"container-fluid ml-5 p-2 shadow p-3 mb-5 bg-white rounded"},[s("h4",{staticClass:"text-center title-detail pb-2"},[t._v("Analysis")]),s("div",{staticClass:"container"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-sm text-left"},[s("p",[t._v("\n            Binary :\n            "),s("span",{staticClass:"binary-pcs"},[t._v(t._s(t.pcs))])]),s("p",[t._v("\n            PCS :\n            "),s("span",{staticClass:"binary-pcs"},[t._v(t._s(t.pcsstr))])])]),s("div",{staticClass:"col-sm"},[t._v("autres infos")])])])])])},v=[],b=(s("6b54"),function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",[s("canvas",{ref:"mcanvas",staticStyle:{border:"1px solid #BBB"},attrs:{id:"mcanvas"},on:{click:t.onclick}})]),s("div",{staticClass:"extra content text-center aligned"},[s("img",{ref:"m11",staticClass:"actionable",attrs:{id:"m11",src:"img/m11.png",width:"70"}}),s("img",{ref:"m5",staticClass:"actionable",attrs:{id:"m5",src:"img/m5.png",width:"70"}}),s("img",{ref:"m7",staticClass:"actionable",attrs:{id:"m7",src:"img/m7.png",width:"70"}})])])}),g=[],C=(s("6c7b"),{name:"MusaicBox",props:{_pcs:String},data:function(){return{pcs:[0,0,0,0,0,0,0,0,0,0,0,0],CEL_WIDTH:10}},mounted:function(){var t=this.$refs.mcanvas;this.addOpTransfOnClickListeners(),this.$el.addEventListener("animationend",this.listenerEndAnim),t.width=t.parentElement.clientWidth,t.height=t.parentElement.clientWidth,t.addEventListener("mousedown",this.mousedown),this._pcs&&(this.pcs=JSON.parse(this._pcs)),this.$set(this.pcs,0,this.pcs[0]),this.transformsPcsAndDrawsMusaic(this.opId),this.$emit("onpcs",this.pcs)},methods:{onclick:function(){},mousedown:function(t){var e=this.$refs.mcanvas,s=e.getBoundingClientRect(),n=t.clientX-s.left,a=t.clientY-s.top,i=(5*Math.floor(n/this.CEL_WIDTH)+Math.floor(a/this.CEL_WIDTH))%this.pcs.length;i>0&&(this.$set(this.pcs,i,this.pcs[i]?0:1),this.transformsPcsAndDrawsMusaic(this.opId),this.$emit("onpcs",this.pcs))},opM:function(t,e){for(var s=t.length,n=t.slice().fill(0),a=0;a<s;a++)n[a]=t[a*e%s];return n},opM5:function(t){return this.opM(t,5)},opM7:function(t){return this.opM(t,7)},opM11:function(t){return this.opM(t,11)},opId:function(t){return t},transformsPcsAndDrawsMusaic:function(t){var e=this.$refs["mcanvas"];if(e.getContext){this.pcs=t(this.pcs);var s=this.pcs.length,n=e.getContext("2d");n.strokeStyle="black";for(var a=this.$refs["mcanvas"].width/(s+1),i=0;i<=s;i++)for(var r=0;r<=s;r++)1==this.pcs[(i+5*r)%s]?(n.fillStyle="rgb(0, 0, 0)",n.fillRect(r*a,i*a,a,a),n.strokeRect(r*a,i*a,a,a)):(n.fillStyle="white",n.fillRect(r*a,i*a,a,a),n.strokeRect(r*a,i*a,a,a));this.CEL_WIDTH=a}},addOpTransfOnClickListeners:function(){var t=this.$refs["mcanvas"],e=this;document.getElementById("m11").onclick=function(){e.isCursorWait()||(e.disableButtons(),t.classList.add("rotateM11"))},document.getElementById("m5").onclick=function(){e.isCursorWait()||(e.disableButtons(),t.classList.add("rotateM5"))},document.getElementById("m7").onclick=function(){e.isCursorWait()||(e.disableButtons(),t.classList.add("rotateM7"))}},clearRotateClasses:function(){var t=this.$refs["mcanvas"];t.classList.contains("rotateM11")&&t.classList.remove("rotateM11"),t.classList.contains("rotateM5")&&t.classList.remove("rotateM5"),t.classList.contains("rotateM7")&&t.classList.remove("rotateM7")},disableButtons:function(){this.$refs["m11"].disabled=!0,this.$refs["m5"].disabled=!0,this.$refs["m7"].disabled=!0,this.$refs["m11"].style.cursor="wait",this.$refs["m5"].style.cursor="wait",this.$refs["m7"].style.cursor="wait"},enabledButtons:function(){this.$refs["m11"].style.cursor="pointer",this.$refs["m5"].style.cursor="pointer",this.$refs["m7"].style.cursor="pointer",this.$refs["m11"].disabled=!1,this.$refs["m5"].disabled=!1,this.$refs["m7"].disabled=!1},listenerEndAnim:function(t){var e;switch(t.target.className){case"rotateM11":e=this.opM11;break;case"rotateM5":e=this.opM5;break;case"rotateM7":e=this.opM7;break;default:e=this.opId}this.transformsPcsAndDrawsMusaic(e),this.$emit("onpcs",this.pcs),this.clearRotateClasses(),this.enabledButtons()},isCursorWait:function(){return"wait"==this.$refs["m11"].style.cursor}}}),_=C,w=(s("e0de"),Object(d["a"])(_,b,g,!1,null,"06a4b757",null)),y=w.exports,M={name:"home",data:function(){return{pcs:""}},methods:{onPcsChange:function(t){this.pcs=t}},computed:{pcsstr:function(){for(var t="",e=0;e<this.pcs.length;e++){var s=this.pcs[e];s&&(t=t?t+", "+e.toString():e.toString())}return"[ "+t+" ]"}},components:{MusaicBox:y}},k=M,$=(s("3241"),Object(d["a"])(k,m,v,!1,null,"0a21c6b4",null)),x=$.exports;n["a"].use(h["a"]);var S=new h["a"]({mode:"history",base:"/musaicbox/",routes:[{path:"/",name:"home",component:x},{path:"/about",name:"about",component:function(){return s.e("about").then(s.bind(null,"f820"))}}]}),E=s("9483");Object(E["a"])("".concat("/musaicbox/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}});s("4989"),s("ab8b"),s("bfe7");n["a"].config.productionTip=!1,new n["a"]({router:S,render:function(t){return t(p)}}).$mount("#app")},"64a9":function(t,e,s){},bfe7:function(t,e,s){},e0de:function(t,e,s){"use strict";var n=s("e186"),a=s.n(n);a.a},e186:function(t,e,s){}});
//# sourceMappingURL=app.d7e51054.js.map