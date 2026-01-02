// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

// 18.233 Fetching city data from url into map
// 1) Reverse Geocoding
// 2) Display city data and flag on form fields
// 3) Display a message when an incorrect city is selected on map: a sea place may be
// 4) Display spinner when a city data is fetched on form

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../../hooks/useUrlPostion";
import Message from "./Message";
import Spinner from "./Spinner";

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

  useEffect(
    function () {
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

  return (
    <form className={styles.form}>
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
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
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
