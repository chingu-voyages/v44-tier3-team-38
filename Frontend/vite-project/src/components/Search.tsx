import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
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
  const session = useSelector((state: any) => state.session);
  const serverRoute = "http://localhost:8080";
  const yelpEndpoint = `${serverRoute}/yelp`;

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
        const response = await fetch(`${yelpEndpoint}/${search}`);
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
    } else {
      setErrorMessage("Please provide a location or business name.");
    }

    setSearch("");
  };

  const handleAddToTrip = async (result) => {
    const name = result.name;
    const address = result.location.address1;
    // Get the data of the logged in user
    const { user } = session;

    if (!user) {
      setErrorMessage("You must be logged in to add to a trip");
      return;
    }

    const userId = user.user.id;

    try {
      // Fetch user's trips
      const tripsResponse = await fetch(
        `${serverRoute}/users/${userId}/trips`
      );
      const tripsData = await tripsResponse.json();

      // Check to see if the user has a trip created
      if (tripsData.length === 0) {
        setErrorMessage("You must create a trip to add a location");
        return;
      }

      // Use first trip in trips array
      const tripId = tripsData[0].id;

      try {
        const response = await fetch(
          `${serverRoute}/trips/${tripId}/locations`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              address,
            }),
          }
        );
        const data = await response.json();
        console.log("Location added to database:", data); // Log the response from the server
      } catch (error) {
        console.error("Error:", error);
      }
    } catch (error) {
      console.error("Error fetching user's trips:", error);
    }
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
            onClick={() => handleAddToTrip(result)}
          >
            Add to Trip
          </Button>
        </div>
      ))}
    </Container>
  );
};

export default Search;
