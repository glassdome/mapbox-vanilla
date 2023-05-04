
const MB_KEY = import.meta.env.VITE_MAPBOX_KEY;

mapboxgl.accessToken = MB_KEY;

console.log(`KEY = ${MB_KEY}`)

const styleDark = 'mapbox://styles/mapbox/dark-v11';
const styleLight = 'mapbox://styles/mapbox/light-v11';
const styleStreets = 'mapbox://styles/mapbox/streets-v12';

const centerUnitedStates = [-97.872047,39.770548]
const centerAustralia = [134.811687,-26.933502]

const map = new mapboxgl.Map({
  container: 'map', // div ID
  style: styleDark,
  center: centerUnitedStates,
  zoom: 3 // starting zoom
});
// map.on('style.load', () => {
//   map.setFog({}); // Set the default atmosphere style
//   });

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
    data: './data/australia/australia-outline.geojson',
  });

  // map.addLayer({
  //   id: 'australia-outline-fill',
  //   type: 'fill',
  //   source: 'australia-outline',
  //   paint: {
  //     'fill-color': 'orange',
  //     'fill-opacity': 0.7
  //   }
  // });

  map.addLayer({
    id: 'australia-outline-line',
    type: 'line',
    source: 'australia-outline',
    paint: {
      'line-color': 'white',
      'line-width': 3,
    },
  });

  // Add Australian State Boundaries
  map.addSource('australia-states-outline', {
    type: 'geojson',
    data: './data/australia/australia-states-outline.geojson',
  });

  map.addLayer({
    id: 'australia-states-outline-line',
    type: 'line',
    source: 'australia-states-outline',
    paint: {
      'line-color': 'white',
      'line-width': 3,
    },
  });

  map.addLayer(
    {
      id: 'australia-states-outline-fill',
      type: 'fill',
      source: 'australia-states-outline',
      paint: {
        'fill-color': [
          'match',
          ['get', 'STATE_CODE'],
          '1',
          '#ff6961',
          '2',
          '#ffb480',
          '3',
          '#f8f38d',
          '4',
          '#42d6a4',
          '5',
          '#08cad1',
          '6',
          '#f8f38d',
          '7',
          '#ff6961',
          '8',
          '#42d6a4',
          'red',
        ],
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          0.5,
          1,
        ],
      },

      // Note: in the above 'match' block, the last color 'red' is the default if there are
      // any items that were not explicitly matched. It seems to be MANDATORY. None of the
      // other colors show up without it.
    },
    'road-rail'
  );

  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on('mouseenter', 'australia-states-outline-fill', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('click', 'australia-states-outline-fill', (e) => {
    const coords = e.lngLat //e.features[0].geometry.coordinates.slice();
    const name = e.features[0].properties.STATE_NAME;
    console.log(`NAME: ${name}, COORDS: ${coords}`)
    const popup = new mapboxgl.Popup();
    
      
    popup
      .addClassName('popup-text')
      .setLngLat(coords)
      .setHTML(`<p>${name}</p>`)
      .addTo(map)
  

  });

  let hoveredStateId = null;
  map.on('mousemove', 'australia-states-outline-fill', (e) => {
    if (e.features.length > 0) {
      if (hoveredStateId !== null) {
        map.setFeatureState(
          { source: 'australia-states-outline', id: hoveredStateId },
          { hover: false }
        );
      }
      hoveredStateId = e.features[0].id;
      map.setFeatureState(
        { source: 'australia-states-outline', id: hoveredStateId },
        { hover: true }
      );
    }
  });

  // When the mouse leaves the state-fill layer, update the feature state of the
  // previously hovered feature.
  map.on('mouseleave', 'australia-states-outline-fill', () => {
    map.getCanvas().style.cursor = '';
    if (hoveredStateId !== null) {
      map.setFeatureState(
        { source: 'australia-states-outline', id: hoveredStateId },
        { hover: false }
      );
    }
    hoveredStateId = null;
  });

  // Add NYC Borough Boundaries data source.
  map.addSource('nyc-borough-boundaries', {
    type: 'geojson',
    data: './data/nyc-borough-boundaries.geojson',
  });

  map.addLayer(
    {
      id: 'nyc-bourough-boundaries-fill',
      type: 'fill',
      source: 'nyc-borough-boundaries',
      paint: {
        'fill-color': [
          'match',
          ['get', 'boro_code'],
          1,
          'green',
          2,
          'purple',
          3,
          'steelblue',
          4,
          'orange',
          5,
          'pink',
          'red',
        ],
      },
      // Note: in the above 'match' block, the last color 'red' is the default if there are
      // any items that were not explicitly matched. It seems to be MANDATORY. None of the
      // other colors show up without it.
    },
    'road-rail'
  );

  map.addLayer({
    id: 'nyc-bourough-boundaries-line',
    type: 'line',
    source: 'nyc-borough-boundaries',
    paint: {
      'line-color': 'white',
      'line-width': 2,
    },
  });

  map.on('click', (e) => {
    const [selected] = map.queryRenderedFeatures(e.point, {
      layers: ['nyc-bourough-boundaries-fill'],
    });

    if (selected) {
      const name = selected.properties.boro_name;
      const population = selected.properties.pop_2020;
      alert(`The population of ${name} is ${population}`);
    }
  });

  const flyTo = (location) => {
    map.flyTo({
      center: location,
      essential: true,
    });
  };

  const usaSouthWest = [-121.170444, 27.72198];
  const usaNorthWest = [-67.338467, 47.079475];

  const ausSouthWest = [-246.261292, -42.630675];
  const ausNorthWest = [-208.117962, -11.138993];

  document.getElementById('fly-usa').addEventListener('click', () => {
    map.fitBounds([usaSouthWest, usaNorthWest]);
  });

  document.getElementById('fly-aus').addEventListener('click', () => {
    // Fly to a random location
    // map.flyTo({
    //   center: centerAustralia,
    //   essential: true // this animation is considered essential with respect to prefers-reduced-motion
    // });
    map.fitBounds([ausSouthWest, ausNorthWest]);
  });
})

