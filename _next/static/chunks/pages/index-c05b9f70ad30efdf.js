(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(8417)}])},8417:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return f}});var l=n(5893),o=n(8110),r=n.n(o);let i=e=>(0,l.jsxs)("div",{className:r().cell,onClick:e.onClick,children:[0!==e.color&&(0,l.jsx)("div",{className:r().stone,style:{background:1===e.color?"#000":"#fff"}}),3===e.color&&(0,l.jsx)("div",{className:r().inditate})]});var c=n(7294);let s=()=>{let[e,t]=(0,c.useState)(1),[n,l]=(0,c.useState)([[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,1,2,0,0,0],[0,0,0,2,1,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]),o=[[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]],r=t=>{let l=[];for(let o=0;o<8;o++)for(let r=0;r<8;r++)if(0===n[r][o]){let[i,c]=t,s=o+i,a=r+c;for(;void 0!==n[a]&&void 0!==n[a][s]&&0!==n[a][s];){if(n[a][s]===e)return l;l.push([r,o]),s+=i,a+=c}}return l},i=(t,l,o)=>{let[r,i]=o,c=t+r,s=l+i,a=[];for(;void 0!==n[s]&&void 0!==n[s][c]&&0!==n[s][c]&&3!==n[s][c];){if(n[s][c]===e)return a;a.push([s,c]),c+=r,s+=i}return[]},s=(t,n)=>{for(let l of t){let[t,o]=l;n[t][o]=e}l(n)},a=(c,a)=>{if(console.log(c,a),0!==n[a][c])return;let _=r([0,1]);if(0===_.length)return;let u=[];for(let e of o){let t=i(c,a,e);u=[...u,...t]}if(0===u.length)return;let f=JSON.parse(JSON.stringify(n));f[a][c]=e,l(f),s(u,f),t(3-e)};return console.table(n),{board:n,onClick:a}};var a=n(2729),_=n.n(a);let u=()=>{let{board:e,onClick:t}=s();return(0,l.jsx)("div",{className:_().container,children:(0,l.jsx)("div",{className:_().board,children:e.map((e,n)=>e.map((e,o)=>(0,l.jsx)(i,{color:e,onClick:()=>t(o,n)},"".concat(o,"-").concat(n))))})})};var f=u},8110:function(e){e.exports={cell:"Cell_cell__GF83C",stone:"Cell_stone__IZs5P",inditate:"Cell_inditate__dMYtz"}},2729:function(e){e.exports={container:"index_container__gnN1f",board:"index_board__2d6xe",cell:"index_cell__3W8ZQ",stone:"index_stone__oeDmm"}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);