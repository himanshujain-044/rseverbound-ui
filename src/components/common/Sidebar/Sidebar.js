import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import logo from "../../../assets/logo/logo.png";
import ListItem from "@mui/material/ListItem";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { SIDEBAR_MENU_LIST } from "../../../constants/common";
import cx from "classnames";
import { ROUTES_LIST } from "../../../constants/routes";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [menuList, setMenuList] = useState(SIDEBAR_MENU_LIST);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    navigate({
      pathname: location.pathname,
    });
  }, [location]);

  const handleMenuClick = (menu) => {
    navigate({
      pathname: menu?.route,
    });
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <div className="h-[64px] mobile:h-[48px border-b brder-solid border-[#ccc] flex items-center justify-center">
        <img src={logo} className="h-full" />
      </div>
      <List>
        {menuList.map((menu, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => handleMenuClick(menu)}
          >
            <ListItemButton
              className={cx(location.pathname === menu.route && "text-primary")}
            >
              <ListItemIcon
                className={cx(
                  location.pathname === menu.route && "text-primary"
                )}
              >
                {menu.icon}
              </ListItemIcon>
              <ListItemText primary={menu.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <div onClick={toggleDrawer(true)} className="cursor-pointer">
        <MenuOutlinedIcon />
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default Sidebar;
