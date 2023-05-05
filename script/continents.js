// Coordinate data for all continents.
export const continents = [
  {
    "id": "africa",
    "tag": "africa",
    "name": "Africa",
    "coordinates": {
      "center": {
        "longitude": 21.09375,
        "latitude": 7.1881
      },
      "boundingBox": {
        "southwest": {
          "longitude": -11.092072,
          "latitude": -32.821326
        },
        "northeast": {
          "longitude": 49.103394,
          "latitude": 32.031363
        }
      }
    }
  },
  {
    "id": "antarctica",
    "tag": "antarctica",
    "name": "Antarctica",
    "coordinates": {
      "center": {
        "longitude": 0,
        "latitude": -82.8628
      },
      "boundingBox": {
        "southwest": {
          "longitude": -180.0,
          "latitude": -90.0
        },
        "northeast": {
          "longitude": 180.0,
          "latitude": -63.2706604895
        }
      }
    }
  },
  {
    "id": "asia",
    "tag": "asia",
    "name": "Asia",
    "coordinates": {
      "center": {
        "longitude": 95.7129,
        "latitude": 43.8333
      },
      "boundingBox": {
        "southwest": {
          "longitude": 64.844055,
          "latitude": 9.951267
        },
        "northeast": {
          "longitude": 131.214523,
          "latitude": 64.771199
        }
      }
    }
  },
  {
    "id": "australia",
    "tag": "australia",
    "name": "Australia",
    "coordinates": {
      "center": {
        "longitude": 133.7751,
        "latitude": -25.2744
      },
      "boundingBox": {
        "southwest": {
          "longitude": -246.261292,
          "latitude": -42.630675
        },
        "northeast": {
          "longitude": -208.117962,
          "latitude": -11.138993
        }
      }
    }
  },
  {
    "id": "europe",
    "tag": "europe",
    "name": "Europe",
    "coordinates": {
      "center": {
        "longitude": 16.0,
        "latitude": 54.526
      },
      "boundingBox": {
        "southwest": {
          "longitude": -12.077408,
          "latitude": 37.317752
        },
        "northeast": {
          "longitude": 34.060364,
          "latitude": 63.349973
        }
      }
    }
  },
  {
    "id": "north_america",
    "tag": "north_america",
    "name": "North America",
    "coordinates": {
      "center": {
        "longitude": -102.8329,
        "latitude": 50.000
      },
      "boundingBox": {
        "southwest": {
          "longitude": -125.482407,
          "latitude": 10.411508
        },
        "northeast": {
          "longitude": -64.603729,
          "latitude": 60.063812
        }
      }
    }
  },
  {
    "id": "south_america",
    "tag": "south_america",
    "name": "South America",
    "coordinates": {
      "center": {
        "longitude": -60.7333,
        "latitude": -8.7832
      },
      "boundingBox": {
        "southwest": {
          "longitude": -79.640579,
          "latitude": -53.574569
        },
        "northeast": {
          "longitude": -36.670990,
          "latitude": 10.572872
        }
      }
    }
  }
]

export class Continent {
  constructor(data) {
    this.data = data;
    this.id = data.id;
    this.tag = data.tag;
    this.name = data.name;

    const center = data.coordinates.center;
    const sw = data.coordinates.boundingBox.southwest;
    const ne = data.coordinates.boundingBox.northeast;

    this.center = [center.longitude, center.latitude];
    this.southwest = [sw.longitude, sw.latitude];
    this.northeast = [ne.longitude, ne.latitude];
    this.boundingBox = [this.southwest, this.northeast];
  }
}


// export class Continent2 {
//   constructor(data) {
//     const {
//       id,
//       tag,
//       name,
//       coordinates: {
//         center: { longitude: centerLong, latitude: centerLat },
//         boundingBox: {
//           southwest: { longitude: swLong, latitude: swLat },
//           northeast: { longitude: neLong, latitude: neLat },
//         },
//       },
//     } = data;

//     this.id = id;
//     this.tag = tag;
//     this.name = name;
//     this.center = [centerLong, centerLat];
//     this.southwest = [swLong, swLat];
//     this.northeast = [neLong, neLat];
//     this.boundingBox = [this.southwest, this.northeast];
//   }
// }




export const getContinentMap = () => {
  return continents.reduce((map, continentObj) => {
    map.set(continentObj.tag, new Continent(continentObj));
    return map;
  }, new Map());  
}
const continentData = [ /* JSON array of continent data */ ];

const continentMap = continentData.reduce((map, continentObj) => {
  map.set(continentObj.tag, new Continent(continentObj));
  return map;
}, new Map());



// sw: -125.482407,10.411508
// ne: -64.603729,60.063812

  const asiaSouthwest = [64.844055,9.951267]
  const asiaNortheast = [131.214523,64.771199]

  const northAmericaSouthwest = [-64.603729,60.063812]
  const northAmericaNortheast = [-125.482407,10.411508]

  const europeSouthwest = [-12.077408,37.317752]
  const europeNortheast = [34.060364,63.349973];

  const ausSouthWest = [-246.261292, -42.630675];
  const ausNorthWest = [-208.117962, -11.138993];

  const africaSouthWest = [-11.092072,-32.821326]
  const africaNorthEast = [49.103394,32.031363];

  const southAmericaSouthwest = [-79.640579,-53.574569];
  const southAmericaNortheast = [-36.670990,10.572872];

  const antarcticaSouthwest = [-180.0, -90.0] 
  const antarcticaNortheast = [180.0, -63.2706604895]