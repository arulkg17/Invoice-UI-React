import { Outlet } from "react-router-dom";

import { Container } from "@mui/material";

import TopNavigation from "../components/navigation/TopNavigation";
import Header from "./Header";

export default function MainLayout() {
  return (
    <>
      <Header />
      <TopNavigation />

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </>
  );
}
