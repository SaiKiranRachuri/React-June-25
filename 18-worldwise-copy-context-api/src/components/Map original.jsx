import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const navigate = useNavigate();
  const paramsData = useParams();
  console.log(paramsData);
  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  console.log(lat);
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <p>Map {lat}</p>
    </div>
  );
}

export default Map;
