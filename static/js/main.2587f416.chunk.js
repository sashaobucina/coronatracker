(this.webpackJsonpcoronatracker=this.webpackJsonpcoronatracker||[]).push([[0],{243:function(e,t,a){e.exports=a(447)},248:function(e,t,a){},249:function(e,t,a){},447:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(17),c=a.n(l),o=(a(248),a(72)),i=a(20),s=a(21),u=a(31),d=a(22),m=a(23);a(249);function p(){return"_self"in r.a.createElement("div")}function f(e,t){return t.reduce((function(t,a){return a.toLowerCase()===e.toLowerCase()?a:t}),null)}var h=p()?"http://localhost:5000/covid19/":"https://coronatracker-rest.herokuapp.com/covid19/",b=p()?"http://localhost:5000/valid-countries":"https://coronatracker-rest.herokuapp.com/valid-countries",E="Invalid country selected - please select another!",v="Unable to fetch data - please check back in a bit!",C=a(126),g=a.n(C),y=a(209),k=a(505),O=a(507),x=a(454),S=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.suggestions,n=e.updateState;return r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement(O.a,{id:"autocomplete-main",classes:{input:t.color,clearIndicator:t.color,popupIndicator:t.color,popupIndicatorOpen:t.color,paper:t.paper,noOptions:t.color},freeSolo:!0,options:a,onSelect:function(e){return n(e.target.value)},noOptionsText:"No countries match your search...",renderInput:function(e){return r.a.createElement(k.a,Object.assign({},e,{className:t.textfield,label:"Search for a country",margin:"normal",variant:"outlined",InputProps:Object(y.a)({},e.InputProps,{type:"search"})}))}}))}}]),a}(n.Component),j=Object(x.a)({paper:{color:"#3BBA9C",background:"#3C3F58"},color:{color:"#3BBA9C"},textfield:{background:"#3C3F58","& label":{color:"#3BBA9C"},"& label.Mui-focused":{color:"#3BBA9C"},"& .MuiOutlinedInput-root":{"& fieldset":{borderColor:"#3BBA9C"},"&:hover fieldset":{borderColor:"#3BBA9C"},"&.Mui-focused fieldset":{borderColor:"#3BBA9C"}}}})(S),I=a(452),B=a(198),T=a.n(B),D=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.fetchData;return r.a.createElement(I.a,{variant:"contained",color:"inherit",fullWidth:!0,className:t.root,onClick:a,startIcon:r.a.createElement(T.a,null)},"Search")}}]),a}(n.Component),V=Object(x.a)({root:{background:"#3C3F58",color:"#3BBA9C",height:48,"&:hover":{background:"#3C3F58"}}})(D),A=a(499),w=a(492),F=a(493),K=a(491),W=a(453),M=a(504),L=a(497),P=a(498),_=a(502),G=a(503),z=a(509),N=a(508),J=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){var e=this.props,t=e.open,a=e.message,n=e.handleClose,l=a===v?function(){}:n;return r.a.createElement(z.a,{open:t,autoHideDuration:6e3,onClose:l,anchorOrigin:{horizontal:"left",vertical:"bottom"}},r.a.createElement(N.a,{severity:"error",variant:"filled",onClose:n},a))}}]),a}(n.Component),H=a(510),R=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).valueToDate=function(e){return n.props.dates[e]},n.valueToDate=n.valueToDate.bind(Object(u.a)(n)),n}return Object(s.a)(a,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.dates,n=e.updateState,l=e.value;return r.a.createElement(H.a,{classes:{colorPrimary:t.color,colorSecondary:t.color,rail:t.slider,track:t.slider},defaultValue:0,valueLabelFormat:this.valueToDate,"aria-labelledby":"discrete-slider",marks:!0,step:1,min:0,max:a.length-1,valueLabelDisplay:"on",value:l,onChange:function(e,t){return n(t)}})}}]),a}(n.Component),q=Object(x.a)({color:{color:"#3BBA9C"},slider:{height:5}})(R),U=a(16),Q=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){var e=this.props,t=e.data,a=e.dataKey;return r.a.createElement(U.h,{height:400},r.a.createElement(U.g,{data:t},r.a.createElement(U.c,{stroke:"#3BBA9C",height:25,fill:"#3C3F58",travellerWidth:8}),r.a.createElement(U.d,{strokeWidth:.5}),r.a.createElement(U.l,{dataKey:"date",stroke:"#3BBA9C"}),r.a.createElement(U.m,{stroke:"#3BBA9C"}),r.a.createElement(U.f,{type:"monotone",dataKey:a,stroke:"#3BBA9C",strokeWidth:2,dot:!1}),r.a.createElement(U.k,null),r.a.createElement(U.e,null)))}}]),a}(n.Component),X=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){var e=this.props.data;return r.a.createElement(U.h,{height:500,style:{minWidth:"100%"}},r.a.createElement(U.b,{data:e,title:"Cases of COVID-19"},r.a.createElement("defs",null,r.a.createElement("linearGradient",{id:"colorConfirmed",x1:"0",y1:"0",x2:"0",y2:"1"},r.a.createElement("stop",{offset:"5%",stopColor:"#a15c03",stopOpacity:.8}),r.a.createElement("stop",{offset:"95%",stopColor:"#a15c03",stopOpacity:0})),r.a.createElement("linearGradient",{id:"colorDeaths",x1:"0",y1:"0",x2:"0",y2:"1"},r.a.createElement("stop",{offset:"5%",stopColor:"#9c3321",stopOpacity:.8}),r.a.createElement("stop",{offset:"95%",stopColor:"#9c3321",stopOpacity:0}))),r.a.createElement(U.c,{stroke:"#3BBA9C",height:25,fill:"#3C3F58",travellerWidth:8}),r.a.createElement(U.l,{dataKey:"date",stroke:"#3BBA9C"}),r.a.createElement(U.m,{stroke:"#3BBA9C"}),r.a.createElement(U.a,{type:"monotone",dataKey:"confirmed",stroke:"#a15c03",fillOpacity:1,fill:"url(#colorConfirmed)"}),r.a.createElement(U.a,{type:"monotone",dataKey:"deaths",stroke:"red",fillOpacity:1,fill:"url(#colorDeaths)"}),r.a.createElement(U.k,null),r.a.createElement(U.e,null)))}}]),a}(n.Component),Y=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){var e=this.props,t=e.data,a=e.scale,n="log"===a?[1,1e7]:[1,1e4];return r.a.createElement(U.h,{height:550,style:{minWidth:"100%"}},r.a.createElement(U.j,{margin:{top:15,right:30,left:20,bottom:5}},r.a.createElement(U.d,{strokeWidth:.5,strokeDasharray:"3 3"}),r.a.createElement(U.l,{dataKey:"cases",name:"Total Confirmed Cases",stroke:"#3BBA9C",type:"number",domain:[1,1e6],scale:"log",ticks:[1,10,100,1e3,1e4,1e5,1e7]}),r.a.createElement(U.m,{dataKey:"weekly",name:"Weekly Confirmed Cases",label:{value:"Confirmed Cases (per week)",angle:-90,position:"insideBottomLeft",fill:"#3BBA9C"},stroke:"#3BBA9C",type:"number",domain:n,scale:a}),r.a.createElement(U.i,{name:"Total Confirmed Cases",data:t,fill:"#3BBA9C",stroke:"#3BBA9C",line:!0,animationDuration:400}),r.a.createElement(U.k,null),r.a.createElement(U.e,null)))}}]),a}(n.Component),Z=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){var e=this.props,t=e.scale,a=e.updateScale;return r.a.createElement(w.a,{color:"primary"},r.a.createElement(F.a,{title:"log"!==t?"Convert to logarithmic scale":"",placement:"top"},r.a.createElement(I.a,{variant:"contained",disabled:"log"===t,onClick:function(){return a("log")}},"Log")),r.a.createElement(F.a,{title:"linear"!==t?"Convert to linear scale":"",placement:"right"},r.a.createElement(I.a,{variant:"contained",disabled:"linear"===t,onClick:function(){return a("linear")}},"Linear")))}}]),a}(n.Component),$=a(208),ee=a(494),te=a(495),ae=a(496);var ne=function(e){var t=Object(n.useState)(!0),a=Object($.a)(t,2),l=a[0],c=a[1],o=e.maxIndex,i=e.onStepClick,s=e.updateIndexState;Object(n.useEffect)((function(){if(l){var t=setInterval((function(){var t=e.indexValue,a=e.maxIndex,n=e.updateIndexState;t<a?n(t+1):c(!l)}),100);return function(){return clearInterval(t)}}}),[l,e]);var u=l?r.a.createElement(F.a,{title:"Pause",placement:"bottom"},r.a.createElement(K.a,{color:"inherit",size:"medium",onClick:function(){return c(!1)}},r.a.createElement(ee.a,null))):r.a.createElement(F.a,{title:"Play",placement:"bottom"},r.a.createElement(K.a,{onClick:function(){return c(!0)}},r.a.createElement(te.a,null)));return r.a.createElement(w.a,{color:"inherit"},u,r.a.createElement(F.a,{title:"Reset",placement:"bottom"},r.a.createElement(K.a,{onClick:function(){c(!1),s(0)}},r.a.createElement(ae.a,null))),r.a.createElement(F.a,{title:"Decrement"},r.a.createElement(K.a,{onClick:function(e){return i(o,!1)}},r.a.createElement(L.a,null))),r.a.createElement(F.a,{title:"Increment"},r.a.createElement(K.a,{onClick:function(e){return i(o,!0)}},r.a.createElement(P.a,null))))};var re=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){var e=this.props,t=e.country,a=e.data,n=e.indexValue,l=e.scale,c=e.onStepClick,o=e.updateIndexState,i=e.updateScale,s=a.overall,u=a.first_derivative_data,d=a.second_derivative_data,m=function(e){return e.filter((function(e){return 0!==e.confirmed})).map((function(e,t,a){var n=t<7?0:a[t].confirmed-a[t-7].confirmed;return{cases:e.confirmed,weekly:Math.round(n)}})).filter((function(e){return e.weekly>=10}))}(s),p=function(e,t){var a=e.length;return e.slice(a-t,a).map((function(e){return e.date}))}(s,m.length),f=p.length-1;return r.a.createElement(A.a,{container:!0,direction:"row",justify:"center",alignItems:"center",style:{marginTop:30}},r.a.createElement(A.a,{item:!0,xs:12,sm:12},r.a.createElement(W.a,{align:"center",variant:"h4"},"COVID-19 Cases (",t,")")),r.a.createElement(A.a,{item:!0,xs:10,sm:10},r.a.createElement(X,{data:s})),r.a.createElement(A.a,{item:!0,xs:5,sm:5,md:5,lg:5},r.a.createElement(W.a,{align:"center",variant:"h5"},"Rate of Change in Cases"),r.a.createElement(Q,{data:u,dataKey:"first_derivative"})),r.a.createElement(A.a,{item:!0,xs:5,sm:5,md:5,lg:5},r.a.createElement(W.a,{align:"center",variant:"h5"},"Acceleration of Change"),r.a.createElement(Q,{data:d,dataKey:"second_derivative"})),r.a.createElement(A.a,{item:!0,xs:10,sm:10,md:10,lg:10,style:{margin:20}},r.a.createElement(W.a,{align:"center",style:{textTransform:"capitalize"},variant:"h5"},"COVID-19 Trajectory (",l,")"),r.a.createElement(Z,{scale:l,updateScale:i}),r.a.createElement(Y,{data:m.slice(0,n),scale:l}),r.a.createElement(W.a,{align:"center",fontStyle:"oblique",style:{marginTop:20},variant:"body2"},"\u2190 Tune slider to view changes over time \u2192"),r.a.createElement(q,{dates:p,updateState:o,value:n}),r.a.createElement(ne,{indexValue:n,maxIndex:f,onStepClick:c,updateIndexState:o})))}}]),a}(n.Component),le=a(500),ce=a(506);function oe(e){var t=e.tabs,a=e.tabIndex;return r.a.createElement(le.a,{position:"static",color:"inherit",style:{backgroundColor:"#3C3F58"}},r.a.createElement(ce.a,{value:a,indicatorColor:"primary",variant:"scrollable",scrollButtons:"auto"},Object(o.a)(t)))}var ie=a(501);function se(e){var t=e.country,a=e.index,n=e.handleClose,l=e.handleChange;return r.a.createElement(ie.a,{component:"div",onClick:function(){return l(a)},label:r.a.createElement("div",null,t,r.a.createElement(K.a,{color:"inherit",size:"small",onClick:function(e){return n(e,a)}},r.a.createElement(_.a,null)))})}var ue=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).fetchData=function(){var e,t=n.state,a=t.countries,r=t.datum,l=t.tabs,c=t.userInput,i=t.validCountries;if(e=f(c,a))n.setState({idxValue:0,tabIndex:a.indexOf(e)});else if(e=f(c,i)){var s=a.length,u=s<8?a:a.slice(0,-1),d=s<8?r:r.slice(0,-1),m=s<8?l:l.slice(0,-1),p=h+e;g.a.get(p).then((function(t){n.setState({countries:[].concat(Object(o.a)(u),[e]),datum:[].concat(Object(o.a)(d),[t.data]),idxValue:0,tabs:[].concat(Object(o.a)(m),[n.newTab(e,m.length)]),tabIndex:m.length,validated:""})})).catch((function(e){n.clearState(v),console.error(e)}))}else n.setState({idxValue:0,validated:E})},n.prefetchData=function(){g.a.get(b).then((function(e){n.setState({validCountries:e.data})})).catch((function(e){n.updateValidation(v),console.error(e)}))},n.newTab=function(e,t){return r.a.createElement(se,{country:e,key:t,index:t,handleClose:n.removeTab,handleChange:n.handleTabChange})},n.removeTab=function(e,t){e.stopPropagation();var a=n.state,r=a.countries,l=a.datum,c=a.tabs,o=a.tabIndex,i=function(e,a){return a!==t},s=t>o?o:Math.max(0,o-1),u=c.map((function(e,a){return a>t?n.newTab(r[a],a-1):e}));n.setState({countries:r.filter(i),datum:l.filter(i),tabs:u.filter(i),tabIndex:s})},n.showTabs=function(){var e=n.state,t=e.tabs,a=e.tabIndex;return 0===t.length?r.a.createElement(r.a.Fragment,null):r.a.createElement(A.a,{container:!0,direction:"row",alignItems:"center",style:{marginTop:50}},r.a.createElement(A.a,{item:!0,xs:1,sm:1,md:1,lg:1}),r.a.createElement(A.a,{item:!0,xs:8,sm:8,md:8,lg:8},r.a.createElement(oe,{tabs:t,tabIndex:a})),r.a.createElement(A.a,{item:!0,xs:2,sm:2,md:2,lg:2},r.a.createElement(w.a,{color:"inherit"},r.a.createElement(F.a,{title:"Previous tab",placement:"top"},r.a.createElement(K.a,{onClick:function(){return n.setState({tabIndex:Math.max(0,n.state.tabIndex-1)})}},r.a.createElement(L.a,null))),r.a.createElement(F.a,{title:"Next tab",placement:"top"},r.a.createElement(K.a,{onClick:function(){return n.setState({tabIndex:Math.min(n.state.tabIndex+1,n.state.tabs.length-1)})}},r.a.createElement(P.a,null))),r.a.createElement(F.a,{title:"Close tab",placement:"top"},r.a.createElement(K.a,{onClick:function(e){return n.removeTab(e,a)}},r.a.createElement(_.a,null))),r.a.createElement(F.a,{title:"Clear all",placement:"top"},r.a.createElement(K.a,{onClick:function(){return n.clearState("")}},r.a.createElement(G.a,null))))))},n.showGraphs=function(){var e=n.state,t=e.countries,a=e.datum,l=e.idxValue,c=e.scale,o=e.tabIndex;return 0===a.length?r.a.createElement(r.a.Fragment,null):r.a.createElement(re,{country:t[o],data:a[o],indexValue:l,scale:c,onStepClick:n.onStepClick,updateIndexState:n.updateIndexState,updateScale:n.updateScale})},n.clearState=function(e){n.setState({countries:[],datum:[],tabs:[],idxValue:0,tabIndex:0,validated:e})},n.onStepClick=function(e,t){var a=n.state.idxValue;t?n.setState({idxValue:a<e?a+1:0}):n.setState({idxValue:a>0?a-1:e})},n.handleTabChange=function(e){n.setState({tabIndex:e})},n.updateInputState=function(e){n.setState({userInput:e})},n.updateIndexState=function(e){n.setState({idxValue:e})},n.updateScale=function(e){n.setState({scale:e})},n.updateValidation=function(e){n.setState({validated:e})},n.state={countries:[],idxValue:0,userInput:"",datum:[],scale:"log",tabs:[],tabIndex:0,validCountries:[],validated:""},n.clearState=n.clearState.bind(Object(u.a)(n)),n.handleTabChange=n.handleTabChange.bind(Object(u.a)(n)),n.onStepClick=n.onStepClick.bind(Object(u.a)(n)),n.updateInputState=n.updateInputState.bind(Object(u.a)(n)),n.updateIndexState=n.updateIndexState.bind(Object(u.a)(n)),n.updateScale=n.updateScale.bind(Object(u.a)(n)),n.updateValidation=n.updateValidation.bind(Object(u.a)(n)),n}return Object(s.a)(a,[{key:"componentDidMount",value:function(){this.prefetchData()}},{key:"render",value:function(){var e=this,t=this.state,a=t.validated,n=t.validCountries,l=t.userInput;return r.a.createElement("div",{id:"root-app"},r.a.createElement(J,{open:""!==a,message:a,handleClose:function(){return e.updateValidation("")}}),r.a.createElement(A.a,{container:!0,spacing:2,direction:"row",justify:"center",alignItems:"center"},r.a.createElement(A.a,{item:!0,xs:12,sm:12,md:12,lg:12},r.a.createElement(W.a,{variant:"body1",color:"inherit",align:"center",style:{marginTop:40}},'Tracking COVID-19 movements and trends - search "Global" to get world view')),r.a.createElement(A.a,{item:!0,sm:!0,xs:!0,md:!0,lg:!0}),r.a.createElement(A.a,{item:!0,xs:5,sm:5,md:4,lg:4},r.a.createElement(j,{suggestions:n,fetchData:this.fetchData,updateState:this.updateInputState,value:l})),r.a.createElement(A.a,{item:!0,sm:3,xs:3,md:2,lg:2},r.a.createElement(V,{fetchData:this.fetchData})),r.a.createElement(A.a,{item:!0,sm:!0,xs:!0,md:!0,lg:!0})),this.showTabs(),this.showGraphs(),r.a.createElement(A.a,{item:!0,sm:!0,xs:!0},r.a.createElement(W.a,{align:"center",variant:"body1",style:{margin:20}},"Big thanks to the ",r.a.createElement(M.a,{href:"https://github.com/CSSEGISandData/COVID-19",color:"primary",variant:"body1"},"John Hopkins CSSE")," for the data!")))}}]),a}(n.Component);c.a.render(r.a.createElement(ue,null),document.getElementById("root"))}},[[243,1,2]]]);
//# sourceMappingURL=main.2587f416.chunk.js.map