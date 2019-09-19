!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var i in n)("object"==typeof exports?exports:t)[i]=n[i]}}(this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,n){"use strict";L.TimelineVersion="1.0.0-beta",n(1),n(3),n(4)},function(t,e,n){"use strict";var i=function(t){return t&&t.__esModule?t:{default:t}}(n(2));L.Timeline=L.GeoJSON.extend({times:null,ranges:null,initialize:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.times=[],this.ranges=new i.default;L.GeoJSON.prototype.initialize.call(this,null,n),L.Util.setOptions(this,{drawOnSetTime:!0}),L.Util.setOptions(this,n),this.options.getInterval&&(this._getInterval=function(){var t;return(t=e.options).getInterval.apply(t,arguments)}),t&&this._process(t)},_getInterval:function(t){var e="start"in t.properties,n="end"in t.properties;return!(!e||!n)&&{start:new Date(t.properties.start).getTime(),end:new Date(t.properties.end).getTime()}},_process:function(t){var e=this,n=1/0,i=-1/0;t.features.forEach(function(t){var r=e._getInterval(t);r&&(e.ranges.insert(r.start,r.end,t),e.times.push(r.start),e.times.push(r.end),n=Math.min(n,r.start),i=Math.max(i,r.end))}),this.start=this.options.start||n,this.end=this.options.end||i,this.time=this.start,0!==this.times.length&&(this.times.sort(function(t,e){return t-e}),this.times=this.times.reduce(function(t,e,n){return 0===n?t:(t[t.length-1]!==e&&t.push(e),t)},[this.times[0]]))},setTime:function(t){this.time="number"==typeof t?t:new Date(t).getTime(),this.options.drawOnSetTime&&this.updateDisplayedLayers(),this.fire("change")},updateDisplayedLayers:function(){for(var t=this,e=this.ranges.lookup(this.time),n=0;n<this.getLayers().length;n++){for(var i=!1,r=this.getLayers()[n],o=0;o<e.length;o++)if(r.feature===e[o]){i=!0,e.splice(o,1);break}if(!i){var a=this.getLayers()[n--];this.removeLayer(a)}}e.forEach(function(e){return t.addData(e)})}}),L.timeline=function(t,e){return new L.Timeline(t,e)}},function(t,e,n){"use strict";function i(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function t(e,n,i,o){r(this,t),this.low=e,this.high=n,this.min=e,this.max=n,this.data=i,this.left=null,this.right=null,this.parent=o},s=function(){function t(){r(this,t),this._root=null,this.size=0}return o(t,[{key:"_insert",value:function(t,e,n,i,r,o){var s=void 0;if(null===i)s=new a(t,e,n,r),null===r?this._root=s:r[o]=s;else{var l=t<i.low||t===i.low&&e<i.high?"left":"right";s=this._insert(t,e,n,i[l],i,l),i.max=Math.max(i.max,s.max),i.min=Math.min(i.min,s.min)}return s}},{key:"insert",value:function(t,e,n){this._insert(t,e,n,this._root,this._root),this.size++}},{key:"lookup",value:function(t){var e=[],n=this._root;return 2===arguments.length&&(n=arguments[1]),null===n||n.max<t?e:(e.push.apply(e,i(this.lookup(t,n.left))),n.low<=t&&(n.high>=t&&e.push(n.data),e.push.apply(e,i(this.lookup(t,n.right)))),e)}},{key:"overlap",value:function(t,e){var n=[],r=this._root;return 3===arguments.length&&(r=arguments[2]),t>r.high||r.low>e||n.push(r.data),r.left&&r.left.max>=t&&n.push.apply(n,i(this.overlap(t,e,r.left))),r.right&&r.right.min<=e&&n.push.apply(n,i(this.overlap(t,e,r.right))),n}}]),t}();e.default=s},function(t,e,n){"use strict";function i(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}L.TimelineSliderControl=L.Control.extend({initialize:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.timelines=[],L.Util.setOptions(this,{duration:1e4,enableKeyboardControls:!1,enablePlayback:!0,formatOutput:function(t){return""+(t||"")},showTicks:!0,waitToUpdateMap:!1,position:"bottomleft",steps:1e3,autoPlay:!1}),L.Util.setOptions(this,t),void 0!==t.start&&(this.start=t.start),void 0!==t.end&&(this.end=t.end)},_getTimes:function(){var t=this,e=[];if(this.timelines.forEach(function(n){var r=n.times.filter(function(e){return e>=t.start&&e<=t.end});e.push.apply(e,i(r))}),e.length){e.sort(function(t,e){return t-e});var n=[e[0]];return e.reduce(function(t,e){return t!==e&&n.push(e),e}),n}return e},_recalculate:function(){var t=void 0!==this.options.start,e=void 0!==this.options.end,n=this.options.duration,i=1/0,r=-1/0;this.timelines.forEach(function(t){t.start<i&&(i=t.start),t.end>r&&(r=t.end)}),t||(this.start=i,this._timeSlider.min=i===1/0?0:i,this._timeSlider.value=this._timeSlider.min),e||(this.end=r,this._timeSlider.max=r===-1/0?0:r),this._stepSize=Math.max(1,(this.end-this.start)/this.options.steps),this._stepDuration=Math.max(1,n/this.options.steps)},_nearestEventTime:function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=this._getTimes(),i=!1,r=n[0],o=1;o<n.length;o++){var a=n[o];if(i)return a;if(a>=t){if(-1===e)return r;if(a!==t)return a;i=!0}r=a}return r},_createDOM:function(){var t=L.DomUtil.create("div",["leaflet-control-layers","leaflet-control-layers-expanded","leaflet-timeline-control"].join(" "));if(this.container=t,this.options.enablePlayback){var e=L.DomUtil.create("div","sldr-ctrl-container",t),n=L.DomUtil.create("div","button-container",e);this._makeButtons(n),this.options.enableKeyboardControls&&this._addKeyListeners(),this._makeOutput(e)}this._makeSlider(t),this.options.showTicks&&this._buildDataList(t),this.options.autoPlay&&this._autoPlay()},_autoPlay:function(){var t=this;"loading"==document.readyState?window.addEventListener("load",function(e){return t._autoPlay()}):this.play()},_addKeyListeners:function(){var t=this;this._listener=function(){return t._onKeydown.apply(t,arguments)},document.addEventListener("keydown",this._listener)},_removeKeyListeners:function(){document.removeEventListener("keydown",this._listener)},_buildDataList:function(t){this._datalist=L.DomUtil.create("datalist","",t);var e=Math.floor(1e6*Math.random());this._datalist.id="timeline-datalist-"+e,this._timeSlider.setAttribute("list",this._datalist.id),this._rebuildDataList()},_rebuildDataList:function(){for(var t=this._datalist;t.firstChild;)t.removeChild(t.firstChild);var e=L.DomUtil.create("select","",this._datalist);this._getTimes().forEach(function(t){L.DomUtil.create("option","",e).value=t})},_makeButton:function(t,e){var n=this,i=L.DomUtil.create("button",e,t);i.addEventListener("click",function(){return n[e]()}),L.DomEvent.disableClickPropagation(i)},_makeButtons:function(t){this._makeButton(t,"prev"),this._makeButton(t,"play"),this._makeButton(t,"pause"),this._makeButton(t,"next")},_disableMapDragging:function(){this.map.dragging.disable()},_enableMapDragging:function(){this.map.dragging.enable()},_makeSlider:function(t){var e=L.DomUtil.create("input","time-slider",t);e.type="range",e.min=this.start||0,e.max=this.end||0,e.value=this.start||0,this._timeSlider=e,L.DomEvent.on(this._timeSlider,"change input",this._sliderChanged,this),L.DomEvent.on(this._timeSlider,"pointerdown mousedown touchstart",this._disableMapDragging,this),L.DomEvent.on(document,"pointerup mouseup touchend",this._enableMapDragging,this)},_makeOutput:function(t){this._output=L.DomUtil.create("output","time-text",t),this._output.innerHTML=this.options.formatOutput(this.start)},_onKeydown:function(t){switch(t.keyCode||t.which){case 37:this.prev();break;case 39:this.next();break;case 32:this.toggle();break;default:return}t.preventDefault()},_sliderChanged:function(t){var e=parseFloat(+t.target.value,10);this.time=e,this.options.waitToUpdateMap&&"change"!==t.type||this.timelines.forEach(function(t){return t.setTime(e)}),this._output&&(this._output.innerHTML=this.options.formatOutput(e))},_resetIfTimelinesChanged:function(t){this.timelines.length!==t&&(this._recalculate(),this.options.showTicks&&this._rebuildDataList(),this.setTime(this.start))},addTimelines:function(){var t=this;this.pause();for(var e=this.timelines.length,n=arguments.length,i=Array(n),r=0;r<n;r++)i[r]=arguments[r];i.forEach(function(e){-1===t.timelines.indexOf(e)&&t.timelines.push(e)}),this._resetIfTimelinesChanged(e)},removeTimelines:function(){var t=this;this.pause();for(var e=this.timelines.length,n=arguments.length,i=Array(n),r=0;r<n;r++)i[r]=arguments[r];i.forEach(function(e){var n=t.timelines.indexOf(e);-1!==n&&t.timelines.splice(n,1)}),this._resetIfTimelinesChanged(e)},toggle:function(){this._playing?this.pause():this.play()},prev:function(){this.pause();var t=this._nearestEventTime(this.time,-1);this._timeSlider.value=t,this.setTime(t)},pause:function(t){clearTimeout(this._timer),this._playing=!1,this.container.classList.remove("playing"),this.syncedControl&&!t&&this.syncedControl.map(function(t){t.pause(!0)})},play:function(t){var e=this;clearTimeout(this._timer),parseFloat(this._timeSlider.value,10)===this.end&&(this._timeSlider.value=this.start),this._timeSlider.value=parseFloat(this._timeSlider.value,10)+this._stepSize,this.setTime(this._timeSlider.value),parseFloat(this._timeSlider.value,10)===this.end?(this._playing=!1,this.container.classList.remove("playing")):(this._playing=!0,this.container.classList.add("playing"),this._timer=setTimeout(function(){return e.play(!0)},this._stepDuration)),this.syncedControl&&!t&&this.syncedControl.map(function(t){t.play(!0)})},next:function(){this.pause();var t=this._nearestEventTime(this.time,1);this._timeSlider.value=t,this.setTime(t)},setTime:function(t){this._timeSlider&&(this._timeSlider.value=+t),this._sliderChanged({type:"change",target:{value:t}})},onAdd:function(t){return this.map=t,this._createDOM(),this.setTime(this.start),this.container},onRemove:function(){this.options.enableKeyboardControls&&this._removeKeyListeners(),L.DomEvent.off(this._timeSlider,"change input",this._sliderChanged,this),L.DomEvent.off(this._timeSlider,"pointerdown mousedown touchstart",this._disableMapDragging,this),L.DomEvent.off(document,"pointerup mouseup touchend",this._enableMapDragging,this),this._enableMapDragging()},syncControl:function(t){this.syncedControl||(this.syncedControl=[]),this.syncedControl.push(syncedControl)}}),L.timelineSliderControl=function(t,e,n,i){return new L.TimelineSliderControl(t,e,n,i)}},function(t,e,n){var i=n(5);"string"==typeof i&&(i=[[t.i,i,""]]);var r={hmr:!0};r.transform=void 0;n(7)(i,r);i.locals&&(t.exports=i.locals)},function(t,e,n){(t.exports=n(6)(!1)).push([t.i,".leaflet-control.leaflet-timeline-control{width:96%;box-sizing:border-box;margin:2%;margin-bottom:20px;text-align:center}.leaflet-control.leaflet-timeline-control *{vertical-align:middle}.leaflet-control.leaflet-timeline-control input[type=range]{width:80%}.leaflet-control.leaflet-timeline-control .sldr-ctrl-container{float:left;width:15%;box-sizing:border-box}.leaflet-control.leaflet-timeline-control .button-container button{position:relative;width:20%;height:20px}.leaflet-control.leaflet-timeline-control .button-container button::before,.leaflet-control.leaflet-timeline-control .button-container button::after{content:'';position:absolute}.leaflet-control.leaflet-timeline-control .button-container button.play::before{border:7px solid transparent;border-width:7px 0 7px 10px;border-left-color:black;margin-top:-7px;background:transparent;margin-left:-5px}.leaflet-control.leaflet-timeline-control .button-container button.pause{display:none}.leaflet-control.leaflet-timeline-control .button-container button.pause::before{width:4px;height:14px;border:4px solid black;border-width:0 4px;margin-top:-7px;margin-left:-6px;background:transparent}.leaflet-control.leaflet-timeline-control .button-container button.prev::before,.leaflet-control.leaflet-timeline-control .button-container button.prev::after{margin:-8px 0 0;background:black}.leaflet-control.leaflet-timeline-control .button-container button.prev::before{width:2px;height:14px;margin-top:-7px;margin-left:-7px}.leaflet-control.leaflet-timeline-control .button-container button.prev::after{border:7px solid transparent;border-width:7px 10px 7px 0;border-right-color:black;margin-top:-7px;margin-left:-5px;background:transparent}.leaflet-control.leaflet-timeline-control .button-container button.next::before,.leaflet-control.leaflet-timeline-control .button-container button.next::after{margin:-8px 0 0;background:black}.leaflet-control.leaflet-timeline-control .button-container button.next::before{width:2px;height:14px;margin-top:-7px;margin-left:5px}.leaflet-control.leaflet-timeline-control .button-container button.next::after{border:7px solid transparent;border-width:7px 0 7px 10px;border-left-color:black;margin-top:-7px;margin-left:-5px;background:transparent}.leaflet-control.leaflet-timeline-control.playing button.pause{display:inline-block}.leaflet-control.leaflet-timeline-control.playing button.play{display:none}\n",""])},function(t,e,n){"use strict";function i(t,e){var n=t[1]||"",i=t[3];if(!i)return n;if(e&&"function"==typeof btoa){var o=r(i),a=i.sources.map(function(t){return"/*# sourceURL=".concat(i.sourceRoot).concat(t," */")});return[n].concat(a).concat([o]).join("\n")}return[n].join("\n")}function r(t){var e=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),n="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(e);return"/*# ".concat(n," */")}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=i(e,t);return e[2]?"@media ".concat(e[2],"{").concat(n,"}"):n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var i={},r=0;r<this.length;r++){var o=this[r][0];null!=o&&(i[o]=!0)}for(var a=0;a<t.length;a++){var s=t[a];null!=s[0]&&i[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="(".concat(s[2],") and (").concat(n,")")),e.push(s))}},e}},function(t,e,n){function i(t,e){for(var n=0;n<t.length;n++){var i=t[n],r=d[i.id];if(r){r.refs++;for(a=0;a<r.parts.length;a++)r.parts[a](i.parts[a]);for(;a<i.parts.length;a++)r.parts.push(c(i.parts[a],e))}else{for(var o=[],a=0;a<i.parts.length;a++)o.push(c(i.parts[a],e));d[i.id]={id:i.id,refs:1,parts:o}}}}function r(t,e){for(var n=[],i={},r=0;r<t.length;r++){var o=t[r],a=e.base?o[0]+e.base:o[0],s={css:o[1],media:o[2],sourceMap:o[3]};i[a]?i[a].parts.push(s):n.push(i[a]={id:a,parts:[s]})}return n}function o(t,e){var n=v(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var i=y[y.length-1];if("top"===t.insertAt)i?i.nextSibling?n.insertBefore(e,i.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),y.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=v(t.insertInto+" "+t.insertAt.before);n.insertBefore(e,r)}}function a(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=y.indexOf(t);e>=0&&y.splice(e,1)}function s(t){var e=document.createElement("style");return t.attrs.type="text/css",u(e,t.attrs),o(t,e),e}function l(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",u(e,t.attrs),o(t,e),e}function u(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function c(t,e){var n,i,r,o;if(e.transform&&t.css){if(!(o=e.transform(t.css)))return function(){};t.css=o}if(e.singleton){var u=b++;n=g||(g=s(e)),i=h.bind(null,n,u,!1),r=h.bind(null,n,u,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=l(e),i=p.bind(null,n,e),r=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(e),i=f.bind(null,n),r=function(){a(n)});return i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;i(t=e)}else r()}}function h(t,e,n,i){var r=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=x(e,r);else{var o=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}function f(t,e){var n=e.css,i=e.media;if(i&&t.setAttribute("media",i),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function p(t,e,n){var i=n.css,r=n.sourceMap,o=void 0===e.convertToAbsoluteUrls&&r;(e.convertToAbsoluteUrls||o)&&(i=_(i)),r&&(i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([i],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}var d={},m=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),v=function(t){var e={};return function(n){if(void 0===e[n]){var i=t.call(this,n);if(i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(t){i=null}e[n]=i}return e[n]}}(function(t){return document.querySelector(t)}),g=null,b=0,y=[],_=n(8);t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||(e.singleton=m()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=r(t,e);return i(n,e),function(t){for(var o=[],a=0;a<n.length;a++){var s=n[a];(l=d[s.id]).refs--,o.push(l)}t&&i(r(t,e),e);for(a=0;a<o.length;a++){var l=o[a];if(0===l.refs){for(var u=0;u<l.parts.length;u++)l.parts[u]();delete d[l.id]}}}};var x=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,i=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var r=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(r))return t;var o;return o=0===r.indexOf("//")?r:0===r.indexOf("/")?n+r:i+r.replace(/^\.\//,""),"url("+JSON.stringify(o)+")"})}}])});