import{C as B}from"./CLYkafUC.js";import{b as O,a6 as f,r as _,a7 as E,a8 as M,a9 as S,aa as C,ab as V,ac as H,g as w,ad as R,ae as j,af as N,ag as $,d as q,E as x,x as z,G as I,l as K,j as T,m as F,p as G}from"./BRKex3Wr.js";import{q as L}from"./pBDC-3cU.js";import"./CoBOYjO1.js";const U=t=>t==="defer"||t===!1;function J(...t){var p;const s=typeof t[t.length-1]=="string"?t.pop():void 0;typeof t[0]!="string"&&t.unshift(s);let[e,i,a={}]=t;if(typeof e!="string")throw new TypeError("[nuxt] [asyncData] key must be a string.");if(typeof i!="function")throw new TypeError("[nuxt] [asyncData] handler must be a function.");const r=O(),m=i,P=()=>f.value,b=()=>r.isHydrating?r.payload.data[e]:r.static.data[e];a.server??(a.server=!0),a.default??(a.default=P),a.getCachedData??(a.getCachedData=b),a.lazy??(a.lazy=!1),a.immediate??(a.immediate=!0),a.deep??(a.deep=f.deep),a.dedupe??(a.dedupe="cancel");const d=a.getCachedData(e,r),h=d!=null;if(!r._asyncData[e]||!a.immediate){(p=r.payload._errors)[e]??(p[e]=f.errorValue);const o=a.deep?_:E;r._asyncData[e]={data:o(h?d:a.default()),pending:_(!h),error:M(r.payload._errors,e),status:_("idle"),_default:a.default}}const n={...r._asyncData[e]};delete n._default,n.refresh=n.execute=(o={})=>{if(r._asyncDataPromises[e]){if(U(o.dedupe??a.dedupe))return r._asyncDataPromises[e];r._asyncDataPromises[e].cancelled=!0}if(o._initial||r.isHydrating&&o._initial!==!1){const l=o._initial?d:a.getCachedData(e,r);if(l!=null)return Promise.resolve(l)}n.pending.value=!0,n.status.value="pending";const u=new Promise((l,c)=>{try{l(m(r))}catch(y){c(y)}}).then(async l=>{if(u.cancelled)return r._asyncDataPromises[e];let c=l;a.transform&&(c=await a.transform(l)),a.pick&&(c=W(c,a.pick)),r.payload.data[e]=c,n.data.value=c,n.error.value=f.errorValue,n.status.value="success"}).catch(l=>{if(u.cancelled)return r._asyncDataPromises[e];n.error.value=H(l),n.data.value=w(a.default()),n.status.value="error"}).finally(()=>{u.cancelled||(n.pending.value=!1,delete r._asyncDataPromises[e])});return r._asyncDataPromises[e]=u,r._asyncDataPromises[e]},n.clear=()=>Q(r,e);const D=()=>n.refresh({_initial:!0}),v=a.server!==!1&&r.payload.serverRendered;{const o=R();if(o&&v&&a.immediate&&!o.sp&&(o.sp=[]),o&&!o._nuxtOnBeforeMountCbs){o._nuxtOnBeforeMountCbs=[];const c=o._nuxtOnBeforeMountCbs;j(()=>{c.forEach(y=>{y()}),c.splice(0,c.length)}),N(()=>c.splice(0,c.length))}v&&r.isHydrating&&(n.error.value||d!=null)?(n.pending.value=!1,n.status.value=n.error.value?"error":"success"):o&&(r.payload.serverRendered&&r.isHydrating||a.lazy)&&a.immediate?o._nuxtOnBeforeMountCbs.push(D):a.immediate&&D();const u=V();if(a.watch){const c=S(a.watch,()=>n.refresh());u&&C(c)}const l=r.hook("app:data:refresh",async c=>{(!c||c.includes(e))&&await n.refresh()});u&&C(l)}const g=Promise.resolve(r._asyncDataPromises[e]).then(()=>n);return Object.assign(g,n),g}function Q(t,s){s in t.payload.data&&(t.payload.data[s]=void 0),s in t.payload._errors&&(t.payload._errors[s]=f.errorValue),t._asyncData[s]&&(t._asyncData[s].data.value=void 0,t._asyncData[s].error.value=f.errorValue,t._asyncData[s].pending.value=!1,t._asyncData[s].status.value="idle"),s in t._asyncDataPromises&&(t._asyncDataPromises[s]&&(t._asyncDataPromises[s].cancelled=!0),t._asyncDataPromises[s]=void 0)}function W(t,s){const e={};for(const i of s)e[i]=t[i];return e}function X(){const{locale:t}=$();return{fetch:async()=>{const{data:s}=await J(`layout-data-${t.value}`,()=>L("layout").path(`/layout/${t.value}`).first().then(({body:e})=>e),{watch:[t]});return s}}}const aa=q({__name:"default",async setup(t){let s,e;const{fetch:i}=X(),a=([s,e]=x(()=>i()),s=await s,e(),s);return G("layoutData",a),(r,m)=>(T(),z("div",null,[I(w(B),null,{default:K(()=>[F(r.$slots,"default")]),_:3})]))}});export{aa as default};
