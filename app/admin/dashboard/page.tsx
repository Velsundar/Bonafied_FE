"use client";
import NavBar from "../../../app/dashboard/navbar";
import { Box,  Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import UnAutorizedAccess from "../../assets/png/Unauthorized_access.jpeg";
import MiniDrawer from "../../..//app/components/MUI/Drawer/Drawer";
import PaperLayout from "../../../app/components/MUI/PaperLayout/PaperLayout";

const Admindash = () => {
  const history = useRouter();
  const [isTokenPresent, setIsTokenPresent] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    if (!token || userRole !== "admin") {
      history.push("/");
    } else {
      setIsTokenPresent(true);
      setIsAdmin(true);
    }
  }, [history]);

  
  return (
    <Box style={{ display: "flex", height: "calc(100vh - 120px)",width: "100%" }}>
      <MiniDrawer />
      <PaperLayout
          elevation={3}
          style={{
            height: "100%",
            marginTop: "90px",
            padding: "20px",
            width:"calc(100vw - 200px)"
          }}
        >
        <Box sx={{ flexGrow: 1, padding: "20px" }}>
          <Typography variant="h4">Hello, Admin!</Typography>
          <Typography variant="body1">
            Welcome to the admin dashboard.
          </Typography>
        </Box>
      </PaperLayout>
    </Box>
  );
};

export default Admindash;
