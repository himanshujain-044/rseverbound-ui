import TextField from "@mui/material/TextField";
// import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

const SearchableDD = ({
  ddValue = "",
  ddOptions = [],
  onChangeDDOption = () => {},
  onInputChangeDDSearch = () => {},
}) => {
  return (
    <div className="flex max-w-[100%] [&_div]:w-full w-full">
      <Autocomplete
        id="searchable-dd"
        freeSolo
        options={ddOptions}
        inputValue={ddValue}
        // renderInput={(params) => <TextField {...params} />}
        value={ddValue}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <input
              type="text"
              {...params.inputProps}
              className="w-full"
              value={ddValue}
            />
          </div>
        )}
        onChange={onChangeDDOption}
        onInputChange={onInputChangeDDSearch}
        // className="h-[24px]"
        sx={(theme) => ({
          //   display: "inline-block",
          "& input": {
            // width: 200,
            marginTop: "1px",
            outline: "none",
            paddingLeft: "8px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            wordWrap: "nowrap",
          },
        })}
      />
    </div>
  );
};
export default SearchableDD;
