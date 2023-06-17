import React, { FC, useState } from "react";
import {
  Container,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const apiEndpoint = "http://localhost:8080/yelp";

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (
    event: React.ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (search.trim() !== "") {
      try {
        const response = await fetch(`${apiEndpoint}/${search}`);
        const data = await response.json();
        console.log(data.businesses);

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
    } else {
      setErrorMessage("Please provide a search term.");
    }

    setSearch("");
  };

  // const handleAddToTrip = async (tripId, name, address) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8080/trips/${tripId}/locations`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           name,
  //           address,
  //         }),
  //       }
  //     );
  //     const data = await response.json();
  //     console.log("Location added to database:", data); // Log the response from the server
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

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
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </form>
      {/* Display the error message if there is an error */}
      {errorMessage && <div>{errorMessage}</div>}
      {/* Display the search resutls */}
      {searchResults.map((result) => (
        <div key={result["id"]}>
          <div>{result["name"]}</div>
          <Button
            variant="contained"
            // onClick={() => handleAddToTrip(result)}
          >
            Add to Trip
          </Button>
        </div>
      ))}
    </Container>
  );
};

export default Search;
