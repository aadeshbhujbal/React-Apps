import React from "react";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

export default function CountryList({ cities, isLoading }) {
  if (isLoading) {
    return <Spinner />;
  }
  if (!cities.length)
    return <Message message="Add Your First City By Clicking On The Map" />;
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.countr, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
