(this.webpackJsonpcoronatracker=this.webpackJsonpcoronatracker||[]).push([[0],{280:function(e,t,a){e.exports=a(484)},481:function(e,t,a){},483:function(e,t,a){},484:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(16),o=a.n(l),c=a(25),i=a(71),s=a(59),m=a(69),u=a.n(m),d=a(87),p=a(222),h=a(223),g=a(43),E=a(237),f=a(238),b=a(533),v=a(239),C=a(126),k=a(573),y=a(569),x="Invalid country selected - please select another!",B="Unable to fetch data - please check back in a bit!",S="Success - Data loaded!";function O(e){var t=e.open,a=e.message,n=e.handleClose,l=a===B?function(){}:n;return r.a.createElement(k.a,{open:t,autoHideDuration:6e3,onClose:l,anchorOrigin:{horizontal:"left",vertical:"bottom"}},r.a.createElement(y.a,{severity:"error",variant:"filled",onClose:n},a))}function I(e){var t=e.open,a=e.message,n=e.handleClose;return r.a.createElement(k.a,{open:t,autoHideDuration:6e3,onClose:n,anchorOrigin:{horizontal:"left",vertical:"bottom"}},r.a.createElement(y.a,{severity:"success",variant:"filled",onClose:n},a))}function j(e){var t=e.fetchState,a=e.setFetchState,n=e.validated,l=e.updateValidation,o=t.alerts,c=o.errAlert,i=o.successAlert,s=function(){a(Object(C.a)({},t,{alerts:{errAlert:!1,successAlert:!1}}))};return r.a.createElement(r.a.Fragment,null,r.a.createElement(O,{open:c,message:B,handleClose:s}),r.a.createElement(O,{open:!n,message:x,handleClose:function(){return l(!1)}}),r.a.createElement(I,{open:i,message:S,handleClose:s}))}var w=a(530),A=a(531),F=a(490),T=a(532);function N(e){var t=e.country,a=e.index,n=e.handleClose,l=e.handleChange;return r.a.createElement(w.a,{component:"div",onClick:function(){return l(a)},label:r.a.createElement("div",null,t,r.a.createElement(A.a,{title:"Remove tab",placement:"bottom"},r.a.createElement(F.a,{color:"inherit",size:"small",onClick:function(e){return n(e,a)}},r.a.createElement(T.a,null))))})}var D=a(534);function V(){return r.a.createElement(b.a,{container:!0,direction:"row",justify:"center",alignItems:"center",style:{margin:30}},r.a.createElement(b.a,{item:!0,xs:10,sm:12,md:12,lg:12},r.a.createElement(v.a,{align:"center",variant:"body1"},"Big thanks to the ",r.a.createElement(A.a,{title:"Go to source data"},r.a.createElement(D.a,{href:"https://github.com/CSSEGISandData/COVID-19",color:"primary",variant:"body1"},"John Hopkins CSSE"))," for the data! Report any issues ",r.a.createElement(A.a,{title:"Report an issue"},r.a.createElement(D.a,{href:"https://github.com/sashaobucina/coronatracker/issues"},"here")),".")))}var M=a(240),W=a(577),z=Object(M.a)({color:{color:"#3BBA9C"},slider:{height:5}});function L(e){var t=e.dates,a=e.updateState,n=e.value,l=z();return r.a.createElement(W.a,{classes:{colorPrimary:l.color,colorSecondary:l.color,rail:l.slider,track:l.slider},defaultValue:0,valueLabelFormat:function(t){return e.dates[t]},"aria-labelledby":"discrete-slider",marks:!0,step:1,min:0,max:t.length-1,valueLabelDisplay:"on",value:n,onChange:function(e,t){return a(t)}})}var P=a(18);function R(e){var t=e.data,a=e.dataKey;return r.a.createElement(P.h,{height:400},r.a.createElement(P.g,{data:t},r.a.createElement(P.c,{stroke:"#3BBA9C",height:25,fill:"#3C3F58",travellerWidth:8}),r.a.createElement(P.d,{strokeWidth:.5}),r.a.createElement(P.j,{dataKey:"date",stroke:"#3BBA9C"}),r.a.createElement(P.k,{stroke:"#3BBA9C"}),r.a.createElement(P.f,{type:"monotone",dataKey:a,stroke:"#3BBA9C",strokeWidth:2,dot:!1}),r.a.createElement(P.i,null),r.a.createElement(P.e,null)))}function K(e){var t=e.data;return r.a.createElement(P.h,{height:500,style:{minWidth:"100%"}},r.a.createElement(P.b,{data:t,title:"Cases of COVID-19"},r.a.createElement("defs",null,r.a.createElement("linearGradient",{id:"colorConfirmed",x1:"0",y1:"0",x2:"0",y2:"1"},r.a.createElement("stop",{offset:"5%",stopColor:"#a15c03",stopOpacity:.8}),r.a.createElement("stop",{offset:"95%",stopColor:"#a15c03",stopOpacity:0})),r.a.createElement("linearGradient",{id:"colorDeaths",x1:"0",y1:"0",x2:"0",y2:"1"},r.a.createElement("stop",{offset:"5%",stopColor:"#9c3321",stopOpacity:.8}),r.a.createElement("stop",{offset:"95%",stopColor:"#9c3321",stopOpacity:0}))),r.a.createElement(P.c,{stroke:"#3BBA9C",height:25,fill:"#3C3F58",travellerWidth:8}),r.a.createElement(P.j,{dataKey:"date",stroke:"#3BBA9C"}),r.a.createElement(P.k,{stroke:"#3BBA9C"}),r.a.createElement(P.a,{type:"monotone",dataKey:"confirmed",stroke:"#a15c03",fillOpacity:1,fill:"url(#colorConfirmed)"}),r.a.createElement(P.a,{type:"monotone",dataKey:"deaths",stroke:"red",fillOpacity:1,fill:"url(#colorDeaths)"}),r.a.createElement(P.i,null),r.a.createElement(P.e,null)))}function _(e){var t=e.data,a=e.scale,n="log"===a?[1,1e7]:[1,1e4];return r.a.createElement(P.h,{height:480},r.a.createElement(P.g,{data:t,margin:{top:15,right:30,left:20,bottom:5}},r.a.createElement(P.d,{strokeWidth:.5,strokeDasharray:"3 3"}),r.a.createElement(P.j,{dataKey:"cases",name:"Total Confirmed Cases",stroke:"#3BBA9C",type:"number",domain:[1,1e6],scale:"log",ticks:[1,10,100,1e3,1e4,1e5,1e6]}),r.a.createElement(P.k,{dataKey:"weekly",name:"Weekly Confirmed Cases",label:{value:"New Cases (per week)",angle:-90,position:"insideBottomLeft",fill:"#3BBA9C",fontSize:18,fontWeight:"normal"},stroke:"#3BBA9C",type:"number",domain:n,scale:a}),r.a.createElement(P.f,{type:"monotone",name:"Total Confirmed Cases",dataKey:"weekly",stroke:"#3BBA9C",strokeWidth:2,animationDuration:400,dot:!0}),r.a.createElement(P.i,null),r.a.createElement(P.e,{iconSize:0})))}var G=a(578),Q=a(535),H=Object(M.a)({root:{background:"#3C3F58",color:"#3BBA9C","&:hover":{background:"#3C3F58"}},button:{background:"#3C3F58",color:"#212121","&:hover":{background:"#3C3F58",color:"#3BBA9C",fontWeight:"bolder",opacity:.8},"&.Mui-selected":{background:"#3C3F58",color:"#3BBA9C",fontWeight:"bold","&:hover":{background:"#3C3F58",opacity:1}}}});function q(e){var t=e.scale,a=e.updateScale,n=H();return r.a.createElement(A.a,{title:"Modify scale",placement:"top"},r.a.createElement(G.a,{className:n.root,exclusive:!0,size:"small",value:t,onChange:function(e,t){t&&a(t)}},r.a.createElement(Q.a,{className:n.button,value:"log"},"Log"),r.a.createElement(Q.a,{className:n.button,value:"linear"},"Linear")))}var J=a(538),U=a(536),X=a(537),Y=a(539),Z=a(540),$=a(541),ee=a(542);function te(e){var t=Object(n.useState)(!0),a=Object(c.a)(t,2),l=a[0],o=a[1],i=e.indexValue,s=e.maxIndex,m=e.onStepClick,u=e.speed,d=e.updateIndexState;Object(n.useEffect)((function(){if(l){var t=setInterval((function(){var t=e.indexValue,a=e.maxIndex,n=e.updateIndexState;t<a?n(t+1):o(!l)}),100/u);return function(){return clearInterval(t)}}}),[l,u,e]);var p=l?r.a.createElement(A.a,{title:"Pause animation",placement:"top"},r.a.createElement(F.a,{color:"inherit",size:"medium",onClick:function(){return o(!1)}},r.a.createElement(U.a,null))):r.a.createElement(A.a,{title:"Play animation",placement:"top"},r.a.createElement(F.a,{onClick:function(){return i<s?o(!0):{}}},r.a.createElement(X.a,null)));return r.a.createElement(J.a,{color:"inherit"},p,r.a.createElement(A.a,{title:"Skip animation",placement:"top"},r.a.createElement(F.a,{onClick:function(){return d(s)}},r.a.createElement(Y.a,null))),r.a.createElement(A.a,{title:"Reset",placement:"top"},r.a.createElement(F.a,{onClick:function(){o(!1),d(0)}},r.a.createElement(Z.a,null))),r.a.createElement(A.a,{title:"Decrement",placement:"top"},r.a.createElement(F.a,{onClick:function(e){return m(s,!1)}},r.a.createElement($.a,null))),r.a.createElement(A.a,{title:"Increment",placement:"top"},r.a.createElement(F.a,{onClick:function(e){return m(s,!0)}},r.a.createElement(ee.a,null))))}var ae=Object(M.a)({root:{background:"#3C3F58",color:"#3BBA9C","&:hover":{background:"#3C3F58"}},button:{background:"#3C3F58",color:"#212121","&:hover":{background:"#3C3F58",color:"#3BBA9C",fontWeight:"bolder",opacity:.8},"&.Mui-selected":{background:"#3C3F58",color:"#3BBA9C",fontWeight:"bold","&:hover":{background:"#3C3F58",opacity:1}}}});function ne(e){var t=e.speed,a=e.setSpeed,n=ae();return r.a.createElement(A.a,{title:"Change playback speed"},r.a.createElement(G.a,{className:n.root,value:t,exclusive:!0,onChange:function(e,t){t&&a(t)}},r.a.createElement(Q.a,{className:n.button,value:.25},"0.25x"),r.a.createElement(Q.a,{className:n.button,value:.5},"0.5x"),r.a.createElement(Q.a,{className:n.button,value:1},"1x"),r.a.createElement(Q.a,{className:n.button,value:2},"2x")))}function re(e,t){var a=e.length;return a<=1?"0":(e[a-1][t]-e[a-2][t]).toString()}var le=Object(M.a)({root:{color:"#fcba03"}});function oe(e){var t=Object(n.useState)(1),a=Object(c.a)(t,2),l=a[0],o=a[1],i=e.country,s=e.data,m=e.indexValue,u=e.scale,d=e.onStepClick,p=e.updateIndexState,h=e.updateScale,g=le(),E=s.overall,f=s.first_derivative_data,C=s.second_derivative_data,k=function(e){return e.filter((function(e){return 0!==e.confirmed})).map((function(e,t,a){var n=t<7?0:a[t].confirmed-a[t-7].confirmed;return{cases:e.confirmed,weekly:Math.round(n)}})).filter((function(e){return e.weekly>=10}))}(E),y=function(e,t){var a=e.length;return e.slice(a-t,a).map((function(e){return e.date}))}(E,k.length),x=y.length-1;return r.a.createElement(b.a,{container:!0,direction:"row",justify:"center",alignItems:"center"},r.a.createElement(b.a,{container:!0,direction:"row",justify:"center",alignItems:"center",style:{marginTop:50,marginBottom:20}},r.a.createElement(b.a,{item:!0,xs:1,sm:1,md:1,lg:1}),r.a.createElement(b.a,{item:!0,xs:11,sm:11,md:11,lg:11},r.a.createElement(v.a,{color:"inherit",variant:"h5",align:"center"},"Daily Report for ",i," - ",function(e,t){return new Date(e[t].date.toString()).toDateString()}(E,E.length-1)))),r.a.createElement(b.a,{container:!0,direction:"row",justify:"center",alignItems:"center",style:{marginBottom:50}},r.a.createElement(b.a,{item:!0,xs:3,sm:3,md:3,lg:3}),r.a.createElement(b.a,{item:!0,xs:3,sm:3,md:3,lg:3},r.a.createElement(v.a,{className:g.root,variant:"h5",align:"center"},"+",re(E,"confirmed")," Cases")),r.a.createElement(b.a,{item:!0,xs:3,sm:3,md:3,lg:3},r.a.createElement(v.a,{variant:"h5",color:"error",align:"center"},"+",re(E,"deaths")," Deaths")),r.a.createElement(b.a,{item:!0,xs:2,sm:2,md:2,lg:2})),r.a.createElement(b.a,{item:!0,xs:12,sm:12},r.a.createElement(v.a,{align:"center",variant:"h4"},"COVID-19 Cases (",i,")")),r.a.createElement(b.a,{item:!0,xs:10,sm:10},r.a.createElement(K,{data:E})),r.a.createElement(b.a,{item:!0,xs:11,sm:5,md:5,lg:5},r.a.createElement(v.a,{align:"center",variant:"h5"},"Rate of Change in Cases"),r.a.createElement(R,{data:f,dataKey:"first_derivative"})),r.a.createElement(b.a,{item:!0,xs:11,sm:5,md:5,lg:5},r.a.createElement(v.a,{align:"center",variant:"h5"},"Acceleration of Change"),r.a.createElement(R,{data:C,dataKey:"second_derivative"})),r.a.createElement(b.a,{item:!0,xs:11,sm:11,md:11,lg:11,style:{margin:20}},r.a.createElement(v.a,{align:"center",style:{textTransform:"capitalize"},variant:"h5"},"COVID-19 Trajectory"),r.a.createElement(q,{scale:u,updateScale:h}),r.a.createElement(_,{data:k.slice(0,m),scale:u}),r.a.createElement(v.a,{align:"center",fontStyle:"oblique",style:{marginTop:20},variant:"body2"},"\u2190 Tune slider to view changes over time \u2192"),r.a.createElement(L,{dates:y,updateState:p,value:m}),r.a.createElement(b.a,{container:!0,direction:"column"},r.a.createElement(b.a,{item:!0},r.a.createElement(te,{indexValue:m,maxIndex:x,speed:l,onStepClick:d,updateIndexState:p})),r.a.createElement(b.a,{item:!0},r.a.createElement(ne,{speed:l,setSpeed:o})))))}var ce=a(570),ie=a(568),se=Object(M.a)({paper:{color:"#3BBA9C",background:"#3C3F58"},color:{color:"#3BBA9C"},textfield:{background:"#3C3F58","& label":{color:"#3BBA9C"},"& label.Mui-focused":{color:"#3BBA9C"},"& .MuiOutlinedInput-root":{"& fieldset":{borderColor:"#3BBA9C"},"&:hover fieldset":{borderColor:"#3BBA9C"},"&.Mui-focused fieldset":{borderColor:"#3BBA9C"}}}});function me(e){var t=Object(n.useState)(!1),a=Object(c.a)(t,2),l=a[0],o=a[1],i=e.fetchData,s=e.suggestions,m=e.updateState,u=e.value,d=se(),p=function(e){13===e.keyCode&&(l?o(!1):i(u))};return r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement(ie.a,{id:"autocomplete-main",classes:{input:d.color,clearIndicator:d.color,popupIndicator:d.color,popupIndicatorOpen:d.color,paper:d.paper,noOptions:d.color},freeSolo:!0,filterOptions:function(e,t){var a=t.inputValue;return e.filter((function(e){return e.toLowerCase().startsWith(a.toLowerCase())}))},onClose:function(){o(!1)},onOpen:function(){o(!0)},options:s,onSelect:function(e){return m(e.target.value)},renderInput:function(e){return r.a.createElement(ce.a,Object.assign({},e,{className:d.textfield,label:"Search for a country",margin:"normal",variant:"outlined",onKeyDown:p,InputProps:Object(C.a)({},e.InputProps,{type:"search"})}))}}))}var ue=a(493),de=a(234),pe=a.n(de),he=Object(M.a)({root:{background:"#3C3F58",color:"#3BBA9C",height:48,"&:hover":{background:"#3C3F58",opacity:.8}}});function ge(e){var t=e.fetchData,a=he();return r.a.createElement(A.a,{title:"Search"},r.a.createElement(ue.a,{className:a.root,color:"inherit",fullWidth:!0,variant:"contained",onClick:t,startIcon:r.a.createElement(pe.a,null)},"Search"))}var Ee=a(545),fe=a(567),be=a(546),ve=Object(M.a)({indicator:{background:"#3BBA9C"}});function Ce(e){var t=e.tabs,a=e.tabIndex,n=ve();return r.a.createElement(Ee.a,{position:"static",color:"inherit",style:{backgroundColor:"#3C3F58"}},r.a.createElement(fe.a,{classes:{indicator:n.indicator},indicatorColor:"primary",scrollButtons:"auto",variant:"scrollable",value:a},Object(d.a)(t)))}function ke(e){var t=e.clearState,a=e.handleTabChange,n=e.tabs,l=e.tabIndex,o=e.removeTab;return r.a.createElement(b.a,{container:!0,direction:"row",alignItems:"center",style:{marginTop:50,marginLeft:5,marginRight:5},spacing:1},r.a.createElement(b.a,{container:!0,direction:"row",justify:"flex-start"},r.a.createElement(b.a,{item:!0,sm:1,md:1,lg:1}),r.a.createElement(b.a,{item:!0,xs:4,sm:2,md:2,lg:2},r.a.createElement(v.a,{variant:"subtitle1"},"Country Tabs"))),r.a.createElement(b.a,{container:!0,direction:"row"},r.a.createElement(b.a,{item:!0,xs:1,sm:1,md:1,lg:1}),r.a.createElement(b.a,{item:!0,xs:12,sm:8,md:8,lg:8},r.a.createElement(Ce,{tabs:n,tabIndex:l})),r.a.createElement(b.a,{item:!0,xs:4,sm:2,md:2,lg:2},r.a.createElement(J.a,{color:"inherit"},r.a.createElement(A.a,{title:"Previous tab",placement:"top"},r.a.createElement(F.a,{onClick:function(){return a(Math.max(0,l-1))}},r.a.createElement($.a,null))),r.a.createElement(A.a,{title:"Next tab",placement:"top"},r.a.createElement(F.a,{onClick:function(){return a(Math.min(l+1,n.length-1))}},r.a.createElement(ee.a,null))),r.a.createElement(A.a,{title:"Close tab",placement:"top"},r.a.createElement(F.a,{onClick:function(e){return o(e,l)}},r.a.createElement(T.a,null))),r.a.createElement(A.a,{title:"Clear all",placement:"top"},r.a.createElement(F.a,{onClick:function(){return t(!0)}},r.a.createElement(be.a,null)))))))}function ye(){return"_self"in r.a.createElement("div")}function xe(e,t){return t.reduce((function(t,a){return a.toLowerCase()===e.toLowerCase()?a:t}),null)}var Be=ye()?"http://localhost:5000/covid19/":"https://coronatracker-rest.herokuapp.com/covid19/",Se=ye()?"http://localhost:5000/":"https://coronatracker-rest.herokuapp.com/",Oe=(a(481),function(e){Object(f.a)(a,e);var t=Object(E.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).fetchData=function(){var e,t=n.state,a=t.countries,r=t.datum,l=t.tabs,o=t.userInput,c=n.props.fetchState,i=c.fetched,s=c.validCountries;if(i&&""!==o)if(e=xe(o,a))n.setState({idxValue:0,tabIndex:a.indexOf(e)});else if(e=xe(o,s)){var m=a.length,p=m<8?a:a.slice(0,-1),h=m<8?r:r.slice(0,-1),g=m<8?l:l.slice(0,-1),E=Be+e;u.a.get(E).then((function(t){n.setState({countries:[].concat(Object(d.a)(p),[e]),datum:[].concat(Object(d.a)(h),[t.data]),idxValue:0,tabs:[].concat(Object(d.a)(g),[n.newTab(e,g.length)]),tabIndex:g.length,validated:!0})})).catch((function(e){n.clearState(!0),console.error(e)}))}else n.setState({idxValue:0,validated:!1})},n.newTab=function(e,t){return r.a.createElement(N,{country:e,key:t,index:t,handleClose:n.removeTab,handleChange:n.handleTabChange})},n.removeTab=function(e,t){e.stopPropagation();var a=n.state,r=a.countries,l=a.datum,o=a.tabs,c=a.tabIndex,i=function(e,a){return a!==t},s=t>c?c:Math.max(0,c-1),m=o.map((function(e,a){return a>t?n.newTab(r[a],a-1):e}));n.setState({countries:r.filter(i),datum:l.filter(i),tabs:m.filter(i),tabIndex:s})},n.showTabs=function(){var e=n.state,t=e.tabs,a=e.tabIndex;return 0===t.length?r.a.createElement(r.a.Fragment,null):r.a.createElement(ke,{clearState:n.clearState,handleTabChange:n.handleTabChange,tabs:t,tabIndex:a,removeTab:n.removeTab})},n.showGraphs=function(){var e=n.state,t=e.countries,a=e.datum,l=e.idxValue,o=e.scale,c=e.tabIndex;return 0===a.length?r.a.createElement(r.a.Fragment,null):r.a.createElement(oe,{country:t[c],data:a[c],indexValue:l,scale:o,onStepClick:n.onStepClick,updateIndexState:n.updateIndexState,updateScale:n.updateScale})},n.clearState=function(e){n.setState({countries:[],datum:[],tabs:[],idxValue:0,tabIndex:0,validated:e})},n.onStepClick=function(e,t){var a=n.state.idxValue;t?n.setState({idxValue:a<e?a+1:0}):n.setState({idxValue:a>0?a-1:e})},n.handleTabChange=function(e){n.setState({tabIndex:e})},n.updateInputState=function(e){n.setState({userInput:e})},n.updateIndexState=function(e){n.setState({idxValue:e})},n.updateScale=function(e){n.setState({scale:e})},n.updateValidation=function(e){n.setState({validated:e})},n.state={countries:[],idxValue:0,userInput:"",datum:[],scale:"log",tabs:[],tabIndex:0,validated:!0},n.clearState=n.clearState.bind(Object(g.a)(n)),n.handleTabChange=n.handleTabChange.bind(Object(g.a)(n)),n.onStepClick=n.onStepClick.bind(Object(g.a)(n)),n.updateInputState=n.updateInputState.bind(Object(g.a)(n)),n.updateIndexState=n.updateIndexState.bind(Object(g.a)(n)),n.updateScale=n.updateScale.bind(Object(g.a)(n)),n.updateValidation=n.updateValidation.bind(Object(g.a)(n)),n}return Object(h.a)(a,[{key:"render",value:function(){var e=this.state,t=e.validated,a=e.userInput,n=this.props,l=n.fetchState,o=n.setFetchState;return r.a.createElement("div",{id:"root-app"},r.a.createElement(j,{fetchState:l,setFetchState:o,validated:t,updateValidation:this.updateValidation}),r.a.createElement(b.a,{container:!0,spacing:2,direction:"row",justify:"center",alignItems:"center"},r.a.createElement(b.a,{item:!0,xs:12,sm:12,md:12,lg:12},r.a.createElement(v.a,{variant:"body1",color:"inherit",align:"center",style:{marginTop:40}},'Tracking COVID-19 movements and trends - search "Global" to get world view')),r.a.createElement(b.a,{item:!0,sm:!0,xs:!0,md:!0,lg:!0}),r.a.createElement(b.a,{item:!0,xs:5,sm:5,md:4,lg:4},r.a.createElement(me,{suggestions:l.validCountries,fetchData:this.fetchData,updateState:this.updateInputState,value:a})),r.a.createElement(b.a,{item:!0,sm:3,xs:3,md:2,lg:2},r.a.createElement(ge,{fetchData:this.fetchData})),r.a.createElement(b.a,{item:!0,sm:!0,xs:!0,md:!0,lg:!0})),this.showTabs(),this.showGraphs(),r.a.createElement(V,null))}}]),a}(n.Component)),Ie=a(547),je=a(548),we=a(549),Ae=a(550),Fe=Object(M.a)({root:{background:"#3C3F58",color:"#3BBA9C"}});function Te(){var e=Fe();return r.a.createElement(Ee.a,{className:e.root,position:"relative"},r.a.createElement(Ie.a,null,r.a.createElement(b.a,{container:!0,direction:"row",alignItems:"baseline"},r.a.createElement(b.a,{item:!0,xs:7,sm:6,md:6,lg:6},r.a.createElement(i.b,{to:"/coronatracker",style:{color:"inherit",textDecoration:"inherit"}},r.a.createElement(v.a,{variant:"h6",align:"left"},"COVID-19 Tracker")))),r.a.createElement(b.a,{item:!0,sm:4,md:4,lg:4}),r.a.createElement(b.a,{item:!0,xs:5,sm:2,md:2,lg:2},r.a.createElement(J.a,{color:"inherit"},r.a.createElement(A.a,{title:"Search",placement:"bottom"},r.a.createElement(i.b,{to:"/coronatracker"},r.a.createElement(F.a,{className:e.root,disableFocusRipple:!0},r.a.createElement(je.a,null)))),r.a.createElement(A.a,{title:"Top Movers",placement:"bottom"},r.a.createElement(i.b,{to:"/coronatracker/top-movers"},r.a.createElement(F.a,{className:e.root},r.a.createElement(we.a,null)))),r.a.createElement(A.a,{title:"FAQs",placement:"bottom"},r.a.createElement(i.b,{to:"/coronatracker/faqs"},r.a.createElement(F.a,null,r.a.createElement(Ae.a,{className:e.root}))))))))}var Ne=a(574),De=a(551),Ve=Object(M.a)({backdrop:{zIndex:99999,color:"#fff"},progress:{color:"#3BBA9C"},text:{color:"#3BBA9C",fontSize:"1.25rem",marginRight:20}});function Me(e){var t=e.open,a=Ve();return r.a.createElement(Ne.a,{className:a.backdrop,open:t},r.a.createElement(v.a,{className:a.text,variant:"overline"},"Fetching data..."),r.a.createElement(De.a,{className:a.progress,size:60,thickness:3}))}function We(e){var t=e.children,a=e.loaded;return r.a.createElement(r.a.Fragment,null,r.a.createElement(Te,null),r.a.createElement(Me,{open:!a}),t)}var ze=a(572),Le=a(552),Pe=a(554),Re=a(555),Ke=a(556),_e=a(553),Ge=Object(M.a)({root:{marginTop:45,marginBottom:50},panel:{background:"#3C3F58",color:"#3BBA9C"},divider:{background:"#2E3047"},button:{background:"#3C3F58",borderColor:"#3BBA9C",color:"#3BBA9C","&:hover":{background:"#3C3F58",opacity:.8}}});function Qe(){var e=Ge();return r.a.createElement(b.a,{className:e.root,container:!0,direction:"row",alignItems:"center",spacing:3},r.a.createElement(b.a,{item:!0,xs:1,sm:2,md:2,lg:2}),r.a.createElement(b.a,{item:!0,xs:10,sm:8,md:8,lg:8},r.a.createElement(b.a,{container:!0,direction:"column",alignItems:"stretch",spacing:2},r.a.createElement(b.a,{item:!0},r.a.createElement(v.a,{variant:"h5"},"FAQs")),r.a.createElement(b.a,{item:!0},r.a.createElement(ze.a,{className:e.panel},r.a.createElement(Le.a,{expandIcon:r.a.createElement(_e.a,{color:"primary"})},r.a.createElement(v.a,null,'Q: What are key indicators that the virus is no longer exponentially growing or that we are "flattening the curve"?')),r.a.createElement(Pe.a,null,r.a.createElement(v.a,null,"A: When dealing with exponential growth, flattening occurs when the rate of change of new cases is decreasing over a sustained period of time, meaning the rate of change plot starts trending downward for a consecutive period of time. On the rate of change plot, graphically, this looks as though we are descending from the peak.")),r.a.createElement(Re.a,{className:e.divider}),r.a.createElement(Ke.a,null,r.a.createElement(A.a,{title:"Stay informed",placement:"right"},r.a.createElement(ue.a,{className:e.button,href:"https://www.google.com/covid19/",size:"small"},"Learn more"))))),r.a.createElement(b.a,{item:!0},r.a.createElement(ze.a,{className:e.panel},r.a.createElement(Le.a,{expandIcon:r.a.createElement(_e.a,{color:"primary"})},r.a.createElement(v.a,{align:"center"},"Q: How should the derivative plots be interpreted for rate of change and acceleration?")),r.a.createElement(Pe.a,null,r.a.createElement(v.a,{variant:"subtitle1"},"A: When dealing with rate of change, the first derivative is involved. Hence, this figure plots the amount of new cases per day against time. The greater the points, the more cases a country is experiencing per day. This can be seen as the speed at which the virus growing.",r.a.createElement("br",null),r.a.createElement("br",null),"The acceleration figure plots the change in the speed of new cases over time. When this plot is positive, it means the amount of new cases is accelerating, and negative values means it is decelerating.")))),r.a.createElement(b.a,{item:!0},r.a.createElement(ze.a,{className:e.panel},r.a.createElement(Le.a,{expandIcon:r.a.createElement(_e.a,{color:"primary"})},r.a.createElement(v.a,{align:"center"},"Q: How should the trajectory plot be interpreted?")),r.a.createElement(Pe.a,null,r.a.createElement(b.a,{container:!0,direction:"column",spacing:2},r.a.createElement(b.a,{item:!0},r.a.createElement(v.a,null,"A: The following is a great video explaining the interpretation and motivation behind this plot:")),r.a.createElement(b.a,{item:!0},r.a.createElement("iframe",{height:"315",src:"https://www.youtube-nocookie.com/embed/54XLXg4fYsc?start=170",title:"Trajectory video",frameBorder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0})))))))))}var He=a(565),qe=a(564),Je=Object(M.a)({root:{background:"#3C3F58",color:"#3BBA9C","&:hover":{background:"#3C3F58"}},confirmed:{background:"#3C3F58",color:"#212121","&:hover":{background:"#3C3F58",color:"#FFC107",fontWeight:"bolder",opacity:.8},"&.Mui-selected":{background:"#3C3F58",color:"#FFC107",fontWeight:"bold","&:hover":{background:"#3C3F58",opacity:1}}},deaths:{background:"#3C3F58",color:"#212121","&:hover":{background:"#3C3F58",color:"#F44336",fontWeight:"bolder",opacity:.8},"&.Mui-selected":{background:"#3C3F58",color:"#F44336",fontWeight:"bold","&:hover":{background:"#3C3F58",opacity:1}}}});function Ue(e){var t=e.report,a=e.setReport,n=Je();return r.a.createElement(A.a,{title:"Toggle "+t,placement:"bottom"},r.a.createElement(G.a,{className:n.root,value:t,exclusive:!0,size:"small",onChange:function(e,t){t&&a(t)}},r.a.createElement(Q.a,{className:n.confirmed,value:"confirmed"},"Confirmed"),r.a.createElement(Q.a,{className:n.deaths,value:"deaths"},"Deaths")))}var Xe=Object(M.a)({input:{color:"#3BBA9C"},textfield:{background:"#3C3F58","& label":{color:"#3BBA9C"},"& label.Mui-focused":{color:"#3BBA9C"},"& .MuiOutlinedInput-root":{"& fieldset":{borderColor:"#3BBA9C"},"&:hover fieldset":{borderColor:"#3BBA9C"},"&.Mui-focused fieldset":{borderColor:"#3BBA9C"}}}});function Ye(e){var t=e.setQuery,a=Xe();return r.a.createElement("form",{noValidate:!0,autoComplete:"off",style:{color:"#3BBA9C"}},r.a.createElement(ce.a,{className:a.textfield,label:"Search query",InputProps:{className:a.input},onChange:function(e){t(e.target.value.toLowerCase())},size:"small",variant:"outlined"}))}var Ze=a(487),$e=a(559),et=a(560),tt=a(561),at=a(562),nt=a(563),rt=a(571),lt=a(576),ot=a(557),ct=a(488),it=Object(ct.a)({switchBase:{color:"#3BBA9C","&.Mui-checked":{color:"#3BBA9C"},"&.Mui-checked + .MuiSwitch-track":{backgroundColor:"#3BBA9C"},checked:{},track:{}}})(lt.a),st=Object(ct.a)((function(){return{head:{background:"#373b52",color:"#3BBA9C",fontSize:16,fontWeight:"bolder"},body:{background:"#3C3F58",color:"#3BBA9C",fontSize:14}}}))(ot.a),mt=a(558);function ut(e){var t=e.title,a=e.report,n=e.up;return r.a.createElement(Ie.a,null,r.a.createElement(v.a,{color:"inherit",align:"left",variant:"h5",style:{marginRight:5}},t+" (# of "+a+")"),n?r.a.createElement(we.a,null):r.a.createElement(mt.a,null))}var dt=Object(M.a)({paper:{background:"#373B52",color:"#3BBA9C"},pagination:{color:"#3BBA9C"}});function pt(e){var t=Object(n.useState)(0),a=Object(c.a)(t,2),l=a[0],o=a[1],i=Object(n.useState)(10),s=Object(c.a)(i,2),m=s[0],u=s[1],d=e.dense,p=e.rows,h=e.report,g=e.title,E=dt(),f=m-Math.min(m,p.length-l*m);return r.a.createElement(Ze.a,{className:E.paper},r.a.createElement(ut,{title:g,up:!0,report:h}),r.a.createElement($e.a,null,r.a.createElement(et.a,{size:d?"small":"medium"},r.a.createElement(tt.a,null,r.a.createElement(at.a,null,r.a.createElement(st,null,"#"),r.a.createElement(st,null,"Country"),r.a.createElement(st,{align:"right"},"Percent Change (%)"),r.a.createElement(st,{align:"right"},"Change"),r.a.createElement(st,{align:"right"},"Total Cases"))),r.a.createElement(nt.a,null,p.slice(l*m,l*m+m).map((function(e){return r.a.createElement(at.a,{key:e.country},r.a.createElement(st,null,e.index),r.a.createElement(st,null,e.country),r.a.createElement(st,{align:"right"},e.percent),r.a.createElement(st,{align:"right"},e.change),r.a.createElement(st,{align:"right"},e.total))})),f>0&&r.a.createElement(at.a,{style:{height:(d?33:53)*f}},r.a.createElement(st,{colSpan:6}))))),r.a.createElement(rt.a,{className:E.pagination,rowsPerPageOptions:[5,10,20],component:"div",count:p.length,rowsPerPage:m,page:l,onChangePage:function(e,t){o(t)},onChangeRowsPerPage:function(e){u(parseInt(e.target.value,10)),o(0)}}))}var ht=Object(qe.a)({grid:{marginTop:25}}),gt=function(e){return e.map((function(e,t){var a=e[0],n=Object(c.a)(e[1],3),r=n[0],l=n[1];return{index:t+=1,country:a,total:n[2],change:l="+"+l.toString(),percent:r=r.toFixed(3).toString()+"%"}}))};function Et(e){var t=e.topMovers,a=Object(n.useState)(!1),l=Object(c.a)(a,2),o=l[0],i=l[1],s=Object(n.useState)(""),m=Object(c.a)(s,2),u=m[0],d=m[1],p=Object(n.useState)(t.confirmed),h=Object(c.a)(p,2),g=h[0],E=h[1],f=Object(n.useState)("confirmed"),C=Object(c.a)(f,2),k=C[0],y=C[1],x=g.top_gainers,B=g.top_losers,S=gt(x),O=gt(B),I=ht();return r.a.createElement(b.a,{container:!0,className:I.grid,direction:"row",alignItems:"center",alignContent:"center",spacing:2},r.a.createElement(b.a,{item:!0,xs:12,sm:12,md:12,lg:12},r.a.createElement(v.a,{align:"center",variant:"h4"},"COVID-19 Top Movers")),r.a.createElement(b.a,{item:!0,xs:1,sm:1,md:1,lg:1}),r.a.createElement(b.a,{item:!0,xs:11,sm:11,md:11,lg:11},r.a.createElement(Ye,{setQuery:d})),r.a.createElement(b.a,{item:!0,md:1,lg:1}),r.a.createElement(b.a,{item:!0,xs:2,sm:4,md:4,lg:4},r.a.createElement(Ue,{report:k,setReport:function(e){y(e),E(t[e])}})),r.a.createElement(b.a,{item:!0,xs:9,sm:7,md:7,lg:7}),r.a.createElement(b.a,{item:!0,md:1,lg:1}),r.a.createElement(b.a,{item:!0,xs:12,sm:12,md:5,lg:5},r.a.createElement(pt,{dense:o,report:k,rows:u?S.filter((function(e){return e.country.toLowerCase().includes(u)})):S,title:"Top Gainers"})),r.a.createElement(b.a,{item:!0,xs:12,sm:12,md:5,lg:5},r.a.createElement(pt,{dense:o,report:k,rows:u?O.filter((function(e){return e.country.toLowerCase().includes(u)})):O,setDense:i,title:"Top Losers"})),r.a.createElement(b.a,{item:!0,md:1,lg:1}),r.a.createElement(b.a,{item:!0,md:1,lg:1}),r.a.createElement(b.a,{item:!0,xs:10,sm:10,md:4,lg:4},r.a.createElement(A.a,{title:"Change table padding",placement:"bottom"},r.a.createElement(He.a,{control:r.a.createElement(it,{checked:o,onChange:function(e){i(e.target.checked)}}),label:"Dense padding (for mobile users)"}))),r.a.createElement(b.a,{item:!0,xs:2,sm:2,md:8,lg:8}))}var ft=a(236),bt=a.n(ft),vt=Object(M.a)({button:{background:"#3C3F58",color:"#3BBA9C",height:48,"&:hover":{background:"#3C3F58",opacity:.8}}});function Ct(){var e=vt();return r.a.createElement(A.a,{title:"Report an issue",placement:"bottom"},r.a.createElement(ue.a,{className:e.button,color:"inherit",href:"https://github.com/sashaobucina/coronatracker/issues",size:"large",endIcon:r.a.createElement(bt.a,null)},"Report Issue"))}var kt=Object(M.a)({root:{marginTop:50}});function yt(){var e=kt();return r.a.createElement(b.a,{container:!0,className:e.root,direction:"column",alignItems:"center",spacing:5},r.a.createElement(b.a,{item:!0,xs:12,sm:12,md:12,lg:12},r.a.createElement(v.a,{align:"center",variant:"h4",color:"inherit"},"Unable to load data... please check in later!")),r.a.createElement(b.a,{item:!0,xs:12,sm:12,md:12,lg:12},r.a.createElement(Ct,null)))}function xt(){var e=Object(n.useState)({alerts:{errAlert:!1,successAlert:!1},fetched:!1,loaded:!1,topMovers:void 0,validCountries:[]}),t=Object(c.a)(e,2),a=t[0],l=t[1];Object(n.useEffect)((function(){!function(){var e=u.a.get(Se+"valid-countries"),t=u.a.get(Se+"top-movers");u.a.all([e,t]).then(u.a.spread((function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];var n=t[0].data,r=t[1].data;l({alerts:{errAlert:!1,successAlert:!0},fetched:!0,loaded:!0,topMovers:r,validCountries:n})}))).catch((function(e){l({alerts:{errAlert:!0,successAlert:!1},fetched:!1,loaded:!0,topMovers:void 0,validCountries:[]}),console.error(e)}))}()}),[]);var o=a.topMovers;return r.a.createElement(i.a,null,r.a.createElement(We,{loaded:a.loaded},r.a.createElement(s.c,null,r.a.createElement(s.a,{exact:!0,path:"/coronatracker",render:function(e){return r.a.createElement(Oe,Object.assign({},e,{fetchState:a,setFetchState:l}))}}),r.a.createElement(s.a,{exact:!0,path:"/coronatracker/top-movers",render:function(e){return void 0!==o?r.a.createElement(Et,Object.assign({},e,{topMovers:o})):r.a.createElement(yt,null)}}),r.a.createElement(s.a,{exact:!0,path:"/coronatracker/faqs",component:Qe}))))}a(483);o.a.render(r.a.createElement(xt,null),document.getElementById("root"))}},[[280,1,2]]]);
//# sourceMappingURL=main.659fa139.chunk.js.map