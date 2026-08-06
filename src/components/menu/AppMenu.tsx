import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";

import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";

interface Props {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export default function AppMenu({
  anchorEl,
  open,
  onClose,
  onNavigate,
}: Props) {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem onClick={() => onNavigate("/category")}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText>Category</ListItemText>
      </MenuItem>

      <MenuItem onClick={() => onNavigate("/itemmaster")}>
        <ListItemIcon>
          <InventoryIcon />
        </ListItemIcon>
        <ListItemText>Item Master</ListItemText>
      </MenuItem>

      <MenuItem onClick={() => onNavigate("/customer")}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText>Customer</ListItemText>
      </MenuItem>

      <MenuItem onClick={() => onNavigate("/vendor")}>
        <ListItemIcon>
          <LocalShippingIcon />
        </ListItemIcon>
        <ListItemText>Vendor</ListItemText>
      </MenuItem>

      <MenuItem onClick={() => onNavigate("/users")}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText>User</ListItemText>
      </MenuItem>

      <MenuItem onClick={() => onNavigate("/invoice")}>
        <ListItemIcon>
          <ReceiptLongIcon />
        </ListItemIcon>
        <ListItemText>Invoice</ListItemText>
      </MenuItem>

      <MenuItem onClick={() => onNavigate("/purchase-order")}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText>Purchase Order</ListItemText>
      </MenuItem>

      <MenuItem onClick={() => onNavigate("/receipt")}>
        <ListItemIcon>
          <PaymentsIcon />
        </ListItemIcon>
        <ListItemText>Receipt</ListItemText>
      </MenuItem>

      <MenuItem onClick={() => onNavigate("/reports")}>
        <ListItemIcon>
          <AssessmentIcon />
        </ListItemIcon>
        <ListItemText>Reports</ListItemText>
      </MenuItem>

      <MenuItem onClick={() => onNavigate("/logout")}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  );
}
