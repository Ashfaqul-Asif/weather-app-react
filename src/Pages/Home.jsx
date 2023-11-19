import Search from "../Components/Search"; // Adjust the path as needed
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "../Store/weatherSlice";
import TodayWeather from "../Components/TodayWeather/TodayWeather";
import WeeklyForecast from "../Components/WeeklyForecast/WeeklyForecast";
import LineChart from "../Components/Graph/LineChart"; // Adjust the path as needed
import { Container, Grid, Typography } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  // Your array of cities
  const handleSearch = useCallback(
    (searchValue) => {
      console.log(searchValue);
      if (searchValue) {
        console.log(searchValue, "handleSearch");
        fetchWeatherData(dispatch, {
          lat: 23.810331,
          lon: 90.412521,
          city: searchValue?.toLowerCase() || null,
        });
      }
    },
    [dispatch]
  );

  const error = useSelector((state) => state.weather.error);
  const loading = useSelector((state) => state.weather.loading);
  const weatherData = useSelector((state) => state.weather.weatherData);
  const todaysForecastData = useSelector(
    (state) => state.weather.todaysForecastData
  );
  const next5daysForeCast = useSelector(
    (state) => state.weather.next5daysForeCast
  );
  const weekForecast = useSelector((state) => state.weather.weekForecast);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherData(dispatch, {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          cnt: 5,
          city: null,
        });
      },
      (error) => {}
    );
  }, [dispatch]);

  return (
    <Container
      sx={{
        maxWidth: { xs: "95%", sm: "80%", md: "1100px" },
      }}
      className="baseCard"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Search suggestions={[]} onSearch={handleSearch} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid item xs={12}></Grid>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Typography>Error: {error}</Typography>
          ) : (
            weatherData &&
            todaysForecastData && (
              <TodayWeather
                data={weatherData}
                forecastList={todaysForecastData}
              />
            )
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {!error && !loading && next5daysForeCast && (
            <WeeklyForecast data={next5daysForeCast} />
          )}
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            {!error && !loading && next5daysForeCast && <LineChart />}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
