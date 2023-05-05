(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function a(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(t){if(t.ep)return;t.ep=!0;const i=a(t);fetch(t.href,i)}})();const g=[{id:"africa",tag:"africa",name:"Africa",coordinates:{center:{longitude:21.09375,latitude:7.1881},boundingBox:{southwest:{longitude:-11.092072,latitude:-32.821326},northeast:{longitude:49.103394,latitude:32.031363}}}},{id:"antarctica",tag:"antarctica",name:"Antarctica",coordinates:{center:{longitude:0,latitude:-82.8628},boundingBox:{southwest:{longitude:-180,latitude:-90},northeast:{longitude:180,latitude:-63.2706604895}}}},{id:"asia",tag:"asia",name:"Asia",coordinates:{center:{longitude:95.7129,latitude:43.8333},boundingBox:{southwest:{longitude:64.844055,latitude:9.951267},northeast:{longitude:131.214523,latitude:64.771199}}}},{id:"australia",tag:"australia",name:"Australia",coordinates:{center:{longitude:133.7751,latitude:-25.2744},boundingBox:{southwest:{longitude:-246.261292,latitude:-42.630675},northeast:{longitude:-208.117962,latitude:-11.138993}}}},{id:"europe",tag:"europe",name:"Europe",coordinates:{center:{longitude:16,latitude:54.526},boundingBox:{southwest:{longitude:-12.077408,latitude:37.317752},northeast:{longitude:34.060364,latitude:63.349973}}}},{id:"north_america",tag:"north_america",name:"North America",coordinates:{center:{longitude:-102.8329,latitude:50},boundingBox:{southwest:{longitude:-125.482407,latitude:10.411508},northeast:{longitude:-64.603729,latitude:60.063812}}}},{id:"south_america",tag:"south_america",name:"South America",coordinates:{center:{longitude:-60.7333,latitude:-8.7832},boundingBox:{southwest:{longitude:-79.640579,latitude:-53.574569},northeast:{longitude:-36.67099,latitude:10.572872}}}}];class d{constructor(e){this.data=e,this.id=e.id,this.tag=e.tag,this.name=e.name;const a=e.coordinates.center,s=e.coordinates.boundingBox.southwest,t=e.coordinates.boundingBox.northeast;this.center=[a.longitude,a.latitude],this.southwest=[s.longitude,s.latitude],this.northeast=[t.longitude,t.latitude],this.boundingBox=[this.southwest,this.northeast]}}const h=()=>g.reduce((o,e)=>(o.set(e.tag,new d(e)),o),new Map),p=[];p.reduce((o,e)=>(o.set(e.tag,new d(e)),o),new Map);const c="";mapboxgl.accessToken=c;console.log(`KEY = ${c}`);const m="mapbox://styles/sysmythe/clh978o1j00cu01qp96z527dm",f=[-97.872047,39.770548],r="continents-outline",y=`./data/${r}.geojson`,u=`${r}-fill`;function x(o,e,a){o.addSource(e,{type:"geojson",data:a,generateId:!0})}const b=(o,e,a)=>{o.addLayer({id:`${e}-fill`,type:"fill",source:e,paint:a})},n=new mapboxgl.Map({container:"map",style:m,projection:"globe",center:f,zoom:2.5,attributionControl:!1}),N={range:[.5,10],color:"hsl(0, 0%, 100%)","high-color":["interpolate",["exponential",1.2],["zoom"],0,"hsl(207, 100%, 50%)",8,"hsl(38, 63%, 84%)"],"space-color":["interpolate",["exponential",1.2],["zoom"],5.5,"hsl(240, 46%, 11%)",6,"hsl(199, 61%, 87%)"],"horizon-blend":["interpolate",["exponential",1.2],["zoom"],5.5,.05,6,.1],"star-intensity":["interpolate",["exponential",1.2],["zoom"],5.5,.1,6,0]};n.on("style.load",()=>{n.setFog(N)});n.on("load",()=>{x(n,r,y),b(n,r,{"fill-color":"steelblue","fill-opacity":["case",["boolean",["feature-state","hover"],!1],.6,0]}),n.on("mouseenter",u,()=>{n.getCanvas().style.cursor="pointer"});let o=null;n.on("mousemove",u,t=>{console.log(t.features),t.features.length>0&&(o!==null&&n.setFeatureState({source:r,id:o},{hover:!1}),o=t.features[0].id,n.setFeatureState({source:r,id:o},{hover:!0}))}),n.on("mouseleave",u,()=>{n.getCanvas().style.cursor="",o!==null&&n.setFeatureState({source:r,id:o},{hover:!1}),o=null}),n.on("click",u,t=>{const i=t.lngLat,l=t.features[0].properties.CONTINENT;new mapboxgl.Popup().addClassName("popup-text").setLngLat(i).setHTML(`<p>${l}</p>`).addTo(n)});const e=4e3;h().forEach((t,i)=>{document.getElementById(i).addEventListener("click",()=>{n.fitBounds(t.boundingBox,{duration:e})})});const s=document.getElementById("zoom-level");n.on("zoomend",()=>{s.textContent=n.getZoom().toFixed(1)})});
