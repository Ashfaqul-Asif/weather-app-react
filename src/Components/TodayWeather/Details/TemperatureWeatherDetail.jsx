import { Box, Typography } from "@mui/material";
import React from "react";

const TemperatureWeatherDetail = ({ temperature, description }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "100%",
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontWeight: "600",
          fontSize: { xs: "12px", sm: "14px", md: "16px" },
          color: "white",
          textTransform: "uppercase",
          lineHeight: 1,
          marginBottom: "8px",
          fontFamily: "Poppins",
        }}
      >
        <span> {Math.round(temperature.temp)} °C</span>
        {/* <br /> */}
        {/* <span>Feels like {Math.round(temperature.feels_like)} °C</span> */}
      </Typography>
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: { xs: "10px", sm: "12px", md: "14px" },
          color: "rgba(255,255,255, .7)",
          lineHeight: 1,
          letterSpacing: { xs: "1px", sm: "0" },
          fontFamily: "Roboto Condensed",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default TemperatureWeatherDetail;
