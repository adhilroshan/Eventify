// import { useEffect, useState } from "react";
import { useEffect } from "react";
import { useGeolocated } from "react-geolocated";
// import Mapp from "./mmap";

import Map from "./Map";

function Location({ setLocation }) {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 2000,
    });

  return !isGeolocationAvailable ? (
    alert("Your browser does not support Geolocation")
  ) : !isGeolocationEnabled ? (
    alert("Geolocation is not enabled")
  ) : coords ? (
    <div className="mx-12 my-4 relative rounded-2xl drop-shadow-lg shadow">
      <Map coords={coords} setLocation={setLocation} />
    </div>
  ) : (
    <div>Getting the location data&hellip;</div>
  );

  // return (
  //   <div>
  //     <div className="mx-8 my-4 relative rounded-2xl">
  //       <MapGL />
  //     </div>
  //     <h1>This is the Chat page</h1>
  //   </div>
  // );
}

export default Location;
