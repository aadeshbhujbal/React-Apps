import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import React, { useEffect, useState } from "react";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

const BASE_URL = "http://localhost:9000";

function App() {
  const [cities, setCities] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [country, setIsCountry] = useState([]);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        alert("There was an error fetching the cities");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to={"cities"} />} />
            <Route path="cities/:id" element={<City />}></Route>
            <Route
              path="cities"
              element={
                <>
                  {" "}
                  <CityList cities={cities} isLoading={isloading} />{" "}
                </>
              }
            />
            <Route
              path="countries"
              element={
                <>
                  <CountryList cities={cities} isLoading={isloading} />
                </>
              }
            />
            <Route
              path="form"
              element={
                <>
                  <Form />
                </>
              }
            />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
