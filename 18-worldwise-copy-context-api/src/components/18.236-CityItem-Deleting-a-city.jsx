// 18.236 Deleting a city
// 1) On clicking delete button on any city it also opens up the form details because it involves clicling on the item: that should be prevented.
// 2) Handle Click: Create a function for delete city in CitiesContext

import { useCities } from "../../contexts/CitiesContext";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  console.log(city);

  const { cityName, emoji, date, id, position } = city;
  const { currentCity, deleteCity } = useCities();

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <Link
      className={`${styles.cityItem} ${
        id === currentCity.id ? styles["cityItem--active"] : " "
      }`}
      to={`${id}?lat=${position.lat}&lng=${position.lng}`}
    >
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <times className={styles.date}>{formatDate(date)}</times>
      <button className={styles.deleteBtn} onClick={handleClick}>
        &times;
      </button>
    </Link>
  );
}

export default CityItem;
