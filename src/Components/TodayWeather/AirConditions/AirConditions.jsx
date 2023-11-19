import React from "react";
import ErrorBox from "../../Reusable/ErrorBox";
import AirConditionsItem from "./AirConditionsItem";
import Layout from "../../Reusable/Layout";
import moment from "moment";
const TodayWeatherAirConditions = ({ data }) => {
  const noDataProvided =
    !data || Object.keys(data).length === 0 || data.cod === "404";

  let content = <ErrorBox flex="1" type="error" />;
  let sunriseTime = moment
    .utc(data?.sys.sunrise, "X")
    .add(data?.timezone, "seconds")
    .format("LT");
  let sunsetTime = moment
    .utc(data?.sys.sunset, "X")
    .add(data?.timezone, "seconds")
    .format("LT");
  if (!noDataProvided)
    content = (
      <>
        <AirConditionsItem
          title="Real Feel"
          value={`${Math.round(data.main.feels_like)} °C`}
          type="temperature"
        />
        <AirConditionsItem
          title="Wind"
          value={`${data.wind.speed} m/s`}
          type="wind"
        />
        <AirConditionsItem
          title="Clouds"
          value={`${Math.round(data.clouds.all)} %`}
          type="clouds"
        />
        <AirConditionsItem
          title="Humidity"
          value={`${Math.round(data.main.humidity)} %`}
          type="humidity"
        />
        <AirConditionsItem title="Sunrise" value={sunriseTime} type="sunrise" />
        <AirConditionsItem title="Sunset" value={sunsetTime} type="sunset" />
      </>
    );
  return (
    <Layout
      title="Current Forecast"
      content={content}
      mb="1rem"
      sx={{ marginTop: "2.9rem" }}
    />
  );
};

export default TodayWeatherAirConditions;
