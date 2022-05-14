import React from "react";

import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  AdminPanelSettings,
  AppRegistration,
  MiscellaneousServices,
} from "@mui/icons-material";

export const Navbar = () => {
  const [drawerState, setDrawerState] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerState(!drawerState);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={(e) => toggleDrawer()}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawerState}
            onClose={() => setDrawerState(false)}
          >
            <Box
              sx={{
                width: 250,
              }}
              role="presentation"
              onClick={() => setDrawerState(false)}
              onKeyDown={() => setDrawerState(false)}
            >
              <List>
                {["Register", "Admin"].map((text, index) => (
                  <ListItem
                    button
                    key={text}
                    onClick={() => navigate(`/${text}`)}
                  >
                    <ListItemIcon>
                      {index % 2 === 0 ? (
                        <AppRegistration />
                      ) : (
                        <AdminPanelSettings />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {["Other Stuff", "Not Implemented", "Extra Things"].map(
                  (text, index) => (
                    <ListItem button key={text}>
                      <ListItemIcon>
                        {index % 2 === 0 ? (
                          <MiscellaneousServices />
                        ) : (
                          <MailIcon />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  )
                )}
              </List>
            </Box>
          </Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Patient Registration Portal
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
