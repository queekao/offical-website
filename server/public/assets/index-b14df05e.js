import{r as a,j as t,c as l,R as d}from"./vendor-58ea80d7.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const u="/assets/react-35ef61ed.svg",f="/vite.svg";function p(){const[n,s]=a.useState(0);return t.jsxs(t.Fragment,{children:[t.jsxs("div",{children:[t.jsx("a",{href:"https://vitejs.dev",target:"_blank",children:t.jsx("img",{src:f,className:"logo",alt:"Vite logo"})}),t.jsx("a",{href:"https://react.dev",target:"_blank",children:t.jsx("img",{src:u,className:"logo react",alt:"React logo"})})]}),t.jsx("h1",{children:"Vite + React"}),t.jsxs("div",{className:"card",children:[t.jsxs("button",{onClick:()=>s(o=>o+1),children:["count is ",n]}),t.jsxs("p",{children:["Edit ",t.jsx("code",{children:"src/App.tsx"})," and save to test HMR"]})]}),t.jsx("p",{className:"read-the-docs",children:"Click on the Vite and React logos to learn more"})]})}l.createRoot(document.getElementById("root")).render(t.jsx(d.StrictMode,{children:t.jsx(p,{})}));