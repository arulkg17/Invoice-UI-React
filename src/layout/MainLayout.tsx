import { Outlet } from "react-router-dom";

import { Container } from "@mui/material";

import TopNavigation from "../components/navigation/TopNavigation";

export default function MainLayout() {
  return (
    <>
      <TopNavigation />

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </>
  );
}
