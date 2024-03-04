import { Button } from "@mui/material";

const ForgotPasswordModal = ({ toggleModal = () => {} }) => {
  return (
    <div className="flex flex-col gap-2">
      <span>Inprogress ...</span>
      <Button
        variant="outlined"
        className="flex gap-2 border-primary text-[#5A298B] hover:bg-primaryHover hover:border-primary"
        onClick={toggleModal}
      >
        Close
      </Button>
    </div>
  );
};
export default ForgotPasswordModal;
