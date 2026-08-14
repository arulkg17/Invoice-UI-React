import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Box,
  Divider,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function TopNavigation() {
  const navigate = useNavigate();

  const [masterAnchor, setMasterAnchor] = useState<null | HTMLElement>(null);

  const [transactionAnchor, setTransactionAnchor] =
    useState<null | HTMLElement>(null);

  const [reportAnchor, setReportAnchor] = useState<null | HTMLElement>(null);

  const [userAnchor, setUserAnchor] = useState<null | HTMLElement>(null);

  const navigateTo = (url: string) => {
    setMasterAnchor(null);
    setTransactionAnchor(null);
    setReportAnchor(null);
    setUserAnchor(null);

    navigate(url);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* <Typography variant="h6" sx={{ mr: 5 }}>
          Invoice Management
        </Typography>

        <Button color="inherit" onClick={() => navigate("/dashboard")}>
          Dashboard
        </Button> */}

        {/* MASTER */}

        <Button
          color="inherit"
          endIcon={<KeyboardArrowDownIcon />}
          onClick={(e) => setMasterAnchor(e.currentTarget)}
        >
          Master
        </Button>

        <Menu
          anchorEl={masterAnchor}
          open={Boolean(masterAnchor)}
          onClose={() => setMasterAnchor(null)}
        >
          <MenuItem onClick={() => navigateTo("/category")}>Category</MenuItem>

          <MenuItem onClick={() => navigateTo("/itemmaster")}>
            Item Master
          </MenuItem>

          <MenuItem onClick={() => navigateTo("/customer")}>Customer</MenuItem>

          <MenuItem onClick={() => navigateTo("/vendor")}>Vendor</MenuItem>

          <MenuItem onClick={() => navigateTo("/users")}>User</MenuItem>
        </Menu>

        {/* TRANSACTION */}

        <Button
          color="inherit"
          endIcon={<KeyboardArrowDownIcon />}
          onClick={(e) => setTransactionAnchor(e.currentTarget)}
        >
          Transaction
        </Button>

        <Menu
          anchorEl={transactionAnchor}
          open={Boolean(transactionAnchor)}
          onClose={() => setTransactionAnchor(null)}
        >
          <MenuItem onClick={() => navigateTo("/invoice")}>Invoice</MenuItem>

          <MenuItem onClick={() => navigateTo("/purchase-order")}>
            Purchase Order
          </MenuItem>

          <MenuItem onClick={() => navigateTo("/receipt")}>Receipt</MenuItem>
        </Menu>

        {/* REPORT */}

        <Button
          color="inherit"
          endIcon={<KeyboardArrowDownIcon />}
          onClick={(e) => setReportAnchor(e.currentTarget)}
        >
          Reports
        </Button>

        <Menu
          anchorEl={reportAnchor}
          open={Boolean(reportAnchor)}
          onClose={() => setReportAnchor(null)}
        >
          <MenuItem>Sales Report</MenuItem>

          <MenuItem>Purchase Report</MenuItem>

          <MenuItem>Inventory Report</MenuItem>
        </Menu>

        <Box sx={{ flexGrow: 1 }} />

        {/* USER */}

        <Button
          color="inherit"
          endIcon={<KeyboardArrowDownIcon />}
          onClick={(e) => setUserAnchor(e.currentTarget)}
        >
          Exit
        </Button>

        <Menu
          anchorEl={userAnchor}
          open={Boolean(userAnchor)}
          onClose={() => setUserAnchor(null)}
        >
          <MenuItem>Profile</MenuItem>

          <Divider />

          <MenuItem onClick={() => navigateTo("/logout")}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
