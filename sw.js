if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const l=e=>i(e,t),d={module:{uri:t},exports:o,require:l};s[t]=Promise.all(n.map((e=>d[e]||l(e)))).then((e=>(r(...e),o)))}}define(["./workbox-b3e22772"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index.0f765373.css",revision:null},{url:"assets/index.1b89310b.js",revision:null},{url:"index.html",revision:"56a0247759dddeb0e139922af1d5d162"},{url:"jwpltx.js",revision:"f2abafff8f37719d48270d8b8217b0c2"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"eefeb68c4aa737cbc23f70bcb3e35a5e"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
