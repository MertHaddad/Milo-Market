"use strict";(self.webpackChunkmarket=self.webpackChunkmarket||[]).push([[246],{9246:function(n,t,r){r.r(t),r.d(t,{default:function(){return p}});var e=r(9439),i=r(2791),a=r(3433),u=r(2007),c=r.n(u),o="...",l=function(n,t){var r=t-n+1;return Array.from({length:r},(function(t,r){return r+n}))},s=function(n){var t=n.totalCount,r=n.pageSize,e=n.siblingCount,u=n.currentPage;return(0,i.useMemo)((function(){var n=Math.ceil(t/r);if(e>=n)return l(1,n);var i=Math.max(u-e,1),c=Math.min(u+e,n),s=i>2,f=c<n-2,m=1,d=n;if(!s&&f){var v=l(1,2+2*e);return[].concat((0,a.Z)(v),[o,n])}if(s&&!f){var g=l(u-1,n);return[m,o].concat((0,a.Z)(g))}if(s&&f){var p=l(i,c);return[m,o].concat((0,a.Z)(p),[o,d])}if(!s&&!f){var h=l(1,n);return(0,a.Z)(h)}}),[t,r,e,u])};s.propTypes={totalCount:c().number,pageSize:c().number,siblingCount:c().number,currentPage:c().number};var f=r(9434),m=r(7882),d=r(9312),v=r(567),g=r(184),p=function(){var n=(0,f.I0)(),t=(0,f.v9)((function(n){return n.query.value})),r=(0,f.v9)((function(n){return n.filteredProducts})),a=(0,i.useState)(1),u=(0,e.Z)(a,2),c=u[0],l=u[1],p=function(r){if(c!==r){l(r);var e="_page=".concat(r,"&_limit=24");n((0,m._L)(e)),n((0,d.kk)(t))}};(0,v.Z)((function(){p(1)}),[r.currentProductNumber]);var h=r.currentProductNumber,b=s({currentPage:c,totalCount:h,siblingCount:1,pageSize:24});if(0===c||(null===b||void 0===b?void 0:b.length)<2)return null;var k=b[(null===b||void 0===b?void 0:b.length)-1];return(0,g.jsxs)("ul",{className:"pagination-container",children:[(0,g.jsxs)("li",{className:"pagination-item ".concat(1===c?"disabled":"","\n         )"),onClick:function(){p(c-1)},children:["<"," Prev"]}),b.map((function(n,t){return n===o?(0,g.jsx)("li",{className:"pagination-item dots",children:"\u2026"},t+"dot"):(0,g.jsx)("li",{className:"pagination-item ".concat(n===c?"selected":""),onClick:function(){return p(n)},children:n},t)})),(0,g.jsxs)("li",{className:"pagination-item ".concat(c===k?"disabled":""),onClick:function(){p(c+1)},children:["Next ",">"]})]})}}}]);
//# sourceMappingURL=246.596fa7b8.chunk.js.map