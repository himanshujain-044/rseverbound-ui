import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SnackbarsComp = ({ message, severity = "success" }) => {
  const [open, setOpen] = useState();
  console.log("7", message, severity, open);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    setOpen(!!message);
  }, [message]);

  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{
            width: "100%",
          }}
          // className={severity === "success" && "bg-primary"}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default SnackbarsComp;
