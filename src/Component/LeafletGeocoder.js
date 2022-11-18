import React, { useEffect } from 'react'
import L from 'leaflet'
import {useMap} from 'react-leaflet'

function LeafletGeocoder() {
    const map = useMap();
  useEffect(() => {
    L.Control.geocoder({
      defaultMarkGeocode: false,
    })
      .on("markgeocode", function (e) {
        var latlng = e.geocode.center;
        L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
        map.fitBounds(e.geocode.bbox);
        console.log(latlng);
      })
      .addTo(map);
  }, []);

    
  return null;
}

export default LeafletGeocoder