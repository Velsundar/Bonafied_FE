"use client";
import NavBar from "../../../app/dashboard/navbar";
import { Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import UnAutorizedAccess from "../../assets/png/Unauthorized_access.jpeg";
import MiniDrawer from "../../..//app/components/MUI/Drawer/Drawer";
import PaperLayout from "../../../app/components/MUI/PaperLayout/PaperLayout";
import AdminBonafiedManagementService from "../../services/admin/Bonafied.service";

const Adminbonafied = () => {
  const history = useRouter();
  const [isTokenPresent, setIsTokenPresent] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState<any>([]);
  console.log('userdata',userData)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
  const getUserData = async () => {
      const response = await AdminBonafiedManagementService.getAllBonafied();
      console.log("userresponse",response)
      setUserData(response?.data?.data);
  }
  useEffect(() => {
    getUserData();
  }, []);
  const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //   if (!isTokenPresent || !isAdmin) {
  //     return (
  //       <div
  //         style={{
  //           backgroundImage: `url(${UnAutorizedAccess.src})`,
  //           backgroundSize: "cover",
  //           backgroundPosition: "center",
  //           width: "100%",
  //           height: "100vh",
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           color: "black",
  //           fontWeight: 800,
  //           fontSize: "35px",
  //           textAlign: "center",
  //         }}
  //       >
  //         Unauthorized - Please log in
  //       </div>
  //     );
  //   }

  return (
    <Box
      style={{ display: "flex", height: "calc(100vh - 120px)", width: "100%" }}
    >
      <MiniDrawer />
      <PaperLayout
        elevation={3}
        style={{
          height: "100%",
          marginTop: "90px",
          padding: "20px",
          width: "calc(100vw - 200px)",
        }}
      >
        <Box sx={{ flexGrow: 1, padding: "2px" }}>
          <Typography variant="h6">Bonafied Applications</Typography>
          <Divider sx={{ borderBottomWidth: "5px" }} />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Registration Number</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Father's Name</TableCell>
                  <TableCell>Purpose</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user:any) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.fullName}</TableCell>
                    <TableCell>{user.regNo}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>{user.year}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.fatherName}</TableCell>
                    <TableCell>{user.purpose}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </PaperLayout>
    </Box>
  );
};

export default Adminbonafied;
