!function(){"use strict";function e(e){return function(e){if(Array.isArray(e))return t(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,n){if(e){if("string"==typeof e)return t(e,n);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?t(e,n):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function n(e){switch(e){case"mainMenuLoad":var t=document.createElement("div");t.className="back-main-menu-anim",document.body.insertBefore(t,document.querySelector(".wrapper-choose-menu")),setTimeout((function(){return document.body.removeChild(t)}),1100);break;case"chooseMenuLoad":var n=document.createElement("div");n.className="go-to-choose-menu-anim",document.body.insertBefore(n,document.querySelector(".wrapper-main-menu")),setTimeout((function(){return document.body.removeChild(n)}),1100);break;case"battleFieldLoad":var o=document.createElement("div");o.className="start-game-anim",document.body.insertBefore(o,document.querySelector(".wrapper-choose-menu")),setTimeout((function(){return document.body.removeChild(o)}),1100)}}var o,a,r,u,c=(o=[],a=document.querySelector(".background-music-main-menu"),r=document.querySelector(".background-music-battlefield"),u=document.querySelectorAll(".music"),function(){o.push(decodeURIComponent(window.location.hash.substr(1)));var t=document.querySelector(".soundIcon");"battle-field"===o[o.length-1]&&e(u).every((function(e){return e.paused}))?(a.pause(),r.pause()):"battle-field"===o[o.length-1]&&e(u).some((function(e){return e.paused}))?(a.pause(),r.play()):"choose-menu"===o[o.length-1]&&"battle-field"===o[o.length-2]&&e(u).every((function(e){return e.paused}))?(a.pause(),r.pause()):"choose-menu"===o[o.length-1]&&"battle-field"===o[o.length-2]&&e(u).some((function(e){return e.paused}))&&(a.play(),r.pause()),e(u).every((function(e){return e.paused}))?t.className="fas fa-volume-mute soundIcon":t.className="fas fa-volume-up soundIcon"}),s={};function i(){var e=window.location.hash;switch(decodeURIComponent(e.substr(1))){case"":n("mainMenuLoad"),document.title="Main menu",setTimeout((function(){return f(s.mainMenu)}),500);break;case"choose-menu":n("chooseMenuLoad"),setTimeout((function(){return f(s.chooseMenu)}),500);break;case"main-menu":n("mainMenuLoad"),setTimeout((function(){return f(s.mainMenu)}),500);break;case"battle-field":case"restoredGame":n("battleFieldLoad"),setTimeout((function(){return f(s.battle)}),500)}setTimeout((function(){return c()}),550)}function d(e){s.mainMenu=e,$.ajax({url:"json/choose_menu.json",type:"GET",dataType:"json",success:l,error:p})}function l(e){s.chooseMenu=e,$.ajax({url:"json/battle.json",type:"GET",dataType:"json",success:m,error:p})}function m(e){s.battle=e,i()}function p(e,t,n){alert(t+" "+n)}function f(e){for(var t,n,o,a,r,u,c=document.querySelector("body"),s=document.querySelector(".wrapper"),i=document.querySelector(".script"),d=0;d<e.length;d++)for(var l in e[d])switch(e[d][l]){case"parent":t=h(e[d]);break;case"mainChild":n=h(e[d]),t.appendChild(n);break;case"child":o=h(e[d]),n.appendChild(o);break;case"subChild":a=h(e[d]),o.appendChild(a);break;case"lowestChild":r=h(e[d]),a.appendChild(r);break;case"script":u=h(e[d])}s?c.replaceChild(t,s):c.appendChild(t),i?c.replaceChild(u,i):c.appendChild(u)}function h(e){var t=document.createElement(e.tagName);return t.setAttribute("class",e.class),t.textContent=e.content||"",e.source&&(t.src=e.source),e.data&&t.setAttribute("".concat(e.data),"".concat(e.dataValue)),e.type&&t.setAttribute("".concat(e.type),"".concat(e.typeValue)),"script"===e.tagName&&t.setAttribute("defer","defer"),t}document.addEventListener("DOMContentLoaded",(function(){$.ajax({url:"json/main_menu.json",type:"GET",dataType:"json",success:d,error:p})})),document.addEventListener("click",(function(e){return function(e){switch(e.target.className.split(" ")[0]){case"startButton":document.title="Choose menu",location.hash=decodeURIComponent("choose-menu");break;case"back-to-main-menu":document.title="Main menu",location.hash=decodeURIComponent("main-menu");break;case"startGame":document.title="Battlefield",location.hash=decodeURIComponent("battle-field");break;case"continueButton":document.title="Battlefield",location.hash=decodeURIComponent("restoredGame")}}(e)})),window.addEventListener("hashchange",i)}();
//# sourceMappingURL=spa.bundle.js.map