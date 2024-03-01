import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const CircularIndeterminate = () => {
  return (
    <Box className="h-[calc(100vh_-_64px)] flex items-center justify-center">
      <CircularProgress variant="indeterminate" className="text-primary" />
    </Box>
  );
};
export default CircularIndeterminate;
