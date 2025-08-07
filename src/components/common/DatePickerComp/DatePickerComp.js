import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";

const DatePickerComp = ({ props, value = null, onDateChange = () => {} }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} sx={{}}>
      <DemoItem>
        <DatePicker
          onChange={onDateChange}
          format="DD-MM-YYYY"
          sx={{
            padding: 0,
            margin: 0,
            zIndex: "10",
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
          value={dayjs(dayjs(value).format("YYYY/MM/DD"))}
          {...props}
        />
      </DemoItem>
      <EventOutlinedIcon className="fill-primary hidden mobile:flex relative bottom-[1px] right-[24px]" />
    </LocalizationProvider>
  );
};
export default DatePickerComp;
