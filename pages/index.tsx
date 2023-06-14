import { Box, useTheme } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { TimeField, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";

export default function Home() {
  const [enterTime, setEnterTime] = useState<Date | null>(null);
  const [startEatingTime, setStartEatingTime] = useState<Date | null>(null);
  const [endEatingTime, setEndEatingTime] = useState<Date | null>(null);

  const calculateExitTime = () => {
    const minuteEating = dayjs(endEatingTime).diff(
      dayjs(startEatingTime),
      "minute"
    );

    return dayjs(enterTime)
      .add(minuteEating, "minute")
      .add(7, "hour")
      .add(12, "minute");
  };

  return (
    <Container maxWidth="lg">
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={2}
      >
        <Typography variant="h4" component="h1" gutterBottom color={useTheme().palette.secondary.main}>
          Calcola orario uscita
        </Typography>
        <TimePicker
          value={enterTime}
          label={"Orario di ingresso"}
          onChange={(dayJsDate) => setEnterTime(dayJsDate)} // value is DayJS object
          ampm={false}
          skipDisabled={true}
          autoFocus={true}
        />
        <TimePicker
          value={startEatingTime}
          label={"Orario inizio mensa"}
          onChange={(dayJsDate) => setStartEatingTime(dayJsDate)} // value is DayJS object
          ampm={false}
          skipDisabled={true}
          autoFocus={true}
        />
        <TimePicker
          value={endEatingTime}
          label={"Orario fine mense"}
          onChange={(dayJsDate) => setEndEatingTime(dayJsDate)} // value is DayJS object
          ampm={false}
          skipDisabled={true}
          autoFocus={true}
        />
        <Box display={"flex"} gap={1} alignItems={"center"}>
          Uscita:
          <TimeField
            sx={{ width: "100px" }}
            value={calculateExitTime()}
            // label={"Orario di uscita"}
            readOnly={true}
            ampm={false}
          />
        </Box>
        {/* <Typography>{dayjs(enterTime).toString()}</Typography> */}
      </Box>
    </Container>
  );
}
