(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"11fd":function(t,e,s){"use strict";var i=s("c1f9"),n=s.n(i);n.a},"20fd":function(t,e,s){"use strict";var i=s("d9f6"),n=s("aebd");t.exports=function(t,e,s){e in t?i.f(t,e,n(0,s)):t[e]=s}},2904:function(t,e,s){"use strict";var i=s("3930"),n=s.n(i);n.a},"2f21":function(t,e,s){"use strict";var i=s("79e5");t.exports=function(t,e){return!!t&&i(function(){e?t.call(null,function(){},1):t.call(null)})}},3930:function(t,e,s){},"4ebe":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"group-action"},[s("h2",[t._v("Group & group action explorer ")]),s("div",{staticClass:"d-flex flex-row"},[s("div",{staticClass:"input-group group-dim "},[t._m(0),s("select",{directives:[{name:"model",rawName:"v-model",value:t.n,expression:"n"}],staticClass:"custom-select ",attrs:{id:"inputGroupSelect01"},on:{change:[function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.n=e.target.multiple?s:s[0]},function(e){return t.onChangeN(e)}]}},[t._l([3,4,5,6,7,8,9,10,11],function(e){return s("option",{key:e},[t._v("\n          "+t._s(e)+"\n        ")])}),s("option",{attrs:{value:"12",selected:""}},[t._v("12")])],2)]),s("div",{staticClass:"pl-2"},[s("fieldset",{staticClass:"representation-border "},[s("legend",{staticClass:"representation-border"},[t._v("Generator group operations")]),s("fieldset",{staticClass:"representation-border "},[s("legend",{staticClass:"representation-border"},[t._v("Multiplication")]),t._l(t.primesWithN,function(e,i){return s("div",{key:i,staticClass:"form-check form-check-inline"},[s("input",1===e?{directives:[{name:"model",rawName:"v-model",value:t.opMultChoices,expression:"opMultChoices"}],staticClass:"form-check-input",attrs:{type:"checkbox",disabled:""},domProps:{value:e,checked:Array.isArray(t.opMultChoices)?t._i(t.opMultChoices,e)>-1:t.opMultChoices},on:{change:function(s){var i=t.opMultChoices,n=s.target,r=!!n.checked;if(Array.isArray(i)){var o=e,a=t._i(i,o);n.checked?a<0&&(t.opMultChoices=i.concat([o])):a>-1&&(t.opMultChoices=i.slice(0,a).concat(i.slice(a+1)))}else t.opMultChoices=r}}}:{directives:[{name:"model",rawName:"v-model",value:t.opMultChoices,expression:"opMultChoices"}],staticClass:"form-check-input",attrs:{type:"checkbox"},domProps:{value:e,checked:Array.isArray(t.opMultChoices)?t._i(t.opMultChoices,e)>-1:t.opMultChoices},on:{change:[function(s){var i=t.opMultChoices,n=s.target,r=!!n.checked;if(Array.isArray(i)){var o=e,a=t._i(i,o);n.checked?a<0&&(t.opMultChoices=i.concat([o])):a>-1&&(t.opMultChoices=i.slice(0,a).concat(i.slice(a+1)))}else t.opMultChoices=r},function(e){return t.buildAllOperationsOfGroup(t.opMultChoices)}]}}),s("label",{staticClass:"form-check-label"},[t._v("M"+t._s(e))])])})],2),s("fieldset",{staticClass:"representation-border "},[s("legend",{staticClass:"representation-border"},[t._v("Translation")]),s("div",{staticClass:"form-check form-check-inline"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.opTransChoices,expression:"opTransChoices"}],staticClass:"form-check-input",attrs:{type:"checkbox",disabled:""},domProps:{value:0,checked:Array.isArray(t.opTransChoices)?t._i(t.opTransChoices,0)>-1:t.opTransChoices},on:{change:function(e){var s=t.opTransChoices,i=e.target,n=!!i.checked;if(Array.isArray(s)){var r=0,o=t._i(s,r);i.checked?o<0&&(t.opTransChoices=s.concat([r])):o>-1&&(t.opTransChoices=s.slice(0,o).concat(s.slice(o+1)))}else t.opTransChoices=n}}}),s("label",{staticClass:"form-check-label"},[t._v("T0")])]),t._l(Math.ceil(t.n/2),function(e,i){return s("div",{key:i,staticClass:"form-check form-check-inline"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.opTransChoices,expression:"opTransChoices"}],staticClass:"form-check-input",attrs:{type:"checkbox"},domProps:{value:e,checked:Array.isArray(t.opTransChoices)?t._i(t.opTransChoices,e)>-1:t.opTransChoices},on:{change:[function(s){var i=t.opTransChoices,n=s.target,r=!!n.checked;if(Array.isArray(i)){var o=e,a=t._i(i,o);n.checked?a<0&&(t.opTransChoices=i.concat([o])):a>-1&&(t.opTransChoices=i.slice(0,a).concat(i.slice(a+1)))}else t.opTransChoices=r},function(e){return t.buildAllOperationsOfGroup(t.opTransChoices)}]}}),s("label",{staticClass:"form-check-label"},[t._v("T"+t._s(e))])])})],2),s("div",{staticClass:"form-check"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.opComplement,expression:"opComplement"}],staticClass:"form-check-input",attrs:{type:"checkbox"},domProps:{value:!1,checked:Array.isArray(t.opComplement)?t._i(t.opComplement,!1)>-1:t.opComplement},on:{change:[function(e){var s=t.opComplement,i=e.target,n=!!i.checked;if(Array.isArray(s)){var r=!1,o=t._i(s,r);i.checked?o<0&&(t.opComplement=s.concat([r])):o>-1&&(t.opComplement=s.slice(0,o).concat(s.slice(o+1)))}else t.opComplement=n},function(e){return t.buildAllOperationsOfGroup(t.opComplement)}]}}),s("label",{staticClass:"form-check-label"},[t._v("Complement")])])])]),s("div",{staticClass:"pl-2"})]),s("div",{staticClass:"p-2"},[s("fieldset",{staticClass:"representation-border p-2"},[s("legend",{staticClass:"representation-border"},[t._v("Group operations ("+t._s(t.groupOperations.length)+")")]),t._l(t.groupOperations,function(e,i){return s("div",{key:i,staticClass:"form-check form-check-inline"},[s("div",{staticClass:"operation"},[t._v(t._s(e))])])})],2)]),s("div",{staticClass:"p-2"},[s("fieldset",{staticClass:"representation-border p-2"},[s("legend",{staticClass:"representation-border"},[t._v("Orbits results")]),s("div",[s("span",[t._v("ops Multiplication selected : "+t._s(t.opMultChoices))])]),s("div",[s("span",[t._v("ops Transposition selected : "+t._s(t.opTransChoices))])]),s("div",[s("span",[t._v("ops Complement : "+t._s(t.opComplement))])]),s("clock",{staticClass:"m-1 clock-pcs",attrs:{_ipcs:"[0,4,7,10]"}}),s("clock",{staticClass:"m-1 clock-pcs",attrs:{_ipcs:"[0,3,6,9]"}}),s("clock",{staticClass:"m-1 clock-pcs",attrs:{_ipcs:"[0,1,2,3]"}}),s("clock",{staticClass:"m-1 clock-pcs",attrs:{_ipcs:"[0,1,2,8]"}}),s("clock",{staticClass:"m-1 clock-pcs"})],1)])])},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"input-group-prepend "},[s("label",{staticClass:"input-group-text ",attrs:{for:"inputGroupSelect01"}},[t._v(" N ")])])}],r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"clockpcs"},[s("canvas",{ref:"canvas"})])},o=[],a=(s("6b54"),s("6c7b"),s("d225")),c=s("b0b4"),l=s("266f"),h=function(){function t(e,s,i,n){Object(a["a"])(this,t),this.x=e,this.y=s,this.w=i,this.h=n}return Object(c["a"])(t,[{key:"contains",value:function(t,e){return t>=this.x-this.w/2&&t<=this.x+this.w/2&&e>=this.y-this.h/2&&e<=this.y+this.h/2}},{key:"draw",value:function(t){t.beginPath(),t.fillRect(this.x-this.w/2,this.y-this.h/2,this.w,this.h),t.stroke()}},{key:"toString",value:function(){return"{"+this.x+","+this.y+","+this.w+","+this.h+"}"}}]),t}(),u=4,p={name:"Clock",points:[],n:0,props:{_ipcs:null,pc_color:{type:String,default:function(){return"black"}},pc_pivot_color:{type:String,default:function(){return"red"}}},data:function(){return{ipcs:null}},computed:{},methods:{isSelected:function(t){return 1===this.ipcs.pcs[t]},drawCirclePitch:function(t,e,s,i){var n;t.beginPath(),t.arc(0,0,s,0,2*Math.PI),t.stroke();var r=this.isSelected(e)?e===this.ipcs.iroot?this.pc_pivot_color:this.pc_color:"white";t.fillStyle=r,t.fill(),s>6&&(n=t.createRadialGradient(0,0,.8*s,0,0,1.2*s),n.addColorStop(0,"#333"),n.addColorStop(.5,"white"),n.addColorStop(1,"#333"),t.strokeStyle=n,t.lineWidth=3,t.stroke(),t.beginPath(),t.fillStyle="#333",t.fill(),e<10?t.fillText(e.toString(),-.1,1):t.fillText(e.toString(),-.4,1))},drawPitches:function(t,e){var s;t.font=.1*e+"px arial",t.textBaseline="middle",t.textAlign="center";for(var i=Math.round(e/9),n=0;n<this.n;n++)s=n*Math.PI/(this.n/2),t.rotate(s),t.translate(0,-e),t.rotate(-s),this.drawCirclePitch(t,n,i,u),t.rotate(s),t.translate(0,e),t.rotate(-s)},draw:function(){var t=this.$refs["canvas"].clientWidth/2,e=this.$refs["canvas"].clientHeight/2,s=Math.round(.8*t);this.computePitchesRegionSelected(t,e,s),this.ctx.clearRect(0,0,this.$refs["canvas"].clientWidth,this.$refs["canvas"].clientHeight),this.drawPolygon(this.ctx),this.ctx.save(),this.ctx.translate(t,e),this.drawPitches(this.ctx,s),this.ctx.translate(-t,-e),this.ctx.restore()},drawPolygon:function(t){var e=this.$options.points,s=!0;t.save(),t.fillStyle="black",t.beginPath();for(var i=0;i<this.ipcs.pcs.length;i++)1===this.ipcs.pcs[i]&&s?(s=!1,t.moveTo(e[i].x,e[i].y)):1===this.ipcs.pcs[i]&&t.lineTo(e[i].x,e[i].y);t.closePath(),t.stroke(),t.restore()},computePitchesRegionSelected:function(t,e,s){for(var i,n,r=Math.round(s/(this.n-1)),o=3*Math.PI/2,a=0;a<this.n;a++)i=2*r+Math.round(t+Math.cos(o)*s),n=2*r+Math.round(e+Math.sin(o)*s),this.$options.points[a]=new h(i-2*r,n-2*r,3*r,3*r),o+=2*Math.PI/this.n}},mounted:function(){this.ctx=this.$refs["canvas"].getContext("2d");var t=Math.min(this.$refs["canvas"].clientWidth,this.$refs["canvas"].clientHeight);this.$refs["canvas"].width=t,this.$refs["canvas"].height=t,this._ipcs?this.ipcs=new l["a"](this._ipcs):this.ipcs=new l["a"]({strpcs:"[1, 5, 6]",n:7}),this.n=this.ipcs.pcs.length},watch:{ipcs:function(t,e){this.draw()}}},f=p,d=(s("2904"),s("2877")),v=Object(d["a"])(f,r,o,!1,null,null,null),m=v.exports,C=(s("55dd"),s("7514"),s("a745")),b=s.n(C);function k(t){if(b()(t)){for(var e=0,s=new Array(t.length);e<t.length;e++)s[e]=t[e];return s}}var y=s("774e"),g=s.n(y),_=s("c8bb"),x=s.n(_);function w(t){if(x()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t))return g()(t)}function M(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function T(t){return k(t)||w(t)||M()}var A=function(){function t(e,s,i,n){Object(a["a"])(this,t),this.a=s,this.t=i,this.n=e,this.complement=n;var r=n?"C":"";this._strRepr=r+"M"+s+"-T"+i,this._strReprWithoutTransp=r+"M"+s,this.fixedPcs=[],this.stabilizers=[]}return Object(c["a"])(t,[{key:"_makeHashCode",value:function(){var t=31,e=1;return e=t*e+this.a*this.n*2,e=t*e+(this.complement?1231:1237),e=t*e+this.n,e=t*e+this.t,this._hashcode=e}},{key:"equals",value:function(e){if(this===e)return!0;if(null===e)return!1;if(!(e instanceof t))return!1;var s=e;return this.a===s.a&&(this.complement===s.complement&&(this.n===s.n&&this.t===s.t))}},{key:"compose",value:function(e){if(this.n!==e.n)throw new Error("MusaicPcsOperation MusaicGroup Exception bad N in compose op");return new t(this.n,this.a*e.a%this.n,(this.a*e.t+this.t)%this.n,!!(this.complement^e.complement))}},{key:"actionOn",value:function(t){return this.complement?t.affineOp(this.a,this.t).complement():t.affineOp(this.a,this.t)}},{key:"toString",value:function(){return this._strRepr}},{key:"toStringWithoutTransp",value:function(){return this._strReprWithoutTransp}},{key:"addFixedPcs",value:function(t){this.fixedPcs.contains(t)||this.fixedPcs.add(t)}},{key:"getFixedPcs",value:function(){return this.fixedPcs}},{key:"getHashCode",value:function(){return this._hashcode||this._makeHashCode(),this._hashcode}}],[{key:"compareTo",value:function(t,e){var s=0,i=0;t.complement&&(s=t.n),e.complement&&(i=t.n);var n=s+t.a-(i+e.a);return 0===n&&(n=t.t-e.t),n}}]),t}(),O=function(){function t(){Object(a["a"])(this,t)}return Object(c["a"])(t,null,[{key:"operationsGroupGenerator",value:function(t){for(var e=T(t),s=0;s<e.length;s++)for(var i=function(t){var i=e[s].compose(e[t]);e.find(function(t){return t.getHashCode()===i.getHashCode()})||e.push(i)},n=0;n<e.length;n++)i(n);return e.sort(A.compareTo)}},{key:"gcd",value:function(t,e){if(t<e){var s=t;t=e,e=s}var i=t%e;return 0===i?e:this.gcd(e,i)}},{key:"phiEulerElements",value:function(t){var e=[];e.push(1);for(var s=2;s<t;s++)1===this.gcd(s,t)&&e.push(s);return e}}]),t}(),P={data:function(){return{n:12,primesWithN:[1,5,7,11],opMultChoices:[1],opTransChoices:[0],opComplement:!1,groupOperations:[new A(this.n,1,0)]}},methods:{onChangeN:function(t){this.primesWithN=O.phiEulerElements(this.n),this.opMultChoices=[1],this.opTransChoices=[0],this.groupOperations=[],this.buildAllOperationsOfGroup()},buildAllOperationsOfGroup:function(t){this.groupOperations=[],this.groupOperations=O.operationsGroupGenerator(this.buildOperationsFromUI())},buildOperationsFromUI:function(){var t=[];!0===this.opComplement&&t.push(new A(this.n,1,0,!0));for(var e=0;e<this.opMultChoices.length;e++)for(var s=0;s<this.opTransChoices.length;s++)t.push(new A(this.n,this.opMultChoices[e],this.opTransChoices[s]));return t}},components:{Clock:m}},S=P,G=(s("11fd"),Object(d["a"])(S,i,n,!1,null,"0817a8cc",null));e["default"]=G.exports},"4ee1":function(t,e,s){var i=s("5168")("iterator"),n=!1;try{var r=[7][i]();r["return"]=function(){n=!0},Array.from(r,function(){throw 2})}catch(o){}t.exports=function(t,e){if(!e&&!n)return!1;var s=!1;try{var r=[7],a=r[i]();a.next=function(){return{done:s=!0}},r[i]=function(){return a},t(r)}catch(o){}return s}},"549b":function(t,e,s){"use strict";var i=s("d864"),n=s("63b6"),r=s("241e"),o=s("b0dc"),a=s("3702"),c=s("b447"),l=s("20fd"),h=s("7cd6");n(n.S+n.F*!s("4ee1")(function(t){Array.from(t)}),"Array",{from:function(t){var e,s,n,u,p=r(t),f="function"==typeof this?this:Array,d=arguments.length,v=d>1?arguments[1]:void 0,m=void 0!==v,C=0,b=h(p);if(m&&(v=i(v,d>2?arguments[2]:void 0,2)),void 0==b||f==Array&&a(b))for(e=c(p.length),s=new f(e);e>C;C++)l(s,C,m?v(p[C],C):p[C]);else for(u=b.call(p),s=new f;!(n=u.next()).done;C++)l(s,C,m?o(u,v,[n.value,C],!0):n.value);return s.length=C,s}})},"54a1":function(t,e,s){s("6c1c"),s("1654"),t.exports=s("95d5")},"55dd":function(t,e,s){"use strict";var i=s("5ca1"),n=s("d8e8"),r=s("4bf8"),o=s("79e5"),a=[].sort,c=[1,2,3];i(i.P+i.F*(o(function(){c.sort(void 0)})||!o(function(){c.sort(null)})||!s("2f21")(a)),"Array",{sort:function(t){return void 0===t?a.call(r(this)):a.call(r(this),n(t))}})},7514:function(t,e,s){"use strict";var i=s("5ca1"),n=s("0a49")(5),r="find",o=!0;r in[]&&Array(1)[r](function(){o=!1}),i(i.P+i.F*o,"Array",{find:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),s("9c6c")(r)},"774e":function(t,e,s){t.exports=s("d2d5")},"95d5":function(t,e,s){var i=s("40c3"),n=s("5168")("iterator"),r=s("481b");t.exports=s("584a").isIterable=function(t){var e=Object(t);return void 0!==e[n]||"@@iterator"in e||r.hasOwnProperty(i(e))}},c1f9:function(t,e,s){},c8bb:function(t,e,s){t.exports=s("54a1")},d2d5:function(t,e,s){s("1654"),s("549b"),t.exports=s("584a").Array.from},f820:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"about"},[s("h1",[t._v("This is a tool support of 88musaics.org ")]),s("div",{staticClass:"alert alert-success alert-dismissible fade show",attrs:{role:"alert"}},[t._v("\n    TODO ...\n    "),s("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"alert","aria-label":"Close"}},[s("span",{attrs:{"aria-hidden":"true"}},[s("font-awesome-icon",{attrs:{icon:"yin-yang",size:"lg"}})],1)])])])},n=[],r=s("2877"),o={},a=Object(r["a"])(o,i,n,!1,null,null,null);e["default"]=a.exports}}]);
//# sourceMappingURL=about.2e76682a.js.map