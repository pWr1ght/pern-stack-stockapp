(this.webpackJsonpstockapp=this.webpackJsonpstockapp||[]).push([[0],{132:function(e,a,t){e.exports=t(181)},137:function(e,a,t){},138:function(e,a,t){},161:function(e,a,t){},176:function(e,a,t){},181:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(10),l=t.n(c),o=(t(137),t(138),t(13)),i=t.n(o),s=t(16),m=t(11),u=t(14),d=t(29),p=t.n(d),g=t(60),h=t.n(g),f=t(184),b=t(252),E=t(224),k=function(e){for(var a=Object(u.f)(),t=e.bigChartData,n=[],c=[],l=t.length,o=0;o<l;o+=1)n.push([t[o][0],t[o][1],t[o][2],t[o][3],t[o][4]]),c.push([t[o][0],t[o][5]]);var i={navigation:{bindingsClassName:"chart-12"},yAxis:[{labels:{align:"left"},height:"80%",resize:{enabled:!0}},{labels:{align:"left"},top:"80%",height:"20%",offset:0}],stockTools:{gui:{enabled:!1}},tooltip:{shape:"square",headerShape:"callout",borderWidth:0,shadow:!1,positioner:function(e,a,t){var n=this.chart;return t.isHeader?{x:Math.max(n.plotLeft,Math.min(t.plotX+n.plotLeft-e/2,n.chartWidth-e-n.marginRight)),y:t.plotY}:{x:t.series.chart.plotLeft,y:t.series.yAxis.top-n.plotTop}}},series:[{type:"ohlc",id:"".concat(e.name,"-ohlc"),name:"".concat(e.name," Stock Price"),data:n},{type:"column",id:"".concat(e.name,"-volume"),name:"".concat(e.name," Volume"),data:c,yAxis:1}],responsive:{rules:[{condition:{maxWidth:1500},chartOptions:{rangeSelector:{inputEnabled:!1}}}]}};return r.a.createElement(E.a,null,r.a.createElement("div",{style:{maxwidth:"1500px",height:"auto"}},r.a.createElement("div",{style:{width:"100%"}},r.a.createElement(b.a,{display:"flex",p:1,bgcolor:"background.paper"},r.a.createElement(b.a,{p:2,flexGrow:1,bgcolor:"grey.300"},e.generalData.longName," (",e.name,") ",r.a.createElement("span",{style:{color:"rgba(0, 0, 0, 0.54)",fontSize:"14px"}},e.generalData.exchangeTimezoneName," ")),r.a.createElement(b.a,{p:1,bgcolor:"grey.300"},r.a.createElement(f.a,{onClick:function(){a.push({pathname:"/view/interactive/".concat(e.id,"/").concat(e.name),state:{stockData:e.bigChartData}})},variant:"outlined",color:"primary"},"Switch to Analysis Mode")))),r.a.createElement(h.a,{highcharts:p.a,constructorType:"stockChart",options:i})))},v=t(102),y=t.n(v).a.create({baseURL:"http://localhost:5000/"}),C=t(232),S=t(227),x=t(182),O=t(233),w=t(228),j=t(56),N=(t(161),t(229)),D=function(e){var a=Object(n.useState)("green"),t=Object(m.a)(a,2),c=t[0],l=t[1],o=Object(n.useState)("+"),i=Object(m.a)(o,2),s=i[0],u=i[1],d=Object(n.useState)(!0),p=Object(m.a)(d,2),g=p[0],h=p[1];return Object(n.useEffect)((function(){console.log("this is dollarChange",e.dollarChange),e.dollarChange>0?(l("green"),u("+"),h(!0)):(l("red"),u(""),h(!1))}),[]),r.a.createElement("div",{style:{color:c,textAlign:"center"}},r.a.createElement("span",null,s+e.dollarChange.toFixed(2),!!e.break&&r.a.createElement("br",null),"("+e.percentageChange.toFixed(2)+"%) ",g?r.a.createElement("i",{className:"fas fa-caret-up"}):r.a.createElement("i",{className:"fas fa-caret-down"})))},I=Object(S.a)({root:{minWidth:275,minHeight:478},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12},changePrices:{color:"green"}}),P=function(e){var a=I();a.bullet;return r.a.createElement(E.a,{className:a.root},r.a.createElement(w.a,null,r.a.createElement(j.a,{style:{textAlign:"center"},variant:"h3"},e.name),r.a.createElement(j.a,{style:{lineHeight:"1"},variant:"h3"},e.cardData.regularMarketPrice.toFixed(2)," ",r.a.createElement("span",{style:{color:"rgba(0, 0, 0, 0.54)",fontSize:"16px"}},"(",e.cardData.financialCurrency,")")),r.a.createElement("div",null,r.a.createElement("div",{style:{lineHeight:"1",display:"flex",justifyContent:"start"}},r.a.createElement(D,{break:!1,dollarChange:e.cardData.regularMarketChange,percentageChange:e.cardData.regularMarketChangePercent}))),r.a.createElement("br",null),r.a.createElement("h4",null,"Summary"),r.a.createElement(N.a,null),r.a.createElement("div",{className:"cardContainer"},r.a.createElement("div",{className:"item"},"Days Range:",r.a.createElement("div",null,e.cardData.regularMarketDayRange)),r.a.createElement("div",{className:"item"},"52 Week Range:",r.a.createElement("div",null,e.cardData.fiftyTwoWeekRange)),r.a.createElement("div",null,r.a.createElement(N.a,null)),r.a.createElement("div",null,r.a.createElement(N.a,null)),r.a.createElement("div",{className:"item"},"Open: ",e.cardData.regularMarketOpen),r.a.createElement("div",{className:"item"},"Previous Close: ",e.cardData.regularMarketPreviousClose," "),r.a.createElement("div",null,r.a.createElement(N.a,null)),r.a.createElement("div",null,r.a.createElement(N.a,null)),r.a.createElement("div",{className:"item"},"Trailing 12 mo. EPS: ",e.cardData.epsTrailingTwelveMonths.toFixed(2)),r.a.createElement("div",{className:"item"},"Trailing PE: ",isNaN(e.cardData.trailingPE)?e.cardData.trailingPE:e.cardData.trailingPE.toFixed(2)),r.a.createElement("div",null,r.a.createElement(N.a,null)),r.a.createElement("div",null,r.a.createElement(N.a,null)),r.a.createElement("div",{className:"item"},"MarketCap: ",e.abbreviatedMarketCap," "),r.a.createElement("div",{className:"item"},"Earnings Date: ",function(e){var a=new Date(1e3*e),t=a.getFullYear(),n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][a.getMonth()],r=a.getDate();return"".concat(n," ").concat(r,", ").concat(t)}(e.cardData.earningsTimestampStart)," "))))},M=t(234),A=t(51),R=t.n(A),T=function(e){var a=Object(n.useState)([0]),t=Object(m.a)(a,2),c=t[0],l=t[1],o=Object(n.useState)([]),u=Object(m.a)(o,2),d=u[0],p=u[1];Object(n.useEffect)((function(){(function(){var a=Object(s.a)(i.a.mark((function a(){var t,n;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,y.get("/singlestock/reccomendation",{params:{stockName:e.symbol}});case 2:t=a.sent,n=t.data[0],l([n.buy,n.hold,n.sell,n.strongBuy,n.strongSell]),p(n.period);case 6:case"end":return a.stop()}}),a)})));return function(){return a.apply(this,arguments)}})()()}),[]);var g={series:c,options:{chart:{width:380},dataLabels:{enabled:!1},title:{text:"Stock Reccomendation as of ".concat(d),style:{fontSize:"20px",fontWeight:"bold",color:"#263238"}},responsive:[{breakpoint:480,options:{chart:{width:200},legend:{show:!1}}}],labels:["Buy","Hold","Sell","StrongBuy","StrongSell"],legend:{position:"right",offsetY:0,height:230}}};return r.a.createElement("div",{id:"chart"},r.a.createElement(R.a,{options:g.options,series:g.series,height:404,type:"donut"}))},B=t(230),F=t(231),W=t(163),z=function(e){var a;return r.a.createElement(n.Fragment,null,r.a.createElement(B.a,null,r.a.createElement("div",{style:{direction:"column"}},r.a.createElement("a",{href:e.link},W(e.title))),r.a.createElement(F.a,{secondary:(a=e.date,a.slice(0,-13))})),r.a.createElement(N.a,null))},J=Object(n.createContext)(),L=function(e){var a=Object(n.useState)(JSON.parse(localStorage.getItem("currentStockInfo"))),t=Object(m.a)(a,2),c=t[0],l=t[1];return r.a.createElement(J.Provider,{value:{currentStockInfo:c,setCurrentStockInfo:l}},e.children)},H=Object(S.a)((function(e){return{root:{flexGrow:1,background:"#0C6BA7"},paper:{padding:e.spacing(2),color:e.palette.text.secondary,background:"#C3EBF6"},button:{margin:"20px",color:"#C3EBF6",background:"rgb(64,80,181)"}}})),Y=function(){var e=Object(u.f)(),a=Object(n.useContext)(J),t=a.currentStockInfo,c=(a.setCurrentStockInfo,Object(n.useState)([])),l=Object(m.a)(c,2),o=l[0],d=l[1],p=Object(n.useState)([]),g=Object(m.a)(p,2),h=g[0],E=g[1],v=Object(u.g)(),S=v.id,w=v.name,j=H();return Object(n.useEffect)((function(){var e=function(){var e=Object(s.a)(i.a.mark((function e(a,t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.get("/singlestock/".concat(a,"/").concat(t));case 3:n=e.sent,d(n.data),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(a,t){return e.apply(this,arguments)}}(),a=function(){var e=Object(s.a)(i.a.mark((function e(a){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.get("/singlestock/news",{params:{stockName:a}});case 3:t=e.sent,n=t.data.slice(0,10),E(n),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log("No news");case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(a){return e.apply(this,arguments)}}();e(S,w),a(t.financialData.displayName)}),[]),r.a.createElement("div",{className:j.root},r.a.createElement(f.a,{onClick:function(){e.goBack()},className:j.button,variant:"contained",size:"large",color:"black"},r.a.createElement("i",{className:"fa-lg fas fa-angle-double-left"})),r.a.createElement(C.a,{style:{maxWidth:"1500px"}},r.a.createElement(O.a,{container:!0,spacing:3},r.a.createElement(O.a,{item:!0,lg:8},r.a.createElement(x.a,{className:j.paper},r.a.createElement(k,{id:S,name:w,generalData:t.financialData,bigChartData:o}))),r.a.createElement(O.a,{item:!0,lg:4},r.a.createElement(x.a,{className:j.paper},r.a.createElement(P,{name:w,abbreviatedMarketCap:t.abMarketCap,cardData:t.financialData}))),r.a.createElement(O.a,{item:!0,lg:6},r.a.createElement(x.a,{className:j.paper},r.a.createElement(b.a,{display:"flex",p:1,bgcolor:"background.paper"},r.a.createElement(b.a,{p:2,flexGrow:1,bgcolor:"grey.300"},"Recent News")),r.a.createElement(x.a,{style:{maxHeight:330,overflow:"auto"}},r.a.createElement(M.a,null,h&&h.map((function(e){return r.a.createElement(z,{title:e.title,link:e.link,date:e.pubDate})})))))),r.a.createElement(O.a,{item:!0,lg:6},r.a.createElement(x.a,{className:j.paper},r.a.createElement(T,{symbol:w}))))),r.a.createElement(C.a,null))},q=t(32),G=Object(n.createContext)(),U=function(e){var a=Object(n.useState)("Spark Chart"),t=Object(m.a)(a,2),c=t[0],l=t[1],o=Object(n.useState)(JSON.parse(null===localStorage.getItem("StockRows"))?(localStorage.setItem("StockRows",JSON.stringify([])),[]):JSON.parse(localStorage.getItem("StockRows"))),i=Object(m.a)(o,2),s=i[0],u=i[1];return Object(n.useEffect)((function(){localStorage.setItem("StockRows",JSON.stringify(s))}),[s]),r.a.createElement(G.Provider,{value:{rows:s,setRows:u,chartSwitch:c,setChartSwitch:l}},e.children)},V=t(247),X=t(248),K=t(237),Z=t(246),_=t(253),Q=t(236),$=t(257),ee=t(249),ae=t(250),te=t(235),ne=t(258),re=t(185);var ce=function(e){var a=Object(n.useContext)(G),t=(a.rows,a.setRows,a.chartSwitch),c=a.setChartSwitch,l=e.classes,o=e.onSelectAllClick,i=e.order,s=e.orderBy,m=e.numSelected,u=e.rowCount,d=e.onRequestSort,p=[{id:"symbol",direction:"left",disablePadding:!1,label:"Stock Ticker",sort:!0},{id:"stockChange",direction:"right",disablePadding:!1,label:"Day Change",sort:!0},{id:"marketCap",direction:"right",disablePadding:!1,label:"marketCap (USD) ",sort:!0},{id:"sharePrice",direction:"right",disablePadding:!1,label:"Share Price (USD)",sort:!0},{id:"chart",direction:"center",disablePadding:!0,label:"".concat(t),sort:!1},{id:"link",direction:"center",disablePadding:!0,label:"Info",sort:!1}],g=function(){c("Spark Chart"==t?"OHLC Chart":"Spark Chart")};return r.a.createElement(te.a,{style:{marginTop:"30px"}},r.a.createElement(Q.a,null,r.a.createElement(K.a,{padding:"checkbox"},r.a.createElement($.a,{indeterminate:m>0&&m<u,checked:u>0&&m===u,onChange:o,inputProps:{"aria-label":"select all symbols"}})),p.map((function(e){return r.a.createElement(K.a,{key:e.id,align:e.direction,padding:e.disablePadding?"none":"default",sortDirection:s===e.id&&i},e.sort?r.a.createElement(ne.a,{active:s===e.id,direction:s===e.id?i:"asc",onClick:(a=e.id,function(e){d(e,a)})},e.label,s===e.id?r.a.createElement("span",{className:l.visuallyHidden},"desc"===i?"sorted descending":"sorted ascending"):null):"link"!==e.id?r.a.createElement("a",{onClick:g},r.a.createElement(re.a,{color:"primary",component:"span"},r.a.createElement("i",{className:"far fa-chart-bar"}))," ",e.label):r.a.createElement("div",null,e.label));var a}))))},le=(t(3),t(7)),oe=t(238),ie=t(259),se=t(104),me=t.n(se),ue=t(105),de=t.n(ue),pe=Object(S.a)((function(e){return{root:{paddingLeft:e.spacing(2),paddingRight:e.spacing(1),zIndex:"-2222"},highlight:"light"===e.palette.type?{color:e.palette.secondary.main,backgroundColor:Object(le.d)(e.palette.secondary.light,.85)}:{color:e.palette.text.primary,backgroundColor:e.palette.secondary.dark},title:{flex:"1 1 100%"}}})),ge=function(e){var a=pe(),t=Object(n.useContext)(G),c=(t.rows,t.setRows),l=e.setSelected,o=e.selected,m=e.numSelected,u=function(){var a=Object(s.a)(i.a.mark((function a(){var t;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:console.log(o),t=e.rows.filter((function(e){return!o.includes(e.symbol)})),c(t),l([]);case 4:case"end":return a.stop()}}),a)})));return function(){return a.apply(this,arguments)}}();return r.a.createElement(oe.a,{style:{marginTop:"60px"}},m>0?r.a.createElement(j.a,{className:a.title,color:"inherit",variant:"subtitle1",component:"div"},m," selected"):r.a.createElement(j.a,{className:a.title,variant:"h6",id:"tableTitle",component:"div"},"Stocks"),m>0?r.a.createElement(ie.a,{title:"Delete"},r.a.createElement(re.a,{style:{color:"white"},onClick:u,"aria-label":"delete"},r.a.createElement(me.a,null))):r.a.createElement(ie.a,{title:"Filter list"},r.a.createElement(re.a,{style:{color:"white"},"aria-label":"filter list"},r.a.createElement(de.a,null))))},he=function(e){var a=e.o,t=e.h,n=e.l,r=e.c,c=e.t,l=a.map((function(e,a){return{x:new Date(1e3*c[a]),y:[e,t[a],n[a],r[a]]}}));return{imageInfo:e.imageInfo,yahooSummaryData:e.dataSummary,priceChangePercent:e.dataSummary.regularMarketChangePercent,priceChange:e.dataSummary.regularMarketChange,marketCap:e.dataSummary.marketCap,currentPrice:e.dataSummary.regularMarketPrice,volume:e.v,symbol:e.symbol,stockId:e.stockId,series:[{data:l}],options:{chart:{toolbar:{show:!1},type:"candlestick",height:350},xaxis:{type:"datetime"},yaxis:{forceNiceScale:!0,decimalsInFloat:!0,tooltip:{onDatasetHover:{highlightDataSeries:!1},show:!1,enabled:!1}}}}},fe=t(69);var be=function(e){return r.a.createElement("div",{className:"sparkStyle"},r.a.createElement(fe.Sparklines,{data:function(){var a=e.data.chart.series[0].data.map((function(e){return e.y})).map((function(e){return e[3]}));return console.log(a),a}(e.graphData),margin:5},r.a.createElement(fe.SparklinesLine,{color:e.color,style:{fill:e.color}}),r.a.createElement(fe.SparklinesSpots,{style:{fill:e.color}})))},Ee=function(e){var a=Object(n.useContext)(J),t=(a.currentStockInfo,a.setCurrentStockInfo,Object(n.useContext)(G)),c=(t.rows,t.setRows,t.chartSwitch);t.setChartSwitch,Object(u.f)();return r.a.createElement("div",{style:{display:"flex",alignItems:"center",padding:"0",margin:"10"}},"Spark Chart"==c?r.a.createElement(be,{data:e.row,color:e.row.stockChange>=0?"green":"red"}):r.a.createElement(R.a,{options:e.data.options,series:e.data.series,type:"candlestick",height:100,width:300}))},ke=(t(176),t(98),t(70)),ve=t.n(ke),ye=t(240),Ce=t(241),Se=Object(S.a)({root:{maxWidth:200}}),xe=function(e){var a=Se();return r.a.createElement(E.a,{className:a.root},r.a.createElement(ye.a,null,r.a.createElement(Ce.a,{component:"img",alt:"Contemplative Reptile",height:"140",image:e.image.logo,title:"Contemplative Reptile"}),r.a.createElement(w.a,{style:{zIndex:"1000"}},r.a.createElement(j.a,{gutterBottom:!0,variant:"h5",component:"h2"},e.image.name),r.a.createElement(j.a,{variant:"body2",color:"textSecondary",component:"p"},e.image.domain))))},Oe=t(245),we=t(256),je=t(112),Ne=t(254),De=t(244),Ie=function(){var e=Object(n.useContext)(G),a=e.rows,t=e.setRows,c=Object(n.useState)(""),l=Object(m.a)(c,2),o=l[0],u=l[1],d=Object(n.useState)(!1),p=Object(m.a)(d,2),g=p[0],h=p[1];function b(e){var a=e;if(e>=1e3){for(var t=Math.floor((""+e).length/3),n="",r=2;r>=1;r--){if(((n=parseFloat((0!=t?e/Math.pow(1e3,t):e).toPrecision(r)))+"").replace(/[^a-zA-Z 0-9]+/g,"").length<=2)break}n%1!=0&&(n=n.toFixed(1)),a=n+["","K","M","B","T"][t]}return a}var E=function(){var e=Object(s.a)(i.a.mark((function e(n){var r,c,l,s,m,d;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),r=!0,a.map((function(e){e.symbol==o.trim()&&(r=!1)})),!r){e.next=14;break}return c=(new Date).getTime(),l=parseInt(c/1e3),s=l-2678400,e.next=9,y.post("/",{user_id:"1",ticker:o,from:s,to:l});case 9:m=e.sent,console.log("this is data,",m.data),0==m.data.length?(console.log("ticker not supported"),h(!0)):(h(!1),d=he(m.data),t((function(e){return[].concat(Object(je.a)(e),[(a="".concat(o),t=d.priceChange,n=d.marketCap,r=d.currentPrice,c={stockId:d.stockId,options:d.options,series:d.series},l=d.yahooSummaryData,i=d.imageInfo,s=d.stockId,m=b(d.marketCap),{symbol:a,stockChange:t,marketCap:n,sharePrice:r,chart:c,financialData:l,imageInfo:i,stockId:s,abMarketCap:m})]);var a,t,n,r,c,l,i,s,m}))),e.next=15;break;case 14:console.log("Already entered the stock");case 15:u("");case 16:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("div",{className:"header"},r.a.createElement("div",{className:"headerbackDrop",style:{textAlign:"center"}},r.a.createElement("h1",null,"Welcome to your stock portfolio")),r.a.createElement(C.a,{maxWidth:"sm",className:"text-center"},r.a.createElement("form",{onSubmit:E,noValidate:!0,autoComplete:"off"},r.a.createElement("div",{className:"searchTool"},g?r.a.createElement(Ne.a,{error:!0,className:"form-control",id:"standard-error-helper-text",label:"Ticker not supported",value:o,onChange:function(e){return u(e.target.value)}}):r.a.createElement(Ne.a,{id:"standard-basic",label:"Please Enter your stock ticker",text:"text",className:"form-control",value:o,onChange:function(e){return u(e.target.value)}}),r.a.createElement(De.a,{color:"primary","aria-label":"contained primary button group",variant:"contained"},r.a.createElement(f.a,{color:"primary",type:"submit"},"Add")))))))},Pe=t(255),Me=function(e){var a=Object(n.useContext)(J),t=(a.currentStockInfo,a.setCurrentStockInfo),c=Object(u.f)(),l=function(){var a=Object(s.a)(i.a.mark((function a(n,r,l){var o;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:o=JSON.stringify(l),localStorage.setItem("currentStockInfo",o),t(JSON.parse(localStorage.getItem("currentStockInfo"))),c.push({pathname:"/view/".concat(n,"/").concat(r),financialData:e.financialData,abbreviatedMarketCap:e.abbreviatedMarketCap});case 4:case"end":return a.stop()}}),a)})));return function(e,t,n){return a.apply(this,arguments)}}();return r.a.createElement("div",{style:{display:"flex",alignItems:"center",padding:"0",margin:"10"}},r.a.createElement(f.a,{size:"medium",onClick:function(){return l(e.id,e.name,e.row)}}," More Info"))},Ae=Object(S.a)((function(e){return{root:{width:"100%",background:"#0C6BA7",paddingBottom:"100px"},paper:{width:"100%",marginBottom:e.spacing(2)},table:{minWidth:750,border:"2px solid #0C6BA7"},visuallyHidden:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",top:20,width:1}}})),Re=function(){var e=Object(n.useContext)(G),a=e.rows,t=e.setRows,c=Ae(),l=r.a.useState("asc"),o=Object(m.a)(l,2),u=o[0],d=o[1],p=r.a.useState("stockChange"),g=Object(m.a)(p,2),h=g[0],f=g[1],b=r.a.useState([]),E=Object(m.a)(b,2),k=E[0],v=E[1],S=r.a.useState(0),O=Object(m.a)(S,2),w=O[0],j=O[1],N=r.a.useState(!0),I=Object(m.a)(N,2),P=I[0],M=I[1],A=r.a.useState(!1),R=Object(m.a)(A,2),T=R[0],B=R[1],F=r.a.useState(5),W=Object(m.a)(F,2),z=W[0],J=W[1],L=r.a.useState(!1),H=Object(m.a)(L,2),Y=H[0],q=H[1];function U(e){var a=e;if(e>=1e3){for(var t=Math.floor((""+e).length/3),n="",r=2;r>=1;r--){if(((n=parseFloat((0!=t?e/Math.pow(1e3,t):e).toPrecision(r)))+"").replace(/[^a-zA-Z 0-9]+/g,"").length<=2)break}n%1!=0&&(n=n.toFixed(1)),a=n+["","K","M","B","T"][t]}return a}function te(e,a,t){return a[t]<e[t]?-1:a[t]>e[t]?1:0}Object(n.useEffect)((function(){var e=JSON.parse(localStorage.getItem("StockRows")),a=function(){var a=Object(s.a)(i.a.mark((function a(){var n,r,c,l,o,s,m;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,n=(new Date).getTime(),r=parseInt(n/1e3),c=r-2678400,l=e.map((function(e){return e.symbol})),a.next=7,y.get("/getStockInfo",{params:{list:l,from:c,to:r}});case 7:o=a.sent,console.log("this is the totStock",o.data),s=o.data[0].map((function(e){return he(e)})),m=s.map((function(e){return a=e.symbol,t=e.priceChange,n=e.marketCap,r=e.currentPrice,c={stockId:e.stockId,options:e.options,series:e.series},l=e.yahooSummaryData,o=e.imageInfo,i=e.stockId,s=U(e.marketCap),{symbol:a,stockChange:t,marketCap:n,sharePrice:r,chart:c,financialData:l,imageInfo:o,stockId:i,abMarketCap:s};var a,t,n,r,c,l,o,i,s})),q(!0),t(m),a.next=18;break;case 15:a.prev=15,a.t0=a.catch(0),console.log("thi is an error, ",a.t0);case 18:case"end":return a.stop()}}),a,null,[[0,15]])})));return function(){return a.apply(this,arguments)}}();e&&0!==e.length?a():q(!0)}),[]);var ne=z-Math.min(z,a.length-w*z),re={followCursor:!0,shiftX:10,shiftY:0};return r.a.createElement("div",{className:c.root},r.a.createElement(Ie,null),r.a.createElement(C.a,{maxWidth:!T&&"lg"},r.a.createElement(x.a,{className:c.paper},r.a.createElement(ge,{rows:a,setSelected:v,selected:k,numSelected:k.length}),!Y&&r.a.createElement("div",{className:"loadingTable"},r.a.createElement(Oe.a,{style:{width:"100%"}})),r.a.createElement(Z.a,null,r.a.createElement(V.a,{className:c.table,"aria-labelledby":"tableTitle",size:P?"small":"medium","aria-label":"enhanced table"},r.a.createElement(ce,{classes:c,numSelected:k.length,order:u,orderBy:h,onSelectAllClick:function(e){if(e.target.checked){var t=a.map((function(e){return e.symbol}));v(t)}else v([])},onRequestSort:function(e,a){d(h===a&&"asc"===u?"desc":"asc"),f(a)},rowCount:a.length}),r.a.createElement(X.a,null,function(e,a){var t=e.map((function(e,a){return[e,a]}));return t.sort((function(e,t){var n=a(e[0],t[0]);return 0!==n?n:e[1]-t[1]})),t.map((function(e){return e[0]}))}(a,function(e,a){return"desc"===e?function(e,t){return te(e,t,a)}:function(e,t){return-te(e,t,a)}}(u,h)).slice(w*z,w*z+z).map((function(e,t){var n,c=(n=e.symbol,-1!==k.indexOf(n)),l="enhanced-table-checkbox-".concat(t);return r.a.createElement(we.a,Object.assign({in:!0,style:{transformOrigin:"0 0 0"}},a?{timeout:1e3}:[]),r.a.createElement(Q.a,{hover:!0,onClick:function(a){return function(e,a){var t=k.indexOf(a),n=[];-1===t?n=n.concat(k,a):0===t?n=n.concat(k.slice(1)):t===k.length-1?n=n.concat(k.slice(0,-1)):t>0&&(n=n.concat(k.slice(0,t),k.slice(t+1))),v(n)}(0,e.symbol)},role:"checkbox","aria-checked":c,tabIndex:-1,key:Object(Pe.a)(),selected:c},r.a.createElement(K.a,{key:Object(Pe.a)(),padding:"checkbox"},r.a.createElement($.a,{checked:c,inputProps:{"aria-labelledby":l}})),r.a.createElement(K.a,{align:"center",key:Object(Pe.a)(),component:"th",id:l,scope:"row",padding:"none"},r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},r.a.createElement(ve.a,{options:re},r.a.createElement(ve.a.Trigger,{type:"trigger"},r.a.createElement("div",null,r.a.createElement("h3",null,e.symbol))),r.a.createElement(ve.a.Hover,{type:"hover"},r.a.createElement(xe,{style:{zIndex:1e3},image:e.imageInfo}))))),r.a.createElement(K.a,{key:Object(Pe.a)(),align:"right"},r.a.createElement(D,{break:!0,dollarChange:e.financialData.regularMarketChange,percentageChange:e.financialData.regularMarketChangePercent})),r.a.createElement(K.a,{key:Object(Pe.a)(),align:"right"},U(e.marketCap)),r.a.createElement(K.a,{key:Object(Pe.a)(),align:"right"},e.sharePrice),r.a.createElement(K.a,{key:Object(Pe.a)(),className:"expand-trigger",align:"right"},r.a.createElement(Ee,{key:Object(Pe.a)(),row:e,data:e.chart,id:e.chart.stockId,name:e.symbol,abbreviatedMarketCap:U(e.marketCap),financialData:e.financialData})),r.a.createElement(K.a,{key:Object(Pe.a)(),className:"expand-trigger",align:"right"},r.a.createElement(Me,{key:Object(Pe.a)(),row:e,data:e.chart,id:e.chart.stockId,name:e.symbol,abbreviatedMarketCap:U(e.marketCap),financialData:e.financialData}))))})),ne>0&&r.a.createElement(Q.a,{key:Object(Pe.a)(),style:{height:(P?33:53)*ne}},r.a.createElement(K.a,{colSpan:7}))))),r.a.createElement("div",null,r.a.createElement(_.a,{key:Object(Pe.a)(),rowsPerPageOptions:[5,10,25],component:"div",count:a.length,rowsPerPage:z,page:w,onChangePage:function(e,a){j(a)},onChangeRowsPerPage:function(e){J(parseInt(e.target.value,10)),j(0)}})))),r.a.createElement(C.a,{className:"tableFormControl"},r.a.createElement(ee.a,{control:r.a.createElement(ae.a,{checked:P,onChange:function(e){M(e.target.checked)}}),label:"Decrease Chart Spacing"}),r.a.createElement(ee.a,{control:r.a.createElement(ae.a,{checked:T,onChange:function(e){B(e.target.checked)}}),label:"Increase Chart Width"})))},Te=function(){return r.a.createElement("div",null,r.a.createElement(Re,null))},Be=t(106),Fe=t.n(Be),We=t(107),ze=t.n(We),Je=t(108),Le=t.n(Je),He=t(109),Ye=t.n(He),qe=t(110),Ge=t.n(qe),Ue=t(111),Ve=t.n(Ue);t(180);Fe()(p.a),ze()(p.a),Le()(p.a),Ye()(p.a),Ge()(p.a),Ve()(p.a);var Xe=Object(S.a)((function(e){return{root:{background:"#0C6BA7"},button:{color:"#C3EBF6",background:"rgb(64,80,181)"}}})),Ke=function(e){Object(n.useRef)(null);for(var a=Object(u.f)(),t=Xe(),c=e.location.state.stockData,l=[],o=[],i=c.length,s=0;s<i;s+=1)l.push([c[s][0],c[s][1],c[s][2],c[s][3],c[s][4]]),o.push([c[s][0],c[s][5]]);var m={navigation:{bindingsClassName:"chart-1"},yAxis:[{labels:{align:"left"},height:"80%",resize:{enabled:!0}},{labels:{align:"left"},top:"80%",height:"20%",offset:0}],tooltip:{shape:"square",headerShape:"callout",borderWidth:0,shadow:!1,positioner:function(e,a,t){var n=this.chart;return t.isHeader?{x:Math.max(n.plotLeft,Math.min(t.plotX+n.plotLeft-e/2,n.chartWidth-e-n.marginRight)),y:t.plotY}:{x:t.series.chart.plotLeft,y:t.series.yAxis.top-n.plotTop}}},chart:{height:800},series:[{type:"ohlc",id:"aapl-ohlc",name:"AAPL Stock Price",data:l},{type:"column",id:"aapl-volume",name:"AAPL Volume",data:o,yAxis:1}],responsive:{rules:[{condition:{maxWidth:800},chartOptions:{rangeSelector:{inputEnabled:!1}}}]}};return r.a.createElement("div",{className:t.root},r.a.createElement(b.a,{display:"flex",p:1,color:"#0C6BA7"},r.a.createElement(b.a,{p:1,flexGrow:1,bgcolor:"#0C6BA7"},r.a.createElement(f.a,{onClick:function(){console.log("hello"),a.goBack()},className:t.button,variant:"contained",size:"large",color:"black"},r.a.createElement("i",{className:"fa-lg fas fa-angle-double-left"}))),r.a.createElement(b.a,{p:.5,display:"flex",justifyContent:"center",bgcolor:"grey.300"},r.a.createElement("p",{style:{marginBottom:"0"}},"Note: For best interactivity, please full screen the Chart"))),r.a.createElement(h.a,{options:m,constructorType:"stockChart",highcharts:p.a}))};var Ze=function(){return r.a.createElement(U,null,r.a.createElement(L,null,r.a.createElement(q.a,null,r.a.createElement(u.c,null,r.a.createElement(u.a,{exact:!0,path:"/",component:Te}),r.a.createElement(u.a,{exact:!0,path:"/view/:id/:name/",component:Y}),r.a.createElement(u.a,{exact:!0,path:"/view/interactive/:id/:name/",component:Ke})))))};l.a.render(r.a.createElement(q.a,null,r.a.createElement(Ze,null)),document.getElementById("root"))},98:function(e,a,t){}},[[132,1,2]]]);
//# sourceMappingURL=main.bb81fccc.chunk.js.map