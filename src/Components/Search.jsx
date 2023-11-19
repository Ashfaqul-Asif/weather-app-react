import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const Search = ({ suggestions, onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue) {
        onSearch(inputValue);
      }
    }, 500); // Adjust the delay as needed

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, onSearch]);

  return (
    <Autocomplete
      freeSolo
      options={suggestions}
      onInputChange={handleInputChange}
      disableClearable
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search city or any location name"
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
          style={{ backgroundColor: "white" }}
        />
      )}
    />
  );
};

export default Search;
