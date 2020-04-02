(this.webpackJsonpcoronatracker=this.webpackJsonpcoronatracker||[]).push([[0],{250:function(e,t,a){e.exports=a(454)},255:function(e,t,a){},453:function(e,t,a){},454:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(18),c=a.n(l),o=(a(255),a(73)),i=a(200),s=a(201),m=a(35),d=a(214),u=a(216),p=a(133),h=a.n(p),E=a(499),g=a(456),f=a(526),v=a(501),b=a(503),C=a(504),y=a(505),x=a(506),k=a(462),S=a(502),B=a(522),I=Object(B.a)({root:{marginTop:45,marginBottom:50},panel:{background:"#3C3F58",color:"#3BBA9C"},divider:{background:"#3BBA9C"},button:{background:"#3C3F58",borderColor:"#3BBA9C",color:"#3BBA9C","&:hover":{background:"#3C3F58",opacity:.8}}});function w(){var e=I();return r.a.createElement(E.a,{className:e.root,container:!0,direction:"row",alignItems:"center",spacing:3},r.a.createElement(E.a,{item:!0,xs:1,sm:2,md:2,lg:2}),r.a.createElement(E.a,{item:!0,xs:10,sm:8,md:8,lg:8},r.a.createElement(E.a,{container:!0,direction:"column",alignItems:"stretch",spacing:2},r.a.createElement(E.a,{item:!0},r.a.createElement(g.a,{variant:"h5"},"FAQs")),r.a.createElement(E.a,{item:!0},r.a.createElement(f.a,{className:e.panel},r.a.createElement(v.a,{expandIcon:r.a.createElement(S.a,{color:"primary"})},r.a.createElement(g.a,{align:"center"},'Q: What are key indicators that the virus is no longer exponentially growing or that we are "flattening the curve"?')),r.a.createElement(b.a,null,r.a.createElement(g.a,null,"A: When dealing with exponential growth, flattening occurs when the rate of change of new cases is decreasing over a sustained period of time, meaning the rate of change plot starts trending downward for a consecutive period of time. On the rate of change plot, graphically, this looks as though we are descending from the peak.")),r.a.createElement(C.a,{className:e.divider}),r.a.createElement(y.a,null,r.a.createElement(x.a,{title:"Stay informed",placement:"right"},r.a.createElement(k.a,{className:e.button,href:"https://www.google.com/covid19/",size:"small"},"Learn more"))))),r.a.createElement(E.a,{item:!0},r.a.createElement(f.a,{className:e.panel},r.a.createElement(v.a,{expandIcon:r.a.createElement(S.a,{color:"primary"})},r.a.createElement(g.a,{align:"center"},"Q: How should the derivative plots be interpreted for rate of change and acceleration?")),r.a.createElement(b.a,null,r.a.createElement(g.a,{variant:"subtitle1"},"When dealing with rate of change, the first derivative is involved. Hence, this figure plots the amount of new cases per day against time. The greater the points, the more cases a country is experiencing per day. This can be seen as the speed at which the virus growing.",r.a.createElement("br",null),r.a.createElement("br",null),"The acceleration figure plots the change in the speed of new cases over time. When this plot is positive, it means the amount of new cases is accelerating, and negative values means it is decelerating.")))),r.a.createElement(E.a,{item:!0},r.a.createElement(f.a,{className:e.panel},r.a.createElement(v.a,{expandIcon:r.a.createElement(S.a,{color:"primary"})},r.a.createElement(g.a,{align:"center"},"Q: How should the trajectory plot be interpreted?")),r.a.createElement(b.a,null,r.a.createElement(E.a,{container:!0,direction:"row",spacing:2},r.a.createElement(E.a,{item:!0},r.a.createElement(g.a,{align:"center"},"A: The following is a great video explaining the interpretation and motivation behind this plot:")),r.a.createElement(E.a,{item:!0},r.a.createElement("iframe",{width:"560",height:"315",src:"https://www.youtube-nocookie.com/embed/54XLXg4fYsc?start=170",title:"Trajectory video",frameBorder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0})))))))))}var O=a(507),j=a(458),A=a(508);function T(e){var t=e.country,a=e.index,n=e.handleClose,l=e.handleChange;return r.a.createElement(O.a,{component:"div",onClick:function(){return l(a)},label:r.a.createElement("div",null,t,r.a.createElement(x.a,{title:"Remove tab",placement:"bottom"},r.a.createElement(j.a,{color:"inherit",size:"small",onClick:function(e){return n(e,a)}},r.a.createElement(A.a,null))))})}var D=a(527),V=a(525),N="Invalid country selected - please select another!",F="Unable to fetch data - please check back in a bit!";function W(e){var t=e.open,a=e.message,n=e.handleClose,l=a===F?function(){}:n;return r.a.createElement(D.a,{open:t,autoHideDuration:6e3,onClose:l,anchorOrigin:{horizontal:"left",vertical:"bottom"}},r.a.createElement(V.a,{severity:"error",variant:"filled",onClose:n},a))}var R=a(509);function K(){return r.a.createElement(E.a,{container:!0,direction:"row",justify:"center",alignItems:"center",style:{margin:30}},r.a.createElement(E.a,{item:!0,xs:10,sm:12,md:12,lg:12},r.a.createElement(g.a,{align:"center",variant:"body1"},"Big thanks to the ",r.a.createElement(x.a,{title:"Go to source data"},r.a.createElement(R.a,{href:"https://github.com/CSSEGISandData/COVID-19",color:"primary",variant:"body1"},"John Hopkins CSSE"))," for the data! Report any issues ",r.a.createElement(x.a,{title:"Report an issue"},r.a.createElement(R.a,{href:"https://github.com/sashaobucina/coronatracker/issues"},"here")),".")))}var z=a(68),L=a(529),M=Object(B.a)({color:{color:"#3BBA9C"},slider:{height:5}});function G(e){var t=e.dates,a=e.updateState,n=e.value,l=M();return r.a.createElement(L.a,{classes:{colorPrimary:l.color,colorSecondary:l.color,rail:l.slider,track:l.slider},defaultValue:0,valueLabelFormat:function(t){return e.dates[t]},"aria-labelledby":"discrete-slider",marks:!0,step:1,min:0,max:t.length-1,valueLabelDisplay:"on",value:n,onChange:function(e,t){return a(t)}})}var P=a(16);function _(e){var t=e.data,a=e.dataKey;return r.a.createElement(P.h,{height:400},r.a.createElement(P.g,{data:t},r.a.createElement(P.c,{stroke:"#3BBA9C",height:25,fill:"#3C3F58",travellerWidth:8}),r.a.createElement(P.d,{strokeWidth:.5}),r.a.createElement(P.j,{dataKey:"date",stroke:"#3BBA9C"}),r.a.createElement(P.k,{stroke:"#3BBA9C"}),r.a.createElement(P.f,{type:"monotone",dataKey:a,stroke:"#3BBA9C",strokeWidth:2,dot:!1}),r.a.createElement(P.i,null),r.a.createElement(P.e,null)))}function H(e){var t=e.data;return r.a.createElement(P.h,{height:500,style:{minWidth:"100%"}},r.a.createElement(P.b,{data:t,title:"Cases of COVID-19"},r.a.createElement("defs",null,r.a.createElement("linearGradient",{id:"colorConfirmed",x1:"0",y1:"0",x2:"0",y2:"1"},r.a.createElement("stop",{offset:"5%",stopColor:"#a15c03",stopOpacity:.8}),r.a.createElement("stop",{offset:"95%",stopColor:"#a15c03",stopOpacity:0})),r.a.createElement("linearGradient",{id:"colorDeaths",x1:"0",y1:"0",x2:"0",y2:"1"},r.a.createElement("stop",{offset:"5%",stopColor:"#9c3321",stopOpacity:.8}),r.a.createElement("stop",{offset:"95%",stopColor:"#9c3321",stopOpacity:0}))),r.a.createElement(P.c,{stroke:"#3BBA9C",height:25,fill:"#3C3F58",travellerWidth:8}),r.a.createElement(P.j,{dataKey:"date",stroke:"#3BBA9C"}),r.a.createElement(P.k,{stroke:"#3BBA9C"}),r.a.createElement(P.a,{type:"monotone",dataKey:"confirmed",stroke:"#a15c03",fillOpacity:1,fill:"url(#colorConfirmed)"}),r.a.createElement(P.a,{type:"monotone",dataKey:"deaths",stroke:"red",fillOpacity:1,fill:"url(#colorDeaths)"}),r.a.createElement(P.i,null),r.a.createElement(P.e,null)))}function Q(e){var t=e.data,a=e.scale,n="log"===a?[1,1e6]:[1,1e4];return r.a.createElement(P.h,{height:550},r.a.createElement(P.g,{data:t,margin:{top:15,right:30,left:20,bottom:5}},r.a.createElement(P.d,{strokeWidth:.5,strokeDasharray:"3 3"}),r.a.createElement(P.j,{dataKey:"cases",name:"Total Confirmed Cases",stroke:"#3BBA9C",type:"number",domain:[1,1e6],scale:"log",ticks:[1,10,100,1e3,1e4,1e5,1e6]}),r.a.createElement(P.k,{dataKey:"weekly",name:"Weekly Confirmed Cases",label:{value:"New Cases (per week)",angle:-90,position:"insideBottomLeft",fill:"#3BBA9C",fontSize:18,fontWeight:"normal"},stroke:"#3BBA9C",type:"number",domain:n,scale:a}),r.a.createElement(P.f,{type:"monotone",name:"Total Confirmed Cases",dataKey:"weekly",stroke:"#3BBA9C",strokeWidth:2,animationDuration:400,dot:!0}),r.a.createElement(P.i,null),r.a.createElement(P.e,{iconSize:0})))}var J=a(528),X=a(510),q=Object(B.a)({root:{background:"#3C3F58",color:"#3BBA9C","&:hover":{background:"#3C3F58"}}});function U(e){var t=e.scale,a=e.updateScale,n=q();return r.a.createElement(x.a,{title:"Modify scale",placement:"top"},r.a.createElement(J.a,{className:n.root,value:t,exclusive:!0,onChange:function(e,t){t&&a(t)}},r.a.createElement(X.a,{className:n.root,value:"log"},"Log"),r.a.createElement(X.a,{className:n.root,value:"linear"},"Linear")))}var Y=a(513),Z=a(511),$=a(512),ee=a(514),te=a(515),ae=a(516),ne=a(517);function re(e){var t=Object(n.useState)(!0),a=Object(z.a)(t,2),l=a[0],c=a[1],o=e.indexValue,i=e.maxIndex,s=e.onStepClick,m=e.speed,d=e.updateIndexState;Object(n.useEffect)((function(){if(l){var t=setInterval((function(){var t=e.indexValue,a=e.maxIndex,n=e.updateIndexState;t<a?n(t+1):c(!l)}),100/m);return function(){return clearInterval(t)}}}),[l,m,e]);var u=l?r.a.createElement(x.a,{title:"Pause animation",placement:"top"},r.a.createElement(j.a,{color:"inherit",size:"medium",onClick:function(){return c(!1)}},r.a.createElement(Z.a,null))):r.a.createElement(x.a,{title:"Play animation",placement:"top"},r.a.createElement(j.a,{onClick:function(){return o<i?c(!0):{}}},r.a.createElement($.a,null)));return r.a.createElement(Y.a,{color:"inherit"},u,r.a.createElement(x.a,{title:"Skip animation",placement:"top"},r.a.createElement(j.a,{onClick:function(){return d(i)}},r.a.createElement(ee.a,null))),r.a.createElement(x.a,{title:"Reset",placement:"top"},r.a.createElement(j.a,{onClick:function(){c(!1),d(0)}},r.a.createElement(te.a,null))),r.a.createElement(x.a,{title:"Decrement",placement:"top"},r.a.createElement(j.a,{onClick:function(e){return s(i,!1)}},r.a.createElement(ae.a,null))),r.a.createElement(x.a,{title:"Increment",placement:"top"},r.a.createElement(j.a,{onClick:function(e){return s(i,!0)}},r.a.createElement(ne.a,null))))}var le=Object(B.a)({root:{background:"#3C3F58",color:"#3BBA9C"},toggleRoot:{background:"#3C3F58",color:"#3BBA9C"}});function ce(e){var t=e.speed,a=e.setSpeed,n=le();return r.a.createElement(x.a,{title:"Change playback speed"},r.a.createElement(J.a,{className:n.root,value:t,exclusive:!0,onChange:function(e,t){t&&a(t)}},r.a.createElement(X.a,{className:n.toggleRoot,value:.25},"0.25x"),r.a.createElement(X.a,{className:n.toggleRoot,value:.5},"0.5x"),r.a.createElement(X.a,{className:n.toggleRoot,value:1},"1x"),r.a.createElement(X.a,{className:n.toggleRoot,value:2},"2x")))}function oe(e,t){var a=e.length;return a<=1?"0":(e[a-1][t]-e[a-2][t]).toString()}var ie=Object(B.a)({root:{color:"#fcba03"}});function se(e){var t=Object(n.useState)(1),a=Object(z.a)(t,2),l=a[0],c=a[1],o=e.country,i=e.data,s=e.indexValue,m=e.scale,d=e.onStepClick,u=e.updateIndexState,p=e.updateScale,h=ie(),f=i.overall,v=i.first_derivative_data,b=i.second_derivative_data,C=function(e){return e.filter((function(e){return 0!==e.confirmed})).map((function(e,t,a){var n=t<7?0:a[t].confirmed-a[t-7].confirmed;return{cases:e.confirmed,weekly:Math.round(n)}})).filter((function(e){return e.weekly>=10}))}(f),y=function(e,t){var a=e.length;return e.slice(a-t,a).map((function(e){return e.date}))}(f,C.length),x=y.length-1;return r.a.createElement(E.a,{container:!0,direction:"row",justify:"center",alignItems:"center"},r.a.createElement(E.a,{container:!0,direction:"row",justify:"center",alignItems:"center",style:{marginTop:50,marginBottom:20}},r.a.createElement(E.a,{item:!0,xs:1,sm:1,md:1,lg:1}),r.a.createElement(E.a,{item:!0,xs:11,sm:11,md:11,lg:11},r.a.createElement(g.a,{color:"inherit",variant:"h5",align:"center"},"Daily Report for ",o," - ",function(e,t){return new Date(e[t].date.toString()).toDateString()}(f,f.length-1)))),r.a.createElement(E.a,{container:!0,direction:"row",justify:"center",alignItems:"center",style:{marginBottom:50}},r.a.createElement(E.a,{item:!0,xs:3,sm:3,md:3,lg:3}),r.a.createElement(E.a,{item:!0,xs:3,sm:3,md:3,lg:3},r.a.createElement(g.a,{className:h.root,variant:"h5",align:"center"},"+",oe(f,"confirmed")," Cases")),r.a.createElement(E.a,{item:!0,xs:3,sm:3,md:3,lg:3},r.a.createElement(g.a,{variant:"h5",color:"error",align:"center"},"+",oe(f,"deaths")," Deaths")),r.a.createElement(E.a,{item:!0,xs:2,sm:2,md:2,lg:2})),r.a.createElement(E.a,{item:!0,xs:12,sm:12},r.a.createElement(g.a,{align:"center",variant:"h4"},"COVID-19 Cases (",o,")")),r.a.createElement(E.a,{item:!0,xs:10,sm:10},r.a.createElement(H,{data:f})),r.a.createElement(E.a,{item:!0,xs:5,sm:5,md:5,lg:5},r.a.createElement(g.a,{align:"center",variant:"h5"},"Rate of Change in Cases"),r.a.createElement(_,{data:v,dataKey:"first_derivative"})),r.a.createElement(E.a,{item:!0,xs:5,sm:5,md:5,lg:5},r.a.createElement(g.a,{align:"center",variant:"h5"},"Acceleration of Change"),r.a.createElement(_,{data:b,dataKey:"second_derivative"})),r.a.createElement(E.a,{item:!0,xs:11,sm:11,md:11,lg:11,style:{margin:20}},r.a.createElement(g.a,{align:"center",style:{textTransform:"capitalize"},variant:"h5"},"COVID-19 Trajectory (",m,")"),r.a.createElement(U,{scale:m,updateScale:p}),r.a.createElement(Q,{data:C.slice(0,s),scale:m}),r.a.createElement(g.a,{align:"center",fontStyle:"oblique",style:{marginTop:20},variant:"body2"},"\u2190 Tune slider to view changes over time \u2192"),r.a.createElement(G,{dates:y,updateState:u,value:s}),r.a.createElement(E.a,{container:!0,direction:"column"},r.a.createElement(E.a,{item:!0},r.a.createElement(re,{indexValue:s,maxIndex:x,speed:l,onStepClick:d,updateIndexState:u})),r.a.createElement(E.a,{item:!0},r.a.createElement(ce,{speed:l,setSpeed:c})))))}var me=a(530),de=a(518),ue=Object(B.a)({backdrop:{zIndex:99999,color:"#fff"},progress:{color:"#3BBA9C"},text:{color:"#3BBA9C",fontSize:"1.25rem",marginRight:20}});function pe(e){var t=e.open,a=ue();return r.a.createElement(me.a,{className:a.backdrop,open:t},r.a.createElement(g.a,{className:a.text,variant:"overline"},"Fetching data..."),r.a.createElement(de.a,{className:a.progress,size:60,thickness:3}))}var he=a(215),Ee=a(521),ge=a(524),fe=Object(B.a)({paper:{color:"#3BBA9C",background:"#3C3F58"},color:{color:"#3BBA9C"},textfield:{background:"#3C3F58","& label":{color:"#3BBA9C"},"& label.Mui-focused":{color:"#3BBA9C"},"& .MuiOutlinedInput-root":{"& fieldset":{borderColor:"#3BBA9C"},"&:hover fieldset":{borderColor:"#3BBA9C"},"&.Mui-focused fieldset":{borderColor:"#3BBA9C"}}}});function ve(e){var t=Object(n.useState)(!1),a=Object(z.a)(t,2),l=a[0],c=a[1],o=e.fetchData,i=e.suggestions,s=e.updateState,m=e.value,d=fe(),u=function(e){13===e.keyCode&&(l?c(!1):o(m))};return r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement(ge.a,{id:"autocomplete-main",classes:{input:d.color,clearIndicator:d.color,popupIndicator:d.color,popupIndicatorOpen:d.color,paper:d.paper,noOptions:d.color},freeSolo:!0,onClose:function(){c(!1)},onOpen:function(){c(!0)},options:i,onSelect:function(e){return s(e.target.value)},renderInput:function(e){return r.a.createElement(Ee.a,Object.assign({},e,{className:d.textfield,label:"Search for a country",margin:"normal",variant:"outlined",onKeyDown:u,InputProps:Object(he.a)({},e.InputProps,{type:"search"})}))}}))}var be=a(213),Ce=a.n(be),ye=Object(B.a)({root:{background:"#3C3F58",color:"#3BBA9C",height:48,"&:hover":{background:"#3C3F58",opacity:.8}}});function xe(e){var t=e.fetchData,a=ye();return r.a.createElement(x.a,{title:"Search"},r.a.createElement(k.a,{className:a.root,color:"inherit",fullWidth:!0,variant:"contained",onClick:t,startIcon:r.a.createElement(Ce.a,null)},"Search"))}var ke=a(519),Se=a(523),Be=a(520),Ie=Object(B.a)({indicator:{background:"#3BBA9C"}});function we(e){var t=e.tabs,a=e.tabIndex,n=Ie();return r.a.createElement(ke.a,{position:"static",color:"inherit",style:{backgroundColor:"#3C3F58"}},r.a.createElement(Se.a,{classes:{indicator:n.indicator},indicatorColor:"primary",scrollButtons:"auto",variant:"scrollable",value:a},Object(o.a)(t)))}function Oe(e){var t=e.clearState,a=e.handleTabChange,n=e.tabs,l=e.tabIndex,c=e.removeTab;return r.a.createElement(E.a,{container:!0,direction:"row",alignItems:"center",style:{marginTop:50,marginLeft:5,marginRight:5},spacing:1},r.a.createElement(E.a,{container:!0,direction:"row",justify:"flex-start"},r.a.createElement(E.a,{item:!0,sm:1,md:1,lg:1}),r.a.createElement(E.a,{item:!0,xs:4,sm:2,md:2,lg:2},r.a.createElement(g.a,{variant:"subtitle1"},"Country Tabs"))),r.a.createElement(E.a,{container:!0,direction:"row"},r.a.createElement(E.a,{item:!0,xs:1,sm:1,md:1,lg:1}),r.a.createElement(E.a,{item:!0,xs:12,sm:8,md:8,lg:8},r.a.createElement(we,{tabs:n,tabIndex:l})),r.a.createElement(E.a,{item:!0,xs:4,sm:2,md:2,lg:2},r.a.createElement(Y.a,{color:"inherit"},r.a.createElement(x.a,{title:"Previous tab",placement:"top"},r.a.createElement(j.a,{onClick:function(){return a(Math.max(0,l-1))}},r.a.createElement(ae.a,null))),r.a.createElement(x.a,{title:"Next tab",placement:"top"},r.a.createElement(j.a,{onClick:function(){return a(Math.min(l+1,n.length-1))}},r.a.createElement(ne.a,null))),r.a.createElement(x.a,{title:"Close tab",placement:"top"},r.a.createElement(j.a,{onClick:function(e){return c(e,l)}},r.a.createElement(A.a,null))),r.a.createElement(x.a,{title:"Clear all",placement:"top"},r.a.createElement(j.a,{onClick:function(){return t("")}},r.a.createElement(Be.a,null)))))))}function je(){return"_self"in r.a.createElement("div")}function Ae(e,t){return t.reduce((function(t,a){return a.toLowerCase()===e.toLowerCase()?a:t}),null)}var Te=je()?"http://localhost:5000/covid19/":"https://coronatracker-rest.herokuapp.com/covid19/",De=je()?"http://localhost:5000/valid-countries":"https://coronatracker-rest.herokuapp.com/valid-countries",Ve=(a(453),function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).fetchData=function(){var e,t=n.state,a=t.countries,r=t.datum,l=t.tabs,c=t.userInput,i=t.validCountries;if(e=Ae(c,a))n.setState({idxValue:0,tabIndex:a.indexOf(e)});else if(e=Ae(c,i)){var s=a.length,m=s<8?a:a.slice(0,-1),d=s<8?r:r.slice(0,-1),u=s<8?l:l.slice(0,-1),p=Te+e;h.a.get(p).then((function(t){n.setState({countries:[].concat(Object(o.a)(m),[e]),datum:[].concat(Object(o.a)(d),[t.data]),idxValue:0,tabs:[].concat(Object(o.a)(u),[n.newTab(e,u.length)]),tabIndex:u.length,validated:""})})).catch((function(e){n.clearState(F),console.error(e)}))}else n.setState({idxValue:0,validated:N})},n.prefetchData=function(){h.a.get(De).then((function(e){n.setState({loaded:!0,validCountries:e.data})})).catch((function(e){n.setState({loaded:!0,validated:F}),console.error(e)}))},n.newTab=function(e,t){return r.a.createElement(T,{country:e,key:t,index:t,handleClose:n.removeTab,handleChange:n.handleTabChange})},n.removeTab=function(e,t){e.stopPropagation();var a=n.state,r=a.countries,l=a.datum,c=a.tabs,o=a.tabIndex,i=function(e,a){return a!==t},s=t>o?o:Math.max(0,o-1),m=c.map((function(e,a){return a>t?n.newTab(r[a],a-1):e}));n.setState({countries:r.filter(i),datum:l.filter(i),tabs:m.filter(i),tabIndex:s})},n.showTabs=function(){var e=n.state,t=e.tabs,a=e.tabIndex;return 0===t.length?r.a.createElement(r.a.Fragment,null):r.a.createElement(Oe,{clearState:n.clearState,handleTabChange:n.handleTabChange,tabs:t,tabIndex:a,removeTab:n.removeTab})},n.showGraphs=function(){var e=n.state,t=e.countries,a=e.datum,l=e.idxValue,c=e.scale,o=e.tabIndex;return 0===a.length?r.a.createElement(w,null):r.a.createElement(se,{country:t[o],data:a[o],indexValue:l,scale:c,onStepClick:n.onStepClick,updateIndexState:n.updateIndexState,updateScale:n.updateScale})},n.clearState=function(e){n.setState({countries:[],datum:[],tabs:[],idxValue:0,tabIndex:0,validated:e})},n.onStepClick=function(e,t){var a=n.state.idxValue;t?n.setState({idxValue:a<e?a+1:0}):n.setState({idxValue:a>0?a-1:e})},n.handleTabChange=function(e){n.setState({tabIndex:e})},n.updateInputState=function(e){n.setState({userInput:e})},n.updateIndexState=function(e){n.setState({idxValue:e})},n.updateScale=function(e){n.setState({scale:e})},n.updateValidation=function(e){n.setState({validated:e})},n.state={countries:[],idxValue:0,userInput:"",datum:[],loaded:!1,scale:"log",tabs:[],tabIndex:0,validCountries:[],validated:""},n.clearState=n.clearState.bind(Object(m.a)(n)),n.handleTabChange=n.handleTabChange.bind(Object(m.a)(n)),n.onStepClick=n.onStepClick.bind(Object(m.a)(n)),n.updateInputState=n.updateInputState.bind(Object(m.a)(n)),n.updateIndexState=n.updateIndexState.bind(Object(m.a)(n)),n.updateScale=n.updateScale.bind(Object(m.a)(n)),n.updateValidation=n.updateValidation.bind(Object(m.a)(n)),n}return Object(s.a)(a,[{key:"componentDidMount",value:function(){this.prefetchData()}},{key:"render",value:function(){var e=this,t=this.state,a=t.loaded,n=t.validated,l=t.validCountries,c=t.userInput;return r.a.createElement("div",{id:"root-app"},r.a.createElement(W,{open:""!==n,message:n,handleClose:function(){return e.updateValidation("")}}),r.a.createElement(pe,{open:!a}),r.a.createElement(E.a,{container:!0,spacing:2,direction:"row",justify:"center",alignItems:"center"},r.a.createElement(E.a,{item:!0,xs:12,sm:12,md:12,lg:12},r.a.createElement(g.a,{variant:"body1",color:"inherit",align:"center",style:{marginTop:40}},'Tracking COVID-19 movements and trends - search "Global" to get world view')),r.a.createElement(E.a,{item:!0,sm:!0,xs:!0,md:!0,lg:!0}),r.a.createElement(E.a,{item:!0,xs:5,sm:5,md:4,lg:4},r.a.createElement(ve,{suggestions:l,fetchData:this.fetchData,updateState:this.updateInputState,value:c})),r.a.createElement(E.a,{item:!0,sm:3,xs:3,md:2,lg:2},r.a.createElement(xe,{fetchData:this.fetchData})),r.a.createElement(E.a,{item:!0,sm:!0,xs:!0,md:!0,lg:!0})),this.showTabs(),this.showGraphs(),r.a.createElement(K,null))}}]),a}(n.Component));c.a.render(r.a.createElement(Ve,null),document.getElementById("root"))}},[[250,1,2]]]);
//# sourceMappingURL=main.1db84e8e.chunk.js.map