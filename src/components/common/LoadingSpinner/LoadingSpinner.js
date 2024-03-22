import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const CircularIndeterminate = ({ msg = "" }) => {
  return (
    <Box className="h-[calc(100vh_-_64px)] flex flex-col items-center justify-center">
      <CircularProgress variant="indeterminate" className="text-primary" />
      <strong className="text-primary">{msg}</strong>
    </Box>
  );
};
export default CircularIndeterminate;
