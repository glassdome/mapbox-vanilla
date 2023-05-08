(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function a(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=a(o);fetch(o.href,i)}})();const b=[{id:"africa",tag:"africa",name:"Africa",coordinates:{center:{longitude:21.09375,latitude:7.1881},boundingBox:{southwest:{longitude:-11.092072,latitude:-32.821326},northeast:{longitude:49.103394,latitude:32.031363}}}},{id:"antarctica",tag:"antarctica",name:"Antarctica",coordinates:{center:{longitude:0,latitude:-82.8628},boundingBox:{southwest:{longitude:-180,latitude:-90},northeast:{longitude:180,latitude:-63.2706604895}}}},{id:"asia",tag:"asia",name:"Asia",coordinates:{center:{longitude:95.7129,latitude:43.8333},boundingBox:{southwest:{longitude:64.844055,latitude:9.951267},northeast:{longitude:131.214523,latitude:64.771199}}}},{id:"australia",tag:"australia",name:"Australia",coordinates:{center:{longitude:133.7751,latitude:-25.2744},boundingBox:{southwest:{longitude:-246.261292,latitude:-42.630675},northeast:{longitude:-208.117962,latitude:-11.138993}}}},{id:"europe",tag:"europe",name:"Europe",coordinates:{center:{longitude:16,latitude:54.526},boundingBox:{southwest:{longitude:-12.077408,latitude:37.317752},northeast:{longitude:34.060364,latitude:63.349973}}}},{id:"north_america",tag:"north_america",name:"North America",coordinates:{center:{longitude:-102.8329,latitude:50},boundingBox:{southwest:{longitude:-125.482407,latitude:10.411508},northeast:{longitude:-64.603729,latitude:60.063812}}}},{id:"south_america",tag:"south_america",name:"South America",coordinates:{center:{longitude:-60.7333,latitude:-8.7832},boundingBox:{southwest:{longitude:-79.640579,latitude:-53.574569},northeast:{longitude:-36.67099,latitude:10.572872}}}}];class f{constructor(t){this.data=t,this.id=t.id,this.tag=t.tag,this.name=t.name;const a=t.coordinates.center,r=t.coordinates.boundingBox.southwest,o=t.coordinates.boundingBox.northeast;this.center=[a.longitude,a.latitude],this.southwest=[r.longitude,r.latitude],this.northeast=[o.longitude,o.latitude],this.boundingBox=[this.southwest,this.northeast]}}const x=()=>b.reduce((n,t)=>(n.set(t.tag,new f(t)),n),new Map),w=[];w.reduce((n,t)=>(n.set(t.tag,new f(t)),n),new Map);const m="pk.eyJ1Ijoic3lzbXl0aGUiLCJhIjoiY2xoM2dsZ3BzMW4yaTNncWhxdGduenI0ciJ9.TZTr5X7URxBO_K6E80IDpA";mapboxgl.accessToken=m;console.log(`KEY = ${m}`);const L="mapbox://styles/sysmythe/clh978o1j00cu01qp96z527dm",N=[-97.872047,39.770548],u="continents-outline",E=`./data/${u}.geojson`,c=`${u}-fill`;function h(n,t,a){n.addSource(t,{type:"geojson",data:a,generateId:!0})}const p=(n,t,a,r="visible")=>{n.addLayer({id:`${t}-fill`,type:"fill",source:t,layout:{visibility:r},paint:a})},e=new mapboxgl.Map({container:"map",style:L,projection:"globe",center:N,zoom:2.5,attributionControl:!1}),v={range:[.5,10],color:"hsl(0, 0%, 100%)","high-color":["interpolate",["exponential",1.2],["zoom"],0,"hsl(207, 100%, 50%)",8,"hsl(38, 63%, 84%)"],"space-color":["interpolate",["exponential",1.2],["zoom"],5.5,"hsl(240, 46%, 11%)",6,"hsl(199, 61%, 87%)"],"horizon-blend":["interpolate",["exponential",1.2],["zoom"],5.5,.05,6,.1],"star-intensity":["interpolate",["exponential",1.2],["zoom"],5.5,.1,6,0]};e.on("style.load",()=>{e.setFog(v)});e.on("load",()=>{h(e,u,E),p(e,u,{"fill-color":"steelblue","fill-opacity":["case",["boolean",["feature-state","hover"],!1],.6,0]}),console.log("Adding 'states' source"),h(e,"states-outline","./data/north_america/us/states-outline.geojson"),console.log("Adding 'states' layer"),p(e,"states-outline",{"fill-color":"orange","fill-opacity":["case",["boolean",["feature-state","hover"],!1],.5,.3]}),e.on("mouseenter",c,()=>{e.getCanvas().style.cursor="pointer"});let n=null;e.on("mousemove",c,s=>{s.features.length>0&&(n!==null&&e.setFeatureState({source:u,id:n},{hover:!1}),n=s.features[0].id,e.setFeatureState({source:u,id:n},{hover:!0}))}),e.on("mouseleave",c,()=>{e.getCanvas().style.cursor="",n!==null&&e.setFeatureState({source:u,id:n},{hover:!1}),n=null}),e.on("click",c,s=>{const l=s.lngLat,g=s.features[0].properties.CONTINENT;new mapboxgl.Popup().addClassName("popup-text").setLngLat(l).setHTML(`<p>${g}</p>`).addTo(e)});function t(s,l,g){console.log(`Setting '${l}' to '${g}'`),s.setLayoutProperty(l,"visibility",g)}const a=(s,l)=>{t(s,l,"visible")},r=(s,l)=>{t(s,l,"none")},o=()=>{r(e,c),a(e,"states-outline-fill")};document.getElementById("show-states").addEventListener("click",o);const i=4e3;x().forEach((s,l)=>{document.getElementById(l).addEventListener("click",()=>{e.fitBounds(s.boundingBox,{duration:i})})});const y=document.getElementById("zoom-level");e.on("zoomend",()=>{y.textContent=e.getZoom().toFixed(1)})});
