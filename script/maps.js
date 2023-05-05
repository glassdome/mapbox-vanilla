import { continents, Continent, getContinentMap } from './continents'
const MB_KEY = import.meta.env.VITE_MAPBOX_KEY;

mapboxgl.accessToken = MB_KEY;
console.log(`KEY = ${MB_KEY}`)

const styleDark = 'mapbox://styles/mapbox/dark-v11';
const styleLight = 'mapbox://styles/mapbox/light-v11';
const styleStreets = 'mapbox://styles/mapbox/streets-v12';
const styleShine = 'mapbox://styles/sysmythe/clh978o1j00cu01qp96z527dm'
const centerUnitedStates = [-97.872047,39.770548]
const centerAustralia = [134.811687,-26.933502]




// const popup = new mapboxgl.Popup({ offset: 25 }).setText(
//   'Welcome to Central Park!'
// );

// const marker1 = new mapboxgl.Marker()
//   .setLngLat([-73.962803,40.781595])
//   .setPopup(popup)
//   .addTo(map);


const CONTINENT_SOURCE_NAME = 'continents-outline'
const CONTINENT_SOURCE_DATA = `./data/${CONTINENT_SOURCE_NAME}.geojson`;
const CONTINENT_SOURCE_FILL = `${CONTINENT_SOURCE_NAME}-fill`;

// const addGeoSource = (map, name, path) => {
//   map.addSource(name, {
//     type: 'geojson',
//     data: path
//   });
// };


function addGeoSource(map, name, path) {
  map.addSource(name, {
    type: 'geojson',
    data: path,
    'generateId': true
  });
};

const addFillLayer = (map, source, paint) => {
  map.addLayer({
    id: `${source}-fill`,
    type: 'fill',
    source,
    paint
  })
}

const map = new mapboxgl.Map({
  container: 'map', // div ID
  style: styleShine,
  projection: 'globe',
  center: centerUnitedStates,
  zoom: 2.5,
  attributionControl: false
});

const fog = {
  "range": [0.8, 8],
  "color": "#dc9f9f",
  "horizon-blend": 0.5,
  "high-color": "#245bde",
  "space-color": "#000000",
  "star-intensity": 0.15
}

const fog2 = {"range":[0.5,10],"color":"hsl(0, 0%, 100%)","high-color":["interpolate",["exponential",1.2],["zoom"],0,"hsl(207, 100%, 50%)",8,"hsl(38, 63%, 84%)"],"space-color":["interpolate",["exponential",1.2],["zoom"],5.5,"hsl(240, 46%, 11%)",6,"hsl(199, 61%, 87%)"],"horizon-blend":["interpolate",["exponential",1.2],["zoom"],5.5,0.05,6,0.1],"star-intensity":["interpolate",["exponential",1.2],["zoom"],5.5,0.1,6,0]}

map.on('style.load', () => {
  map.setFog(fog2); // Set the default atmosphere style
  });

map.on('load', () => {

  addGeoSource(map, CONTINENT_SOURCE_NAME, CONTINENT_SOURCE_DATA);
  addFillLayer(map, CONTINENT_SOURCE_NAME, {
    'fill-color': 'steelblue',
    'fill-opacity': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      .6,
      0,
    ]
  }); 
  

  map.on('mouseenter', CONTINENT_SOURCE_FILL, () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  let hoveredStateId = null;
  map.on('mousemove', CONTINENT_SOURCE_FILL, (e) => {
    console.log(e.features)
    if (e.features.length > 0) {
      if (hoveredStateId !== null) {
        map.setFeatureState(
          { source: CONTINENT_SOURCE_NAME, id: hoveredStateId },
          { hover: false }
        );
      }
      hoveredStateId = e.features[0].id;
      map.setFeatureState(
        { source: CONTINENT_SOURCE_NAME, id: hoveredStateId },
        { hover: true }
      );
    }
  });

  // When the mouse leaves the state-fill layer, update the feature state of the
  // previously hovered feature.
  map.on('mouseleave', CONTINENT_SOURCE_FILL, () => {
    map.getCanvas().style.cursor = '';
    if (hoveredStateId !== null) {
      map.setFeatureState(
        { source: CONTINENT_SOURCE_NAME, id: hoveredStateId },
        { hover: false }
      );
    }
    hoveredStateId = null;
  });


  map.on('click', CONTINENT_SOURCE_FILL, (e) => {
    const coords = e.lngLat //e.features[0].geometry.coordinates.slice();
    const name = e.features[0].properties.CONTINENT;
    
    const popup = new mapboxgl.Popup();
    
    popup
      .addClassName('popup-text')
      .setLngLat(coords)
      .setHTML(`<p>${name}</p>`)
      .addTo(map)
  });



//   // console.log(map.getStyle());

  // Add Australian outline
  // map.addSource('australia-outline', {
  //   type: 'geojson',
  //   data: './data/australia/australia-outline.geojson',
  // });
  


  // map.addSource(CONTINENT_SOURCE_NAME, {
  //   type: 'geojson',
  //   data: CONTINENT_SOURCE_DATA
  // })
  // addFillLayer(map, CONTINENT_SOURCE_NAME, {
  //         'fill-color': 'orange',
  //         'fill-opacity': 0.7
  //       });

//   // map.addLayer({
//   //   id: 'australia-outline-fill',
//   //   type: 'fill',
//   //   source: 'australia-outline',
//   //   paint: {
//   //     'fill-color': 'orange',
//   //     'fill-opacity': 0.7
//   //   }
//   // });

//   map.addLayer({
//     id: 'australia-outline-line',
//     type: 'line',
//     source: 'australia-outline',
//     paint: {
//       'line-color': 'white',
//       'line-width': 3,
//     },
//   });

//   // Add Australian State Boundaries
//   map.addSource('australia-states-outline', {
//     type: 'geojson',
//     data: './data/australia/australia-states-outline.geojson',
//   });

//   map.addLayer({
//     id: 'australia-states-outline-line',
//     type: 'line',
//     source: 'australia-states-outline',
//     paint: {
//       'line-color': 'white',
//       'line-width': 3,
//     },
//   });

//   map.addLayer(
//     {
//       id: 'australia-states-outline-fill',
//       type: 'fill',
//       source: 'australia-states-outline',
//       paint: {
//         'fill-color': [
//           'match',
//           ['get', 'STATE_CODE'],
//           '1',
//           '#ff6961',
//           '2',
//           '#ffb480',
//           '3',
//           '#f8f38d',
//           '4',
//           '#42d6a4',
//           '5',
//           '#08cad1',
//           '6',
//           '#f8f38d',
//           '7',
//           '#ff6961',
//           '8',
//           '#42d6a4',
//           'red',
      //   ],
      //   'fill-opacity': [
      //     'case',
      //     ['boolean', ['feature-state', 'hover'], false],
      //     0.5,
      //     1,
      //   ],
      // },

//       // Note: in the above 'match' block, the last color 'red' is the default if there are
//       // any items that were not explicitly matched. It seems to be MANDATORY. None of the
//       // other colors show up without it.
//     },
//     'road-rail'
//   );

//   // Change the cursor to a pointer when the mouse is over the places layer.
//   map.on('mouseenter', 'australia-states-outline-fill', () => {
//     map.getCanvas().style.cursor = 'pointer';
//   });

//   map.on('click', 'australia-states-outline-fill', (e) => {
//     const coords = e.lngLat //e.features[0].geometry.coordinates.slice();
//     const name = e.features[0].properties.STATE_NAME;
//     console.log(`NAME: ${name}, COORDS: ${coords}`)
//     const popup = new mapboxgl.Popup();
    
//     popup
//       .addClassName('popup-text')
//       .setLngLat(coords)
//       .setHTML(`<p>${name}</p>`)
//       .addTo(map)
//   });




//   // Add NYC Borough Boundaries data source.
//   map.addSource('nyc-borough-boundaries', {
//     type: 'geojson',
//     data: './data/nyc-borough-boundaries.geojson',
//   });

//   map.addLayer(
//     {
//       id: 'nyc-bourough-boundaries-fill',
//       type: 'fill',
//       source: 'nyc-borough-boundaries',
//       paint: {
//         'fill-color': [
//           'match',
//           ['get', 'boro_code'],
//           1,
//           'green',
//           2,
//           'purple',
//           3,
//           'steelblue',
//           4,
//           'orange',
//           5,
//           'pink',
//           'red',
//         ],
//       },
//       // Note: in the above 'match' block, the last color 'red' is the default if there are
//       // any items that were not explicitly matched. It seems to be MANDATORY. None of the
//       // other colors show up without it.
//     },
//     'road-rail'
//   );

//   map.addLayer({
//     id: 'nyc-bourough-boundaries-line',
//     type: 'line',
//     source: 'nyc-borough-boundaries',
//     paint: {
//       'line-color': 'white',
//       'line-width': 2,
//     },
//   });

//   map.on('click', (e) => {
//     const [selected] = map.queryRenderedFeatures(e.point, {
//       layers: ['nyc-bourough-boundaries-fill'],
//     });

//     if (selected) {
//       const name = selected.properties.boro_name;
//       const population = selected.properties.pop_2020;
//       alert(`The population of ${name} is ${population}`);
//     }
  // });


 

//   // map.addLayer({
//   //   id: 'australia-outline-fill',
//   //   type: 'fill',
//   //   source: 'australia-outline',
//   //   paint: {
//   //     'fill-color': 'orange',
//   //     'fill-opacity': 0.7
//   //   }
//   // });



//   map.addSource('australia-states-outline', {
//     type: 'geojson',
//     data: './data/australia/australia-states-outline.geojson',
//   });




  // const naNE = [-64.603729,60.063812]
  // const naSW = [-125.482407,10.411508]
  // const naBb = [naSW, naNE]

  // const usaSouthWest = [-121.170444, 27.72198];
  // const usaNorthWest = [-67.338467, 47.079475];

  // const europeSouthwest = [-12.077408,37.317752]
  // const europeNortheast = [34.060364,63.349973];
  // const europeBoundingBox = [europeSouthwest, europeNortheast];

  // const ausSouthWest = [-246.261292, -42.630675];
  // const ausNorthWest = [-208.117962, -11.138993];

  // const africaSouthWest = [-11.092072,-32.821326]
  // const africaNorthEast = [49.103394,32.031363];
  // const africaBoundingBox = [africaSouthWest, africaNorthEast];

  // const southAmericaSouthwest = [-79.640579,-53.574569];
  // const southAmericaNortheast = [-36.670990,10.572872];
  // const southAmericaBoundingBox = [southAmericaSouthwest, southAmericaNortheast];

  // const asiaSouthwest = [64.844055,9.951267]
  // const asiaNortheast = [131.214523,64.771199]
  // const asiaBoundingBox = [asiaSouthwest, asiaNortheast]

  // const antarcticaSouthwest = [-180.0, -90.0] 
  // const antarcticaNortheast = [180.0, -63.2706604895]
  // const antarcticaBoundingBox = [antarcticaSouthwest, antarcticaNortheast]

  const FLIGHT_DURATION = 4000;



  // Load world continent data into a Map
  // const continentMap = continents.reduce((map, continentObj) => {
  //   map.set(continentObj.tag, new Continent(continentObj));
  //   return map;
  // }, new Map());
  
  const continentMap = getContinentMap();

  // Setup event listeners on the 'flight menu'
  continentMap.forEach((continent, tag) => {
    document.getElementById(tag).addEventListener('click', () => {
      map.fitBounds(continent.boundingBox, { duration: FLIGHT_DURATION });
    });
  });

  // Capture the current zoom-level and display it.
  const zoomLevel = document.getElementById('zoom-level');
  map.on('zoomend', () => {
    zoomLevel.textContent = map.getZoom().toFixed(1);
  });

})

