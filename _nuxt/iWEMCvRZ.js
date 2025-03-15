import{a3 as j,a2 as O,z as y,R as w,A as R,a4 as A,a5 as S,b as E,a as D}from"./DP0YokjB.js";async function H(t,e){return await U(e).catch(i=>(console.error("Failed to get image meta for "+e,i+""),{width:0,height:0,ratio:0}))}async function U(t){if(typeof Image>"u")throw new TypeError("Image not supported");return new Promise((e,r)=>{const i=new Image;i.onload=()=>{const s={width:i.width,height:i.height,ratio:i.width/i.height};e(s)},i.onerror=s=>r(s),i.src=t})}function W(t){return e=>e?t[e]||e:t.missingValue}function F({formatter:t,keyMap:e,joinWith:r="/",valueMap:i}={}){t||(t=(n,o)=>`${n}=${o}`),e&&typeof e!="function"&&(e=W(e));const s=i||{};return Object.keys(s).forEach(n=>{typeof s[n]!="function"&&(s[n]=W(s[n]))}),(n={})=>Object.entries(n).filter(([a,c])=>typeof c<"u").map(([a,c])=>{const f=s[a];return typeof f=="function"&&(c=f(n[a])),a=typeof e=="function"?e(a):a,t(a,c)}).join(r)}function p(t=""){if(typeof t=="number")return t;if(typeof t=="string"&&t.replace("px","").match(/^\d+$/g))return Number.parseInt(t,10)}function L(t=""){if(t===void 0||!t.length)return[];const e=new Set;for(const r of t.split(" ")){const i=Number.parseInt(r.replace("x",""));i&&e.add(i)}return Array.from(e)}function T(t){if(t.length===0)throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)")}function q(t){const e={};if(typeof t=="string")for(const r of t.split(/[\s,]+/).filter(i=>i)){const i=r.split(":");i.length!==2?e["1px"]=i[0].trim():e[i[0].trim()]=i[1].trim()}else Object.assign(e,t);return e}function C(t){const e={options:t},r=(s,n={})=>z(e,s,n),i=(s,n={},o={})=>r(s,{...o,modifiers:j(n,o.modifiers||{})}).url;for(const s in t.presets)i[s]=(n,o,a)=>i(n,o,{...t.presets[s],...a});return i.options=t,i.getImage=r,i.getMeta=(s,n)=>G(e,s,n),i.getSizes=(s,n)=>B(e,s,n),e.$img=i,i}async function G(t,e,r){const i=z(t,e,{...r});return typeof i.getMeta=="function"?await i.getMeta():await H(t,i.url)}function z(t,e,r){var f,m;if(e&&typeof e!="string")throw new TypeError(`input must be a string (received ${typeof e}: ${JSON.stringify(e)})`);if(!e||e.startsWith("data:"))return{url:e};const{provider:i,defaults:s}=V(t,r.provider||t.options.provider),n=J(t,r.preset);if(e=y(e)?e:O(e),!i.supportsAlias){for(const g in t.options.alias)if(e.startsWith(g)){const u=t.options.alias[g];u&&(e=w(u,e.slice(g.length)))}}if(i.validateDomains&&y(e)){const g=R(e).host;if(!t.options.domains.find(u=>u===g))return{url:e}}const o=j(r,n,s);o.modifiers={...o.modifiers};const a=o.modifiers.format;(f=o.modifiers)!=null&&f.width&&(o.modifiers.width=p(o.modifiers.width)),(m=o.modifiers)!=null&&m.height&&(o.modifiers.height=p(o.modifiers.height));const c=i.getImage(e,o,t);return c.format=c.format||a||"",c}function V(t,e){const r=t.options.providers[e];if(!r)throw new Error("Unknown provider: "+e);return r}function J(t,e){if(!e)return{};if(!t.options.presets[e])throw new Error("Unknown preset: "+e);return t.options.presets[e]}function B(t,e,r){var x,_,v,$,b;const i=p((x=r.modifiers)==null?void 0:x.width),s=p((_=r.modifiers)==null?void 0:_.height),n=q(r.sizes),o=(v=r.densities)!=null&&v.trim()?L(r.densities.trim()):t.options.densities;T(o);const a=i&&s?s/i:0,c=[],f=[];if(Object.keys(n).length>=1){for(const d in n){const h=I(d,String(n[d]),s,a,t);if(h!==void 0){c.push({size:h.size,screenMaxWidth:h.screenMaxWidth,media:`(max-width: ${h.screenMaxWidth}px)`});for(const l of o)f.push({width:h._cWidth*l,src:M(t,e,r,h,l)})}}Q(c)}else for(const d of o){const h=Object.keys(n)[0];let l=h?I(h,String(n[h]),s,a,t):void 0;l===void 0&&(l={size:"",screenMaxWidth:0,_cWidth:($=r.modifiers)==null?void 0:$.width,_cHeight:(b=r.modifiers)==null?void 0:b.height}),f.push({width:d,src:M(t,e,r,l,d)})}X(f);const m=f[f.length-1],g=c.length?c.map(d=>`${d.media?d.media+" ":""}${d.size}`).join(", "):void 0,u=g?"w":"x",N=f.map(d=>`${d.src} ${d.width}${u}`).join(", ");return{sizes:g,srcset:N,src:m==null?void 0:m.src}}function I(t,e,r,i,s){const n=s.options.screens&&s.options.screens[t]||Number.parseInt(t),o=e.endsWith("vw");if(!o&&/^\d+$/.test(e)&&(e=e+"px"),!o&&!e.endsWith("px"))return;let a=Number.parseInt(e);if(!n||!a)return;o&&(a=Math.round(a/100*n));const c=i?Math.round(a*i):r;return{size:e,screenMaxWidth:n,_cWidth:a,_cHeight:c}}function M(t,e,r,i,s){return t.$img(e,{...r.modifiers,width:i._cWidth?i._cWidth*s:void 0,height:i._cHeight?i._cHeight*s:void 0},r)}function Q(t){var r;t.sort((i,s)=>i.screenMaxWidth-s.screenMaxWidth);let e=null;for(let i=t.length-1;i>=0;i--){const s=t[i];s.media===e&&t.splice(i,1),e=s.media}for(let i=0;i<t.length;i++)t[i].media=((r=t[i+1])==null?void 0:r.media)||""}function X(t){t.sort((r,i)=>r.width-i.width);let e=null;for(let r=t.length-1;r>=0;r--){const i=t[r];i.width===e&&t.splice(r,1),e=i.width}}const Y=F({keyMap:{format:"f",fit:"fit",width:"w",height:"h",resize:"s",quality:"q",background:"b"},joinWith:"&",formatter:(t,e)=>S(t)+"_"+S(e)}),Z=(t,{modifiers:e={},baseURL:r}={},i)=>{e.width&&e.height&&(e.resize=`${e.width}x${e.height}`,delete e.width,delete e.height);const s=Y(e)||"_";return r||(r=w(i.options.nuxt.baseURL,"/_ipx")),{url:w(r,s,A(t))}},k=!0,K=!0,ee=Object.freeze(Object.defineProperty({__proto__:null,getImage:Z,supportsAlias:K,validateDomains:k},Symbol.toStringTag,{value:"Module"})),P={screens:{xs:576,sm:768,md:996,lg:1200,xl:1367,xxl:1600,"2xl":1536,default:320,xxs:480,"4k":1921},presets:{},provider:"ipxStatic",domains:[],alias:{},densities:[1,2],format:["webp"]};P.providers={ipxStatic:{provider:ee,defaults:{}}};const ie=()=>{const t=D(),e=E();return e.$img||e._img||(e._img=C({...P,nuxt:{baseURL:t.app.baseURL},runtimeConfig:t}))};export{p,ie as u};
