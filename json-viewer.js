function e(e){const t=`on${e.charAt(0).toUpperCase()}${e.slice(1)}Changed`;return function(...e){this[t]&&this[t](...e)}}function t(e,t,n){Object.defineProperty(e,t,{get(){return this.__props[t]},set(e){const r=this[t];this.__props[t]=e,this.rendered&&r!==e&&(n.onChange&&n.onChange.call(this,e,r),this.update())}})}function n(e=""){return document.createTextNode(e)}function r(e,t){return!(!e||!e.nodeType||t&&e.nodeType!==t)}function s(e,t){const[n,r]=[].concat(t);n.parentNode&&(r&&n.nextSibling!==r&&o(n.nextSibling,r),n.parentNode.replaceChild(e,n))}function o(e,t=null,n=e.parentNode){if(n)for(;e!==t;){const t=e.nextSibling;n.removeChild(e),e=t}}function a(e,t,n=t.parentNode){const[r,s]=e.range,o=t.nextSibling;let a=r;do{const e=a.nextSibling;n.insertBefore(a,o),a=e}while(a!==s);n.insertBefore(s,o)}function i(e){let t=0;for(;e=e.previousSibling;)t++;return t}function l(e){const t=[];for(;e.parentNode;)t.unshift(i(e)),e=e.parentNode;return t}const c=Symbol();function d(e,t){return h(e)&&h(t)&&e.strings===t.strings}function h(e){return e&&e[c]}const u=`__${Math.random().toString().slice(2)}_`,p=new RegExp(`\x3c!--${u}(\\d+)--\x3e|${u}(\\d+)`),f=/^(?:style|textarea)$/i;function g(e){const t=p.exec(e);return p.lastIndex=0,t?Number(t[1]||t[2]):-1}const m=[],b=[],y=[],x=window.requestAnimationFrame;let v=!1,C=0;function N(e,t){let n=0;const r=e.length;for(;Date.now()<t&&n<r;){const t=e[n++];t.task(...t.args),t.args=void 0,t.scheduled=!1}e.splice(0,n)}function S(){C++;const e=Date.now()+10*Math.ceil(.01*C);N(m,e),N(b,e),m.length>0&&(b.push(...m),m.length=0),b.length>0?x(S):(N(y,Number.MAX_SAFE_INTEGER),v=!1,C=0)}function k(e,t=1){const n={task:e,args:[],scheduled:!1,firstRun:!0};return(...r)=>{n.firstRun?(n.firstRun=!1,e(...r)):(n.args=r,n.scheduled||function(e,t){e.scheduled=!0,1===t?m.push(e):0===t?b.push(e):3===t&&y.push(e),v||(v=!0,x(S))}(n,t))}}class ${constructor(e,t,n){this.element=e,this.name=t,this.namespaceURI=n,this.requestUpdate=k(e=>{const{name:t,element:n,namespaceURI:r}=this;"ownerSVGElement"in n?n.setAttributeNS(r,t,e):t in n?n[t]=e:void 0!==e?n.setAttribute(t,e):n.hasAttribute(t)&&n.removeAttribute(t),this.value=e})}update(e){e!==this.value&&this.requestUpdate(e)}}class _{constructor(e){this.requestUpdate=k(e=>{var t;(t=e)!==Object(t)?this.updateText(e):Array.isArray(e)?e=this.updateArray(e):d(e,this.element)?this.updateTemplate(e.values):this.replaceWith(e),this.value=e}),this.element=this.placeholder=e}updateArray(e){this.replaceWith(this.placeholder);const t=this.value instanceof Map?this.value:new Map;let n=this.element;const r=new Set;for(let o=0,i=e.length;o<i;o++){const i=e[o],l=String(i.key||o);let c=t.get(l);if(c)d(c,i)?c.update(i.values):(s(i.create(),c.range),t.set(l,c=i));else{const e=i.create();n.parentNode.insertBefore(e,n.nextSibling),t.set(l,c=i)}n.nextSibling!==c.range[0]&&a(c,n),n=c.range[1],r.add(l)}return t.forEach((e,t,n)=>{r.has(t)||(e.delete(),n.delete(t))}),t}replaceWith(e){const{element:t,value:n,placeholder:r}=this;null==e&&(e=r),t!==e&&(n instanceof Map&&(n.forEach(e=>e.delete()),n.clear()),this.element=e,s(h(e)?e.create():e,h(t)?t.range:t))}updateText(e){r(this.element,Node.TEXT_NODE)||this.replaceWith(n()),this.element.textContent=e}updateTemplate(e){this.element.update(e)}update(e){e!==this.value&&this.requestUpdate(e)}}function w(){return NodeFilter.FILTER_ACCEPT}function E(e,t){const n=e.attributes;let r=n.length;for(;r--;){const{name:s,value:o,namespaceURI:a}=n.item(r),i=g(o);~i&&(e.removeAttribute(s),t[i]={type:$,name:s,namespaceURI:a,nodePath:l(e)})}}function A(e,t){const n=g(e.data);~n&&(t[n]={type:_,nodePath:l(e)},e.nodeValue="")}function T(e,t){let r;for(;null!==(r=p.exec(e.data));){const s=n();(e=e.splitText(r.index)).deleteData(0,r[0].length),e.parentNode.insertBefore(s,e),t[Number(r[1]||r[2])]={type:_,nodePath:l(s)}}}function O(e){const t=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_COMMENT,w,!1),n=[];for(;t.nextNode();){const e=t.currentNode;if(r(e,Node.ELEMENT_NODE)){if(E(e,n),f.test(e.tagName))for(const t of e.childNodes)T(t,n)}else A(e,n)}return n}w.acceptNode=w;const j=new WeakMap;function R(e,t){let n=j.get(e);n||j.set(e,n=function(e,t){const n=document.createElement("template");n.innerHTML=t?`<${t}>${e}</${t}>`:e;let r=n.content;if(t){const e=document.createRange();e.selectNodeContents(r.firstChild),r=e.extractContents()}return{content:r,expressions:O(r)}}(function(e){const t=new RegExp("^[^]*<([0-9a-z-]+)(?:\\s*[^<\\s\\0\"'>\\/=]+(?:\\s*=\\s*(?:\"[^\"]*\"?|'[^']*'?|[^\\s'\">]*))?)*\\s*(>?)|[^]*(>)[^]*|[^]*$","i");let n=!1,r=e[0];for(let s=0,o=e.length;s<o-1;s++){const o=`${u}${s}`,a=e[s].match(t);a[1]?n=!a[2]:a[3]&&(n=!1),r+=(n?o:`\x3c!--${o}--\x3e`)+e[s+1]}return r}(e),t));const r=document.importNode(n.content,!0);return{fragment:r,expressions:function(e,t){return t.map(t=>new t.type(function(e,t){for(let n=0,r=t.length;n<r;n++)e=e.childNodes[t[n]];return e}(e,t.nodePath),t.name,t.namespaceURI))}(r,n.expressions)}}var U;class M{constructor(e,t,n){this[U]=!0,this.values=t,this.strings=e,this.context=n}withKey(e){return this.key=e,this}update(e){for(let t=0;t<e.length;t++)this.expressions[t]&&this.expressions[t].update(e[t])}delete(){o(this.range[0],this.range[1].nextSibling),this.range=void 0,this.expressions=void 0}create(){const{fragment:e,expressions:t}=R(this.strings,this.context);return this.expressions=t,this.range=[e.insertBefore(n(),e.firstChild),e.appendChild(n())],this.update(this.values),e}}function P(e,t){return P.instances.has(t)||(P.instances.set(t,e),o(t.firstChild,null,t),t.appendChild(e.create())),P.instances.get(t).update(e.values)}function I(e,...t){return new M(e,t)}U=c,P.instances=new WeakMap;const L=function(n){return class extends n{constructor(){super(...arguments),this.__props=Object.create(null)}static get observedAttributes(){return function(n){if(!n.__attrs){const o=n.properties||{},a=Object.create(null),i=Object.create(null),l=n.prototype;for(const n in o){const c=(r=n,{type:(s=o[n]).call?s:s.type,onChange:!0===s.onChange?e(r):s.onChange});a[n.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()]=n,i[n]=c,t(l,n,c)}n.__attrs=a,n.__props=i}var r,s;return Object.keys(n.__attrs)}(this)}attributeChangedCallback(e,t,n){const{__attrs:r,__props:s}=this.constructor;if(s&&r&&e in s){const t=r[e];this[t]=s[t].type(n)}}}}((W=HTMLElement,class extends W{constructor(){super(...arguments),this.state={},this.rendered=!1,this.renderCallbacks=[],this.renderRoot=this,this._onUpdated=k(()=>{for(;this.renderCallbacks.length;)this.renderCallbacks.shift()();this.rendered?this.updated():this.firstUpdated(),this.rendered=!0},3)}attachShadow(e){return this.renderRoot=super.attachShadow.call(this,e)}connectedCallback(){this.update()}setState(e,t){const n=this.state;this.state=Object.assign(Object.assign({},n),"function"==typeof e?e(n,this):e),t&&this.renderCallbacks.push(t),this.update()}render(){return null}firstUpdated(){}beforeUpdate(){}updated(){}update(){this.beforeUpdate();const e=this.render();e&&P(e,this.renderRoot),this._onUpdated()}}));var W;function B(e){return null===e?"null":Array.isArray(e)?"array":typeof e}function F(e){return e!==Object(e)}function q(e){return!!e&&!!e.nodeType}function D(e){return F(e)||q(e)}function V(e){try{if("string"==typeof e)return JSON.parse(e)}catch(e){console.error(e)}return e}function*z(e){const t=[["",e,[]]];for(;t.length;){const[e,n,r]=t.shift();if(e&&(yield[n,e,r]),!F(n))for(const[s,o]of Object.entries(n))t.push([`${e}${e?".":""}${s}`,o,[...r,e]])}}const H=(e,t)=>t instanceof RegExp?!!e.match(t):function(e,t){e=e.split("."),t=t.split(".");const n=e=>"**"===e;let r=0,s=0;for(;r<e.length;){const o=t[s];if(o===e[r]||"*"===o)s++,r++;else{if(!n(o))return!1;s++,r=e.length-(t.length-s)}}return s===t.length}(e,t),K=(e,t)=>(n,r)=>{const s={};if(e)for(const[n,o,a]of z(r.data))H(o,e)&&(s[o]=t,a.forEach(e=>s[e]=t));return{expanded:s}},J=e=>()=>({highlight:e});var G=':host{--background-color:#2a2f3a;--color:#f8f8f2;--string-color:#a3eea0;--number-color:#d19a66;--boolean-color:#4ba7ef;--null-color:#df9cf3;--property-color:#6fb3d2;--font-family:monaco,Consolas,"Lucida Console",monospace;--preview-color:rgba(222,175,143,0.9);--highlight-color:#7b0000;display:block;background-color:var(--background-color);color:var(--color);padding:.5rem;font-family:var(--font-family);font-size:1rem}.preview{color:var(--preview-color)}.null{color:var(--null-color,#df9cf3)}.key{color:var(--property-color,#f9857b);display:inline-block}.collapsable:before{display:inline-block;color:var(--color);padding-right:5px;padding-left:5px;font-size:.7rem;content:"▶";transition:transform 195ms ease-in;transform:rotate(90deg);color:var(--property-color)}.collapsable.collapsableCollapsed:before{transform:rotate(0)}.collapsable{cursor:pointer;user-select:none}.string{color:var(--string-color)}.number{color:var(--number-color)}.boolean{color:var(--boolean-color)}ul{padding:0;clear:both}li,ul{list-style:none}li,li ul>li,ul{position:relative}li ul>li{padding-top:.25rem;margin-left:1.5rem;padding-left:0}ul ul:before{content:"";border-left:1px solid #333;position:absolute;left:.5rem;top:.5rem;bottom:.5rem}ul ul:hover:before{border-left:1px solid #666}mark{background-color:var(--highlight-color)}';!function(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],s=document.createElement("style");s.type="text/css","top"===n&&r.firstChild?r.insertBefore(s,r.firstChild):r.appendChild(s),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(document.createTextNode(e))}}(G);let X,Z,Q,Y,ee,te,ne,re=e=>e;class se extends L{constructor(...e){super(...e),this.data=null,this.state={expanded:{},filtered:{},highlight:null},this.handlePropertyClick=e=>t=>{t.preventDefault(),this.setState(((e,t)=>n=>({expanded:{...n.expanded,[e]:void 0===t?!n.expanded[e]:!!t}}))(e))}}static get is(){return"json-viewer"}static get properties(){return{data:{type:V,onChange:!0}}}connectedCallback(){let e;this.hasAttribute("data")||(e=this.innerText.trim()),this.attachShadow({mode:"open"}),super.connectedCallback(),e&&(this.data=JSON.parse(e))}expand(e,t){this.setState(K(e,!0),t)}expandAll(){this.setState(K("**",!0))}collapseAll(){this.setState(K("**",!1))}collapse(e){this.setState(K(e,!1))}*search(e){for(const[t,n,r]of z(this.data))D(t)&&String(t).includes(e)&&(this.expand(n,()=>{const e=this.renderRoot.querySelector(`[data-path="${n}"]`);e.scrollIntoView({behavior:"smooth",inline:"center",block:"center"}),e.focus()}),this.setState(J(n)),yield{value:t,path:n});this.setState(J(null))}filter(e){var t;this.setState((t=e,(e,n)=>{const r={};if(t)for(const[e,s,o]of z(n.data))H(s,t)?(r[s]=!1,o.forEach(e=>r[e]=!1)):r[s]=!0;return{filtered:r}}))}resetFilter(){this.setState({filtered:{}})}renderObject(e,t){return I(X||(X=re`<ul>${0}</ul>`),Object.keys(e).map(n=>{const r=e[n],s=t?`${t}.${n}`:n,o=D(r),a=this.state.expanded[s]||o;return I(Z||(Z=re`<li data-path="${0}" hidden="${0}">${0} ${0}</li>`),s,this.state.filtered[s],this.renderPropertyKey({isCollapsable:!o,collapsed:!this.state.expanded[s],key:n,onClick:this.handlePropertyClick(s)}),a?this.renderNode(r,s):this.renderNodePreview(r)).withKey(n)}))}renderNode(e,t=""){return D(e)?this.renderValue(e,t):this.renderObject(e,t)}renderNodePreview(e){return I(Q||(Q=re`<span class="preview">${0}</span>`),function(e,t){const{nodeCount:n,maxLength:r}={nodeCount:3,maxLength:15,...t},s=Array.isArray(e),o=Object.keys(e),a=o.slice(0,n),i=[s?"[ ":"{ "],l=[];for(const t of a){const n=[],o=e[t],a=B(o);s||n.push(t+": "),"object"===a?n.push("{ ... }"):"array"===a?n.push("[ ... ]"):"string"===a?n.push(`"${o.substring(0,r)}${o.length>r?"...":""}"`):n.push(String(o)),l.push(n.join(""))}return o.length>n&&l.push("..."),i.push(l.join(", ")),i.push(s?" ]":" }"),i.join("")}(e))}renderPropertyKey({isCollapsable:e,collapsed:t,onClick:n,key:r}){return I(Y||(Y=re`<span class="${0}" onClick="${0}">${0}:</span>`),function(...e){return e.filter(Boolean).join(" ")}(r&&"key",e&&"collapsable",t&&"collapsableCollapsed"),e?n:null,r)}renderValue(e,t){const n=this.state.highlight,r=q(e)?e:I(ee||(ee=re`<span tabindex="0" class="${0}">${0}</span>`),B(e),JSON.stringify(e));return null!==n&&t===n?I(te||(te=re`<mark>${0}</mark>`),r):r}render(){return I(ne||(ne=re`<style>${0}</style>${0}`),G,this.renderNode(this.data))}}customElements.define(se.is,se);
//# sourceMappingURL=index.js.map
