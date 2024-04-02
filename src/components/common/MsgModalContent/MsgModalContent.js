import { Button } from "@mui/material";

const MsgModalContent = ({
  icon = <></>,
  content = "",
  closeModal = () => {},
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-fit mb-6">
      {icon}
      {content}
      <Button
        variant="outlined"
        className="border-primary text-[#5A298B] hover:bg-primaryHover hover:border-primary mobile:text-[12px] mobile:h-[30px]"
        onClick={() => {
          closeModal();
        }}
      >
        Dismiss
      </Button>
    </div>
  );
};
export default MsgModalContent;
