import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/api";
import { API_ENDPOINTS } from "../../constants/apiEndPoints";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Sidebar from "../../components/common/Sidebar/Sidebar";

const Header = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.userData.data);
  const handleLogout = () => {
    dispatch(
      logout({
        method: "get",
        endpoint: API_ENDPOINTS.logout,
      })
    );
  };

  return (
    <>
      <div className="bg-[#fff] fixed top-0 z-[999] h-16 w-full py-4 px-16 flex justify-between shadow-inner mobile:px-4 mobile:py-2 mobile:h-12">
        <div className="flex items-center justify-center gap-4 text-primary">
          <Sidebar />
          <div className="flex items-center">
            <PersonOutlineOutlinedIcon />
            <strong className="ml-2 mobile:ml-1 mobile:text-[10px]">
              {name}
            </strong>
          </div>
        </div>
        <div className="flex items-center gap-8 mobile:gap-2">
          <Button
            variant="contained"
            className="bg-primary hover:bg-primary mobile:hidden"
            onClick={handleLogout}
          >
            Logout
          </Button>
          <LogoutOutlinedIcon
            className="hidden text-primary mobile:inline"
            onClick={handleLogout}
          />
        </div>
      </div>
    </>
  );
};
export default Header;
