// 18.227 Creating CitiesContext

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import { useEffect, useState } from "react";
import CityList from "./components/CityList";
import CountriesList from "./components/CountriesList";
import Form from "./components/Form";

import City from "./components/City";

const BASE_URL = "http://localhost:9000";

function App() {
  // const x = 23;

  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="product" element={<Product />} />
          <Route path="/" element={<HomePage />} />

          <Route path="pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<AppLayout />}>
            {/* <Route
              index
              element={<CityList cities={cities} isLoading={isLoading} />}
            /> */}
            <Route index element={<Navigate replace to="cities" />} />
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route
              path="countries"
              element={<CountriesList cities={cities} isLoading={isLoading} />}
            />
            <Route path="cities/:id" element={<City />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
