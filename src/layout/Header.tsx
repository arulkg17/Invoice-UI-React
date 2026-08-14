import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from '../redux/auth/authSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  console.log("HEADER USER =", user);

  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);

  const menuOpen = Boolean(anchorEl);

  const handleUserMenuClick = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();

    dispatch(logout());

    navigate("/login");
  };

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
          }}
        >
          Invoice Management Systems
        </Typography>

        {user && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
              }}
            >
              Welcome, {user.displayName}
            </Typography>

            <IconButton
              color="inherit"
              onClick={handleUserMenuClick}
              aria-controls={
                menuOpen ? "user-menu" : undefined
              }
              aria-haspopup="true"
              aria-expanded={
                menuOpen ? "true" : undefined
              }
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                }}
              >
                {user.displayName
                  ?.charAt(0)
                  .toUpperCase()}
              </Avatar>
            </IconButton>

            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem
                disabled
                sx={{
                  opacity: 1,
                  fontWeight: "bold",
                }}
              >
                <AccountCircleIcon sx={{ mr: 1 }} />
                {user.displayName}
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
