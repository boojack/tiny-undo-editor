import{d as p,c as u,a as i,b as $,t as _,n as k,p as m,e as h,o as l,r as A,f as v,g,T as b,h as x,i as I,j as E,F as f,k as w,l as T,m as L,q as N}from"./vendor.6a7d4498.js";const S=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&t(c)}).observe(document,{childList:!0,subtree:!0});function a(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(o){if(o.ep)return;o.ep=!0;const s=a(o);fetch(o.href,s)}};S();var C=(e,n)=>{for(const[a,t]of n)e[a]=t;return e};const R=p({name:"ActionContainer",props:{action:{required:!0,type:Object},index:Number,isActive:Boolean},emits:["click"],methods:{handleActionClick(){this.$emit("click",this.index)}}}),y=e=>(m("data-v-910381b2"),e=e(),h(),e),B={class:"value-text"},F=y(()=>i("span",{class:"split-text"},"\u201C",-1)),O=y(()=>i("span",{class:"split-text"},"\u201D",-1)),D={class:"addtion-text"},j={class:"addtion-text"};function q(e,n,a,t,o,s){return l(),u("div",{class:k(`action-container ${e.isActive?"active":""}`),onClick:n[0]||(n[0]=(...c)=>e.handleActionClick&&e.handleActionClick(...c))},[i("p",B,[F,$(_(e.action.value),1),O]),i("span",D,"Type: "+_(e.action.type),1),i("span",j,_(new Date(e.action.timestamp).toLocaleString()),1)],2)}var V=C(R,[["render",q],["__scopeId","data-v-910381b2"]]);const M=p({name:"TinyEditor",components:{ActionContainer:V},setup(){const e=A({actions:[],currentIndex:0}),n=v(null),a=v(null);let t=null;return g(()=>{n.value&&(t=new b(n.value,{interval:2e3}),e.actions=t.getActions(),t.subscribe((r,d)=>{e.actions=[...r],e.currentIndex=d}))}),x(()=>{t==null||t.destroy()}),I(()=>{var r;(r=a.value)==null||r.scrollTo({left:400*e.currentIndex,top:0,behavior:"smooth"})}),{state:e,editorEl:n,actionsContainerEl:a,handleActionClick:r=>{for(;e.currentIndex!==r;)e.currentIndex>r?t==null||t.runUndo():t==null||t.runRedo()},runUndo:()=>{t==null||t.runUndo()},runRedo:()=>{t==null||t.runRedo()}}}}),P=e=>(m("data-v-7dac5be8"),e=e(),h(),e),U={class:"editor-container"},z={class:"toolbar-container"},J={ref:"editorEl",placeholder:"Write something right here..."},K=P(()=>i("p",{class:"text tip-text"},"Undo/redo text history:",-1)),W={class:"actions-wrapper",ref:"actionsContainerEl"};function G(e,n,a,t,o,s){const c=E("ActionContainer");return l(),u(f,null,[i("div",U,[i("div",z,[i("span",{class:"btn",onClick:n[0]||(n[0]=(...r)=>e.runUndo&&e.runUndo(...r))},"undo"),i("span",{class:"btn",onClick:n[1]||(n[1]=(...r)=>e.runRedo&&e.runRedo(...r))},"redo")]),i("textarea",J,null,512)]),K,i("div",W,[(l(!0),u(f,null,w(e.state.actions,(r,d)=>(l(),T(c,{key:r.timestamp,index:d,action:r,isActive:e.state.currentIndex===d,onClick:e.handleActionClick},null,8,["index","action","isActive","onClick"]))),128))],512)],64)}var H=C(M,[["render",G],["__scopeId","data-v-7dac5be8"]]);const Q=i("h1",{class:"text title-text"},"\u270D\uFE0F Tiny Undo Editor",-1),X=i("p",{class:"text tip-text"},"Just a simple example to show how tiny-undo works.",-1),Y=p({setup(e){return(n,a)=>(l(),u(f,null,[Q,X,L(H)],64))}});N(Y).mount("#app");
