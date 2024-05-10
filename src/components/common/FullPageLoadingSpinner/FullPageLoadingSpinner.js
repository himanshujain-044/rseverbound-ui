import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const FullPageLoadingSpinner = ({ msg = "" }) => {
  return (
    <Box className="h-[calc(100vh_-_64px)] flex flex-col items-center justify-center">
      <CircularProgress variant="indeterminate" className="text-primary" />
      <strong className="text-primary">{msg}</strong>
    </Box>
  );
};

export const LoadingSpinner = ({ style }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress className="loading-spinner text-primary mobile:mobile-loading-spinner" />
    </Box>
  );
};
export default FullPageLoadingSpinner;
