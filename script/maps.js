mapboxgl.accessToken =
  'pk.eyJ1Ijoic3lzbXl0aGUiLCJhIjoiY2xoM2dsZ3BzMW4yaTNncWhxdGduenI0ciJ9.TZTr5X7URxBO_K6E80IDpA';

const styleDark = 'mapbox://styles/mapbox/dark-v11';
const styleLight = 'mapbox://styles/mapbox/light-v11';
const styleStreets = 'mapbox://styles/mapbox/streets-v12';

const map = new mapboxgl.Map({
  container: 'map', // div ID
  
  style: styleLight,
  center: [-73.963776,40.783159], // starting [lng, lat]
  zoom: 11, // starting zoom
});

const popup = new mapboxgl.Popup({ offset: 25 }).setText(
  'Welcome to Central Park!'
);

const marker1 = new mapboxgl.Marker()
  .setLngLat([-73.962803,40.781595])
  .setPopup(popup)
  .addTo(map);
