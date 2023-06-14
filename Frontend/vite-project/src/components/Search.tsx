import React, { useState } from "react";
import { Container, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/yelp/${search}`
      );
      const data = await response.json();

      if (data.error) {
        setErrorMessage(data.error.description);
        setSearchResults([]);
      } else {
        setSearchResults(data.businesses);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while fetching data.");
      setSearchResults([]);
    }

    setSearch("");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 20 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          id="search"
          type="search"
          label="Search"
          value={search}
          onChange={handleInputChange}
          sx={{ width: 600 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon type="submit" onClick={handleSubmit} />
              </InputAdornment>
            ),
          }}
        />
      </form>
      {/* Display the error message if there is an error */}
      {errorMessage && <div>{errorMessage}</div>}
      {/* Display the search resutls */}
      {searchResults.map((result) => (
        <div key={result.id}>{result.name}</div>
      ))}
    </Container>
  );
};

export default Search;
