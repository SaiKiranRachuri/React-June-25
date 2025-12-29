// 18.230: Including a map with Leaflet library
// 1) Install library in the project: npm i react-leaflet leaflet
// 2) Import the leaflet documented CSS in index.css file
// 3) Paste the code from react leaflet documentation and import the utilized components from react-leaflet

//// Errors:
// Map rendered after installing this particular version
// npm install react-leaflet@4 leaflet
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Map() {
  const navigate = useNavigate();
  const paramsData = useParams();
  console.log(paramsData);
  const { id } = useParams();
  const [mapPosition, setMapPostion] = useState([40, 0]);

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  console.log(lat);
  return (
    <div className={styles.mapContainer}>
      <p>Map {lat}</p>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
