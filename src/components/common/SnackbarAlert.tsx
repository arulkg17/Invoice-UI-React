import { Alert, Snackbar } from "@mui/material";

interface SnackbarAlertProps {
  open: boolean;

  message: string;

  severity: "success" | "error" | "warning" | "info";

  onClose: () => void;
}

const SnackbarAlert = ({
  open,
  message,
  severity,
  onClose,
}: SnackbarAlertProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          width: "100%",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
