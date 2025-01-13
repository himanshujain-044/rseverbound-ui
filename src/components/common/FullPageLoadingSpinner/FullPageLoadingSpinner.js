import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const FullPageLoadingSpinner = ({ msg = "" }) => {
  return (
    <Box className="h-full w-full top-0 flex flex-col items-center justify-center absolute bg-[rgba(0,0,0,0.3)] z-[999]">
      <CircularProgress variant="indeterminate" className="text-primary" />
      <strong className="text-primary">{msg}</strong>
    </Box>
  );
};

export const LoadingSpinner = ({ style }) => {
  return (
    <Box className="flex items-center justify-center">
      <CircularProgress className="loading-spinner text-primary mobile:mobile-loading-spinner" />
    </Box>
  );
};
export default FullPageLoadingSpinner;
