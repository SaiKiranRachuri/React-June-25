// 18.232 Interacting with Map: Zoom in to the selected city
// 1) On selecting the city the map should navigate to the respective marker
// 2) On clicking on back button in form marker should still stay the same untill another city is selected. To make it work I override the default map position with the current lat, lng positions. See useEffect() code below.
// 3) Detecting a click on map and display form along the location coords

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

function Map() {
  const paramsData = useParams();
  console.log(paramsData);
  const { id } = useParams();
  const [mapPosition, setMapPostion] = useState([40, 0]);

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const { cities } = useCities();

  console.log("Latitude: ", lat);

  useEffect(
    function () {
      if (lat && lng) setMapPostion([lat, lng]);
    },
    [lat, lng]
  );

  return (
    <div className={styles.mapContainer}>
      <p>Map {lat}</p>
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
