import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { SIDEBAR_MENU_LIST } from "../../../constants/common";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleMenuClick = (menu) => {
    navigate({
      pathname: menu.route,
    });
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <div className="h-[64px] mobile:h-[48px] bg-inputLabel">Logo</div>
      <List>
        {SIDEBAR_MENU_LIST.map((menu, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => handleMenuClick(menu)}
          >
            <ListItemButton>
              <ListItemIcon>{menu.icon}</ListItemIcon>
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
