import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({
  open,
  title,
  itemName,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Typography>Are you sure you want to delete?</Typography>

        <Typography
          sx={{
            mt: 1,
          }}
        >
          Category: <strong>{itemName}</strong>
        </Typography>

        <Typography
          sx={{
            mt: 1,
          }}
          color="text.secondary"
        >
          This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>

        <Button variant="contained" color="error" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
