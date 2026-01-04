// 18.235 Adding a new city
// 1) If there is no lat and lng coords in URL then it should prevent data on form: Case where user tries to navigate to form direclty from URL
// 2) Add new city objects to fake API

// 3) Handle form submit
// 4) Date format in form using date picker
//// npm i react-datepicker

// 5) Create a function in contexts to post the city data

// 6) Adding a loader to form while adding a new city

// 7) Programmatically navigate back to cities list after adding a new city

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../../hooks/useUrlPostion";
import Message from "./Message";
import Spinner from "./Spinner";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingRevGeocode, setIsLoadingRevGeocode] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geoCodeError, setGeoCodeError] = useState("");

  const navigate = useNavigate();

  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?";

  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    console.log("From Form: New city:", newCity);
    await createCity(newCity);
    navigate("/app/cities");
  }

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCityData() {
        try {
          setIsLoadingRevGeocode(true);
          setGeoCodeError("");
          const res = await fetch(
            `${BASE_URL}latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          console.log("Rev Geocode data:", data);

          if (!data.countryCode)
            throw new Error(
              "This doesn't seem to be a city. Please click somewhere else."
            );
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeoCodeError(err.message);
        } finally {
          setIsLoadingRevGeocode(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  if (geoCodeError) return <Message message={geoCodeError} />;
  if (isLoadingRevGeocode) return <Spinner />;

  if (!lat && !lng)
    return <Message message={"Please start by clicking on a city!"} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}

        <DatePicker
          id={date}
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; back
        </Button>
        {/* <button>Add</button>
        <button>&larr; Back</button> */}
      </div>
    </form>
  );
}

export default Form;
