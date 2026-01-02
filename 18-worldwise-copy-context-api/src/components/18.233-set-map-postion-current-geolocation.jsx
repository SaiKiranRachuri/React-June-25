// 18.233 Set map position using custom hook GeoLocation
// 1) Create a folder for custom hooks and create a js file for GeoLocation
// 2) Destructure GeoLocation custom hook
// 3) Import button to fetch current position and coords
// 4) Synchronize the default coords with current position using an Effect

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../../contexts/CitiesContext";
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "./Button";

function Map() {
  const paramsData = useParams();
  console.log(paramsData);
  const { id } = useParams();
  const [mapPosition, setMapPostion] = useState([40, 0]);

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const {
    isLoading: isLoadingGeolocation,
    postion: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const { cities } = useCities();

  console.log("Latitude: ", lat);

  useEffect(
    function () {
      if (lat && lng) setMapPostion([lat, lng]);
    },
    [lat, lng]
  );

  useEffect(
    function () {
      if (geoLocationPosition)
        setMapPostion([geoLocationPosition.lat, geoLocationPosition.lng]);
    },
    [geoLocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {/* <p>Map {lat}</p> */}
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingGeolocation ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        // center={mapPosition}
        center={[lat || 40, lng || 0]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter
          //  position={[lat || 40, lng || 0]
          position={mapPosition}
        ></ChangeCenter>
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
