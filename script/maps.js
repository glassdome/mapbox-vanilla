
const MB_KEY = import.meta.env.VITE_MAPBOX_KEY;

mapboxgl.accessToken = MB_KEY;

console.log(`KEY = ${MB_KEY}`)

const styleDark = 'mapbox://styles/mapbox/dark-v11';
const styleLight = 'mapbox://styles/mapbox/light-v11';
const styleStreets = 'mapbox://styles/mapbox/streets-v12';

const map = new mapboxgl.Map({
  container: 'map', // div ID
  
  style: styleDark,
  center: [-73.963776,40.783159], // starting [lng, lat]
  zoom: 4 // starting zoom
});


const popup = new mapboxgl.Popup({ offset: 25 }).setText(
  'Welcome to Central Park!'
);

const marker1 = new mapboxgl.Marker()
  .setLngLat([-73.962803,40.781595])
  .setPopup(popup)
  .addTo(map);

map.on('load', () => {
  
  // console.log(map.getStyle());

  // Add Australian outline
  map.addSource('australia-outline', {
    type: 'geojson',
    data: './data/australia/australia-outline.geojson'
  });

  map.addLayer({
    id: 'australia-outline-fill',
    type: 'fill',
    source: 'australia-outline',
    paint: {
      'fill-color': 'orange',
      'fill-opacity': 0.7
    }
  });

  // Add NYC Borough Boundaries data source.
  map.addSource('nyc-borough-boundaries', {
    type: 'geojson',
    data: './data/nyc-borough-boundaries.geojson'
  });

  map.addLayer({
    id: 'nyc-bourough-boundaries-fill',
    type: 'fill',
    source: 'nyc-borough-boundaries',
    paint: {
      'fill-color': [
        'match', ['get', 'boro_code'],
        1, 'green',
        2, 'purple',
        3, 'steelblue',
        4, 'orange',
        5, 'pink',
        'red'
      ]
    }
    // Note: in the above 'match' block, the last color 'red' is the default if there are
    // any items that were not explicitly matched. It seems to be MANDATORY. None of the
    // other colors show up without it.
  }, 'road-rail');

  map.addLayer({
    id: 'nyc-bourough-boundaries-line',
    type: 'line',
    source: 'nyc-borough-boundaries',
    paint: {
      'line-color': 'white',
      'line-width': 2
    }
  });

  map.on('click', (e) => {
    
    const [ selected ] = map.queryRenderedFeatures(e.point, {
      layers: ['nyc-bourough-boundaries-fill']
    })

    if (selected) {
      const name = selected.properties.boro_name
      const population = selected.properties.pop_2020
      alert(`The population of ${name} is ${population}`)
    }

  })
})

