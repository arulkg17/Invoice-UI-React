import { Typography, Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  
  const logout = () =>{
    navigate("/logout");
  };

  return (
    <Box
      sx={{
        padding: 4,
      }}
    >
      <Typography variant="h4">
        Welcome to Invoice Management Dashboard
      </Typography>
      <button onClick={logout}>Logout</button>
    </Box>

  );
}
