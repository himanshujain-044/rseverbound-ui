import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Icon } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "400px",
  bgcolor: "background.paper",
  borderRadius: "4px",
  boxShadow: 24,
  p: "16px",
};

const ModalComp = ({
  isOpen = false,
  title = "",
  content = <></>,
  setOpen = () => {},
  closeIcon = <HighlightOffOutlinedIcon />,
  hasBackdropClose = false,
}) => {
  // const [open, setOpen] = useState(isOpen);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => hasBackdropClose && setOpen(false);
  console.log("23", isOpen);
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="focus-visible:outline-none mobile:min-w-[90%]">
        <Icon
          className="w-full mb-8 flex justify-between items-center text-inputLabel h-fit [&_svg]:cursor-pointer"
          onClick={() => setOpen(false)}
        >
          <strong className="text-xl font-[Oswald-Light]">{title}</strong>
          {closeIcon}
        </Icon>
        {content}
      </Box>
    </Modal>
    // <div>
    // {/* <Button onClick={handleOpen}>Open modal</Button> */}

    // </div>
  );
};
export default ModalComp;
