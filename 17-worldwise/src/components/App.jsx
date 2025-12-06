// 1) Inline styles
// 2) Global styles
// 3) CSS module styles
// 4) Libraries like MUI

// Include a CSS module for PageNav and define styles
// Including classes with same names in different components using CSS modules styles then it distinguishes the classes by a unique ID.

// 17.216 Dynamic routes with url params: Global state to bookmark
//  Passing data from one page to another using UI state using url params
//  1) Create new route and give the param name. Param name can be anything
//  2) Create link for the JSX element i.e., for the each city item: Cityitem component
//  2) Using useParams() hook data from URL can be read: City component

// 17.217 Reading and setting a query string
// Share the state on to URL
// 1) Define query string
// <Link
//   className={styles.cityItem}
//   to={`${id}?lat=${position.lat}&lng=${position.lng}`}
// > Query string for each city: CityItem component
// 2) Access it using searchParams hook: City component

// 17.218 Programmatic way of navigation: An imperative way
// Ex: On submitting a form
// Worldwise usecase
// 1) Define route for the form
// 2) Add an event listener on which page should be navigated to form
// 3) Use useNavigate() function in the event listener

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import { useEffect, useState } from "react";
import CityList from "./components/CityList";
import CountriesList from "./components/CountriesList";

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
            <Route
              index
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
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
