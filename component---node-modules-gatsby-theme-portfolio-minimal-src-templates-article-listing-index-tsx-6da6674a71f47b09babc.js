(self.webpackChunkgatsby_starter_portfolio_minimal_theme=self.webpackChunkgatsby_starter_portfolio_minimal_theme||[]).push([[226],{9662:function(e,t,n){var r=n(614),o=n(6330),i=TypeError;e.exports=function(e){if(r(e))return e;throw i(o(e)+" is not a function")}},1223:function(e,t,n){var r=n(5112),o=n(30),i=n(3070).f,a=r("unscopables"),l=Array.prototype;null==l[a]&&i(l,a,{configurable:!0,value:o(null)}),e.exports=function(e){l[a][e]=!0}},9670:function(e,t,n){var r=n(111),o=String,i=TypeError;e.exports=function(e){if(r(e))return e;throw i(o(e)+" is not an object")}},1318:function(e,t,n){var r=n(5656),o=n(1400),i=n(6244),a=function(e){return function(t,n,a){var l,c=r(t),s=i(c),u=o(a,s);if(e&&n!=n){for(;s>u;)if((l=c[u++])!=l)return!0}else for(;s>u;u++)if((e||u in c)&&c[u]===n)return e||u||0;return!e&&-1}};e.exports={includes:a(!0),indexOf:a(!1)}},4326:function(e,t,n){var r=n(1702),o=r({}.toString),i=r("".slice);e.exports=function(e){return i(o(e),8,-1)}},3072:function(e,t,n){var r=n(7854),o=Object.defineProperty;e.exports=function(e,t){try{o(r,e,{value:t,configurable:!0,writable:!0})}catch(n){r[e]=t}return t}},9781:function(e,t,n){var r=n(7293);e.exports=!r((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},4154:function(e){var t="object"==typeof document&&document.all,n=void 0===t&&void 0!==t;e.exports={all:t,IS_HTMLDDA:n}},317:function(e,t,n){var r=n(7854),o=n(111),i=r.document,a=o(i)&&o(i.createElement);e.exports=function(e){return a?i.createElement(e):{}}},8113:function(e){e.exports="undefined"!=typeof navigator&&String(navigator.userAgent)||""},7392:function(e,t,n){var r,o,i=n(7854),a=n(8113),l=i.process,c=i.Deno,s=l&&l.versions||c&&c.version,u=s&&s.v8;u&&(o=(r=u.split("."))[0]>0&&r[0]<4?1:+(r[0]+r[1])),!o&&a&&(!(r=a.match(/Edge\/(\d+)/))||r[1]>=74)&&(r=a.match(/Chrome\/(\d+)/))&&(o=+r[1]),e.exports=o},748:function(e){e.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},7293:function(e){e.exports=function(e){try{return!!e()}catch(t){return!0}}},4374:function(e,t,n){var r=n(7293);e.exports=!r((function(){var e=function(){}.bind();return"function"!=typeof e||e.hasOwnProperty("prototype")}))},6916:function(e,t,n){var r=n(4374),o=Function.prototype.call;e.exports=r?o.bind(o):function(){return o.apply(o,arguments)}},1702:function(e,t,n){var r=n(4374),o=Function.prototype,i=o.call,a=r&&o.bind.bind(i,i);e.exports=r?a:function(e){return function(){return i.apply(e,arguments)}}},5005:function(e,t,n){var r=n(7854),o=n(614);e.exports=function(e,t){return arguments.length<2?(n=r[e],o(n)?n:void 0):r[e]&&r[e][t];var n}},8173:function(e,t,n){var r=n(9662),o=n(8554);e.exports=function(e,t){var n=e[t];return o(n)?void 0:r(n)}},7854:function(e,t,n){var r=function(e){return e&&e.Math==Math&&e};e.exports=r("object"==typeof globalThis&&globalThis)||r("object"==typeof window&&window)||r("object"==typeof self&&self)||r("object"==typeof n.g&&n.g)||function(){return this}()||this||Function("return this")()},2597:function(e,t,n){var r=n(1702),o=n(7908),i=r({}.hasOwnProperty);e.exports=Object.hasOwn||function(e,t){return i(o(e),t)}},3501:function(e){e.exports={}},490:function(e,t,n){var r=n(5005);e.exports=r("document","documentElement")},4664:function(e,t,n){var r=n(9781),o=n(7293),i=n(317);e.exports=!r&&!o((function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a}))},8361:function(e,t,n){var r=n(1702),o=n(7293),i=n(4326),a=Object,l=r("".split);e.exports=o((function(){return!a("z").propertyIsEnumerable(0)}))?function(e){return"String"==i(e)?l(e,""):a(e)}:a},614:function(e,t,n){var r=n(4154),o=r.all;e.exports=r.IS_HTMLDDA?function(e){return"function"==typeof e||e===o}:function(e){return"function"==typeof e}},8554:function(e){e.exports=function(e){return null==e}},111:function(e,t,n){var r=n(614),o=n(4154),i=o.all;e.exports=o.IS_HTMLDDA?function(e){return"object"==typeof e?null!==e:r(e)||e===i}:function(e){return"object"==typeof e?null!==e:r(e)}},1913:function(e){e.exports=!1},2190:function(e,t,n){var r=n(5005),o=n(614),i=n(7976),a=n(3307),l=Object;e.exports=a?function(e){return"symbol"==typeof e}:function(e){var t=r("Symbol");return o(t)&&i(t.prototype,l(e))}},6244:function(e,t,n){var r=n(7466);e.exports=function(e){return r(e.length)}},4758:function(e){var t=Math.ceil,n=Math.floor;e.exports=Math.trunc||function(e){var r=+e;return(r>0?n:t)(r)}},30:function(e,t,n){var r,o=n(9670),i=n(6048),a=n(748),l=n(3501),c=n(490),s=n(317),u=n(6200),f="prototype",d="script",p=u("IE_PROTO"),m=function(){},v=function(e){return"<"+d+">"+e+"</"+d+">"},y=function(e){e.write(v("")),e.close();var t=e.parentWindow.Object;return e=null,t},h=function(){try{r=new ActiveXObject("htmlfile")}catch(i){}var e,t,n;h="undefined"!=typeof document?document.domain&&r?y(r):(t=s("iframe"),n="java"+d+":",t.style.display="none",c.appendChild(t),t.src=String(n),(e=t.contentWindow.document).open(),e.write(v("document.F=Object")),e.close(),e.F):y(r);for(var o=a.length;o--;)delete h[f][a[o]];return h()};l[p]=!0,e.exports=Object.create||function(e,t){var n;return null!==e?(m[f]=o(e),n=new m,m[f]=null,n[p]=e):n=h(),void 0===t?n:i.f(n,t)}},6048:function(e,t,n){var r=n(9781),o=n(3353),i=n(3070),a=n(9670),l=n(5656),c=n(1956);t.f=r&&!o?Object.defineProperties:function(e,t){a(e);for(var n,r=l(t),o=c(t),s=o.length,u=0;s>u;)i.f(e,n=o[u++],r[n]);return e}},3070:function(e,t,n){var r=n(9781),o=n(4664),i=n(3353),a=n(9670),l=n(4948),c=TypeError,s=Object.defineProperty,u=Object.getOwnPropertyDescriptor,f="enumerable",d="configurable",p="writable";t.f=r?i?function(e,t,n){if(a(e),t=l(t),a(n),"function"==typeof e&&"prototype"===t&&"value"in n&&p in n&&!n[p]){var r=u(e,t);r&&r[p]&&(e[t]=n.value,n={configurable:d in n?n[d]:r[d],enumerable:f in n?n[f]:r[f],writable:!1})}return s(e,t,n)}:s:function(e,t,n){if(a(e),t=l(t),a(n),o)try{return s(e,t,n)}catch(r){}if("get"in n||"set"in n)throw c("Accessors not supported");return"value"in n&&(e[t]=n.value),e}},7976:function(e,t,n){var r=n(1702);e.exports=r({}.isPrototypeOf)},6324:function(e,t,n){var r=n(1702),o=n(2597),i=n(5656),a=n(1318).indexOf,l=n(3501),c=r([].push);e.exports=function(e,t){var n,r=i(e),s=0,u=[];for(n in r)!o(l,n)&&o(r,n)&&c(u,n);for(;t.length>s;)o(r,n=t[s++])&&(~a(u,n)||c(u,n));return u}},1956:function(e,t,n){var r=n(6324),o=n(748);e.exports=Object.keys||function(e){return r(e,o)}},2140:function(e,t,n){var r=n(6916),o=n(614),i=n(111),a=TypeError;e.exports=function(e,t){var n,l;if("string"===t&&o(n=e.toString)&&!i(l=r(n,e)))return l;if(o(n=e.valueOf)&&!i(l=r(n,e)))return l;if("string"!==t&&o(n=e.toString)&&!i(l=r(n,e)))return l;throw a("Can't convert object to primitive value")}},4488:function(e,t,n){var r=n(8554),o=TypeError;e.exports=function(e){if(r(e))throw o("Can't call method on "+e);return e}},6200:function(e,t,n){var r=n(2309),o=n(9711),i=r("keys");e.exports=function(e){return i[e]||(i[e]=o(e))}},5465:function(e,t,n){var r=n(7854),o=n(3072),i="__core-js_shared__",a=r[i]||o(i,{});e.exports=a},2309:function(e,t,n){var r=n(1913),o=n(5465);(e.exports=function(e,t){return o[e]||(o[e]=void 0!==t?t:{})})("versions",[]).push({version:"3.30.2",mode:r?"pure":"global",copyright:"© 2014-2023 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.30.2/LICENSE",source:"https://github.com/zloirock/core-js"})},6293:function(e,t,n){var r=n(7392),o=n(7293),i=n(7854).String;e.exports=!!Object.getOwnPropertySymbols&&!o((function(){var e=Symbol();return!i(e)||!(Object(e)instanceof Symbol)||!Symbol.sham&&r&&r<41}))},1400:function(e,t,n){var r=n(9303),o=Math.max,i=Math.min;e.exports=function(e,t){var n=r(e);return n<0?o(n+t,0):i(n,t)}},5656:function(e,t,n){var r=n(8361),o=n(4488);e.exports=function(e){return r(o(e))}},9303:function(e,t,n){var r=n(4758);e.exports=function(e){var t=+e;return t!=t||0===t?0:r(t)}},7466:function(e,t,n){var r=n(9303),o=Math.min;e.exports=function(e){return e>0?o(r(e),9007199254740991):0}},7908:function(e,t,n){var r=n(4488),o=Object;e.exports=function(e){return o(r(e))}},7593:function(e,t,n){var r=n(6916),o=n(111),i=n(2190),a=n(8173),l=n(2140),c=n(5112),s=TypeError,u=c("toPrimitive");e.exports=function(e,t){if(!o(e)||i(e))return e;var n,c=a(e,u);if(c){if(void 0===t&&(t="default"),n=r(c,e,t),!o(n)||i(n))return n;throw s("Can't convert object to primitive value")}return void 0===t&&(t="number"),l(e,t)}},4948:function(e,t,n){var r=n(7593),o=n(2190);e.exports=function(e){var t=r(e,"string");return o(t)?t:t+""}},6330:function(e){var t=String;e.exports=function(e){try{return t(e)}catch(n){return"Object"}}},9711:function(e,t,n){var r=n(1702),o=0,i=Math.random(),a=r(1..toString);e.exports=function(e){return"Symbol("+(void 0===e?"":e)+")_"+a(++o+i,36)}},3307:function(e,t,n){var r=n(6293);e.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},3353:function(e,t,n){var r=n(9781),o=n(7293);e.exports=r&&o((function(){return 42!=Object.defineProperty((function(){}),"prototype",{value:42,writable:!1}).prototype}))},5112:function(e,t,n){var r=n(7854),o=n(2309),i=n(2597),a=n(9711),l=n(6293),c=n(3307),s=r.Symbol,u=o("wks"),f=c?s.for||s:s&&s.withoutSetter||a;e.exports=function(e){return i(u,e)||(u[e]=l&&i(s,e)?s[e]:f("Symbol."+e)),u[e]}},3792:function(e,t,n){n(1223)("flat")},4088:function(e,t,n){"use strict";n.d(t,{T:function(){return g},w:function(){return x}});var r=n(7294),o=n(1883),i=n(8032),a=function(){return a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},a.apply(this,arguments)};var l={skeleton:"styles_skeleton__tyzRD","skeleton-progress":"styles_skeleton-progress__aezri"};function c(e){var t=e.width,n=void 0===t?"100%":t,o=e.height,i=void 0===o?"1em":o,c=e.background,s=void 0===c?"#E9ECEF":c,u=e.radius,f=void 0===u?"4px":u,d=e.circle,p=void 0!==d&&d,m=e.block,v=void 0===m||m,y=e.style,h=void 0===y?{}:y,b=e.as,g=void 0===b?"div":b;return r.createElement(g,{className:l.skeleton,style:a({width:n,height:i,background:s,borderRadius:p?"50%":f,display:v?"block":"inline-block"},h)},"‌")}!function(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css","top"===n&&r.firstChild?r.insertBefore(o,r.firstChild):r.appendChild(o),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e))}}('.styles_skeleton__tyzRD{background:#eff1f6;display:inline-block;line-height:1;overflow:hidden;position:relative}.styles_skeleton__tyzRD:before{animation:styles_skeleton-progress__aezri 1.2s ease-in-out infinite;background-image:linear-gradient(90deg,hsla(0,0%,100%,0),hsla(0,0%,100%,.6),hsla(0,0%,100%,0));content:"";height:100%;left:-500px;position:absolute;top:0;width:500px}@keyframes styles_skeleton-progress__aezri{0%{left:-500px}to{left:100%}}');var s=n(5400),u="style-module--Banner--d401d",f="style-module--Card--c661d",d="style-module--Category--eeb92",p="style-module--DescriptionWrapper--5f867",m="style-module--Details--5ba4b",v="style-module--Image--43f10",y="style-module--ImageWrapper--50300",h="style-module--ReadingTime--a0392",b="style-module--Title--de70d";function g(e){const{globalState:t}=(0,s.j1)(),n=t.theme===s.Q2.Dark,a=e.data.link.indexOf("://")>0||0===e.data.link.indexOf("//"),l=r.createElement("article",{className:f,style:n?{border:"0.125rem solid var(--primary-color)"}:void 0},e.showBanner&&r.createElement("div",{className:u},e.data.image&&e.data.image.src&&r.createElement(i.G,{className:y,imgClassName:v,objectFit:e.data.image.objectFit||"cover",image:e.data.image.src.childImageSharp.gatsbyImageData,alt:e.data.image.alt||e.data.title})),r.createElement("div",{className:p},r.createElement("span",{className:d},r.createElement("u",null,e.data.category)),r.createElement("h4",{className:b},e.data.title),r.createElement("div",{className:m},["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][(c=e.data.publishedAt).getMonth()]+" "+c.getDate()+", "+c.getFullYear(),e.data.readingTime&&r.createElement("span",{className:h},e.data.readingTime))));var c;return a?r.createElement("a",{href:e.data.link,target:"_blank",rel:"noopener noreferrer",title:e.data.title},l):r.createElement(o.Link,{to:e.data.link,title:e.data.title},l)}function x(){const{globalState:e}=(0,s.j1)(),t=e.theme===s.Q2.Dark;return r.createElement("div",{className:f,style:t?{border:"0.125rem solid var(--primary-color)"}:void 0},r.createElement("div",{className:p},r.createElement(c,{style:{height:"1.5rem",marginBottom:".5rem",background:"var(--tertiary-color)"}}),r.createElement(c,{style:{height:"4rem",background:"var(--tertiary-color)"}}),r.createElement(c,{style:{height:".75rem",width:"50%",marginTop:".5rem",background:"var(--tertiary-color)"}})))}},2311:function(e,t,n){"use strict";n.d(t,{z:function(){return l},L:function(){return a}});var r=n(7294),o=n(1883),i="style-module--Button--82b1f";let a=function(e){return e.BUTTON="button",e.SUBMIT="submit",e.LINK="link",e}({});function l(e){if(e.type===a.LINK){if(e.url)return e.externalLink?r.createElement("a",{id:e.id,className:i,href:e.url,target:"_blank",rel:"noopener noreferrer","aria-label":"External Link"},e.label):r.createElement(o.Link,{id:e.id,to:e.url,className:i},e.label);throw new Error("Button should be a "+e.type+" but no URL is given!")}if(e.type===a.BUTTON||e.type===a.SUBMIT){if(!e.onClickHandler)throw new Error("Button should be a "+e.type+" but no onClickHandler is given!");return r.createElement("button",{id:e.id,className:i,type:e.type,onClick:e.onClickHandler},e.label)}throw new Error("Unknown button type specified.")}},1187:function(e,t,n){"use strict";n.d(t,{$:function(){return l}});var r=n(7294),o="style-module--ContentWrapper --36dde",i="style-module--Heading--2c002",a="style-module--Section--1d871";function l(e){let t;return t=e.additionalClasses?e.additionalClasses.concat(o).join(" "):o,r.createElement("section",{id:e.anchor,className:a},r.createElement("div",{className:t},e.heading&&r.createElement("h3",{className:i},e.heading),e.children))}},8768:function(e,t,n){"use strict";n.d(t,{i:function(){return i}});var r=n(7294),o="style-module--SlideContainer--60bf2";function i(e){let t;return t=e.additionalClasses?e.additionalClasses.concat(o).join(" "):o,r.createElement("div",{className:t,style:e.style},e.children)}},974:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return b}});n(3792);var r=n(5785),o=n(7294),i=n(954),a=n(1187),l=n(533),c=n(8768),s=n(4088),u=n(2311),f="style-module--Filter--31377",d="style-module--Listing--52eca",p="style-module--LoadMore--8b4c0",m="style-module--Option--83bb9",v="style-module--Options--3515b",y="style-module--Selected--f3165",h=n(1643);function b(e){var t;const n=e.pageContext.articles,[b,g]=o.useState(function(e){const t=[],n=[];return e.forEach((e=>{e.categories.forEach((r=>{if(n.includes(r)){const n=t.map((e=>e.label)).indexOf(r);t[n].relatedArticleIds.push(e.id)}else t.push({label:r,selected:!1,relatedArticleIds:[e.id]}),n.push(r)}))})),t.sort(((e,t)=>e.relatedArticleIds.length>t.relatedArticleIds.length?-1:1))}(n)),[x,E]=o.useState(9);let k=[];const w=-1!==b.map((e=>e.selected)).indexOf(!0);w&&(k=b.filter((e=>e.selected)).map((e=>e.relatedArticleIds)).flat(1).filter(((e,t,n)=>n.indexOf(e)===t)));const O=null!==(t=(0,h._)(e.pageContext.entityName))&&void 0!==t?t:"Articles";return o.createElement(o.Fragment,null,o.createElement(l.p,{title:"All "+O,useTitleTemplate:!0}),o.createElement(i.T,null,o.createElement(a.$,{anchor:"articleListing",heading:O},o.createElement("div",{className:f},"Select categories to filter ",O.toLocaleLowerCase(),o.createElement(c.i,{additionalClasses:[v]},b.map(((e,t)=>o.createElement("div",{key:t,role:"button",onClick:()=>function(e){const t=(0,r.Z)(b),n=t.map((e=>e.label)).indexOf(e);t[n].selected=!t[n].selected,g(t)}(e.label),className:[m,!0===e.selected?y:null].join(" ")},e.label," (",e.relatedArticleIds.length,")"))))),o.createElement("div",{className:d},n.filter((e=>!w||k.includes(e.id))).slice(0,x).map(((e,t)=>o.createElement(s.T,{key:t,showBanner:!0,data:{image:e.banner,title:e.title,category:e.categories.join(" / "),publishedAt:new Date(e.date.replace(/-/g,"/")),link:e.slug,readingTime:e.readingTime.text}})))),w&&k.length>x||!w&&n.length>x?o.createElement("div",{className:p},o.createElement(u.z,{type:u.L.BUTTON,label:"Load More",onClickHandler:()=>function(e,t){const n=x+3;(t&&t>=n||!t&&e>=n)&&E(n)}(n.length,w?k.length:void 0)})):null)))}},1643:function(e,t,n){"use strict";function r(e,t){if(!e)return;if(void 0!==t&&1===t)return e;const n={"(quiz)$":"$1zes","^(ox)$":"$1en","([m|l])ouse$":"$1ice","(matr|vert|ind)ix|ex$":"$1ices","(x|ch|ss|sh)$":"$1es","([^aeiouy]|qu)y$":"$1ies","(hive)$":"$1s","(?:([^f])fe|([lr])f)$":"$1$2ves","(shea|lea|loa|thie)f$":"$1ves",sis$:"ses","([ti])um$":"$1a","(tomat|potat|ech|her|vet)o$":"$1oes","(bu)s$":"$1ses","(alias)$":"$1es","(octop)us$":"$1i","(ax|test)is$":"$1es","(us)$":"$1es","([^s]+)$":"$1s"},r={move:"moves",foot:"feet",goose:"geese",sex:"sexes",child:"children",man:"men",tooth:"teeth",person:"people"};if(["sheep","fish","deer","moose","series","species","money","rice","information","equipment","bison","cod","offspring","pike","salmon","shrimp","swine","trout","aircraft","hovercraft","spacecraft","sugar","tuna","you","wood"].indexOf(e.toLowerCase())>=0)return e;for(const o in r){const t=new RegExp(o+"$","i"),n=r[o];if(t.test(e))return e.replace(t,n)}for(const o in n){const t=new RegExp(o,"i");if(t.test(e))return e.replace(t,n[o])}return e}n.d(t,{_:function(){return r}})}}]);
//# sourceMappingURL=component---node-modules-gatsby-theme-portfolio-minimal-src-templates-article-listing-index-tsx-6da6674a71f47b09babc.js.map