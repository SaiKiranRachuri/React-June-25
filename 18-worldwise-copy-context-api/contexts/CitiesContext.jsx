import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:9000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        // console.log("Res:", res);
        const data = await res.json();
        // console.log("Data:", data);
        setCities(data);
      } catch {
        alert("There was an error fetching data.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      // console.log("Res:", res);
      const data = await res.json();
      // console.log("Data:", data);
      setCurrentCity(data);
    } catch {
      alert("There was an error fetching data.");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("Res:", res);
      const data = await res.json();
      console.log("From context: New City Data:", data);

      setCities((cities) => [...cities, data]);
    } catch {
      alert("There was an error fetching data.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, getCity, currentCity, createCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw Error("You are trying to access context out of its provider.");
  return context;
}

// export { CitiesContext, CitiesProvider };
export { useCities, CitiesProvider };
