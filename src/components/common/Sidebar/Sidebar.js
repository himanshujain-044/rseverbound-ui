import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [menuList, setMenuList] = useState(SIDEBAR_MENU_LIST);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleMenuClick = (menu) => {
    const updatedList = menuList.map((menuItem) => {
      if (menuItem.route === menu.route) {
        return { ...menuItem, active: true };
      } else {
        return { ...menuItem, active: false };
      }
    });
    setMenuList(updatedList);
    navigate({
      pathname: menu.route,
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
            <ListItemButton className={cx(menu.active && "text-primary")}>
              <ListItemIcon className={cx(menu.active && "text-primary")}>
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
