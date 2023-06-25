import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import dayjs, { Dayjs } from "dayjs";
import { Container, Button, Input, FormLabel } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CreateTrip: FC = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const [message, setMessage] = useState<string | null>(null);
  const session = useSelector((state: any) => state.session);
  const serverRoute = "http://localhost:8080";

  const handleSubmit = async (
    event: React.ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const { user } = session;

    if (!user) {
      setErrorMessage("You must be logged in to add to a trip");
      return;
    }

    const userId = user.user.id;
    const tripTitle = event.target.elements.title.value;
    const tripDate = value?.format("YYYY-MM-DD");

    try {
      const response = await fetch(
        `${serverRoute}/users/${userId}/trips`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: tripTitle,
            date: tripDate,
          }),
        }
      );

      if (response.ok) {
        // const data = await response.json();
        setMessage(
          `Your trip, "${tripTitle}", was created for ${tripDate}`
        );
      } else {
        setMessage("An error occurred while created this trip");
      }
    } catch (error) {
      setMessage("An error occurred while creating this trip");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h3>Create a Trip</h3>
      <Container maxWidth="md">
        <form onSubmit={handleSubmit}>
          <FormLabel>Trip Title: </FormLabel>
          <Input name="title" placeholder="My Trip" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Trip Date"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </LocalizationProvider>
          <Button type="submit">Create Trip</Button>
        </form>
        {message && <div>{message}</div>}
      </Container>
    </div>
  );
};

export default CreateTrip;
