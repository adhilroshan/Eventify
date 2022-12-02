import React from "react";
import mapboxgl from "mapbox-gl";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { trusted } from "mongoose";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWRoaWxyb3NoYW4iLCJhIjoiY2w5cW05ZWt6MTJ4ajN3bzU1cnQ0czV2ciJ9.U_e1jW1cBHbGC7n6R13vXQ";

const Map = ({coords,setLocation}) => {
  const mapContainer = useRef(null);
  //   const map = useRef(null);
  const [lng, setLng] = useState(coords.longitude);
  const [lat, setLat] = useState(coords.latitude);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      // zoom: zoom,
      zoom: 17,
      bearing: -12,
      pitch: 60,

      // interactive: false,
    });

    const marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([coords.longitude, coords.latitude])
      .addTo(map);

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // map.on("move", () => {
    //   setLng(map.current.getCenter().lng.toFixed(4));
    //   setLat(map.current.getCenter().lat.toFixed(4));
    //   setZoom(map.current.getZoom().toFixed(2));
    // });

    function onDragEnd(){

        setLng(marker.getLngLat().lng);
        setLat(marker.getLngLat().lat);
        setLocation(marker.getLngLat());
        
    }
    marker.on("dragend", onDragEnd);

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      })
    );

    // Clean up on unmount
    return () => map.remove();
  },[]);
  //   useEffect(() => {
  //     if (!map.current) return; // wait for map to initialize
  //     map.current.on("move", () => {
  //       setLng(map.current.getCenter().lng.toFixed(4));
  //       setLat(map.current.getCenter().lat.toFixed(4));
  //       setZoom(map.current.getZoom().toFixed(2));
  //     });
  //   });

  return (
    <div>
      <div className="bg-map-sidebar text-white py-1 px-3 font-mono z-10 absolute top-0 left-0 m-3 rounded-md">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="h-96" />
    </div>
  );
};

export default Map;
