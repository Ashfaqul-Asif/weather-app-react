import Search from "../Components/Search"; // Adjust the path as needed
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "../Store/weatherSlice";

const Home = () => {
  const dispatch = useDispatch();
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"]; // Your array of cities
  const handleSearch = (searchValue) => {
    //  if (searchValue) {
    //    console.log(searchValue, "handleSearch");
    //    fetchWeatherData(dispatch, {
    //      lat: 23.810331,
    //      lon: 90.412521,
    //      city: searchValue?.toLowerCase() || null,
    //    });
    //  }
  };

  const error = useSelector((state) => state.weather.error);
  const loading = useSelector((state) => state.weather.loading);
  const weatherData = useSelector((state) => state.weather.weatherData);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        fetchWeatherData(dispatch, {
          lat: 23.810331,
          lon: 90.412521,
          cnt: 5,
          city: null,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }, [dispatch]);

  return (
    <div>
      <h1>Welcome to the Weather App!</h1>
      <Search suggestions={cities} onSearch={handleSearch} />
      <div>
        {!loading ? (
          <div>
            <h1>Weather Data for Your Location</h1>
            {JSON.stringify(weatherData)}
            {/* Display your weather data here */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
