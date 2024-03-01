import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const Header = () => {
  const { name } = useSelector((state) => state.userData.data);
  const handleLogout = () => {};
  return (
    <div className="bg-[#fff] fixed z-999 top-0 h-16 w-full py-4 px-16 flex justify-between shadow-inner">
      <div className="flex items-center justify-center text-primary">
        <PersonOutlineOutlinedIcon /> <strong className="ml-2">{name}</strong>
      </div>
      <div className="flex items-center gap-16">
        <Button
          variant="contained"
          className="bg-primary hover:bg-primary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
export default Header;
