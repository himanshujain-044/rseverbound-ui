import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";

const DatePickerComp = ({ value = new Date(), onDateChange = () => {} }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem>
        <DatePicker
          onChange={onDateChange}
          defaultValue={dayjs(value)}
          format="DD-MM-YYYY"
          sx={{
            padding: 0,
            margin: 0,
            "& input": {
              padding: 0,
              margin: 0,
              outline: "none",
              maxWidth: "6rem",
              fontWeight: "700",
            },
            "& button": {
              color: "#5A298B",
            },
            "& fieldset": {
              border: "none",
            },
          }}
        />
      </DemoItem>
      <EventOutlinedIcon className="fill-primary hidden mobile:flex" />
    </LocalizationProvider>
  );
};
export default DatePickerComp;
