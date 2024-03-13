"use client";
import NavBar from "../../../app/dashboard/navbar";
import {
  Box,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MiniDrawer from "../../..//app/components/MUI/Drawer/Drawer";
import PaperLayout from "../../../app/components/MUI/PaperLayout/PaperLayout";
import AdminBonafiedManagementService from "../../services/admin/Bonafied.service";
import {
  EditIcon,
  DeleteIcon,
} from "../../../app/components/MUI/Buttons/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

interface CustomDataGridProps {
  rows: any[];
  columns: any[];
  pagination?: boolean;
  pageSize?: number;
  page: number;
  onPageChange: (newPage: { page: number }) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const Adminbonafied = () => {
  const history = useRouter();
  const [isTokenPresent, setIsTokenPresent] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState<any>([]);
  const [selectedBonafied, setSelectedBonafied] = useState<any>(null);
  console.log("selectedbonafied", selectedBonafied);
  console.log("userdata", userData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<any>(5);
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
    console.log("userresponse", response);
    setUserData(response?.data?.data);
  };
  useEffect(() => {
    getUserData();
  }, []);
  const handleChangePage = (
    event: any,
    newPage: React.SetStateAction<number>
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleEdit = (userId: any) => {
    // Handle edit action
    console.log("Edit user:", userId);
  };
  const handleView = async (userId: any) => {
    try {
      const response = await AdminBonafiedManagementService.getBonafiedById(
        userId
      );
      setSelectedBonafied(response.data);
    } catch (error) {
      console.error("Error fetching bonafied by ID:", error);
    }
  };
  const handleDelete = (userId: any) => {
    // Handle delete action
    console.log("Delete user:", userId);
  };
  const columns = [
    { field: "fullName", headerName: "Full Name", width: 150 },
    { field: "regNo", headerName: "Registration Number", width: 150 },
    { field: "department", headerName: "Department", width: 150 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "fatherName", headerName: "Father's Name", width: 180 },
    { field: "purpose", headerName: "Purpose", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params: any) => (
        <Box>
          <Tooltip title="Edit" arrow>
            <IconButton onClick={() => handleEdit(params.row._id)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="View" arrow>
            <IconButton onClick={() => handleView(params.row._id)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" arrow>
            <IconButton onClick={() => handleDelete(params.row._id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

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
          <div style={{ height: 400, width: "100%",marginTop:"25px" }}>
            <DataGrid
              rows={userData}
              columns={columns}
              pageSize={rowsPerPage}
              paginationMode="server"
              page={page}
              getRowId={(row) => row._id}
              onPageChange={(newPage: any) => setPage(newPage.page)}
              onPageSizeChange={(pageSize: any) => setRowsPerPage(pageSize)}
              pagination
            />
          </div>
        </Box>
      </PaperLayout>
    </Box>
  );
};

export default Adminbonafied;
