import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import cx from "classnames";
import Select from "@mui/material/Select";

const Dropdown = ({
  options = [],
  selectedValue = "",
  onChangeDDOption = () => {},
  placeholder = "Select ...",
  className = "",
}) => {
  //   const [age, setAge] = useState("");
  //   const handleChange = (event) => {
  //     setAge(event.target.value);
  //   };

  return (
    <Select
      className={cx("h-[42px]", className)}
      value={selectedValue}
      onChange={onChangeDDOption}
      displayEmpty
      renderValue={
        selectedValue !== ""
          ? undefined
          : () => (
              <span className="text-[rgba(0, 0, 0, 0.23)]">{placeholder}</span>
            )
      }
    >
      {options.map((option, index) => (
        <MenuItem key={index} value={option.value}>
          {option.text}
        </MenuItem>
      ))}
      {/* <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem> */}
    </Select>
  );
};
export default Dropdown;
