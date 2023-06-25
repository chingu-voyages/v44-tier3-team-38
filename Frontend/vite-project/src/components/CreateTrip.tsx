import React, { FC } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Container, Button, Input, FormLabel } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CreateTrip: FC = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());

  const handleSubmit = (
    event: React.ChangeEvent<HTMLFormElement>
  ) => {};

  return (
    <div>
      <h3>Create a Trip</h3>
      <Container maxWidth="md">
        <form onSubmit={handleSubmit}>
          <FormLabel>Trip Title: </FormLabel>
          <Input placeholder="My Trip" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Trip Date"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </LocalizationProvider>
        </form>
      </Container>
    </div>
  );
};

export default CreateTrip;
